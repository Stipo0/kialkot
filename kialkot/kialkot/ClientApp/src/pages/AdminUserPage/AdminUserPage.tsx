import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Page from "../../components/page/Page";
import { UserModel } from "../../models/user.model";
import { userService } from "../../service/user.service";
import { HanleCatch } from "../../util/handleCatch";
import UserPage from "../UserPage/UserPage";

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
    <Page title="Felhasználó információk">
      <UserPage userData={user}/>
    </Page>
  );
};

export default AdminUserPage;
