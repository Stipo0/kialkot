import { JobModel, MinJobModel, JobFormValues } from "../models/job.model";
import request, { Methods } from "../util/request";

class JobsService {
  // TODO Innentől kell törölni ha kész az útvonal
  private Job = () => {
    var jobs = [];
    for (let i = 1; i < 10; i++) {
      jobs.push({
        id: i,
        name: `${i}. Munka`,
        creatorName: `Creator${i}`,
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        jobType:
        "Molinó",
        description:
        "A feladat leírása melyet a Jókérdés csapat alkotott meg!!" +
        "A feladat leírása melyet a Jókérdés csapat alkotott meg!!" +
        "A feladat leírása melyet a Jókérdés csapat alkotott meg!!" +
        "A feladat leírása melyet a Jókérdés csapat alkotott meg!!" +
        "A feladat leírása melyet a Jókérdés csapat alkotott meg!!" +
        "A feladat leírása melyet a Jókérdés csapat alkotott meg!!" +
          "A feladat leírása melyet a Jókérdés csapat alkotott meg!!",
          deadline: "2022.11.30",
          createdAt: "2022.11.18",
        });
      }
      return jobs;
    };
    
    // TODO Eddig
  async getJobs() {
    // TODO ezeket pedig felcsélni és úgy törölni
    return this.Job();
    /* return request<MinJobModel[]>({
      method: Methods.GET,
      resource: "/api/Jobs",
    }); */
  }
  
  // TODO Eddig
  async getJob(id: string) {
    // TODO ezeket pedig felcsélni és úgy törölni
    return this.Job()[Number(id)];
    /* return request<JobModel>({
      method: Methods.GET,
      resource: `/api/Jobs/${id}`,
    }); */
  }

  async update(data: JobFormValues, jobId: number) {
    return request<JobModel>({
      method: Methods.PUT,
      data,
      resource: `api/Jobs/${jobId}`
    })
  }

  async store(data: JobFormValues) {
    return request<JobModel>({
      method: Methods.POST,
      data,
      resource: `api/Jobs`
    })
  }
}

export const jobsService = new JobsService();
