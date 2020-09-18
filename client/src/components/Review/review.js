import React, {Fragment, useState, useEffect} from 'react'
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import Review_product from "../Reviews_producto/Review_product"


const Review = ({user, product})=>{

    const [value, setValue] = useState({
        comentarios:"",
        stars: parseInt(null),  
    })
   
    
  useEffect(()=>{
      const fetch =async ()=>{
          console.log(product)
      const {data} = await axios.get(`http://localhost:3001/products/${product}/review`)
     setValue(data)
     console.log(data)
    }
      fetch()

  },[])

 
    const enviar = async()=>{

        const dataValue = { 
            comentarios: value.comentarios,
            stars: value.stars,
        } 
        console.log(user)
     await axios.post(`http://localhost:3001/products/${product}/review/${user.id}`, dataValue)
    }


    //   const Valor = ()=> {
      
    //     let promedio = 0

    //     if(value[0] && value){
    //    value.map((e)=>{
    //     promedio += e.stars

    //   })
    //     const prom = (promedio / value.length)
    //     return prom}
    // }
 

  const Onchange = (e)=>{
      setValue({
         ...value, 
        [e.target.name]:  e.target.value
      })
   
  }
 
  console.log(value)

    return(
        <Fragment>
          <div>
             <h2>
               {/* {Valor()}   */}
            </h2> 
         </div>  
         <h4>{user.email}</h4>   
        <Rating name="stars" value={value["stars"]} size="large" onChange={(e)=> Onchange(e)} />
        <label>Comentarios</label>
        <input placeholder='Comente algo...' type="text" name='comentarios' value={value["comentarios"]} onChange={(e)=> Onchange(e)}/>
        <button onClick={()=>enviar()} >Enviar</button>
        <Review_product data={value} user={user} />
        </Fragment>
       
    )
}
export default Review
