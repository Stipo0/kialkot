import Alert from "@mui/material/Alert";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { JobStatusEnum } from "../../enums/job.status.enum";

import { ChangeJobStatusModel, JobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";
import { HanleCatch } from "../../util/handleCatch";
import Button from "../button/Button";
import FormCard from "../form-card/FormCard";
import TextField from "../text-field/TextField";

interface UploadImageProps {
  jobId: number;
  setJob: (job: undefined | JobModel) => void;
}

const UploadImage = ({ jobId, setJob }: UploadImageProps) => {
  const [error, setError] = useState("");

  const initialValues: ChangeJobStatusModel = {
    image: "",
    status: JobStatusEnum.InProgress,
  };

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    image: Yup.string().required(kotelezo),
    status: Yup.mixed<JobStatusEnum>().required(kotelezo),
  });

  const handleSubmit = async (values: ChangeJobStatusModel) => {
    try {
      setJob(await jobsService.changeStatus(values, jobId));
    } catch (e) {
      setError(HanleCatch(e));
    }
  };

  return (
    <FormCard title="">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
        validateOnChange
      >
        <Form>
          <TextField name="image" label="Melléklet" />
          <TextField name="status" type="hidden" label="" />
          {error && (
            <Alert className="mb-3" severity="error">
              {error}
            </Alert>
          )}
          <Button type="submit">Hozzáadás</Button>
        </Form>
      </Formik>
    </FormCard>
  );
};

export default UploadImage;
