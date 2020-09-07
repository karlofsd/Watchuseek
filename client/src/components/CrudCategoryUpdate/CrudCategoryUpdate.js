import React, {useState} from 'react'
import axios from "axios";

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
        <form onSubmit = {(e) => handleSubmit(e)} className='Form' >
            <div >
                <div>
                    <label>Id de Categoria</label>
                <input type = "text" autoComplete = "off" name = "searchId" onChange={(e) =>handleInputChange(e)} value = {input["searchId"]} />
                <button onClick= {(e) => handleSearch(e)}>Buscar producto</button>
                </div>
            <div>
                <label>Nombre de Categoria:</label><br/>
                <input type = "text" autoComplete = "off" placeholder = {category && category.name} name = "category" onChange={(e) =>handleInputChange(e)} value = {input["category"]} />
            </div>
            <div>
                <label>Descripción:</label><br/>
                <input type = "text" autoComplete = "off"  placeholder = {category && category.description } name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
            </div>
            <button type = "submit" className='button' >Modificar</button>
            </div>
    
        </form>
        </div>
     )
};

export default CrudCategoryUpdate;