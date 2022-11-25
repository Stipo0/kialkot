import {
  LoginCredentialsModel,
  LostPasswordCredentialsModel,
  RenewPaswordCredentialsModel,
} from "../models/auth.model";
import { ResponseModel } from "../models/response.model";
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
    });
  }

  async lostPassword(credentials: LostPasswordCredentialsModel) {
    return request<string>({
      method: Methods.POST,
      resource: "api/Account/forgotpassword",
      data: credentials,
    });
  }

  async verificateToken(token: string | null) {
    return request<ResponseModel>({
      method: Methods.GET,
      resource:
        "api/Account/forgotpasswordtokenverification" + (token
          ? "?token=" + token
          : ""),
    });
  }
  
  async verificateEmailToken(token: string | null) {
    return request<ResponseModel>({
      method: Methods.POST,
      resource:
        "api/Account/verifyaccount" + (token
          ? "?token=" + token
          : ""),
    });
  }

  async resetPassword(
    credentials: RenewPaswordCredentialsModel,
    token: string | null
  ) {
    return request<string>({
      method: Methods.POST,
      resource:
        "api/Account/resetpassword" + (token ? "?token=" + token : ""),
      data: credentials,
    });
  }
}

export const authService = new AuthService();
