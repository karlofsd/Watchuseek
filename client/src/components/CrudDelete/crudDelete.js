import React,{useState} from 'react'
import Axios from 'axios'
import './crudDelete.css'



const DeleteProducts = ()=> {

    const[state, setState] = useState();
    
    const handleInputChange = function(e) {
        console.log(e.target.name);
        setState(e.target.value)
      }


    const handleSubmit = async  (e) => {
        e.preventDefault();
        setState(e.target.value);
        console.log(state);
        await Axios.delete (`http://localhost:3001/products/${state}`);
        alert('Se ha eliminado correctamente')
      }

    return(
        <div className='general2'>
            
            <label className='tituloCrudDelete'>Inserte el Id del producto</label>
            <form onSubmit = {(e) => handleSubmit(e)}>
                 <input  type='text' onChange={(e)=>handleInputChange(e)} className='selectCrudDelete' /><br/>
                <button className='bottom3' type = "submit" className='botonCrudDelete' >Eliminar</button>
            </form>

        </div>
    )
}

export default DeleteProducts;