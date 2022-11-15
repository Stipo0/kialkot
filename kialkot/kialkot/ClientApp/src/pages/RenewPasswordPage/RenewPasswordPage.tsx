import { Alert } from "@mui/material";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";

import Button from "../../components/button/Button";
import FormCard from "../../components/form-card/FormCard";
import TextField from "../../components/text-field/TextField";

import { RenewPaswordCredentialsModel } from "../../models/auth.model";

import { authService } from "../../service/auth.service";

export interface QueryTokenModel {
	tokenIsValid?: boolean;
}

const RenewPasswordPage = () => {
	const query = new URLSearchParams(useLocation().search);
	const token = query.get("token");
  const [error, setError] = useState("");
  const navigate = useNavigate();

	useEffect(() => {
		const fetchToken =async (token: string | null) => {
			try {
				const getToken = await authService.verificateToken(token);
				if (! getToken.isValid) {
					throw new Error("A token hibás vagy lejárt!");
				}
			} catch (e) {
				alert(String(e));
			}
		}
		fetchToken(token);
	}, [token])

  const initialValues: RenewPaswordCredentialsModel = {
    newPassword: "",
    confirmPassword: "",
  };

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    newPassword: Yup.string().min(6).required(kotelezo),
    confirmPassword: Yup.string().oneOf([
      Yup.ref("newPassword"),
      "A két jelszó nem egyezik meg!",
    ]),
  });

  const handleSubmit = async (values: RenewPaswordCredentialsModel) => {
    try {
      await authService.resetPassword(values, token);
      goToLogin();
    } catch (e) {
      setError(String(e));
      console.log(e);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <FormCard title="Új jelszó beállítása">
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        <Form>
          <TextField name="newPassword" type="password" label="Jelszó" />
          <TextField
            name="confirmPassword"
            type="password"
            label="Jelszó megerősítése"
          />
          {error ? (
            <Alert className="mb-3 mt-3 m" severity="error">
              {error}
            </Alert>
          ) : null}
          <div className="mt-3">
            <Button type="submit">Mehet</Button>
          </div>
        </Form>
      </Formik>
    </FormCard>
  );
};

export default RenewPasswordPage;
