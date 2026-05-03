import {
	type StringTemplateParameterType,
	TemplateParameterKindEnum,
	type TemplateType,
} from '@/entities/template';
import { SERVICE_NAME_PARAMETER_KEYS } from '@/views/template-run/constants';

export const findNameParameter = (
	template: TemplateType,
): StringTemplateParameterType | null => {
	for (const key of SERVICE_NAME_PARAMETER_KEYS) {
		const parameter = template.parameters.find(
			(param) =>
				param.kind === TemplateParameterKindEnum.STRING && param.name === key,
		);
		if (parameter && parameter.kind === TemplateParameterKindEnum.STRING) {
			return parameter;
		}
	}
	return null;
};
