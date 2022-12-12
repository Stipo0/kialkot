import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Page from "../../components/page/Page";
import { AdminMinUSerModel } from "../../models/user.model";
import { userService } from "../../service/user.service";
import { HanleCatch } from "../../util/handleCatch";

const AdminPage = () => {
  const [users, setUsers] = useState<AdminMinUSerModel[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
			try {
				setUsers(await userService.getUsers());
			} catch (e) {
				alert(HanleCatch(e));
			}
    };

    fetchUsers();
  }, []);

  return (
    <Page title="A regisztrált felhasználók:">
      <table>
        <thead>
          <tr>
            <th>Azonosító</th>
            <th>Felhasználó név</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nickName}</td>
              <td>{user.email}</td>
              <td>
                <Link to={`/admin/user/${user.id}`}>Módosít</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
};

export default AdminPage;
