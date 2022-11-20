import { JobModel, MinJobModel } from "../models/job.model";
import request, { Methods } from "../util/request";

class JobsService {
  // TODO Innentől kell törölni ha kész az útvonal
  private Job = () => {
    var jobs = [];
    for (let i = 0; i < 10; i++) {
      jobs.push({
        id: i,
        name: "Első Munka",
        image:
          "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
        shortDescription:
          "Rövid leírása a feladatnak melyet a kialkot csapat hozott létre",
        longDescription:
          "A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!!" +
          "A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!!" +
          "A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!!" +
          "A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!!" +
          "A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!! A feledat hosszú leírása!!",
        createdAt: "2022.11.18"
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
}

export const jobsService = new JobsService();
function UserModel() {
  throw new Error("Function not implemented.");
}
