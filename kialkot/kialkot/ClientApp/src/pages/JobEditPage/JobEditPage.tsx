import Alert from "@mui/material/Alert";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";

import Button from "../../components/button/Button";
import FormCard from "../../components/form-card/FormCard";
import TextField from "../../components/text-field/TextField";

import { JobFormValues, JobModel } from "../../models/job.model";

import { jobsService } from "../../service/job.service";

import { HanleCatch } from "../../util/handleCatch";

const JobEditPage = () => {
	const { id } = useParams<{ id: string }>();
  const [job, setJob] = useState<JobModel>();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJob = async (id: string) => setJob(await jobsService.getJob(id));
    if (id) {
      fetchJob(id);
    }
  }, [id]);

	const initialValues: JobFormValues = {
		name: job?.name || "",
		image: job?.image || "",
		jobType: job?.jobType || "",
		deadline: job?.deadline || "",
		description: job?.description || "",
	} 

	const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
		name: Yup.string().required(kotelezo),
		image: Yup.string().required(kotelezo),
		jobType: Yup.string().required(kotelezo),
		deadline: Yup.string().required(kotelezo),
		description: Yup.string().required(kotelezo),
	});

	const handleSubmit =async (values: JobFormValues) => {
		try {
			if (job?.id) {
				setJob(await jobsService.update(values, job.id));
			} else {
				setJob(await jobsService.store(values));
			}
			navigate(`/job/${job?.id}`)

    } catch (e) {
      setError(HanleCatch(e));
    }
	}

  const  goToBackJobPage = () => {
    navigate(`/job/${job?.id}`);
  };

  return (
    <FormCard title={job ? `${job.name} módosítása` : "Munka létrehozása"} >
			<Formik 
				initialValues={initialValues}
				validationSchema={schema}
				onSubmit={handleSubmit}
				enableReinitialize
				validateOnMount
				validateOnChange
			>
				<Form>
					<TextField name="name" label="Név" />
					<TextField name="image" label="Kép url" />
					<TextField name="jobType" label="Tipus" />
					<TextField name="deadline" label="Határidő"  type="date"/>
					<TextField name="description" label="Leírás"  type="textarea"/>
					{error ? (
            <Alert className="mb-3" severity="error">
              {error}
            </Alert>
          ) : null}
					<div className="mt-3">
            <Button
              color="secondary"
              type="button"
              className="m-2"
              onClick={goToBackJobPage}
            >
              Vissza
            </Button>
            <Button type="submit">{id ? "Frissítés" : "Létrehozás"}</Button>
          </div>
				</Form>
			</Formik>
		</FormCard>
  );
};

export default JobEditPage;