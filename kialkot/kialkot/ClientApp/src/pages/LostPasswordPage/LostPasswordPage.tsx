import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { Alert } from "@mui/material";

import TextField from "../../components/text-field/TextField";
import FormCard from "../../components/form-card/FormCard";
import Button from "../../components/button/Button";

import { LostPasswordCredentialsModel } from "../../models/auth.model";

import { authService } from "../../service/auth.service";

const LostPasswordPage = () => {
  const initialValues: LostPasswordCredentialsModel = { email: "" };
  const [error, setError] = useState("");

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const handleSubmit = async (values: LostPasswordCredentialsModel) => {
    try {
      await authService.lostPassword(values);
      alert("Az email elküdve!");
    } catch (e) {
      setError("Hibás email cím!");
    }
  };

  return (
    <FormCard title="Új jelszó igénylése">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField
            name="email"
            label="Email cím"
            type="email"
            className="mb-3"
          />
          {error ? (
            <Alert className="mb-3" severity="error">
              {error}
            </Alert>
          ) : null}
          <Button type="submit">Igénylés</Button>
        </Form>
      </Formik>
    </FormCard>
  );
};

export default LostPasswordPage;
