import React,{useState,useEffect} from 'react'
import axios from 'axios'

const Carrito = ()=>{

    const comprar = async()=>{
        
          const { data } = await axios.get(`http://localhost:3001/user/${2}/carrito`);
          console.log(data);
          data.map( async (e) => {
              console.log(e)
              await axios.put(`http://localhost:3001/user/${2}/carrito/${e.id}`)
          })
    }
   
   const [product, setProduct] = useState([])
    
   const eliminarTodo = async()=>{
       await axios.delete(`http://localhost:3001/user/${2}/carrito`)
   }

   const eliminar = async()=>{
       await axios.delete(`http://localhost:3001/user/${2}/carrito/${1}`)
   } 

   useEffect(()=>{
   const fetchData = async ()=>{
   const {data} = await axios.get(`http://localhost:3001/user/${2}/carrito`)
   setProduct(data)
   console.log(data)
    }
   
   fetchData()
    },[])



    return(
        <div>
            <div>
            {product[0] && product.map((e)=>{
         return(
         <div>
             <button onClick={()=>eliminar()}>X</button>
            <div>
               <label>{e.name}</label> 
               <label>{e.price}</label>
               <div>
                    <label>{e.quantity}</label>
                   <button>+</button>
                   <button>-</button>
                </div>
            </div>
            <div></div> 
         </div>)
     })}
            </div>
            <div>
                <button onClick={()=> comprar()} >COMPRAR</button>
                <button onClick={()=> eliminarTodo()} >VACIAR CARRITO</button>
            </div>
        </div>
    )
}

export default Carrito