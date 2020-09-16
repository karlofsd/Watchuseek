import React, { useState, useEffect, Fragment} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './product.css';
import { connect} from "react-redux";
import {getProducts, getProduct} from '../../Redux/products/products.js';
import category from './category';

const Product = ({allProducts, allCategories, setProducts, currentProduct}) => {
    const [input, setInput] = useState({
        id: null,
        name: "",
        description: "",
        price: null,
        stock: null,
        image: "",
        category: []
    });

        useEffect(() => {
            setProducts();
        },[])

    const handleSearch = async(product) => {
         setInput(product)
    };


    const setCategory = (e) => {
        console.log(e.target.value)
        if(!input.category){
            setInput({
                ...input,
                category: [e.target.value]
        })} else{
        setInput({
            ...input,
            category: [...input.category,e.target.value]
        })}
    }
//-------------------------------------------------
    const handleInputChange = function (e) {
        
            setInput({
          
                ...input,
                [e.target.name]: e.target.value
            });
     
    };
//-----------------------------------------------------------

    const handleSubmit = (e) => {
        e.preventDefault();
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
        await axios.put(urlApi, dataPost);
        if(!input.category){
                setProducts();
         return setInput(currentProduct);
        }

        input.category.map(async(e)=>{

         const dataValue = {
             categoryId: e,
             productId: input.id
         } 

            await axios.post(`http://localhost:3001/products/categoria`, dataValue);

        })

   
        setProducts();
        setInput(currentProduct);
    };

    const handlePost = async () => {
        if(!input.name||!input.description||!input.price||!input.stock||!input.image || !input.category){
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
        input.category.map(async (e)=>{

            const dataPost = {
              categoryId: e,
              productId: data[0].id
            }

            await axios.post(`http://localhost:3001/products/categoria`, dataPost);
        })
        setProducts();
        setInput(currentProduct);
    };


    const handleDelete = async () => {
        if(!input.id){
            return alert("Debe seleccionar un producto");
        }
        await axios.delete(`http://localhost:3001/products/${input.id}`);
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
                            {/* <select name='category' id='cate' value={input.category} onChange={(e) => handleInputChange(e)}>
                                <option value="" selected disabled>Seleccione la categoria</option>
                                {allCategories && allCategories.map(p => <option value={p.id}>{p.name}</option>)}
                            </select> */}
                          {allCategories && allCategories.map((e)=>(
                              <Fragment>
                              <label for={e.name} >{e.name}</label>
                              <input type='checkbox' value={e.id} name='category' id={e.name} onClick={(e) => setCategory(e)} u/>
                              </Fragment>
                          ))}


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