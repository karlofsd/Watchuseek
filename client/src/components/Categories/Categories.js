import React, {useState} from "react";
import axios from 'axios';
import './Categories.css'

const Categories = () => {
    const [input, setInput] = useState({
        category: "",
        description: "",
    });

    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = async  (e) => {
        // e.preventDefault();
        // console.log(input);
        const urlApi = 'http://localhost:3001/category/create';
        const dataPost = {
          name: input.category,
          description: input.description
        };

        const {data} = await axios.post(urlApi , dataPost);

        if (!data) {
          console.log('Se rompio')
        };
      }

    return (
      <div>
    <form onSubmit = {(e) => handleSubmit(e)} className='Form' >
        <div >
        <div>
            <label>Categoria:</label><br/>
            <input type = "text" autoComplete = "off" name = "category" onChange={(e) =>handleInputChange(e)} value = {input["category"]} />
        </div>
        <div>
            <label>Descripción:</label><br/>
            <input type = "text" autoComplete = "off" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
        </div>
        <button type = "submit" className='button' >Boton</button>
        </div>

    </form>
    </div>
    );
};

export default Categories;