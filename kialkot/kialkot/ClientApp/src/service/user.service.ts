import { UserFormValues, UserModel } from "../models/user.model";
import request, { Methods } from "../util/request";

class UsersService {
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