import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../components/button/Button";

import Page from "../../components/page/Page";
import TextField from "../../components/text-field/TextField";
import { UserFormValues, UserModel } from "../../models/user.model";
import { userService } from "../../service/user.service";

const UserPage = () => {
  const [user, setUser] = useState<UserModel>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      setUser(await userService.getMe());
    };
    fetchUser();
  }, []);

  const initialValues: UserFormValues = {
    email: user?.email || "",
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    nickName: user?.nickName || "",
  };

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    nickName: Yup.string().required(),
  });

  const handleSubmit = async (values: UserFormValues) => {
    await userService.updateMe(values);
    goToProfil();
  };

  const goToProfil = () => {
    navigate("/profil");
  };

  return (
    <Page title={user ? user.firstName + " " + user.lastName : "User"}>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={handleSubmit}
        enableReinitialize
        validateOnMount
        validateOnChange
      >
        <Form>
          <TextField name="nickName" label="Felhasználó név" />
          <TextField name="lastName" label="Vezetéknév" />
          <TextField name="firstName" label="Keresztnév" />
          <TextField name="email" type="email" label="Email cím" />
          <div className="mt-3">
            <Button
              color="secondary"
              type="button"
              className="me-2"
              onClick={goToProfil}
            >
              Vissza
            </Button>
            <Button type="submit">Update</Button>
          </div>
        </Form>
      </Formik>
    </Page>
  );
};

export default UserPage;
