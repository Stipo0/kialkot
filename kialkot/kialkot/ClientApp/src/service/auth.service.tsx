import { LoginCredentialsModel } from "../models/auth.model";
import request, { Methods } from "../util/request";

interface LoginResponse {
	token: string;
}

class AuthService {
	async login(credentials: LoginCredentialsModel) {
		return request<LoginResponse>({
			method: Methods.POST,
			resource: "api/Auth/login",
			data: credentials,
		})
	}
}

export const authService = new AuthService();