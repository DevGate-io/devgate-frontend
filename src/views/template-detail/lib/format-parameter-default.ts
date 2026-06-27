import {
	TemplateParameterKind,
	type TemplateParameterType,
} from '@/entities/template';
import { TEMPLATE_DETAIL_LABELS } from '@/views/template-detail/constants';

export const formatParameterDefault = (
	parameter: TemplateParameterType,
): string => {
	switch (parameter.kind) {
		case TemplateParameterKind.STRING:
			return parameter.default ?? TEMPLATE_DETAIL_LABELS.noDefault;
		case TemplateParameterKind.ENUM:
			return parameter.default ?? TEMPLATE_DETAIL_LABELS.noDefault;
		case TemplateParameterKind.BOOLEAN:
			return parameter.default === undefined
				? TEMPLATE_DETAIL_LABELS.noDefault
				: parameter.default
					? 'true'
					: 'false';
	}
};
