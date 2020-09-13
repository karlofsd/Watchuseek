import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {newOrden} from '../../Redux/carrito/carrito'
import {useSelector, useDispatch} from 'react-redux'
import "./carrito.css";

const Carrito = ({user})=>{
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch()
    const orden = useSelector(store => store.carrito.numeroOrden)
    const carrito = useSelector(store => store.carrito.carrito)

    useEffect(()=>{
        setProduct(carrito);
         },[carrito])
    
    const handleBuy = ()=>{
        
        dispatch(newOrden(user.id,carrito,orden))
          /* carrito.map( async (e) => {
              console.log(e)
              await axios.put(`http://localhost:3001/user/${user.id}/cantidad/${e.id}`, e)
              await axios.put(`http://localhost:3001/user/${user.id}/creada/${e.id}`)
          }) */
    }

    const handleInputChange = function (e,index) {
        let data = product;
        data[index].quantity = Number(e.target.value)
       setProduct(data);
    };
    
   const eliminarTodo = async()=>{
       await axios.delete(`http://localhost:3001/user/${user.id}/carrito`)
   }

   const eliminar = async(e)=>{
       await axios.delete(`http://localhost:3001/user/${user.id}/carrito/${e}`)
   } 

    return(
        <div className='contentcarritomayor'>
           <h1>Carrito del usuario</h1> 
        <div className = "contentCarrito">
            <div className = "divcontentItems">
            {carrito[0] && carrito.map((e,index)=>{
         return(
         <div className = "bordecarrito">
             <button className='botonx' onClick={()=>eliminar(e.id)}>X</button>
            <div>
               <label className='labelcarrito'>Producto: { e.name}</label><br/> 
               <label className='labelcarrito'>Precio: $USD{e.price}</label>
               <div>
                    <label className='labelcarrito'>Cantidad:</label><br/>
                    <input className = "inputItem" type="number" name={e.quantity} onChange={(e) => handleInputChange(e,index)}  />
                </div>
            </div> 
         </div>)
     })}
            </div>
           { carrito[0] && <div className='divboton' >
               <button className = "btnsCarrito" onClick={()=> handleBuy()} >COMPRAR</button><br/>
               <button className = "btnsCarrito" onClick={()=> eliminarTodo()} >VACIAR CARRITO</button>
            </div>}
        </div>
        </div>
    )
}

export default Carrito