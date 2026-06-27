import { TemplateParameterKind, type TemplateType } from '@/entities/template';
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
			case TemplateParameterKind.STRING:
				parameters[param.name] = param.default ?? '';
				break;
			case TemplateParameterKind.ENUM:
				parameters[param.name] = param.default ?? '';
				break;
			case TemplateParameterKind.BOOLEAN:
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
