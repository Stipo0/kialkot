import {
  AdminMinUSerModel,
  StoreCredentialsModel,
  UpdateCredentialsModel,
  UserModel,
} from "../models/user.model";
import request, { Methods } from "../util/request";

class UsersService {
  async getUsers() {
		return request<AdminMinUSerModel[]>({
			method: Methods.GET,
			resource: 'api/users',
		})
  }

  async storeMe(credentials: StoreCredentialsModel) {
    return request<string>({
      method: Methods.POST,
      resource: "api/Account/register",
      data: credentials,
    });
  }

  async getMe() {
    return request<UserModel>({
      resource: "api/Account/me",
      method: Methods.GET,
    });
  }

  async updateMe(data: UpdateCredentialsModel) {
    return request<UserModel>({
      method: Methods.PUT,
      data,
      resource: "api/Account/update",
    });
  }
}

export const userService = new UsersService();
