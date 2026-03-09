export const generateAuthorizationHeader = (token: string) => {
	return `Bearer ${token}`;
};
