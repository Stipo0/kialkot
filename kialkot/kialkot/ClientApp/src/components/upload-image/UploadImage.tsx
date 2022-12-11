import Alert from "@mui/material/Alert";
import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { JobStatusEnum } from "../../enums/job.status.enum";

import { ChangeJobStatusModel, JobModel } from "../../models/job.model";
import { jobsService } from "../../service/job.service";
import { HanleCatch } from "../../util/handleCatch";
import BaseField from "../base-field/BaseField";
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
    image: null,
    status: JobStatusEnum.InProgress,
  };

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    status: Yup.mixed<JobStatusEnum>().required(kotelezo),
    image: Yup.mixed()
      .required(kotelezo)
      .test("FILE_SIZE", "Túl nagy képet próbálsz feltölteni", (value) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 1024 * 1024) {
              return false;
            }
          }
        }
        return true;
      })
      .test("FILE_TYPE", "Nem kép!", (value) => {
        if (value && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (
              value[i].type !== "image/png" &&
              value[i].type !== "image/jpg" &&
              value[i].type !== "image/jpeg"
            ) {
              return false;
            }
          }
        }
        return true;
      }),
  });

  const handleSubmit = async (values: ChangeJobStatusModel) => {
    try {
      setJob(await jobsService.changeStatus(values, jobId));
    } catch (e) {
      setError(HanleCatch(e));
    }
  };

  return (
    <FormCard title="Kép hozzáadása" className="mb-3">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
        validateOnChange
      >
        {(formProps) => (
          <Form>
            <BaseField name="image">
              <input
                name="image"
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  formProps.setFieldValue("image", e.target.files);
                }}
                className="form-control mb-2 mt-2"
              />
            </BaseField>
            <TextField name="status" type="hidden" label="" />
            {error && (
              <Alert className="mb-3" severity="error">
                {error}
              </Alert>
            )}
            <Button type="submit">Feltöltés</Button>
          </Form>
        )}
      </Formik>
    </FormCard>
  );
};

export default UploadImage;
