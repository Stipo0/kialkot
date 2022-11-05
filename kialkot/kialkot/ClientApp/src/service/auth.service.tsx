import { LoginCredentialsModel, LostPasswordCredentialsModel } from "../models/auth.model";
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

	async lostPassword(credentials: LostPasswordCredentialsModel) {
		return request<string>({
			method: Methods.POST,
			resource: "api/Auth/forgotPassword",
			data: credentials,
		})
	}
}

export const authService = new AuthService();