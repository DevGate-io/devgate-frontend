import {
	TemplateParameterKindEnum,
	type TemplateType,
} from '@/entities/template';
import type {
	TemplateParameterValueType,
	TemplateRunFormStateType,
} from '@/views/template-run/types';

export const buildFormDefaults = (
	template: TemplateType,
): TemplateRunFormStateType => {
	const parameters: Record<string, TemplateParameterValueType> = {};

	for (const param of template.parameters) {
		switch (param.kind) {
			case TemplateParameterKindEnum.STRING:
				parameters[param.name] = param.default ?? '';
				break;
			case TemplateParameterKindEnum.ENUM:
				parameters[param.name] = param.default ?? '';
				break;
			case TemplateParameterKindEnum.BOOLEAN:
				parameters[param.name] = param.default ?? false;
				break;
		}
	}

	return {
		parameters,
		ownerTeamId: '',
		projectId: '',
	};
};
