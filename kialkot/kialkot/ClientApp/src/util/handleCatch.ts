import { AxiosError } from "axios";

export function HanleCatch(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.log(error.response);
      return `${error.response.status} - ${error.response.data.error}`;
    } else if (error.request) {
      console.log(error.request);
      return "Network problem!";
    }
  }
  console.log("Error", error);
  return "Valami komoly hiba!";
}
