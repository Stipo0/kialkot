export interface LoginCredentialsModel {
  email: string;
  password: string;
}

export interface RegistrationCredentialsModel {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LostPasswordCredentialsModel {
  email: string;
}

export interface RenewPaswordCredentialsModel {
  newPassword: string;
  confirmPassword: string;
	token?: string;
}
