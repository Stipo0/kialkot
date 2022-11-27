export enum JobStatusEnum {
  Open,
  Canceled,
  Waiting,
  InProgress,
  Finished,
}

export namespace JobStatusEnum {
	export function toString(jobStatus: JobStatusEnum): string {
		return JobStatusEnum[jobStatus];
	}
 }