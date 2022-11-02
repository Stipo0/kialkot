import { RegistrationCredentialsModel } from "../models/auth.model";
import { UserFormValues, UserModel } from "../models/user.model";
import request, { Methods } from "../util/request";

class UsersService {
	async storeMe(credentials: RegistrationCredentialsModel) {
		return request<string>({
			method: Methods.POST,
			resource: "api/Account/register",
			data: credentials
		});
	}

	async getMe() {
		return request<UserModel>({ resource: "api/Account/me", method: Methods.GET })
	}

	async updateMe(data: UserFormValues) {
		return request<UserModel>({
			method: Methods.PATCH,
			data,
			resource: 'api/Account/update',
		});
	}
}

export const userService = new UsersService();