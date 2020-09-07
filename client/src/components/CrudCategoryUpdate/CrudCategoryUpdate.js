import React, {useState} from 'react';
import axios from "axios";
import './CrudCategory.css'

const CrudCategoryUpdate =()=>{
    const [input, setInput] = useState({
        searchId: null,
        category: "",
        description: "",
    });

    const [category,setCategory] = useState();
    
    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = async  (e) => {
        e.preventDefault();
        const urlApi = `http://localhost:3001/category/${input.searchId}`;
        const dataPost = {
          name: input.category,
          description: input.description
        };
        console.log(dataPost);
        const {data} = await axios.put(urlApi , dataPost);

        if (!data) {
          console.log('Se rompio')
        };
      }

      const handleSearch = async (e) => {
        const {data} = await axios.get(`http://localhost:3001/category/${input.searchId}`);
        setCategory(data);
    };


    return(
        <div>
        <form onSubmit = {(e) => handleSubmit(e)} className='general4'>
            <div >
                <div>
                    <label className='labelCategory1'>Id de Categoria</label><br/>
                <input type = "text" autoComplete = "off" name = "searchId" onChange={(e) =>handleInputChange(e)} value = {input["searchId"]} className='inputCategory' /><br/>
                <button onClick= {(e) => handleSearch(e)} className='botonBuscarUpdate' >Buscar producto</button>
                </div>
            <div>
                <label className='labelCategory2'>Nombre de Categoria:</label><br/>
                <input className='inputCategory' type = "text" autoComplete = "off" placeholder = {category && category.name} name = "category" onChange={(e) =>handleInputChange(e)} value = {input["category"]} />
            </div>
            <div>
                <label className='labelCategory3'>Descripción:</label><br/>
                <input className='inputCategory' type = "text" autoComplete = "off"  placeholder = {category && category.description } name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
            </div>
            <button type = "submit" className='botonBuscarUpdate' >Modificar</button>
            </div>
    
        </form>
        </div>
     )
};

export default CrudCategoryUpdate;