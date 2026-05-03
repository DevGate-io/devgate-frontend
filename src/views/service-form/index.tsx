'use client';

import {
	Button,
	MultiSelect,
	Select,
	TagsInput,
	Textarea,
	TextInput,
} from '@mantine/core';
import { PageHeader } from '@/shared/ui/page-header';
import {
	ENVIRONMENT_OPTIONS,
	LANGUAGE_OPTIONS,
	SERVICE_FORM_LABELS,
} from '@/views/service-form/constants';
import { useCreateServiceForm } from '@/views/service-form/hooks/use-create-service-form';
import { FormSection } from '@/views/service-form/ui/form-section';
import css from './index.module.css';

export const CreateServiceView = () => {
	const { form, handlers, state } = useCreateServiceForm();

	return (
		<div className={css.root}>
			<PageHeader
				title={SERVICE_FORM_LABELS.title}
				description={SERVICE_FORM_LABELS.description}
			/>

			<form
				className={css.form}
				onSubmit={form.onSubmit(handlers.handleSubmit)}
			>
				<FormSection title={SERVICE_FORM_LABELS.identificationTitle}>
					<TextInput
						{...form.getInputProps('name')}
						label={SERVICE_FORM_LABELS.nameLabel}
						placeholder={SERVICE_FORM_LABELS.namePlaceholder}
						required
					/>
					<TextInput
						{...form.getInputProps('slug')}
						label={SERVICE_FORM_LABELS.slugLabel}
						placeholder={SERVICE_FORM_LABELS.slugPlaceholder}
						description={SERVICE_FORM_LABELS.slugDescription}
						required
					/>
					<Textarea
						{...form.getInputProps('description')}
						label={SERVICE_FORM_LABELS.descriptionLabel}
						placeholder={SERVICE_FORM_LABELS.descriptionPlaceholder}
						autosize
						minRows={2}
						maxRows={4}
						className={css.fullWidth}
					/>
				</FormSection>

				<FormSection title={SERVICE_FORM_LABELS.ownershipTitle}>
					<TextInput
						{...form.getInputProps('ownerTeamId')}
						label={SERVICE_FORM_LABELS.ownerTeamLabel}
						placeholder={SERVICE_FORM_LABELS.ownerTeamPlaceholder}
						required
					/>
					<TextInput
						{...form.getInputProps('projectId')}
						label={SERVICE_FORM_LABELS.projectLabel}
						placeholder={SERVICE_FORM_LABELS.projectPlaceholder}
						required
					/>
					<Select
						{...form.getInputProps('language')}
						label={SERVICE_FORM_LABELS.languageLabel}
						placeholder={SERVICE_FORM_LABELS.languagePlaceholder}
						data={LANGUAGE_OPTIONS}
						clearable
						searchable
					/>
				</FormSection>

				<FormSection title={SERVICE_FORM_LABELS.linksTitle}>
					<TextInput
						{...form.getInputProps('repoUrl')}
						label={SERVICE_FORM_LABELS.repoUrlLabel}
						placeholder={SERVICE_FORM_LABELS.repoUrlPlaceholder}
						type='url'
					/>
					<TextInput
						{...form.getInputProps('pipelineUrl')}
						label={SERVICE_FORM_LABELS.pipelineUrlLabel}
						placeholder={SERVICE_FORM_LABELS.pipelineUrlPlaceholder}
						type='url'
					/>
					<TextInput
						{...form.getInputProps('docsUrl')}
						label={SERVICE_FORM_LABELS.docsUrlLabel}
						placeholder={SERVICE_FORM_LABELS.docsUrlPlaceholder}
						type='url'
					/>
				</FormSection>

				<FormSection title={SERVICE_FORM_LABELS.metadataTitle}>
					<TagsInput
						{...form.getInputProps('tags')}
						label={SERVICE_FORM_LABELS.tagsLabel}
						placeholder={SERVICE_FORM_LABELS.tagsPlaceholder}
						className={css.fullWidth}
					/>
					<MultiSelect
						{...form.getInputProps('environmentNames')}
						label={SERVICE_FORM_LABELS.environmentsLabel}
						placeholder={SERVICE_FORM_LABELS.environmentsPlaceholder}
						data={ENVIRONMENT_OPTIONS}
						className={css.fullWidth}
					/>
				</FormSection>

				<div className={css.actions}>
					<Button
						variant='subtle'
						onClick={handlers.handleCancel}
						type='button'
					>
						{SERVICE_FORM_LABELS.cancel}
					</Button>
					<Button type='submit' loading={state.isLoading}>
						{SERVICE_FORM_LABELS.submit}
					</Button>
				</div>
			</form>
		</div>
	);
};
