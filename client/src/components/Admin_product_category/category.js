import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import "./category.css";
import { useDispatch } from "react-redux";
import {getCategories} from '../../Redux/categories/categories.js';

const Category =({categories})=>{
  const dispatch = useDispatch();
  const [input, setInput] = useState({});

  const handleSearch = async(e) => {
    const {data} = await axios.get(`http://localhost:3001/category/${e.id}`);
    setInput(data);
  }


    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      }


      const handleUpdate = async() => {

        const urlApi = `http://localhost:3001/category/${input.id}`;
        const dataPost = {
          name: input.name,
          description: input.description
        };
        /*const {data} =*/ await axios.put(urlApi , dataPost);
        dispatch(getCategories());
        // if (!data) {
        //   console.log('Se rompio')
        // };

      }

     const handleCreate= async()=>{
        const urlApi = 'http://localhost:3001/category/create';
        const dataPost = {
          name: input.name,
          description: input.description
        };

        const {data} = await axios.post(urlApi , dataPost);
        alert('Agregado correctamente')
        dispatch(getCategories());
        // if (!data) {
        //   console.log('Se rompio')
        // };
     }

     const handleDelete = async  (e) => {
        await axios.delete (`http://localhost:3001/category/${input.id}`);
        alert('Se ha eliminado correctamente')
        dispatch(getCategories());
      }
      

     return(
        <div className = "contentCategory">

        <div className = "divcategories">
          <h1>Categorias</h1>
          {categories && categories.map(function(c){
            return <Link onClick={(e) => handleSearch(c)} value={c.id} >{c.name}</Link> 
          })}<br/>
        </div>


        <form onSubmit = {(e) => handleSubmit(e)} className='Form' >
            <div >

            <div>
                <label>Categoria:</label><br/>
                <input type = "text" autoComplete = "off" name = "name" onChange={(e) =>handleInputChange(e)} value = {input["name"]} />
            </div>
            <div>
                <label>Descripción:</label><br/>
                <input type = "text" autoComplete = "off" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
            </div>
            <div className = "divcategoriesbuttons">
            <button type = "submit" className='buttonAddCat' onClick={()=>handleCreate()} >Add</button>
            <button type = "submit" className='buttonEditCat' onClick={()=> handleUpdate()} >Edit</button>
            <button type = "submit" className='buttonDeleteCat' onClick={(e)=> handleDelete(e)} >Delete</button>
            </div>
            </div>
    
        </form>
        </div>
    )
}

export default Category