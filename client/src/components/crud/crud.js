import React, {useState, useEffect} from "react";
import Select from 'react-select';
import axios from 'axios';
// import 'node_modules/react-select/dist/react-select.css';
import "./crud.css";
import Producto from '../../App'

const Crud = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        price: null,
        stock: null,
        image: "",
        category: null
    });

    const [categories, setCategories] = useState([]); 


    useEffect(()=>{
        const fetchData = async () => {
            let cate = await fetch("http://localhost:3001/category");
            let data = await cate.json();
            setCategories(data);
        }
        fetchData()
    },[]);


    const handleInputChange = function(e) {
        console.log(e.target.name);
        console.log(e.target.value);
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = async (e) => {
         e.preventDefault();
         if(!input.title||!input.description||!input.price||input.stock||!input.image){
             return alert("Debe completar todos los campos para agregar un producto");
         };
        const urlApi = 'http://localhost:3001/products/';
        const dataPost = {
          name: input.title.toLowerCase(),
          description: input.description.toLowerCase(),
          price: input.price,
          stock: input.stock,
          image: input.image,
          //category:input.category
        };

        const {data} = await axios.post(urlApi , dataPost);
        await axios.post(`http://localhost:3001/products/${data[0].id}/category/${input.category}`)
        
      }

      return (
    <form onSubmit = {(e) => handleSubmit(e)} >
        <div className ="content7">
        <div>
            <label>Titulo:</label>
            <br/>
            <input type = "text" name = "title" onChange={(e) =>handleInputChange(e)} value = {input["title"]}  />
        </div>
        <div className='descripcion'>
            <label>Descripción:</label><br/>
            <input type = "text" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]}  />
        </div>
        <div className='Precio' >
            <label>Precio:</label><br/>
            <input type = "number" name = "price" onChange={(e) =>handleInputChange(e)} value = { input["price"]} />
        </div>
        <div className='stock' >
            <label>Stock:</label><br/>
            <input type = "number" name = "stock" onChange={(e) =>handleInputChange(e)} value = {input["stock"]} />
        </div>
        <div className='img' >
            <label>Url-Imagen:</label><br/>
            <input type = "text" name = "image" onChange={(e) =>handleInputChange(e)} value = {input["image"]} />
        </div>

        <div>
            <select name='category' id='cate' onChange={(e)=>handleInputChange(e)}>
                {categories && categories.map(p => <option value={p.id}>{p.name}</option>)}
            </select>
        </div>

        <button type = "submit" className='button' >Crear</button>
        <button type = "submit" className='button' >Modificar</button>
        <button type = "submit" className='button' >Eliminar</button>
        
        </div>
    </form>
    );
};

export default Crud;