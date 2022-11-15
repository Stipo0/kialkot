import { Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "../../components/button/Button";
import FormCard from "../../components/form-card/FormCard";
import TextField from "../../components/text-field/TextField";

import { RegistrationCredentialsModel } from "../../models/auth.model";

import { userService } from "../../service/user.service";

const RegistrationPage = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const initialValues: RegistrationCredentialsModel = {
    email: "",
    nickName: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  };

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    email: Yup.string().email().required(kotelezo),
    nickName: Yup.string().required(kotelezo),
    firstName: Yup.string().required(kotelezo),
    lastName: Yup.string().required(kotelezo),
    password: Yup.string().min(6).required(kotelezo),
    confirmPassword: Yup.string().oneOf([
      Yup.ref("password"),
      "A két jelszó nem egyezik meg!",
    ]),
  });

  const handleSubmit = async (values: RegistrationCredentialsModel) => {
    let requestError = "";
    try {
      requestError = await userService.storeMe(values);
      goToLogin();
    } catch (e) {
      setError(requestError);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <FormCard title="Regisztráció">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnChange
        validateOnMount
      >
        <Form>
          <TextField name="nickName" label="Felhasználó név" />
          <TextField name="lastName" label="Vezetéknév" />
          <TextField name="firstName" label="Keresztnév" />
          <TextField name="email" type="email" label="Email cím" />
          <TextField name="password" type="password" label="Jelszó" />
          <TextField
            name="confirmPassword"
            type="password"
            label="Jelszó megerősítése"
          />
          {error ? (
            <Alert className="mb-3" severity="error">
              {error}
            </Alert>
          ) : null}
          <div className="mt-3">
            <Button type="submit">Regisztráció</Button>
            <Button
              color="secondary"
              type="button"
              className="m-2"
              onClick={goToLogin}
            >
              Vissza
            </Button>
          </div>
        </Form>
      </Formik>
    </FormCard>
  );
};

export default RegistrationPage;
