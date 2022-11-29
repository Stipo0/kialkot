import { Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "../../components/button/Button";
import FormCard from "../../components/form-card/FormCard";
import TextField from "../../components/text-field/TextField";

import { LoginCredentialsModel } from "../../models/auth.model";

import { authService } from "../../service/auth.service";
import { HanleCatch } from "../../util/handleCatch";

import "./LoginPage.scss";

interface LoginPageProps {
  setToken: (token: string | null) => void;
}

const LoginPage = ({ setToken }: LoginPageProps) => {
  const initialValues: LoginCredentialsModel = { email: "", password: "" };
  const query = new URLSearchParams(useLocation().search);
  const token = query.get("token");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchToken = async (token: string | null) => {
      try {
        const getToken = await authService.verificateEmailToken(token);
        alert(`A regisztráció ${getToken.isValid ? "sikeres" : "sikertelen"}!`);
      } catch (e) {
        alert(HanleCatch(e));
      }
    };
    if (token) {
      fetchToken(token);
    }
  }, [token]);

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
      setError(HanleCatch(e));
      setToken(null);
    }
  };

  const goToRegistration = () => {
    navigate("/registration");
  };

  return (
    <div className="LoginPage">
      <h5 className="pt-4 text-center">
        <abbr title="Grafikust keres, vagy grafikus létére munkát, itt a helye. Ha még nem tag regisztráljon!">
          Mi ez?
        </abbr>
      </h5>
      <FormCard title="Bejelentkezés">
        <Formik
          initialValues={initialValues}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          <Form>
            <TextField name="email" label="Email cím" type="email" />
            <TextField name="password" label="Jelszó" type="password" />
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
        <Link to="/lostPassword">Elfelejtett Jelszó</Link>
      </FormCard>
    </div>
  );
};

export default LoginPage;
