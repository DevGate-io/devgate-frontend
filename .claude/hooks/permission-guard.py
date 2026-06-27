#!/usr/bin/env python3
"""PreToolUse permission guard for Claude Code.

Blocks clearly dangerous Bash commands and out-of-project file writes.
Everything that is *not* dangerous is left untouched (the hook exits silently),
so the normal permission flow — the allow-list and the `ask` rules in
settings.json — still decides. This guard therefore only ever DENIES; it never
blanket-allows, which means `ask: git push` keeps working.
"""

import json
import os
import re
import sys

PROJECT_DIR = os.environ.get("CLAUDE_PROJECT_DIR", os.getcwd())

DANGEROUS_GIT_PATTERNS = [
    r"git\s+push\b[^|;&]*--force\b",
    r"git\s+push\b[^|;&]*(\s|^)-f\b",
    r"git\s+reset\s+--hard",
    r"git\s+rebase\b",
    r"git\s+commit\s+--amend",
    r"git\s+branch\s+-[dD]\b",
    r"git\s+clean\s+-[a-z]*f",
    r"git\s+stash\s+(drop|clear)",
    r"git\s+checkout\s+--\s+\.",
    r"git\s+filter-branch\b",
]

DANGEROUS_SYSTEM_PATTERNS = [
    r"\brm\s+-[a-z]*r[a-z]*f?[a-z]*\s+(/|~|\$HOME)",
    r"\brm\s+-[a-z]*f[a-z]*r[a-z]*\s+(/|~|\$HOME)",
    r"(^|\s)sudo\b",
    r"\bchmod\s+-?R?\s*777\b",
    r"\bdd\b[^|;&]*\bof=/dev/",
    r":\s*\(\)\s*\{.*\}\s*;\s*:",  # fork bomb
    r"\bmkfs\b",
    r"\bshutdown\b",
    r"\breboot\b",
    r">\s*/dev/sd",
]

# Secrets: block dumping real .env files, but allow .env.example / .sample / .template.
SENSITIVE_PATTERNS = [
    r"\b(cat|less|more|head|tail|bat|xxd|od)\b[^|;&]*\.env\b(?!\.(example|sample|template|dist))",
    r"\bprintenv\b",
    r"\bgrep\b[^|;&]*(password|secret|api[_-]?key|access[_-]?token)\b",
]


def is_path_in_project(path):
    if not path:
        return True
    expanded = os.path.expanduser(os.path.expandvars(path))
    if not os.path.isabs(expanded):
        return True
    try:
        real = os.path.realpath(expanded)
        root = os.path.realpath(PROJECT_DIR)
        return real == root or real.startswith(root + os.sep)
    except OSError:
        return False


def deny(reason):
    print(
        json.dumps(
            {
                "hookSpecificOutput": {
                    "hookEventName": "PreToolUse",
                    "permissionDecision": "deny",
                    "permissionDecisionReason": reason,
                }
            }
        )
    )
    sys.exit(0)


def main():
    try:
        data = json.load(sys.stdin)
    except (json.JSONDecodeError, ValueError):
        sys.exit(0)

    tool = data.get("tool_name", "")
    tool_input = data.get("tool_input") or {}

    if tool == "Bash":
        command = tool_input.get("command", "") or ""
        for pattern in DANGEROUS_GIT_PATTERNS:
            if re.search(pattern, command, re.IGNORECASE):
                deny(f"Опасная git-команда заблокирована guard'ом (/{pattern}/).")
        for pattern in DANGEROUS_SYSTEM_PATTERNS:
            if re.search(pattern, command, re.IGNORECASE):
                deny(f"Опасная системная команда заблокирована guard'ом (/{pattern}/).")
        for pattern in SENSITIVE_PATTERNS:
            if re.search(pattern, command, re.IGNORECASE):
                deny("Похоже на доступ к секретам — заблокировано. Для .env.example используй Read.")
    elif tool in ("Edit", "Write", "NotebookEdit"):
        file_path = tool_input.get("file_path") or tool_input.get("notebook_path") or ""
        if not is_path_in_project(file_path):
            deny(f"Запись вне каталога проекта заблокирована: {file_path}")

    # Not dangerous → stay silent, let the normal permission flow decide.
    sys.exit(0)


if __name__ == "__main__":
    main()