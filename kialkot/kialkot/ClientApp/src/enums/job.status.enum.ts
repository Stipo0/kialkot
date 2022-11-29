import { OptionValues } from "../components/text-field/TextField";

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

  export const toOptions: OptionValues[] = Object.values(JobStatusEnum)
    .filter((value) => typeof value === "string")
    .map((value) => ({
      value: JobStatusEnum[value as number],
      name: value as string,
    }));
}
