import type { TemplateType } from '@/entities/template';
import type { CreateServiceDtoType } from '@/shared/api/services/create-service';
import { findNameParameter } from '@/views/template-run/lib/find-name-parameter';
import type { TemplateRunFormStateType } from '@/views/template-run/types';

export const buildCreateServiceDtoFromTemplate = (
	template: TemplateType,
	state: TemplateRunFormStateType,
): CreateServiceDtoType => {
	const nameParameter = findNameParameter(template);
	const slug =
		nameParameter && typeof state.parameters[nameParameter.name] === 'string'
			? (state.parameters[nameParameter.name] as string).trim()
			: template.slug;

	return {
		name: slug,
		slug,
		description: `Создан по шаблону «${template.name}»`,
		ownerTeamId: state.ownerTeamId.trim(),
		projectId: state.projectId.trim(),
		tags: [...template.tags],
		environments: [],
	};
};
