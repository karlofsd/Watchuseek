import React, {useState, useEffect} from 'react'
import './Delete.css'
import Axios from 'axios'

const Delete = ()=> {

    const[state, setState] = useState();
    
    const [categories, setCategories] = useState([]); 

    const handleInputChange = function(e) {
        console.log(e.target.name);
        setState(e.target.value)
      }

    useEffect(async ()=>{
        let cate = await fetch("http://localhost:3001/category");
        let data = await cate.json();
        setCategories(data);
    },[]);

    const handleSubmit = async  (e) => {
        e.preventDefault();
        setState(e.target.value);
        console.log(state);
        await Axios.delete (`http://localhost:3001/category/${state}`);
        alert('Se ha eliminado correctamente')
      }

    return(
        <div>
            <label>Elija la Categoria a eliminar </label>
            <form onSubmit = {(e) => handleSubmit(e)}>
        <div>
            {categories.map((p) =>{
        return(
            <>
            <label>{p.name}
            <input style={{marginLeft: '3px' , marginRight: '10px'}} type='checkbox' value={p.id} name = "category" onChange={(e)=>handleInputChange(e)}/>
            </label>
            </>
          )
        })}
        </div>
                <button className='bottom3' type = "submit" >Eliminar</button>
            </form>

        </div>
    )
}

export default Delete;