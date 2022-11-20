export interface MinJobModel {
  id: number;
  name: string;
  image: string;
  shortDescription: string;
  createdAt: string;
}

export interface JobModel extends MinJobModel {
  longDesccription: string;
}
