import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import './product.css';
import { useDispatch } from "react-redux";
import {getProducts} from '../../Redux/products/products.js'


const Product = ({ products,categories }) => {
    const dispatch = useDispatch();
    const [input, setInput] = useState(
        {
            name: "",
            description: "",
            price: null,
            stock: null,
            image: "",
            category: null
        }
    )
    // const [product, setProduct] = useState()

    // useEffect(() => {
    //     const fetchData = async () => {
    //         let cate = await fetch("http://localhost:3001/products");
    //         let data = await cate.json();
    //         setProduct(data);
    //     }
    //     fetchData()
    // }, []);

    const handleSearch = async (e) => {
        const { data } = await axios.get(`http://localhost:3001/products/${e.id}`);
        setInput(data);
        console.log(data)
    }


    const handleInputChange = function (e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const handleUpdate = async (e) => {
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
        console.log(dataPost);
        await axios.put(urlApi, dataPost);
        await axios.post(`http://localhost:3001/products/${input.id}/category/${input.category}`)
        dispatch(getProducts());

    };

    const handlePost = async (e) => {
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
        const {data} = await axios.post(urlApi, dataPost);
        console.log(data);
        await axios.post(`http://localhost:3001/products/${data[0].id}/category/${input.category}`)
        dispatch(getProducts());
    };


    const handleDelete = async (e) => {
        if(!input.id){
            return alert("Debe seleccionar un producto");
        }
        e.preventDefault();
        await axios.delete(`http://localhost:3001/products/${input.id}`);
        alert('Se ha eliminado correctamente')
        dispatch(getProducts());
    }

    return (
        <div className = "crud_content">
            <div className = "products">
                    <h1 className='h11'>Productos</h1>
                    {products && products.map(function (p) {
                        return <Link onClick={(e) => handleSearch(p)} value={p.id} >-{p.name}</Link>
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
                            <select name='category' id='cate' onChange={(e) => handleInputChange(e)}>
                                {categories && categories.map(p => <option value={p.id}>{p.name}</option>)}
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
    )
}

export default Product