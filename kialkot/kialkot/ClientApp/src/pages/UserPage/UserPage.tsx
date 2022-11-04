import { Form, Formik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Button from "../../components/button/Button";

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
    nickName: Yup.string().required(),
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
  });

  const handleSubmit = async (values: UserFormValues) => {
    await userService.updateMe(values);
    goToProfil();
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToProfil = () => {
    navigate("/profil");
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-7 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h5 className="card-title text-center">
                {user ? user.firstName + " " + user.lastName : "User"}
              </h5>
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
                  <TextField name="firstName" label="Vezetéknév" />
                  <TextField name="lastName" label="Keresztnév" />
                  <TextField name="email" type="email" label="Email cím" />
                  <div className="mt-3">
                    <Button
                      color="secondary"
                      type="button"
                      className="m-2"
                      onClick={goToProfil}
                    >
                      Vissza
                    </Button>
                    <Button type="submit">Update</Button>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;
