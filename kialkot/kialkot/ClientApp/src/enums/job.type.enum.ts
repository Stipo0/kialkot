import { OptionValues } from "../components/text-field/TextField";

export enum JobTypeEnum {
  Custom,
  Szórólap,
  Plakát,
  Kiadvány,
  Meghívó,
  Oklevél,
  Arculat,
  Design,
}

export namespace JobTypeEnum {
  export function toString(mode: JobTypeEnum): string {
    return JobTypeEnum[mode];
  }

  export const toOptions: OptionValues[] = Object.values(JobTypeEnum)
    .filter((value) => typeof value === "string")
    .map((value) => ({
      value: JobTypeEnum[value as number],
      name: value as string,
    }));
}
