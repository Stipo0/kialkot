import { JobModel } from "../models/job.model";
import request, { Methods } from "../util/request";

class JobsService {
	async getJobs() {
		var Jobs = [
			{
				id: 5,
				name: "Első Munka",
				image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png",
				shortDescription: "rövid leírás",
				longDesccription: "Hosszú leírás",
				createdAt: "2022.11.18",
			},
		]
		return Jobs;
		//return request<JobModel[]>({method: Methods.GET, resource: "/api/Jobs/all"});
	}
}

export const jobsService = new JobsService();