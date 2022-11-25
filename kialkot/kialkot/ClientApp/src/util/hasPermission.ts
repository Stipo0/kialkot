import { getDataFromTokenModel } from "./token"

export const hasPermission = (allowedFor: Role[]) => {
	const role = getDataFromTokenModel("role");

	if (!role) {
		return false;
	}

	return allowedFor.includes(role as Role);
};