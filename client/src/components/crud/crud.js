import React, {useState} from "react";
import "./crud.css";
import Producto from '../../App'

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

      const productos = [ { categoria:1, id:1,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:1,id:2,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:2,id:3,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:2,id:4,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:6,id:5,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:3,id:6,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:4,id:7,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:4,id:8,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:5,id:9,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'}];
    return (
    <form onSubmit = {(e) => handleSubmit(e)} >
        <div className ="content1">
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
            <input type = "checkbox" name = "category" />
            <input type = "checkbox" name = "category" />
            <input type = "checkbox" name = "category" />
            <input type = "checkbox" name = "category" />
            <input type = "checkbox" name = "category" />
            <input type = "checkbox" name = "category" />

        </div>
        <button type = "submit" >Boton</button>
       
        </div>
    </form>
    );
};

export default Crud;