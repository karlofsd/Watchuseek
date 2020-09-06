import React, {useState,useEffect} from "react";
import axios from "axios";
import Catalogo from "../Catalogo/Catalogo";

const CrudUpdate = () => {
    const [update, setUpdate] = useState({
        searchId: null,
        product: {}
    });
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: null,
        stock: null,
        image: "",
        category: null,
    });
    const [categories, setCategories] = useState();

    useEffect(async ()=>{
        let cate = await fetch("http://localhost:3001/category");
        let data = await cate.json();
        setCategories(data);
       },[]);
    // const {data} = axios.get(`http://localhost:3001/category`)
    //     .then(e => {
    //     return e.data
    //     })
    
    // setCategories(data)
    // //data();
    // console.log(data)

    const handleUpdateChange = (e) => {
        setUpdate({
            ...update,
            searchId: e.target.value,
        })
        console.log(update.searchId);
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        const {data} = await axios.get(`http://localhost:3001/products/${update.searchId}`);
        setUpdate({
            ...update,
            product: data,
        });
    };

    const handleInputChange = function(e) {
        console.log(e.target.name);
        setProduct({
          ...product,
          [e.target.name]: e.target.value
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
       const urlApi = `http://localhost:3001/products/${update.searchId}`;
       const dataPost = {
         name: product.title.toLowerCase(),
         description: product.description.toLowerCase(),
         price: product.price,
         stock: product.stock,
         image: product.image,
         category:product.category
       };
        
       const {data} = await axios.put(urlApi , dataPost);
       await axios.post(`http://localhost:3001/products/${update.searchId}/category/${product.category}`)
       
     };

    return (
        <form onSubmit = {(e) =>handleSubmit(e)} >
            <div >
            <div>
                <label>Ingrese el id del producto a modificar:</label>
                <br/>
                <input type = "text" name = "id"  onChange={(e) =>handleUpdateChange(e)} value = {update.searchId} />
                <button onClick= {(e) => handleSearch(e)}>Buscar producto</button>
            </div>
            <div>
                <label>Titulo:</label>
                <br/>
                <input type = "text" name = "title" placeholder = {update.product.name && update.product.name }  onChange={(e) =>handleInputChange(e)} value = {product["title"]}  />
            </div>
            <div className='descripcion'>
                <label>Descripción:</label><br/>
                <input type = "text" name = "description" placeholder = {update.product.description && update.product.description} onChange={(e) =>handleInputChange(e)} value = {product["description"]}  />
            </div>
            <div className='Precio' >
                <label>Precio:</label><br/>
                <input type = "number" name = "price" placeholder = {update.product.price && update.product.price} onChange={(e) =>handleInputChange(e)} value = { product["price"]} />
            </div>
            <div className='stock' >
                <label>Stock:</label><br/>
                <input type = "number" name = "stock" placeholder = {update.product.stock && update.product.stock} onChange={(e) =>handleInputChange(e)} value = {product["stock"]} />
            </div>
            <div className='img' >
                <label>Url-Imagen:</label><br/>
                <input type = "text" name = "image" placeholder = {update.product.image && update.product.image} onChange={(e) =>handleInputChange(e)} value = {product["image"]} />
            </div>
            { <div>
        {categories && categories.map((p) =>{
        return(
            <>
            <label>{p.name}
            <input style={{marginLeft: '3px' , marginRight: '10px'}} type='checkbox' value={p.id} name = "category" onChange={(e)=>handleInputChange(e)}/>
            </label>
            </>
          )
        })}
        </div> }
            <button type = "submit" className='button'>Enviar</button>
            </div>
        </form>
        );
};

export default CrudUpdate;