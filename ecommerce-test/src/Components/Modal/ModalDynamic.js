import React from 'react'
import Modal from 'react-modal';
import AddProduct from '../../Page/AddProduct/AddProduct';

const ModalDynamic = ({openModalAddProduct, openModalAddProductFunc, userInfo}) => {

    function afterOpenModal() {
      }
    
      function closeModal() {
        openModalAddProductFunc(false);
      }
  return (
    <div>
      <Modal
        isOpen={openModalAddProduct}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(38, 38, 38, 0.798)'
          },
          content: {
            color: 'lightsteelblue',
            backgroundColor: 'rgba(90, 90, 90, 0.562)',
            top: '20%',
            width: '40%',
            height: 'max-content',
            left: '30%',
            border: 'none',
            borderRadius: '10px'
          
          }
        }}
      >
        <AddProduct close={openModalAddProductFunc} userInfo={userInfo}/>
      </Modal>
    </div>
  )
}

export default ModalDynamic
