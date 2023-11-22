import React, { useState } from "react";
import "./addProduct.css";
import Button from "../../Components/Button/Button";
import { IoMdCloseCircle } from "react-icons/io";
import axios from "axios";

const AddProduct = ({ close, userInfo }) => {
  const token = userInfo?.token;

  const [title, setTitle] = useState("");
  const [descrizione, setDescrizione] = useState("");
  const [bigdescrizione, setBigDescrizione] = useState("");
  const [prezzo, setPrezzo] = useState();

  const [file, setFile] = useState(null);

  const handlerImg2 = async () => {
    if (file !== null) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = {
        image: file,
      };

      try {
        const formdata = new FormData();
        formdata.append("image", file);
        const resultImg = await axios.post(
          "http://localhost:8000/api/upload/",
          formdata
        );
        if (resultImg.status === 200 || resultImg.status === 201) {
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          const payload = {
            nome: title,
            descrizione: descrizione,
            bigdescrizione: bigdescrizione,
            prezzo: prezzo,
            immagine: resultImg.data.image._id,
          };

          try {
            const result = await axios.post(
              "http://localhost:8000/api/products/",
              payload,
              config
            );
            if (result.status === 200) {
              close(false);
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    if (file === null) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const payload = {
        nome: title,
        descrizione: descrizione,
        bigdescrizione: bigdescrizione,
        prezzo: prezzo,
      };

      try {
        const result = await axios.post(
          "http://localhost:8000/api/products/",
          payload,
          config
        );
        if (result.status === 200) {
          close(false);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="content-addProduct">
      <div className="border-red-addProduct">
        <div className="container-close-addProduct">
          <IoMdCloseCircle onClick={() => close(false)} className="icon" />
        </div>
        <div className="title-addProduct">
          <p>Add Product</p>
        </div>
        <div className="contetn-input-addProduct">
          <div className="input-left-addProduct">
            <div className="content-label">
              <label className="label-addProduct">Titolo * </label>
            </div>
            <div className="content-input">
              <input
                className="input-addProduct"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="input-right-addProduct">
            <div className="content-label">
              <label className="label-addProduct">Prezzo *</label>
            </div>
            <div className="content-input">
              <input
                className="input-addProduct"
                type="text"
                placeholder="0"
                value={prezzo}
                onChange={(e) => setPrezzo(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="contetn-input-addProduct">
          <div className="input-textarea-addProduct">
            <div className="content-label">
              <label className="label-addProduct">Descrizione Breve *</label>
            </div>
            <div className="content-input">
              <textarea
                className="textare-addProduct-small"
                maxLength={400}
                type="textbox"
                value={descrizione}
                onChange={(e) => setDescrizione(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="contetn-input-addProduct">
          <div className="input-textarea-addProduct">
            <div className="content-label">
              <label className="label-addProduct">Descrizione *</label>
            </div>
            <div className="content-input">
              <textarea
                className="textare-addProduct-big"
                maxLength={1000}
                type="textbox"
                value={bigdescrizione}
                onChange={(e) => setBigDescrizione(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="content-input-file">
          <input
            class="custom-file-input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            value={file?.image}
          />
        </div>
        <div className="content-submit-button">
          <Button
            type={"principal"}
            testo={"Add Product"}
            disable={false}
            operation={() => handlerImg2()}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
