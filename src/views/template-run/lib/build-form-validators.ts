import {
	TemplateParameterKindEnum,
	type TemplateType,
} from '@/entities/template';
import { TEMPLATE_RUN_LABELS } from '@/views/template-run/constants';
import type { TemplateParameterValueType } from '@/views/template-run/types';

type ParameterValidator = (value: TemplateParameterValueType) => string | null;

export const buildParameterValidators = (
	template: TemplateType,
): Record<string, ParameterValidator> => {
	const validators: Record<string, ParameterValidator> = {};

	for (const param of template.parameters) {
		const path = `parameters.${param.name}`;

		if (param.kind === TemplateParameterKindEnum.STRING) {
			const pattern = param.pattern ? new RegExp(param.pattern) : null;
			validators[path] = (value) => {
				const text = typeof value === 'string' ? value.trim() : '';
				if (param.required && text.length === 0) {
					return TEMPLATE_RUN_LABELS.requiredError;
				}
				if (text.length > 0 && pattern && !pattern.test(text)) {
					return TEMPLATE_RUN_LABELS.patternError;
				}
				return null;
			};
			continue;
		}

		if (param.kind === TemplateParameterKindEnum.ENUM) {
			validators[path] = (value) => {
				if (!param.required) return null;
				const text = typeof value === 'string' ? value : '';
				return text.length > 0 ? null : TEMPLATE_RUN_LABELS.requiredError;
			};
		}
	}

	return validators;
};
