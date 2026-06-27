export enum TemplateParameterKind {
	STRING = 'string',
	ENUM = 'enum',
	BOOLEAN = 'boolean',
}

type BaseTemplateParameter = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
};

export type StringTemplateParameterType = BaseTemplateParameter & {
	kind: TemplateParameterKind.STRING;
	default?: string;
	pattern?: string;
};

export type EnumTemplateParameterType = BaseTemplateParameter & {
	kind: TemplateParameterKind.ENUM;
	options: Array<{ value: string; label: string }>;
	default?: string;
};

export type BooleanTemplateParameterType = BaseTemplateParameter & {
	kind: TemplateParameterKind.BOOLEAN;
	default?: boolean;
};

export type TemplateParameterType =
	| StringTemplateParameterType
	| EnumTemplateParameterType
	| BooleanTemplateParameterType;

export type TemplateType = {
	id: string;
	name: string;
	slug: string;
	description: string;
	tags: string[];
	parameters: TemplateParameterType[];
	createdAt: string;
};
