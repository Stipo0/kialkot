export interface UserModel {
  id: number;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UpdateCredentialsModel {
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  currentPassword: string;
  newPassword?: string;
  confirmPassword?: string;
}

export interface StoreCredentialsModel {
  isDesinger: string;
  nickName: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

export interface UserFormValues
  extends Omit<UserModel, "id" | "createdAt" | "role"> {}

export interface MinUserModel
  extends Omit<UserModel, "role" | "verified" | "createdAt" | "updatedAt"> {}

export interface AdminMinUSerModel
  extends Omit<MinUserModel,  "firstName" | "lastName"> {}
