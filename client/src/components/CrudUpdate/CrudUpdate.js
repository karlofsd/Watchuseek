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
    const [product, setProduct] = useState({
        // name: "",
        // description: "",
        // price: null,
        // stock: null,
        // image: "",
        // category: null,
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
        /* setUpdate({
            ...update,
            product: data,
        }); */
        setProduct(data)
    };

    console.log(product)
    const handleInputChange = function(e) {
        let data = {};
        data[e.target.name] = e.target.value
        console.log(e.target.name);
        setUpdate({
            ...update,
            product: data,
        })
        console.log("---------")
        console.log(update)
       /*  setUpdate({
            ...update,
            product:{
                ...product,
                [e.target.name]: e.target.value
            }
        }); */
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
         category:product.category
       };
        
       const {data} = await axios.put(urlApi , dataPost);
       await axios.post(`http://localhost:3001/products/${update.searchId}/category/${product.category}`)
       
     };

    return (
        <div className="crud_content">
        <form className='form_update' onSubmit = {(e) =>handleSubmit(e)} >
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
            { <div>
        {/* {categories && categories.map((p) =>{
        return(
            <>
            <label>{p.name}
            <input style={{marginLeft: '3px' , marginRight: '10px'}} type='checkbox' value={p.id} name = "category" onChange={(e)=>handleInputChange(e)}/>
            </label>
            </>
          )
        })} */}
            <select name='category' id='cate' onChange={(e)=>handleInputChange(e)}>
                {categories && categories.map(p => <option value={p.id}>{p.name}</option>)}
            </select>
        </div> }
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