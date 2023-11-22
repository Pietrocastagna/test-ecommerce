import React, {useState, useContext, useEffect} from 'react';
import './modalCart.css'
import { CartModalContext, UserInfoContext } from "../../App";
import Button from '../Button/Button';
import { useNavigate } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { IoMdCloseCircle } from "react-icons/io";
import ProductCardCart from '../Card/ProductCardCart';
import axios from 'axios'

const ModalCart = ({child, setChild, setNumberProductCart}) => {

    const openCart = useContext(CartModalContext);
    const userInfo = useContext(UserInfoContext);

    const navigate = useNavigate();
    const open = openCart.value;
    const close = openCart.function;
    const token = userInfo?.value?.token

    const [visibility ] = useState(open)

    const [cardCart, setCardCart ] = useState([])
    const [cart, setCart ] = useState()

    const [prezzi, setPrezzi ] = useState([])
    const [somma, setSomma] = useState()
    const [controlPadre, setControlPadre ] = useState('')



    const notExistPage = () => {
        alert(`Questa funzione non l'ho creata per mancanza di tempo`)
    }

    const closeCart = () => {
        close(true)
    }

   useEffect(() => {
     takeCart()
    }, [])

    useEffect(() => {
        takeCart()
        setChild('')
       }, [child === 'aggiunto'])

    useEffect(() => {
         takeCart()
        setControlPadre('')
       }, [controlPadre === 'rimosso'])

  const takeCart = async () =>{

    
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      
          try {
            const result = await axios.get(`http://localhost:8000/api/cart/get/${userInfo?.value?._id}`, config)
            if(result.status === 200){
            setCardCart(result.data.prodotti)
            setCart(result.data._id)
            setNumberProductCart(result.data.prodotti.length)
            setPrezzi(result.data.prodotti.map((d)=>{
                return(
                    d.prezzo
                )
            }))
            }
          } catch (error) {
            console.log(error)
          }
      }


      const deleteIntCart = async () =>{

  
        if (window.confirm("Do you really want delete user?")) {
            const config = {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            };
            const result = await axios.delete(`http://localhost:8000/api/cart/delete/${cart}`, config)
            //   change('modificated')
          if(result.status === 200){
          //  setProdottiList(result.data)
          const resultCart = await axios.post(`http://localhost:8000/api/cart/${userInfo?.value?._id}`, {}, config)

          if(result.status === 200){

            
            window.location.reload(true)
          }
        }
          }else{
            return
          }
      
         
      }



    const bottoniCard = [
        {
            id: 1,
            icon: <FaEye className='icon'/>,
            navigate: '/',
            operation: notExistPage,
            testo: 'Show',
            type: 'gestione-modalCart',
            disable: false

        },
       
        {
            id: 2,
            icon: <FaMoneyBill className='icon'/>,
            navigate: '/',
            operation: notExistPage,
            testo: 'PayCart',
            type: 'gestione-modalCart',
            disable: false
        },
        {
            id: 3,
            icon: <FaTrashAlt className='icon'/>,
            navigate: '/',
            operation: deleteIntCart,
            testo: 'Trash',
            type: 'gestione-modalCart',
            disable: cardCart.length === 0 ? true : false
        },
        {
            id: 4,
            icon: <IoMdCloseCircle className='icon'/>,
            navigate: '/',
            operation: closeCart,
            testo: 'Close',
            type: 'gestione-modalCart-special',
            disable: false
        },
      
    ]

  useEffect(() => {
      let somma = 0
    prezzi.forEach(numero => {
        somma  = somma + numero
    })
    setSomma(somma)
  }, [cart])


  
  return (
    <div hidden={visibility}>
        
        
       <div className='gestione-ModalCart' >
       {bottoniCard && (
            <>
            {bottoniCard.map((d)=>(
                <div key={d.id}>
                    
                    <Button 
                    operation={d.operation} 
                    type={d.type} 
                    icon={d.icon} 
                    testo={d.testo}
                    carrello={d.number}
                    navigation = {d.navigate}
                    disable={d.disable}
                    />

                </div>
            ))}
            </>
        )}
        {/* </div> */}
       </div>
       <div className='subtotal-modalCart'>
        <div className='subtotal-modalCart-redborder'>
        <div className='subtotal-modalCart-total'>Totale</div>
        <div>{somma}$</div>
        </div>
       </div>
    <div className='content-modalCart'>
      <div className='container-button-modalCart'>
      {cardCart?.length > 0 ? (
        <div>
            {cardCart?.map((d)=>(
                <div key={d._id}>
                  <ProductCardCart id={d.identificativo} dataMap={d} idCart={cart} prezzo={somma}  prezzoFunc={setPrezzi} functionControl={setControlPadre} token={token} />
                </div>
              ))}

        </div>
      ):(
        <div>Cart empty</div>
      )}
        <div>
        </div>
      </div>
     
    </div>
   
    </div>
  )
}

export default ModalCart
