import React, {useState} from "react";
import Select from 'react-select';
// import 'node_modules/react-select/dist/react-select.css';
import "./crud.css";
import Producto from '../../App'

const Crud = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        price: "",
        stock: "" ,
        image: "",
        category: []
    });

    const handleInputChange = function(e) {
        console.log(e.target.name);
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = function (e){
        e.preventDefault();
        alert("Agregado exitosamente");
      }

      const handleSelectChange = (e)=> {
        setInput({
          category: [ ...input.category, e]
        });
      }

      const productos = [ { categoria:'Mujer', id:1,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:'Hombre',id:2,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:'Oro',id:3,name:'Rolex',precio:2000, src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:'Acero',id:4,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'},
      { categoria:'Acero-Oro',id:5,name:'Rolex',precio:2000 , src:'https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550, https://content.rolex.com/dam/new-watches-2020/homepage/roller/all-watches/watches_0006_m126333-0010-datejust-41.jpg?imwidth=550 2x'}];
    return (
    <form onSubmit = {(e) => handleSubmit(e)} >
        <div className ="content1">
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
            <input type = "number" name = "price" onChange={(e) =>handleInputChange(e)} value = {input["price"]} />
        </div>
        <div className='stock' >
            <label>Stock:</label><br/>
            <input type = "number" name = "stock" onChange={(e) =>handleInputChange(e)} value = {input["stock"]} />
        </div>
        <div className='img' >
            <label>Url-Imagen:</label><br/>
            <input type = "text" name = "image" onChange={(e) =>handleInputChange(e)} value = {input["image"]} />
        </div>
        <div className='' style={{width: '200px'}} >
        <label>Categorias</label>
        <Select
          name="category"
          placeholder="Seleccionar"
          value={input.category}
          options={productos.map(p => p.categoria)}
          onChange={(e) => handleSelectChange(e)}
          multi
        />
        </div>
        <button type = "submit" className='button' >Enviar</button>
       
        </div>
    </form>
    );
};

export default Crud;