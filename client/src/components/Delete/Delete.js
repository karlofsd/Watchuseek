import React, {useState, useEffect} from 'react'
import './Delete.css'
import Axios from 'axios'

const Delete = ()=> {

    const[state, setState] = useState();
    
    const [categories, setCategories] = useState([]); 

    const handleInputChange = function(e) {
        setState(e.target.value)
      }

    useEffect(()=>{
        const fetchData = async () => {
            let cate = await fetch("http://localhost:3001/category");
            let data = await cate.json();
            setCategories(data);
        }
        fetchData()
    },[]);

    const handleSubmit = async  (e) => {
        e.preventDefault();
        setState(e.target.value);
        await Axios.delete (`http://localhost:3001/category/${state}`);
        alert('Se ha eliminado correctamente')
      }

    return(
        <div>
            <label>Elija la Categoria a eliminar </label>
            <form onSubmit = {(e) => handleSubmit(e)}>
        <div>
            <select name='category' id='cate' onChange={(e)=>handleInputChange(e)}>
                {categories.map(p => <option value={p.id}>{p.name}</option>)}
            </select>
        </div>
                <button className='bottom3' type = "submit" >Eliminar</button>
            </form>

        </div>
    )
}

export default Delete;