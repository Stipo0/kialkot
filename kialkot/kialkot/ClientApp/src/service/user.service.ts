
import { StoreAndUpdateCredentialsModel, UserModel } from "../models/user.model";
import request, { Methods } from "../util/request";

class UsersService {
	async storeMe(credentials: StoreAndUpdateCredentialsModel) {
		return request<string>({
			method: Methods.POST,
			resource: "api/Account/register",
			data: credentials
		});
	}

	async getMe() {
		return request<UserModel>({ resource: "api/Account/me", method: Methods.GET })
	}

	async updateMe(data: StoreAndUpdateCredentialsModel) {
		return request<UserModel>({
			method: Methods.PUT,
			data,
			resource: 'api/Account/update',
		});
	}
}

export const userService = new UsersService();