export type TemplateParameterValueType = string | boolean;

export type TemplateRunFormStateType = {
	parameters: Record<string, TemplateParameterValueType>;
	ownerTeamId: string;
	projectId: string;
};
