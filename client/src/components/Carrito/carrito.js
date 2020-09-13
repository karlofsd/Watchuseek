import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Carrito = ({user})=>{
    const [product, setProduct] = useState([]);

    useEffect(()=>{
        const fetchData = async ()=>{
        const {data} = await axios.get(`http://localhost:3001/user/${user.id}/carrito`)
        setProduct(data)
         }
        
        fetchData()
         },[])
    
    const handleBuy = async()=>{
        
          product.map( async (e) => {
              console.log(e)
              await axios.put(`http://localhost:3001/user/${user.id}/cantidad/${e.id}`, e)
              await axios.put(`http://localhost:3001/user/${user.id}/creada/${e.id}`)
          })
    }

    const handleInputChange = function (e,index) {
        let data = product;
        data[index].quantity = Number(e.target.value)
       setProduct(data);
       console.log(product);
    };
    console.log("esto es despues de la funcion")
    console.log(product);
    
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
            {product[0] && product.map((e,index)=>{
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