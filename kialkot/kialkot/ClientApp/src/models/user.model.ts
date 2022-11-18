export interface UserModel {
	nickName: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	verified: boolean;
	createdAt: Date;
	updatedAt: Date;
}


export interface StoreAndUpdateCredentialsModel {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface UserFormValues extends Omit<UserModel, "id" | "createdAt" | "role"> {}