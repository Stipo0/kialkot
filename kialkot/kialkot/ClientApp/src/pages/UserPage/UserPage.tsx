import Alert from "@mui/material/Alert";
import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";

import Button from "../../components/button/Button";
import FormCard from "../../components/form-card/FormCard";
import TextField from "../../components/text-field/TextField";

import { UpdateCredentialsModel, UserModel } from "../../models/user.model";

import { userService } from "../../service/user.service";

import { HanleCatch } from "../../util/handleCatch";

const UserPage = () => {
  const [user, setUser] = useState<UserModel>();
  const [error, setError] = useState("");
  const [success, setSucces] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setUser(await userService.getMe());
      } catch (e) {
        alert(HanleCatch(e));
      }
    };
    fetchUser();
  }, []);

  const initialValues: UpdateCredentialsModel = {
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    nickName: user?.nickName || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const kotelezo = "Ez egy kötelező mező!";
  const schema = Yup.object().shape({
    email: Yup.string().email().required(kotelezo),
    nickName: Yup.string().required(kotelezo),
    firstName: Yup.string().required(kotelezo),
    lastName: Yup.string().required(kotelezo),
    currentPassword: Yup.string().min(6).required(kotelezo),
    newPassword: Yup.string().min(6),
    confirmPassword: Yup.string().oneOf([
      Yup.ref("newPassword"),
      "A két új jelszó nem egyezik meg!",
    ]),
  });

  const handleSubmit = async (values: UpdateCredentialsModel) => {
    try {
      setUser(await userService.updateMe(values));
      setSucces("A frissitést elmentettük!");
    } catch (e) {
      setError(HanleCatch(e));
    }
  };

  return (
    <FormCard title={user ? user.firstName + " " + user.lastName : "User"}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
        validateOnChange
      >
        <Form>
          <TextField name="nickName" label="Felhasználó név" required/>
          <TextField name="lastName" label="Vezetéknév" required/>
          <TextField name="firstName" label="Keresztnév" required/>
          <TextField name="email" type="email" label="Email cím" required/>
          <TextField
            name="currentPassword"
            type="password"
            label="Jelenlegi jelszó"
            required
          />
          <TextField name="newPassword" type="password" label="Új jelszó" />
          <TextField
            name="confirmPassword"
            type="password"
            label="Új jelszó megerősítése"
          />
          {error ? (
            <Alert className="mb-3" severity="error">
              {error}
            </Alert>
          ) : null}
          {success ? (
            <Alert className="mb-3" severity="success">
              {success}
            </Alert>
          ) : null}
          <div className="mt-3">
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </Formik>
    </FormCard>
  );
};

export default UserPage;
