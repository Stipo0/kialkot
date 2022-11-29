import { JobStatusEnum } from "../enums/job.status.enum";
import {
  JobModel,
  MinJobModel,
  JobFormValues,
  SubscribeJobModel,
} from "../models/job.model";
import request, { Methods } from "../util/request";

class JobsService {
  async getJobs(jobstatus: JobStatusEnum) {
    return request<MinJobModel[]>({
      method: Methods.GET,
      resource: `api/Job/jobs/${jobstatus}`,
    });
  }

  async getJob(id: string) {
    return request<JobModel>({
      method: Methods.GET,
      resource: `api/Job/${id}`,
    });
  }

  async update(data: JobFormValues, jobId: number) {
    return request<JobModel>({
      method: Methods.PUT,
      data,
      resource: `api/Job/${jobId}`,
    });
  }

  async store(data: JobFormValues) {
    return request<JobModel>({
      method: Methods.POST,
      data,
      resource: `api/Job`,
    });
  }

  async deleteJob(id: number) {
    return request<JobModel>({
      method: Methods.DELETE,
      resource: `api/Job/${id}`,
    });
  }

  async subscribeJob(data: SubscribeJobModel) {
    return request<JobModel>({
      method: Methods.POST,
      data,
      resource: `api/Jobs/enroll`,
    });
  }

  async unSubscribeJob(data: SubscribeJobModel) {
    return request<JobModel>({
      method: Methods.DELETE,
      data,
      resource: `api/Jobs/enroll`,
    });
  }
}

export const jobsService = new JobsService();
