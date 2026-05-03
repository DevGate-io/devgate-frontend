import type { ServiceFormStateType } from '@/views/service-form/types';

const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const URL_PATTERN = /^https?:\/\/[^\s]+$/i;

export const SERVICE_FORM_DEFAULT_STATE: ServiceFormStateType = {
	name: '',
	slug: '',
	description: '',
	language: '',
	ownerTeamId: '',
	projectId: '',
	repoUrl: '',
	pipelineUrl: '',
	docsUrl: '',
	tags: [],
	environmentNames: [],
};

const required = (message: string) => (value: string) =>
	value.trim().length > 0 ? null : message;

const minLength = (limit: number, message: string) => (value: string) =>
	value.trim().length >= limit ? null : message;

const optionalUrl = (message: string) => (value: string) => {
	if (!value) return null;
	return URL_PATTERN.test(value) ? null : message;
};

const slugFormat = (value: string) =>
	SLUG_PATTERN.test(value)
		? null
		: 'Только латинские буквы, цифры и дефис, без пробелов';

export const SERVICE_FORM_VALIDATORS = {
	name: {
		check: (value: string) => {
			const requiredError = required('Имя обязательно')(value);
			if (requiredError) return requiredError;
			return minLength(3, 'Минимум 3 символа')(value);
		},
	},
	slug: {
		check: (value: string) => {
			const requiredError = required('Слаг обязателен')(value);
			if (requiredError) return requiredError;
			return slugFormat(value);
		},
	},
	ownerTeamId: {
		check: required('Укажите команду-владельца'),
	},
	projectId: {
		check: required('Укажите проект'),
	},
	repoUrl: {
		check: optionalUrl('Должен быть валидный URL (http/https)'),
	},
	pipelineUrl: {
		check: optionalUrl('Должен быть валидный URL (http/https)'),
	},
	docsUrl: {
		check: optionalUrl('Должен быть валидный URL (http/https)'),
	},
};
