export interface LoginCredentialsModel {
  email: string;
  password: string;
}

export interface LostPasswordCredentialsModel {
  email: string;
}

export interface RenewPaswordCredentialsModel {
  newPassword: string;
  confirmPassword: string;
	token?: string;
}
