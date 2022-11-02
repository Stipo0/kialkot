import { Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "../../components/button/Button";
import TextField from "../../components/text-field/TextField";
import { LoginCredentialsModel } from "../../models/auth.model";
import { authService } from "../../service/auth.service";

interface LoginPageProps {
  setToken: (token: string | null) => void;
}

const LoginPage = ({ setToken }: LoginPageProps) => {
  const initialValues: LoginCredentialsModel = { email: "", password: "" };
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().min(6).required(),
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
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h5 className="card-title text-center">Bejelentkezés</h5>
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
                  <TextField
                    name="password"
                    label="Jelszó"
                    type="password"
                    className="mb-3"
                  />
                  {error ? <Alert className="mb-3" severity="error">{error}</Alert> : null}
                  <Button type="submit">Bejelentkezés</Button>
                  <Button
                    color="secondary"
                    type="button"
                    className="m-2"
                    onClick={goToRegistration}
                  >
                    Regisztráció
                  </Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
