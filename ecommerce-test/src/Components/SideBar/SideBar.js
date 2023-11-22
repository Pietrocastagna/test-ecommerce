import React, { useState, useContext } from "react";
import "./sideBar.css";
import { MenuContext, CartModalContext, AdminContext } from "../../App";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { RiAccountCircleFill } from "react-icons/ri";
import { BsShop } from "react-icons/bs";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettingsSharp } from "react-icons/io5";
import { MdAddBox } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

const SideBar = ({
  openModalAddProduct,
  openModalAddProductFunc,
  numberProductCart,
}) => {
  const isAdmin = useContext(AdminContext);
  const openMenu = useContext(MenuContext);
  const openCartContext = useContext(CartModalContext);

  const navigate = useNavigate();
  const open = openMenu.value;
  const openCartModal = openCartContext.value;
  const openCartModalFunc = openCartContext.function;

  const isAdminValue = isAdmin.value;

  const notExistPage = () => {
    alert(`Questa pagina non l'ho creata per mancanza di tempo`);
  };

  const openCart = () => {
    openCartModalFunc(false);
  };

  const openModalAdd = () => {
    openModalAddProductFunc(!openModalAddProduct);
  };

  const bottoni = [
    {
      id: 0,
      icon: <BsShop className="icon" />,
      navigate: "/",
      operation: navigate,
      testo: "Shop",
      type: "sideBar",
      disable: false,
      visible: true,
    },
    {
      id: 1,
      icon: <RiAccountCircleFill className="icon" />,
      navigate: "/",
      operation: notExistPage,
      testo: "Account",
      type: "sideBar",
      disable: false,
      visible: true,
    },
    {
      id: 2,
      icon: <FaShoppingCart className="icon" />,
      navigate: true,
      operation: openCart,
      testo: "Carrello",
      type: "sideBar",
      number: numberProductCart,
      disable: false,
      visible: true,
    },
    {
      id: 2,
      icon: <MdAddBox className="icon" />,
      navigate: true,
      operation: openModalAdd,
      testo: "Product",
      type: "sideBar",
      disable: false,
      visible: isAdminValue === true ? true : false,
    },
    {
      id: 2,
      icon: <FaUsers className="icon" />,
      navigate: "/users-list",
      operation: navigate,
      testo: "Users",
      type: "sideBar",
      disable: false,
      visible: isAdminValue === true ? true : false,
    },
    {
      id: 3,
      icon: <IoSettingsSharp className="icon" />,
      navigate: "/",
      operation: notExistPage,
      testo: "Settings",
      type: "sideBar-special",
      disable: false,
      visible: true,
    },
  ];
  return (
    <div className="content-sidebar" hidden={open}>
      <div className="container-button-sidebar">
        {bottoni && (
          <>
            {bottoni.map((d) => (
              <div hidden={d.visible === true ? false : true} key={d.id}>
                <Button
                  operation={d.operation}
                  type={d.type}
                  icon={d.icon}
                  testo={d.testo}
                  carrello={d.number}
                  navigation={d.navigate}
                  disable={d.disable}
                />
              </div>
            ))}
          </>
        )}
        <div></div>
      </div>
    </div>
  );
};

export default SideBar;
