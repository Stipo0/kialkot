import { Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "../../components/button/Button";
import FormCard from "../../components/form-card/FormCard";
import TextField from "../../components/text-field/TextField";

import { LoginCredentialsModel } from "../../models/auth.model";

import { authService } from "../../service/auth.service";

interface LoginPageProps {
  setToken: (token: string | null) => void;
}

const LoginPage = ({ setToken }: LoginPageProps) => {
  const initialValues: LoginCredentialsModel = { email: "", password: "" };
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    email: Yup.string().email().required(kotelezo),
    password: Yup.string().min(6).required(kotelezo),
  });

  const handleSubmit = async (values: LoginCredentialsModel) => {
    try {
      const { token } = await authService.login(values);
      setToken(token);
    } catch (e) {
      setError("Hibás email cím vagy rossz jelszó!");
      setToken(null);
    }
  };

  const goToRegistration = () => {
    navigate("/registration");
  };

  return (
    <FormCard title="Bejelentkezés">
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
          />
          <TextField
            name="password"
            label="Jelszó"
            type="password"
          />
          {error ? (
            <Alert className="mb-3" severity="error">
              {error}
            </Alert>
          ) : null}
          <Button type="submit">Bejelentkezés</Button>
          <Button
            color="secondary"
            type="button"
            className="m-3"
            onClick={goToRegistration}
          >
            Regisztráció
          </Button>
        </Form>
      </Formik>
      <a href="/lostPassword">Elfelejtett Jelszó</a>
    </FormCard>
  );
};

export default LoginPage;
