import React, { useContext } from "react";
import "./header.css";
import Button from "../Button/Button";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";
import { MenuContext, CartModalContext } from "../../App";
import { useNavigate } from "react-router-dom";

const Header = ({
  isLoginValue,
  isLoginFunc,
  openModalLoginFunc,
  userInfo,
}) => {
  const openMenu = useContext(MenuContext);
  const openCart = useContext(CartModalContext);
  const navigate = useNavigate();

  const open = openMenu.value;
  const setta = openMenu.function;
  const close = openCart.function;

  const funzione = () => {
    openModalLoginFunc(true);
  };

  const logout = () => {
    navigate("/");
    localStorage.removeItem("userInfo");
    isLoginFunc(false);
    window.location.reload(true);
  };

  return (
    <div className="content-header">
      <div className="box-flex">
        <div className="email-text">Benvenuto - {userInfo?.email}</div>
        <div>
          <p className="logo-text" onClick={()=> navigate('/')}>shop</p>
        </div>

        {isLoginValue === false ? (
          <div className="container-btn-access">
            <Button
              testo={"Accedi"}
              type={"principal"}
              disable={false}
              operation={() => funzione()}
            />
          </div>
        ) : (
          <div className="container-btn-access">
            <Button
              testo={"Logout"}
              type={"principal"}
              disable={false}
              operation={() => logout()}
            />
          </div>
        )}
      </div>

      <div className="box-menu">
        {open === true ? (
          <TbSquareRoundedArrowRightFilled
            onClick={() => setta(!open)}
            className="icon-arrow"
          />
        ) : (
          <TbSquareRoundedArrowRightFilled
            onClick={() => {
              setta(!open);
              close(true);
            }}
            className="icon-arrow-left"
          />
        )}
      </div>
    </div>
  );
};

export default Header;
