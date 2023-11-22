import React, { useState, useContext, useEffect } from "react";
import "./home.css";
import { MenuContext, CartModalContext, UserInfoContext } from "../../App";
import ProductCardHome from "../../Components/Card/ProductCardHome/ProductCardHome";
import SearchBar from "../../Components/SearchBar/SearchBar";
import axios from "axios";

const Home = ({ child, setChild }) => {
  const openMenu = useContext(MenuContext);
  const openCart = useContext(CartModalContext);
  const userInfo = useContext(UserInfoContext);

  const [searchChange, setSearchChange] = useState("");

  const open = openMenu.value;
  const openModalCart = openCart.value;
  const token = userInfo?.value?.token;

  const [searchText, setSearchText] = useState("");
  const [prodottiList, setProdottiList] = useState("");


  useEffect(() => {
    retriveProducts();
  }, []);

  const retriveProducts = async () => {
    if (userInfo.value !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const result = await axios.get(
          "http://localhost:8000/api/products/",
          config
        );
        if (result.status === 200) {
          setProdottiList(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="content-home">
      <div
        className={
          open === true ? "left-side-home-open" : "left-side-home-close"
        }
      >
        {/* <SideBar/> */}
      </div>
      <div className="center-side-home">
        <div className="content-card">
          {prodottiList.length > 0 ? (
            <div className="flex-box">
              {prodottiList
                .filter((val) => {
                  if (searchText == "") {
                    return val;
                  } else if (
                    val.nome.toLowerCase().includes(searchText.toLowerCase())
                  ) {
                    return val;
                  }
                })

                .map((d) => (
                  <div key={d._id}>
                    <ProductCardHome
                      user={userInfo?.value}
                      data={d}
                      child={child}
                      setChild={setChild}
                    />
                  </div>
                ))}
            </div>
          ) : (
            <div style={{ color: "#fff" }}>Nessun Prodotto trovato</div>
          )}
        </div>
      </div>
      <div
        className={
          openModalCart === false
            ? "right-side-home-close"
            : "right-side-home-open"
        }
      >
        {/* <ModalCart/> */}
      </div>

      <SearchBar
        textSearch={searchText}
        textSearchFunc={setSearchText}
        search={searchChange}
        setSearch={setSearchChange}
      />
    </div>
  );
};

export default Home;
