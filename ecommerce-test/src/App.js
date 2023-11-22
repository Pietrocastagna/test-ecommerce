import React, { useState, createContext, useEffect } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Page/Home/Home";
import Detail from "./Page/Details/Detail";
import "./App.css";
import Header from "./Components/Header/Header";
import SideBar from "./Components/SideBar/SideBar";
import ModalCart from "./Components/ModalCart/ModalCart";
import ModalDynamic from "./Components/Modal/ModalDynamic";
import ModalLogin from "./Components/Modal/ModalLogin";
import Users from "./Page/Users/Users";

export const AdminContext = createContext();
export const MenuContext = createContext();
export const CartModalContext = createContext();
export const UserInfoContext = createContext();

function App() {
  const takeStorage = localStorage.getItem("userInfo");
  const userInfo = JSON.parse(takeStorage);

  const [isAdmin] = useState(userInfo?.role === "admin" ? true : false);
  const [isLogin, setIsLogin] = useState(userInfo ? true : false);
  const [openMenu, setOpenMenu] = useState(true);
  const [openCart, setOpenCartMenu] = useState(true);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalLogin, setOpenModalALogin] = useState(false);

  const [childControl, setChildControl] = useState("");
  const [numberProductCart, setNumberProductCart] = useState(0);

  useEffect(() => {
    if (userInfo === null) {
      setOpenModalALogin(true);
    }
  }, [openModalLogin]);

  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <AdminContext.Provider value={{ value: isAdmin }}>
        <UserInfoContext.Provider value={{ value: userInfo }}>
          <MenuContext.Provider
            value={{ value: openMenu, function: setOpenMenu }}
          >
            <CartModalContext.Provider
              value={{ value: openCart, function: setOpenCartMenu }}
            >
              <QueryClientProvider client={queryClient}>
                <div hidden={!isLogin}>
                  <Header
                    userInfo={userInfo}
                    openModalLogin={openModalLogin}
                    openModalLoginFunc={setOpenModalALogin}
                    isLoginValue={isLogin}
                    isLoginFunc={setIsLogin}
                  />
                </div>
                <ModalLogin
                  openModalLogin={openModalLogin}
                  openModalLoginFunc={setOpenModalALogin}
                  isLoginValue={isLogin}
                  isLoginFunc={setIsLogin}
                />
                <ModalDynamic
                  openModalAddProduct={openModalAdd}
                  openModalAddProductFunc={setOpenModalAdd}
                  userInfo={userInfo}
                />
                <div hidden={!isLogin}>
                  <SideBar
                    openModalAddProduct={openModalAdd}
                    openModalAddProductFunc={setOpenModalAdd}
                    numberProductCart={numberProductCart}
                  />
                </div>
                <ModalCart
                  child={childControl}
                  setChild={setChildControl}
                  setNumberProductCart={setNumberProductCart}
                />
                <Outlet />
              </QueryClientProvider>
            </CartModalContext.Provider>
          </MenuContext.Provider>
        </UserInfoContext.Provider>
      </AdminContext.Provider>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home child={childControl} setChild={setChildControl} />,
        },
        {
          path: "*",
          element: <Home child={childControl} setChild={setChildControl} />,
        },
        {
          path: "product/:id",
          element: <Detail child={childControl} setChild={setChildControl} />,
        },
        {
          path: "users-list",
          element: <Users />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
