import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './product.css';
import { connect} from "react-redux";
import {getProducts, getProduct} from '../../Redux/products.js';

const Product = ({allProducts, allCategories, setProducts, currentProduct}) => {
    
    const [input, setInput] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        image: "",
        category: ""
    });
    console.log(input)
        useEffect(() => {
            setProducts();
        },[input])

    const handleSearch = async(product) => {
         setInput(product)
    };

    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
            id: "",
            name: "",
            description: "",
            price: "",
            stock: "",
            image: "",
            category: ""
        })
    };

    const handleUpdate = async () => {
        if(!input.name||!input.description||!input.price||!input.stock||!input.image){
            return alert("Debe completar todos los campos para agregar un producto");
        };
        const urlApi = `http://localhost:3001/products/${input.id}`;
        const dataPost = {
            name: input.name.toLowerCase(),
            description: input.description.toLowerCase(),
            price: input.price,
            stock: input.stock,
            image: input.image,
        };
        const token = localStorage.getItem('token')
        
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        await axios.put(urlApi, dataPost,config);
        if(!input.category){
                setProducts();
         return setInput(currentProduct);
        }
        await axios.post(`http://localhost:3001/products/${input.id}/category/${input.category}`,null,config);
        setProducts();
        setInput(currentProduct);
    };

    const handlePost = async () => {
        if(!input.name||!input.description||!input.price||!input.stock||!input.image){
            return alert("Debe completar todos los campos para agregar un producto");
        };
        const urlApi = `http://localhost:3001/products/`;
        const dataPost = {
            name: input.name.toLowerCase(),
            description: input.description.toLowerCase(),
            price: input.price,
            stock: input.stock,
            image: input.image,
        };
        const token = localStorage.getItem('token')
        
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        
        if(token){
            const {data} = await axios.post(urlApi, dataPost,config);
            
            await axios.post(`http://localhost:3001/products/${data.id}/category/${input.category}`,null,config);
            setProducts();
            setInput(currentProduct);
        }
    };


    const handleDelete = async () => {
        if(!input.id){
            return alert("Debe seleccionar un producto");
        }
        const token = localStorage.getItem('token')
        console.log('token: '+token);
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        await axios.delete(`http://localhost:3001/products/${input.id}`,config);
        alert('Se ha eliminado correctamente');
        setProducts();
        setInput(currentProduct);
        
    };

    return (
        <div className = "crud_content">
            <div className = "products">
                    <h1 className='h11'>Productos</h1>
                    {allProducts && allProducts.map(function (p) {
                        return <Link onClick={() => handleSearch(p)} value={p.id} >-{p.name}</Link>
                    })}<br />
            </div>
            <div className = "crud_product" >
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div >
                        <div>
                            <label>Titulo:</label>
                            <br />
                            <input className = "input" type="text" name="name" onChange={(e) => handleInputChange(e)} value={input["name"]} />
                        </div>
                        <div className='descripcion'>
                            <label>Descripción:</label><br />
                            <input className = "input" type="text" name="description" onChange={(e) => handleInputChange(e)} value={input["description"]} />
                        </div>
                        <div className='Precio' >
                            <label>Precio:</label><br />
                            <input className = "input" type="number" name="price" onChange={(e) => handleInputChange(e)} value={input["price"]} />
                        </div>
                        <div className='stock' >
                            <label>Stock:</label><br />
                            <input className = "input" type="number" name="stock" onChange={(e) => handleInputChange(e)} value={input["stock"]} />
                        </div>
                        <div className='img' >
                            <label>Url-Imagen:</label><br />
                            <input className = "input" type="text" name="image" onChange={(e) => handleInputChange(e)} value={input["image"]} />
                        </div>
                        <div>
                            <select name='category' id='cate' value={input.category} onChange={(e) => handleInputChange(e)}>
                                <option value="" selected disabled>Seleccione la categoria</option>
                                {allCategories && allCategories.map(p => <option value={p.id}>{p.name}</option>)}
                            </select>
                        </div>
                        <div className = "divbutton">
                        <button className='buttonAdd' onClick={() => handlePost()} >Add</button><br />
                        <button className='buttonUpdate' onClick={() => handleUpdate()} >Update</button><br />
                        <button className='buttonDelete' onClick={(e) => handleDelete(e)} >Delete</button><br />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

const mapDispatchToProps = dispatch => ({
    setProducts: () => dispatch(getProducts()),
    setProduct: () => dispatch(getProduct())
  });

const mapStateToProps = state => ({
    currentProduct: state.products.product,
    allProducts: state.products.products,
    allCategories: state.categories.categories
});

export default connect(mapStateToProps,mapDispatchToProps)(Product);