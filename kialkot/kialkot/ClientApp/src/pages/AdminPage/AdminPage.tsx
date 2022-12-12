import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Page from "../../components/page/Page";

import { AdminMinUSerModel } from "../../models/user.model";

import { userService } from "../../service/user.service";

import { HanleCatch } from "../../util/handleCatch";

export interface RoleTypeProps {
  role: "User" | "Designer" | "UserAndDesigner";
}

const AdminPage = () => {
  const [users, setUsers] = useState<AdminMinUSerModel[]>([]);
  const navigate = useNavigate();

  const fetchUsers = async (role: RoleTypeProps) => {
    try {
      setUsers(await userService.getUsers(role));
    } catch (e) {
      alert(HanleCatch(e));
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setUsers(await userService.getUsers({ role: "User" }));
      } catch (e) {
        alert(HanleCatch(e));
      }
    };
    fetchUsers();
  }, []);

  return (
    <Page title="A regisztrált felhasználók:">
      <div className="row ms-auto me-auto mb-3">
        <label htmlFor="Role" className="col-auto">
          <input
            type="radio"
            name="Role"
            className="me-1"
            onClick={() => fetchUsers({ role: "User" })}
          />
          Munkadó
        </label>
        <label htmlFor="Role" className="col-auto">
          <input
            type="radio"
            name="Role"
            className="me-1"
            onClick={() => fetchUsers({ role: "Designer" })}
          />
          Grafikus
        </label>
        <label htmlFor="Role" className="col-auto">
          <input
            type="radio"
            name="Role"
            className="me-1"
            onClick={() => fetchUsers({ role: "UserAndDesigner" })}
          />
          Munkadó és Grafikus
        </label>
      </div>
      <table>
        <thead>
          <tr>
            <th>Azonosító</th>
            <th>Felhasználó név</th>
            <th>Email</th>
            <th>Módosítás</th>
            <th>Törlés</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.nickName}</td>
              <td>{user.email}</td>
              <td>
                <FontAwesomeIcon
                  icon={faEdit}
                  onClick={() => navigate(`/admin/user/${user.id}`)}
                />
              </td>
              <td>
                <FontAwesomeIcon icon={faTrash} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Page>
  );
};

export default AdminPage;
