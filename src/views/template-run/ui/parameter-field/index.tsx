import { Select, Switch, TextInput } from '@mantine/core';
import type { UseFormReturnType } from '@mantine/form';
import type { FC } from 'react';
import {
	TemplateParameterKind,
	type TemplateParameterType,
} from '@/entities/template';
import type { TemplateRunFormStateType } from '@/views/template-run/types';

type ParameterFieldProps = {
	parameter: TemplateParameterType;
	form: UseFormReturnType<TemplateRunFormStateType>;
};

export const ParameterField: FC<ParameterFieldProps> = ({
	parameter,
	form,
}) => {
	const path = `parameters.${parameter.name}`;

	if (parameter.kind === TemplateParameterKind.STRING) {
		return (
			<TextInput
				{...form.getInputProps(path)}
				label={parameter.label}
				description={parameter.description}
				placeholder={parameter.default ?? parameter.name}
				required={parameter.required}
			/>
		);
	}

	if (parameter.kind === TemplateParameterKind.ENUM) {
		return (
			<Select
				{...form.getInputProps(path)}
				label={parameter.label}
				description={parameter.description}
				data={parameter.options}
				required={parameter.required}
				allowDeselect={!parameter.required}
				clearable={!parameter.required}
			/>
		);
	}

	return (
		<Switch
			{...form.getInputProps(path, { type: 'checkbox' })}
			label={parameter.label}
			description={parameter.description}
			color='lavender'
		/>
	);
};
