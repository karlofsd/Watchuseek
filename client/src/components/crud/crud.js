import React, {useState} from "react";
import "./crud.css";

const Crud = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        price: "",
        stock: "" ,
        image: "",
        category: "",
    });

    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = function (e){
        e.preventDefault();
        alert("Agregado exitosamente");
      }


    return (
    <form onSubmit = {(e) => handleSubmit(e)} >
        <div className ="content">
        <div >
            <label>Titulo:</label>
            <br/>
            <input type = "text" name = "title" onChange={(e) =>handleInputChange(e)} value = {input["title"]} />
        </div>
        <div>
            <label>Descripción:</label><br/>
            <input type = "text" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
        </div>
        <div>
            <label>Precio:</label><br/>
            <input type = "number" name = "price" onChange={(e) =>handleInputChange(e)} value = {input["price"]}/>
        </div>
        <div>
            <label>Stock:</label><br/>
            <input type = "number" name = "stock" onChange={(e) =>handleInputChange(e)} value = {input["stock"]} />
        </div>
        <div>
            <label>Imagen:</label><br/>
            <input type = "text" name = "image" onChange={(e) =>handleInputChange(e)} value = {input["image"]} />
        </div>
        <div>
            <label>Categoria:</label><br/>
            <input type = "text" name = "category" onChange={(e) =>handleInputChange(e)} value = {input["category"]} />
        </div>
        <button type = "submit" >Boton</button>
        </div>
    </form>
    );
};

export default Crud;