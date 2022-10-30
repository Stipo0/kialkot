import { Form, Formik } from "formik";
import * as Yup from "yup";
import Button from "../../components/button/Button";
import TextField from "../../components/text-field/TextField";
import { CredentialsModel } from "../../models/auth.model";
import { authService } from "../../service/auth.service";

interface LoginPageProps {
  setToken: (token: string | null) => void;
}

const LoginPage = ({ setToken }: LoginPageProps) => {
  const initialValues: CredentialsModel = { name: "", password: "" };

  const schema = Yup.object().shape({
    name: Yup.string().required(),
    password: Yup.string().required(),
  });

  const handleSubmit = async (values: CredentialsModel) => {
    try {
      const { token } = await authService.login(values);
      setToken(token);
    } catch (e) {
      setToken(null);
    }
  };

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
                    name="name"
                    label="Felhasználó név"
                    className="mb-3"
                  />
                  <TextField
                    name="password"
                    label="Jelszó"
                    type="password"
                    className="mb-3"
                  />
                  <Button type="submit">Bejelentkezés</Button>
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
