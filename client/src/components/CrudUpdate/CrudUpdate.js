import React, {useState,useEffect} from "react";
import axios from "axios";
import Catalogo from "../Catalogo/Catalogo";
import ProductCard from "../ProductCard/ProductCard"
import "./CrudUpdate.css"

const CrudUpdate = () => {
    const [update, setUpdate] = useState({
        searchId: null,
        product: {}
    });
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState();

    useEffect(() => {
        const fetchdata = async () => {
        let cate = await fetch("http://localhost:3001/category");
        let data = await cate.json();
        setCategories(data);
        }
        fetchdata()
    },[]);

    const handleUpdateChange = (e) => {
        setUpdate({
            ...update,
            searchId: e.target.value,
        })
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const {data} = await axios.get(`http://localhost:3001/products/${update.searchId}`);
        if(!data){
            return alert("No se encontró el producto")
        };
        setProduct(data)
    };

    const handleInputChange = function(e) {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
       const urlApi = `http://localhost:3001/products/${update.searchId}`;
       const dataPost = {
         name: product.name.toLowerCase(),
         description: product.description.toLowerCase(),
         price: product.price,
         stock: product.stock,
         image: product.image,
       };
        console.log(dataPost);
       await axios.put(urlApi , dataPost);
       await axios.post(`http://localhost:3001/products/${update.searchId}/category/${product.category}`)
       
     };

    return (
        <div className="crud_contentUpdate">
        <form className='form_update' onSubmit = {(e) =>handleSubmit(e)} >
            <div >
            <div>
                <label>Ingrese el id del producto a modificar:</label>
                <br/>
                <input type = "text" name = "id"  onChange={(e) =>handleUpdateChange(e)} value = {update.searchId} />
                <button onClick= {(e) => handleSearch(e)} className='botonUpdate' >Buscar producto</button>
            </div>
            <div>
                <label>Titulo:</label>
                <br/>
                <input type = "text" name = "name" onChange={(e) =>handleInputChange(e)} value = {product["name"]}  />
            </div>
            <div className='descripcion'>
                <label>Descripción:</label><br/>
                <input type = "text" name = "description" onChange={(e) =>handleInputChange(e)} value = {product["description"]}  />
            </div>
            <div className='Precio' >
                <label>Precio:</label><br/>
                <input type = "number" name = "price" onChange={(e) =>handleInputChange(e)} value = { product["price"]} />
            </div>
            <div className='stock' >
                <label>Stock:</label><br/>
                <input type = "number" name = "stock" onChange={(e) =>handleInputChange(e)} value = {product["stock"]} />
            </div>
            <div className='img' >
            <label>Url-Imagen:</label><br/>
                <input type = "text" name = "image" onChange={(e) =>handleInputChange(e)} value = {product["image"]} />
            </div>
            <div>
            <select name='category' id='cate' onChange={(e)=>handleInputChange(e)}>
                {categories && categories.map(p => <option value={p.id}>{p.name}</option>)}
            </select>
        </div>
            <button type = "submit" className='button'>Enviar</button>
            </div>
        </form>
        {product.id && 
            <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                category={product.category}
            />}
        </div>
        )
};

export default CrudUpdate;