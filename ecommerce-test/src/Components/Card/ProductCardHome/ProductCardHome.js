import React, { useState, useContext, useEffect } from "react";
import "./productCardHome.css";
import image from "./../../../asset/backgroundHome.jpg";
import Button from "../../Button/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProductCardHome = ({ data, user, child, setChild }) => {
  console.log(user._id)
  const navigate = useNavigate();
  const token = user?.token;

  const [img, setImg] = useState();

  useEffect(() => {
    retriveImg();
  }, []);

  const addProductsCarts = async (d) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const payload = {
      identificativo: d._id,
      prezzo: d.prezzo,
    };

    try {
      const result = await axios.post(
        `http://localhost:8000/api/cart/productcart/${user._id}`,
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

  const retriveImg = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const resultImg = await axios.get(
        `http://localhost:8000/api/upload/${data.immagine}`,
        config
      );
      setImg(resultImg.data.path);
    } catch (error) {}
  };

  return (
    <div className="card">
      <div className="box-info-product-card">
        <div>
          <img
            className="image-product-image"
            onClick={() => navigate(`/product/${data._id}`)}
            src={`http://localhost:8000/${img}`}
          />
        </div>

        <div className="title-product-card">
          {data.nome} - {data.prezzo}$
        </div>
        <div className="text-product-card">{data.descrizione}</div>
      </div>

      <div className="box-flex-btn-content">
        <div>
          <Button
            testo={"Show"}
            type={"btn-product-card"}
            disable={false}
            operation={() => navigate(`/product/${data._id}`)}
          />
        </div>
        <div>
          <Button
            testo={"Add Product"}
            type={"btn-product-cart"}
            disable={false}
            operation={() => addProductsCarts(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCardHome;
