import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { Alert } from "@mui/material";

import TextField from "../../components/text-field/TextField";
import FormCard from "../../components/form-card/FormCard";
import Button from "../../components/button/Button";

import { LostPasswordCredentialsModel } from "../../models/auth.model";

import { authService } from "../../service/auth.service";
import { HanleCatch } from "../../util/handleCatch";

const LostPasswordPage = () => {
  const initialValues: LostPasswordCredentialsModel = { email: "" };
  const [error, setError] = useState("");
  const [succes, setSuccess] = useState("");

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    email: Yup.string().email().required(kotelezo),
  });

  const handleSubmit = async (values: LostPasswordCredentialsModel) => {
    try {
      await authService.lostPassword(values);
      setSuccess("Az email elküdve!");
    } catch (e) {
      setError(HanleCatch(e));
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
              {error }
            </Alert>
          ) : null}
          {succes ? (
            <Alert className="mb-3" severity="success">
              {succes}
            </Alert>
          ) : null}
          <Button type="submit">Igénylés</Button>
        </Form>
      </Formik>
    </FormCard>
  );
};

export default LostPasswordPage;
