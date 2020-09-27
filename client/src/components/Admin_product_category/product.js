import React, { useState, useEffect} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './product.css';
import { connect } from "react-redux";
import {getProducts, getProduct} from '../../Redux/products.js';
const imageToBase64 = require ('image-to-base64');

const Product = ({allProducts, allCategories, setProducts, currentProduct}) => {
    
    const [input, setInput] = useState({
        id: "",
        name: "",
        description: "",
        price: "",
        stock: "",
        category: ""
    });
    const [image, setImage] = useState("") 

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
        if(!input.name||!input.description||!input.price||!input.stock||!image){
            return alert("Debe completar todos los campos para agregar un producto");
        };
        const urlApi = `http://localhost:3001/products/`;
        const dataPost = {
            name: input.name.toLowerCase(),
            description: input.description.toLowerCase(),
            price: input.price,
            stock: input.stock,
            image: image,
        };
        console.log(dataPost)
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

    const uploadImage = async (e) => {
        
        const file = e.target.files[0]
        const base64 = await convertBase64(file)
        console.log(base64)
        console.log(input)
        setImage(base64);
        e.preventDefault();
    };

    const convertBase64 = (file) => {
        return new Promise ((resolve, reject) =>{
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);

            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            
            fileReader.onerror = (error) => {
                reject(error);
            }
         })
    };

    return (
        <div className = "crud_content">
            <div className = "products">
                    <h1 className='h11'>Products</h1>
                    {allProducts && allProducts.map(function (p) {
                        return <Link onClick={() => handleSearch(p)} value={p.id} >-{p.name}</Link>
                    })}<br />
            </div>
            <div className = "crud_product" >
                <form onSubmit={(e) => handleSubmit(e)} >
                    <div >
                        <div>
                            <label>Title:</label>
                            <br />
                            <input className = "input" type="text" name="name" onChange={(e) => handleInputChange(e)} value={input["name"]} />
                        </div>
                        <div className='descripcion'>
                            <label>Description:</label><br />
                            <input className = "input" type="text" name="description" onChange={(e) => handleInputChange(e)} value={input["description"]} />
                        </div>
                        <div className='Precio' >
                            <label>Price</label><br />
                            <input className = "input" type="number" name="price" onChange={(e) => handleInputChange(e)} value={input["price"]} />
                        </div>
                        <div className='stock' >
                            <label>Stock:</label><br />
                            <input className = "input" type="number" name="stock" onChange={(e) => handleInputChange(e)} value={input["stock"]} />
                        </div>
                        <div className='img' >
                            <label>Add photo:</label><br />
                            <input className = "input" type="file" name="image" onChange={uploadImage}/>                      
                        </div>
                        <div>
                            <select name='category' id='cate' value={input.category} onChange={(e) => handleInputChange(e)}>
                                <option value="" selected disabled>Choose category</option>
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
           { input.id && <div className="card text-center shadow col-10 p-0 mx-auto m-3" >
                <div className="card-header p-0">
                    <h2 className='title'>{input.name = input.name.substring(0,1).toUpperCase() + input.name.substring(1)}</h2>
                    <a href="javascript:history.back(1)" className='btn1' >
                    <div >
                    <button type="button" className="btn btn-danger">X</button>
                </div></a>
                </div>
                <div className="card-body row">
                    <div className='target-prod col-6'>
                    <img className='card-img rounded-lg shadow w-50' src={input.image}/>
                    <hr />
                    <h5 className="card-title">Price: $USD {input.price}</h5>
                    <p className="card-text">Description: {input.description = input.description.substring(0,1).toUpperCase() + input.description.substring(1)}</p>
                </div>
            </div>
        </div>}
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