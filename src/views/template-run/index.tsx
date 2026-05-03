'use client';

import { Button, TextInput } from '@mantine/core';
import type { FC } from 'react';
import type { TemplateType } from '@/entities/template';
import { PageHeader } from '@/shared/ui/page-header';
import { TEMPLATE_RUN_LABELS } from '@/views/template-run/constants';
import { useTemplateRunForm } from '@/views/template-run/hooks/use-template-run-form';
import { ParameterField } from '@/views/template-run/ui/parameter-field';
import { TemplateSummary } from '@/views/template-run/ui/template-summary';
import css from './index.module.css';

type TemplateRunViewProps = {
	template: TemplateType;
};

export const TemplateRunView: FC<TemplateRunViewProps> = ({ template }) => {
	const { form, handlers, state } = useTemplateRunForm(template);

	return (
		<div className={css.root}>
			<PageHeader
				title={TEMPLATE_RUN_LABELS.title}
				description={`${TEMPLATE_RUN_LABELS.descriptionPrefix} «${template.name}».`}
			/>

			<TemplateSummary template={template} />

			<form
				className={css.form}
				onSubmit={form.onSubmit(handlers.handleSubmit)}
			>
				<fieldset className={css.section}>
					<legend className={css.legend}>
						{TEMPLATE_RUN_LABELS.parametersTitle}
					</legend>
					<div className={css.grid}>
						{template.parameters.map((parameter) => (
							<ParameterField
								key={parameter.name}
								parameter={parameter}
								form={form}
							/>
						))}
					</div>
				</fieldset>

				<fieldset className={css.section}>
					<legend className={css.legend}>
						{TEMPLATE_RUN_LABELS.ownershipTitle}
					</legend>
					<div className={css.grid}>
						<TextInput
							{...form.getInputProps('ownerTeamId')}
							label={TEMPLATE_RUN_LABELS.ownerTeamLabel}
							placeholder={TEMPLATE_RUN_LABELS.ownerTeamPlaceholder}
							required
						/>
						<TextInput
							{...form.getInputProps('projectId')}
							label={TEMPLATE_RUN_LABELS.projectLabel}
							placeholder={TEMPLATE_RUN_LABELS.projectPlaceholder}
							required
						/>
					</div>
				</fieldset>

				<div className={css.actions}>
					<Button
						type='button'
						variant='subtle'
						onClick={handlers.handleCancel}
					>
						{TEMPLATE_RUN_LABELS.cancel}
					</Button>
					<Button type='submit' loading={state.isLoading} color='lavender'>
						{TEMPLATE_RUN_LABELS.submit}
					</Button>
				</div>
			</form>
		</div>
	);
};
