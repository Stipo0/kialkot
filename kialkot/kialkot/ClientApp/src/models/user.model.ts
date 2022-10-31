export interface UserModel {
	nickName: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;
	createdAt: string;
}

export interface UserFormValues extends Omit<UserModel, "id" | "createdAt" | "role"> {}