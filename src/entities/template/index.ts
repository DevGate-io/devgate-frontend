export const TemplateParameterKindEnum = {
	STRING: 'string',
	ENUM: 'enum',
	BOOLEAN: 'boolean',
} as const;

export type TemplateParameterKindType =
	(typeof TemplateParameterKindEnum)[keyof typeof TemplateParameterKindEnum];

type BaseTemplateParameter = {
	name: string;
	label: string;
	required?: boolean;
	description?: string;
};

export type StringTemplateParameterType = BaseTemplateParameter & {
	kind: typeof TemplateParameterKindEnum.STRING;
	default?: string;
	pattern?: string;
};

export type EnumTemplateParameterType = BaseTemplateParameter & {
	kind: typeof TemplateParameterKindEnum.ENUM;
	options: Array<{ value: string; label: string }>;
	default?: string;
};

export type BooleanTemplateParameterType = BaseTemplateParameter & {
	kind: typeof TemplateParameterKindEnum.BOOLEAN;
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
