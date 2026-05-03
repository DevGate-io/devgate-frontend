import {
	TemplateParameterKindEnum,
	type TemplateParameterType,
} from '@/entities/template';
import { TEMPLATE_DETAIL_LABELS } from '@/views/template-detail/constants';

export const formatParameterDefault = (
	parameter: TemplateParameterType,
): string => {
	switch (parameter.kind) {
		case TemplateParameterKindEnum.STRING:
			return parameter.default ?? TEMPLATE_DETAIL_LABELS.noDefault;
		case TemplateParameterKindEnum.ENUM:
			return parameter.default ?? TEMPLATE_DETAIL_LABELS.noDefault;
		case TemplateParameterKindEnum.BOOLEAN:
			return parameter.default === undefined
				? TEMPLATE_DETAIL_LABELS.noDefault
				: parameter.default
					? 'true'
					: 'false';
	}
};
