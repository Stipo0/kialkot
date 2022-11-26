import { MinUserModel } from "./user.model";

export enum JobStatusEnum {
  Open,
  Canceled,
  Waiting,
  InProgress,
  Finished,
}

export enum JobTypeEnum {
  Custom,
  Szórólap,
  Plakát,
  Kiadvány,
  Meghívó,
  Oklevél,
  Arculat,
  Design,
}

export interface JobModel {
  id: number;
  name: string;
  creator: MinUserModel;
  image: string;
  jobType: JobTypeEnum;
  deadline: string;
  description: string;
  jobStatus: JobStatusEnum;
}

export interface MinJobModel
  extends Omit<JobModel, "description" | "jobStatus"> {}

export interface JobFormValues
  extends Omit<JobModel, "id" | "jobStatus" | "creator"> {}

export interface SubscribeJobModel {
  jobId?: number;
}
