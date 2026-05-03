'use client';

import { Button, Select, TextInput } from '@mantine/core';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type FC, useId } from 'react';
import {
	ACTION_OPTIONS,
	ADMIN_AUDIT_LABELS,
	ADMIN_AUDIT_PARAM_KEYS,
} from '@/views/admin-audit/constants';
import css from './index.module.css';

type ActorOptionType = { value: string; label: string };

type AuditToolbarProps = {
	actorOptions: ActorOptionType[];
};

export const AuditToolbar: FC<AuditToolbarProps> = ({ actorOptions }) => {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const actionId = useId();
	const actorId = useId();
	const fromId = useId();
	const toId = useId();

	const action = searchParams.get(ADMIN_AUDIT_PARAM_KEYS.action) ?? '';
	const actor = searchParams.get(ADMIN_AUDIT_PARAM_KEYS.actor) ?? '';
	const from = searchParams.get(ADMIN_AUDIT_PARAM_KEYS.from) ?? '';
	const to = searchParams.get(ADMIN_AUDIT_PARAM_KEYS.to) ?? '';

	const updateParam = (key: string, value: string | null) => {
		const next = new URLSearchParams(searchParams);
		if (value && value.length > 0) {
			next.set(key, value);
		} else {
			next.delete(key);
		}
		const query = next.toString();
		router.replace(query ? `${pathname}?${query}` : pathname);
	};

	const resetAll = () => {
		router.replace(pathname);
	};

	const hasFilters =
		action.length > 0 || actor.length > 0 || from.length > 0 || to.length > 0;

	return (
		<search className={css.root}>
			<div className={css.field}>
				<label htmlFor={actionId} className={css.label}>
					{ADMIN_AUDIT_LABELS.filterAction}
				</label>
				<Select
					id={actionId}
					placeholder={ADMIN_AUDIT_LABELS.allActions}
					data={ACTION_OPTIONS}
					value={action || null}
					onChange={(value) =>
						updateParam(ADMIN_AUDIT_PARAM_KEYS.action, value)
					}
					radius='md'
					size='sm'
					clearable
					searchable
				/>
			</div>

			<div className={css.field}>
				<label htmlFor={actorId} className={css.label}>
					{ADMIN_AUDIT_LABELS.filterActor}
				</label>
				<Select
					id={actorId}
					placeholder={ADMIN_AUDIT_LABELS.allActors}
					data={actorOptions}
					value={actor || null}
					onChange={(value) => updateParam(ADMIN_AUDIT_PARAM_KEYS.actor, value)}
					radius='md'
					size='sm'
					clearable
					searchable
				/>
			</div>

			<div className={css.field}>
				<label htmlFor={fromId} className={css.label}>
					{ADMIN_AUDIT_LABELS.filterFrom}
				</label>
				<TextInput
					id={fromId}
					type='date'
					value={from}
					onChange={(event) =>
						updateParam(ADMIN_AUDIT_PARAM_KEYS.from, event.currentTarget.value)
					}
					radius='md'
					size='sm'
				/>
			</div>

			<div className={css.field}>
				<label htmlFor={toId} className={css.label}>
					{ADMIN_AUDIT_LABELS.filterTo}
				</label>
				<TextInput
					id={toId}
					type='date'
					value={to}
					onChange={(event) =>
						updateParam(ADMIN_AUDIT_PARAM_KEYS.to, event.currentTarget.value)
					}
					radius='md'
					size='sm'
				/>
			</div>

			{hasFilters && (
				<Button
					type='button'
					variant='subtle'
					size='sm'
					onClick={resetAll}
					className={css.reset}
				>
					{ADMIN_AUDIT_LABELS.resetFilters}
				</Button>
			)}
		</search>
	);
};
