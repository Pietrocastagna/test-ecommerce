import React from "react";
import Modal from "react-modal";
import Login from "../../Page/Login/Login";

const ModalLogin = ({ openModalLogin, openModalLoginFunc }) => {
  function afterOpenModal() {}

  function closeModal() {
    openModalLoginFunc(false);
  }
  return (
    <div>
      <Modal
        isOpen={openModalLogin}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(38, 38, 38, 0.798)",
          },
          content: {
            color: "lightsteelblue",
            backgroundColor: "rgba(90, 90, 90, 0.562)",
            top: "20%",
            width: "40%",
            height: "max-content",
            left: "30%",
            border: "none",
            borderRadius: "10px",
          },
        }}
      >
        <Login close={openModalLoginFunc} />
      </Modal>
    </div>
  );
};

export default ModalLogin;
