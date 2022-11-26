import { AxiosError } from "axios";
import { ResponseModel } from "../models/response.model";

export function HanleCatch(error: unknown) {
  if (error instanceof AxiosError) {
    if (error.response) {
      console.log(error.response);
      const data: ResponseModel = error.response.data;
      console.log(data.title);
      
      let message = data.error ? data.error : (data.title ? data.title : data)
      return `${error.response.status} - ${message}`;
    } else if (error.request) {
      console.log(error.request);
      return "Network problem!";
    }
  }
  console.log("Error", error);
  return "Valami komoly hiba!";
}
