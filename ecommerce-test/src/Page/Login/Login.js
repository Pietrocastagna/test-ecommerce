import React, { useState } from "react";
import Button from "../../Components/Button/Button";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";
import "./login.css";
import { useNavigate } from "react-router-dom";
const Login = ({ close }) => {
  const navigate = useNavigate();
  const [register, setRegister] = useState(false);

  const [usernameRegister, setUsernameRegister] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  const handlerRegister = async () => {
    let email = emailRegister;

    if (!isValidEmail(email)) {
      alert("Email non valida");
    } else {
      const payload = {
        username: usernameRegister,
        email: email,
        password: passwordRegister,
      };
      try {
        const result = await axios.post(
          "http://localhost:8000/api/users/",
          payload
        );
        if (result.status === 201) {
          const payload = {
            email: result.data.email,
            password: passwordRegister,
          };
          try {
            const resultLogin = await axios.post(
              "http://localhost:8000/api/users/login",
              payload
            );
            if (resultLogin.status === 200) {
              const config = {
                headers: {
                  Authorization: `Bearer ${resultLogin?.data?.token}`,
                },
              };

              const resultCart = await axios.post(
                `http://localhost:8000/api/cart/${resultLogin.data._id}`,
                {},
                config
              );

              navigate("/");
              localStorage.setItem(
                "userInfo",
                JSON.stringify(resultLogin.data)
              );
              window.location.reload(true);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handlerLogin = async () => {
    let email = emailLogin;

    if (!isValidEmail(email)) {
      alert("Email non valida");
    } else {
      const payload = {
        email: email,
        password: passwordLogin,
      };
      try {
        const result = await axios.post(
          "http://localhost:8000/api/users/login",
          payload
        );
        if (result.status === 200) {
          navigate("/");
          localStorage.setItem("userInfo", JSON.stringify(result.data));
          window.location.reload(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="content-loginPage">
      {register === false ? (
        <div className="border-red-loginPage">
          <div className="container-close-loginPage">
            <IoMdCloseCircle onClick={() => close(false)} className="icon" />
          </div>
          <div className="title-loginPage">
            <p>Login</p>
          </div>
          <div className="contetn-input-loginPage">
            <div>
              <div className="content-label">
                <label className="label-loginPage">Email * </label>
              </div>
              <div className="content-input">
                <input
                  className="input-loginPage"
                  type="text"
                  value={emailLogin}
                  onChange={(e) => setEmailLogin(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="content-label">
                <label className="label-loginPage">Password *</label>
              </div>
              <div className="content-input">
                <input
                  className="input-loginPage"
                  type="password"
                  value={passwordLogin}
                  onChange={(e) => setPasswordLogin(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="content-submit-button">
            <div>
              <p
                style={{ fontSize: "10px", color: "#fff" }}
                onClick={() => setRegister(!register)}
              >
                Non Hai Un Account?
              </p>
            </div>
            <div>
              <Button
                type={"principal"}
                testo={"Login"}
                disable={false}
                operation={() => handlerLogin()}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="border-red-loginPage">
          <div className="container-close-loginPage">
            <IoMdCloseCircle onClick={() => close(false)} className="icon" />
          </div>
          <div className="title-loginPage">
            <p>Register</p>
          </div>
          <div className="contetn-input-loginPage">
            <div>
              <div className="content-label">
                <label className="label-loginPage">Email * </label>
              </div>
              <div className="content-input">
                <input
                  className="input-loginPage"
                  type="text"
                  value={emailRegister}
                  onChange={(e) => setEmailRegister(e.target.value)}
                />
              </div>
            </div>
            <div>
              <div className="content-label">
                <label className="label-loginPage">Username *</label>
              </div>
              <div className="content-input">
                <input
                  className="input-loginPage"
                  type="text"
                  value={usernameRegister}
                  onChange={(e) => setUsernameRegister(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="contetn-input-loginPage">
            <div>
              <div className="content-label">
                <label className="label-loginPage">Password * </label>
              </div>
              <div className="content-input">
                <input
                  className="input-loginPage"
                  type="password"
                  value={passwordRegister}
                  onChange={(e) => setPasswordRegister(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="content-submit-button">
            <div>
              <p
                style={{ fontSize: "10px", color: "#fff" }}
                onClick={() => setRegister(!register)}
              >
                {" "}
                Hai già Un Account?
              </p>
            </div>
            <div>
              <Button
                type={"principal"}
                testo={"Register"}
                disable={false}
                operation={() => handlerRegister()}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
