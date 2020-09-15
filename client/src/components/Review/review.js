import React, {Fragment, useState} from 'react'
import Rating from '@material-ui/lab/Rating';
import axios from 'axios';



const Review = ({user, product})=>{

    const [value, setValue] = useState({
        comentarios:"",
        stars: parseInt(null),
    })
    
    const enviar = async()=>{

        const dataValue = {
            comentarios: value.comentarios,
            stars: value.stars,
        }
      console.log(product[0].id)  
     await axios.post(`http://localhost:3001/products/${product[0].id}/review/${user.id}`, dataValue)
    }



  const Onchange = (e)=>{
      setValue({
         ...value, 
        [e.target.name]:  e.target.value
      })
   
  }


    return(
        <Fragment>
         <h4>{user.email}</h4>   
        <Rating name="stars" value={value["stars"]} size="large" onChange={(e)=> Onchange(e)} />
        <label>Comentarios</label>
        <input placeholder='Comente algo...' type="text" name='comentarios' value={value["comentarios"]} onChange={(e)=> Onchange(e)}/>
        <button onClick={()=>enviar()} >Enviar</button>
        </Fragment>
       
    )
}
export default Review
