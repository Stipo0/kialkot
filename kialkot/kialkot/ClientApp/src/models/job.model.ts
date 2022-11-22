import { MinUserModel } from "./user.model";

export interface JobModel {
  id: number;
  name: string;
  creatorName: string;
  image: string;
  jobType: string;
  deadline: string;
  description: string;
  createdAt: string;
  user: MinUserModel;
}

export interface MinJobModel extends Omit<JobModel, "description" | "createdAt" | "user" > {}

export interface JobFormValues extends Omit<JobModel, "id" | "createdAt" | "creatorName" | "user" > {}

export interface PickJobModel {
  userId: number;
  jobId: number;
}