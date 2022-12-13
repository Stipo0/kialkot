import { JobStatusEnum } from "../enums/job.status.enum";
import {
  JobModel,
  MinJobModel,
  JobFormValues,
  ChangeJobStatusModel,
} from "../models/job.model";
import { ResponseModel } from "../models/response.model";
import request, { Methods } from "../util/request";

class JobsService {
  async getJobs(jobstatus: JobStatusEnum) {
    return request<MinJobModel[]>({
      method: Methods.GET,
      resource: `api/Job/jobs/${jobstatus}`,
    });
  }

  async getJobsAnonim() {
    return request<MinJobModel[]>({
      method: Methods.GET,
      resource: `api/Job/jobs/anonym`,
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
    return request<ResponseModel>({
      method: Methods.DELETE,
      resource: `api/Job/${id}`,
    });
  }

  async acceptJob(id: number) {
    return request<ResponseModel>({
      method: Methods.PUT,
      resource: `api/Job/desinger/acceptjob/${id}`,
    });
  }

  async rejectJob(id: number) {
    return request<ResponseModel>({
      method: Methods.PUT,
      resource: `api/Job/desinger/rejectjob/${id}`,
    });
  }

  async changeStatus(data: ChangeJobStatusModel, jobId: number) {
    return request<JobModel>({
      method: Methods.PUT,
      data,
      resource: `api/Job/desinger/changejobstatus/${jobId}`,
    });
  }
}

export const jobsService = new JobsService();
