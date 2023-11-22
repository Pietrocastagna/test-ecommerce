import React, { useContext } from "react";
import "./usersList.css";
import Button from "../Button/Button";
import axios from "axios";
import { UserInfoContext } from "../../App";

const UsersList = ({ list, change }) => {
  const userInfo = useContext(UserInfoContext);

  const token = userInfo?.value?.token;

  const deleteUser = async (id) => {
    try {
      if (window.confirm("Do you really want delete user?")) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const result = await axios.delete(
          `http://localhost:8000/api/users/delete/${id}`,
          config
        );
        change("modificated");
        if (result.status === 200) {
          const resultFind = await axios.get(`http://localhost:8000/api/cart/get/${userInfo?.value?._id}`, config)
          if (resultFind.status === 200) {
            const result = await axios.delete(`http://localhost:8000/api/cart/delete/${resultFind?.data._id}`, config)

          }
          //  setProdottiList(result.data)
        }
      } else {
        return;
      }

      // }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="content-table">
      {list?.length > 0 ? (
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {list?.map((d) => (
            <tr key={d.id}>
              <td>{d.username}</td>
              <td>{d.email}</td>
              <td>{d.role}</td>
              <td className="action-column">
                <Button
                  type={"principal"}
                  testo={"delete"}
                  disable={false}
                  operation={() => deleteUser(d._id)}
                />
              </td>
            </tr>
          ))}
        </table>
      ) : (
        <div className="testo-not-found">Nessun utente registrato</div>
      )}
    </div>
  );
};

export default UsersList;
