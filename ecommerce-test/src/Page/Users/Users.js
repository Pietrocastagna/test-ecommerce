import React, { useState, useContext, useEffect } from "react";
import "./users.css";
import axios from "axios";
import { MenuContext, CartModalContext, UserInfoContext } from "../../App";
import UsersList from "../../Components/UsersList/UsersList";

const Users = () => {
  const openMenu = useContext(MenuContext);
  const openCart = useContext(CartModalContext);
  const userInfo = useContext(UserInfoContext);

  const open = openMenu.value;
  const openModalCart = openCart.value;
  const token = userInfo.value.token;

  const [users, setUsers] = useState([]);
  const [change, setChange] = useState("");

  useEffect(() => {
    retriveUsers();
  }, []);

  useEffect(() => {
    retriveUsers();
    setChange("");
  }, [change === "modificated"]);

  const retriveUsers = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await axios.get(
        `http://localhost:8000/api/users/`,
        config
      );
      if (result.status === 200) {
        setUsers(result.data);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="content-Users">
      <div
        className={
          open === true ? "left-side-Users-open" : "left-side-Users-close"
        }
      ></div>
      <div className="center-side-Users">
        <UsersList list={users} change={setChange} />
      </div>
      <div
        className={
          openModalCart === false
            ? "right-side-Users-close"
            : "right-side-Users-open"
        }
      ></div>
    </div>
  );
};

export default Users;
