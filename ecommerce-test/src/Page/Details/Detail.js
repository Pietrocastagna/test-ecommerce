import React, { useState, useContext, useEffect } from "react";
import "./detail.css";

import { MenuContext, CartModalContext, UserInfoContext } from "../../App";
import Button from "../../Components/Button/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
const Detail = ({ setChild }) => {
  const openMenu = useContext(MenuContext);
  const openCart = useContext(CartModalContext);
  const userInfo = useContext(UserInfoContext);

  let { id } = useParams();
  const open = openMenu.value;
  const openModalCart = openCart.value;
  const token = userInfo.value.token;
  const user = userInfo.value;

  const [product, setProduct] = useState();
  const [img, setImg] = useState();


  useEffect(() => {
    takeProduct();
  }, []);

  useEffect(() => {
    retriveImg();
  }, [product]);

  const retriveImg = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resultImg = await axios.get(
        `http://localhost:8000/api/upload/${product.immagine}`,
        config
      );

      setImg(resultImg.data.path);
    } catch (error) {}
  };

  const takeProduct = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await axios.get(
        `http://localhost:8000/api/products/${id}`,
        config
      );
      if (result.status === 200) {
        //  setProdottiList(result.data)
        setProduct(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addProductsCarts = async (d) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      identificativo: d?._id,
      prezzo: d?.prezzo,
    };

    try {
      const result = await axios.post(
        `http://localhost:8000/api/cart/productcart/${user?._id}`,
        payload,
        config
      );
      if (result.status === 200) {
        //  setProdottiList(result.data)

        setChild("aggiunto");
      }
    } catch (error) {
      alert(error);
    }
  };

  const compra = () => {
    alert("Funzione compra non implementata");
  };

  return (
    <div className="content-detail">
      <div
        className={
          open === true ? "left-side-detail-open" : "left-side-detail-close"
        }
      >
        {/* <SideBar/> */}
      </div>
      <div className="center-side-detail">
        <div className="content-div-product-detail">
          <div className="container-image-and-description">
            <div className="container-image-detail">
              <img
                className="img-product-details"
                src={`http://localhost:8000/${img}`}
              />
            </div>
            <div className="container-description-small-detail">
              <div className="container-title-details">{product?.nome} - {product?.prezzo}$</div>
              <div className="container-description-small-details">
                {product?.descrizione}
              </div>
              <div className="container-button-add-details-xs">
                <Button
                  testo={"Add"}
                  type={"principal"}
                  disable={false}
                  operation={() => addProductsCarts(product)}
                />
              </div>
              <div className="container-button-add-details-xs">
                <Button
                  testo={"Compra"}
                  type={"principal"}
                  disable={false}
                  operation={() => compra()}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="content-div-product-detail">
          <div className="content-bigdescrizione">
            {product?.bigdescrizione}
          </div>
        </div>
      </div>
      <div
        className={
          openModalCart === false
            ? "right-side-detail-close"
            : "right-side-detail-open"
        }
      ></div>
    </div>
  );
};

export default Detail;
