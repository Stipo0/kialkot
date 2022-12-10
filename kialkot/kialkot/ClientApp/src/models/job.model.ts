import { JobStatusEnum } from "../enums/job.status.enum";
import { JobTypeEnum } from "../enums/job.type.enum";
import { MinUserModel } from "./user.model";

export interface JobModel {
  id: number;
  name: string;
  creator?: MinUserModel;
  image: string;
  jobType: JobTypeEnum;
  deadline: string;
  description: string;
  jobStatus: JobStatusEnum;
  worker?: MinJobModel;
}

export interface MinJobModel
  extends Omit<JobModel, "description" | "jobStatus" | "worker"> {}

export interface JobFormValues
  extends Omit<JobModel, "id" | "jobStatus" | "creator" | "worker"> {}

export interface SubscribeJobModel {
  jobId?: number;
}
