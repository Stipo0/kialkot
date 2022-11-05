import { Form, Formik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

import { LostPasswordCredentialsModel } from "../../models/auth.model";
import TextField from "../../components/text-field/TextField";
import { Alert } from "@mui/material";
import Button from "../../components/button/Button";
import { authService } from "../../service/auth.service";

const LostPasswordPage = () => {
	const initialValues: LostPasswordCredentialsModel = { email: ""};
  const [error, setError] = useState('');

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
  });

  const handleSubmit = async (values: LostPasswordCredentialsModel) => {
    try {
      await authService.lostPassword(values);
    } catch (e) {
      setError("Hibás email cím és felhasználónév páros!");
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h5 className="card-title text-center">Új jelszó igénylése</h5>
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
                  {error ? <Alert className="mb-3" severity="error">{error}</Alert> : null}
                  <Button type="submit">Igénylés</Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LostPasswordPage;