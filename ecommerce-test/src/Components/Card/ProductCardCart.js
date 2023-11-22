import React, { useEffect, useState } from "react";
import "./productCardCart.css";
import { FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProductCardCart = ({ id, dataMap, idCart, functionControl, token }) => {
  const navigate = useNavigate();
  const dataImport = dataMap;

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
        setProduct(result.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductCart = async (data) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const result = await axios.delete(
        `http://localhost:8000/api/cart/productcart/delete/${idCart}/${dataImport?._id}`,
        config
      );
      if (result.status === 200) {
        setProduct(result.data);
        functionControl("rimosso");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="content-product-card-cart"
      onClick={() => navigate(`/product/${product?._id}`)}
    >
      <div className="box-flex-product-card-cart">
        <div className="button-container-product-card-cart">
          <FaTrashAlt
            onClick={() => deleteProductCart(product._id)}
            className="icon-product-card"
          />
        </div>
        <div className="box-image-product-card-cart">
          <img
            className="img-product-product-card-cart"
            src={`http://localhost:8000/${img}`}
          />
        </div>
        <div>
          <div className="box-description-product-card-cart">
            <p className="title-product-card-cart">
              {product?.nome} - {product?.prezzo}${" "}
            </p>
            <p className="testo-product-card-cart">{product?.descrizione}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardCart;
