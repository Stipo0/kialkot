import moment from "moment";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Page from "../../components/page/Page";

import { UserModel } from "../../models/user.model";

import { userService } from "../../service/user.service";

import { HanleCatch } from "../../util/handleCatch";

const AdminUserPage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<UserModel>();
  const navigation = useNavigate();

  useEffect(() => {
    const fetchUser = async (id: string) => {
      try {
        const data = await userService.getUser(id);
        if (data) setUser(data);
        else navigation("/admin");
      } catch (e) {
        alert(HanleCatch(e));
      }
    };

    id ? fetchUser(id) : navigation("/admin");
  }, [id, navigation]);

  return (
    <Page title={`${user?.nickName} felhasználó információ`}>
      <div>
        <section>
          <b>Név: </b>
          {`${user?.lastName} ${user?.firstName}`}
        </section>
        <section>
          <b>Email cím: </b>
          {user?.email}
          <a className="ms-3" href="#email">
            Módosít
          </a>
        </section>
        <section>
          <b>Foglalkozás: </b>
          {user?.role}
        </section>
        <section>
          <b>Regisztráció ideje: </b>
          {moment(user?.createdAt).format("YYYY-MM-DD. HH:mm")}
        </section>
        <section>
          <b>Utolsó módosítás ideje: </b>
          {moment(user?.updatedAt).format("YYYY-MM-DD. HH:mm")}
        </section>
      </div>
    </Page>
  );
};

export default AdminUserPage;
