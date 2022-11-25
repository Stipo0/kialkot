import { MinUserModel } from "./user.model";

export interface JobModel {
  id: number;
  name: string;
  creatorName: string;
  creatorEmail: string;
  image: string;
  jobType: string;
  deadline: string;
  description: string;
  createdAt: string;
  user?: MinUserModel;
}

export interface MinJobModel extends Omit<JobModel, "description" | "createdAt" | "user" | "creatorEmail" > {}

export interface JobFormValues extends Omit<JobModel, "id" | "createdAt" | "creatorName" | "creatorEmail" | "user" > {}

export interface SubscribeJobModel {
  jobId?: number;
}