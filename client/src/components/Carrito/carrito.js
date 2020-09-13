import React,{useState,useEffect} from 'react'
import axios from 'axios'
import {newOrden} from '../../Redux/carrito/carrito'
import {useSelector, useDispatch} from 'react-redux'

const Carrito = ({user})=>{
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch()
    const orden = useSelector(store => store.carrito.numeroOrden)
    const carrito = useSelector(store => store.carrito.carrito)
    
    console.log("esto es carrito");
    console.log(carrito);

    console.log("esto es product");
    console.log(product);
    
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

   const eliminar = async()=>{
       await axios.delete(`http://localhost:3001/user/${user.id}/carrito/${1}`)
   } 

    return(
        <div>
            <div>
                {console.log("antes del map")}
                {console.log(product)}
            {carrito[0] && carrito.map((e,index)=>{
         return(
         <div>
             <button onClick={()=>eliminar()}>X</button>
            <div>
               <label>{e.name}</label> 
               <label>{e.price}</label>
               <div>
                    <label>{e.quantity}</label>
                    <input className = "input" type="number" name={e.quantity} onChange={(e) => handleInputChange(e,index)}  />
                </div>
            </div>
            <div></div> 
         </div>)
     })}
            </div>
            <div>
                <button onClick={()=> handleBuy()} >COMPRAR</button>
                <button onClick={()=> eliminarTodo()} >VACIAR CARRITO</button>
            </div>
        </div>
    )
}

export default Carrito