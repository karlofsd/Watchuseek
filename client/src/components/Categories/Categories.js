import React, {useState} from "react";

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

      const handleSubmit = function (e){
        e.preventDefault();
        console.log(input);
        alert("Agregado exitosamente");
      }


    return (
    <form onSubmit = {(e) => handleSubmit(e)} >
        <div >
        <div>
            <label>Categoria:</label><br/>
            <input type = "text" autoComplete = "off" name = "category" onChange={(e) =>handleInputChange(e)} value = {input["category"]} />
        </div>
        <div>
            <label>Descripción:</label><br/>
            <input type = "text" autoComplete = "off" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
        </div>
        <button type = "submit" >Boton</button>
        </div>
    </form>
    );
};

export default Categories;