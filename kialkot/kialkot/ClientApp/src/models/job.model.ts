export interface MinJobModel {
  id: number;
  name: string;
  creatorName: string;
  image: string;
  jobType: string;
  deadline: string;
}

export interface JobModel extends MinJobModel {
  description: string;
  createdAt: string;
}
