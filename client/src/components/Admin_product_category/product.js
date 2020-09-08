import React,{useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import './product.css';

const Product = ({categories}) => {
    
    const [input,setInput] = useState(
        {
            name: "",
            description: "",
            price: null,
            stock: null,
            image: "",
            category: null
        }
    )
    const [product,setProduct] = useState()

    useEffect(()=>{
        const fetchData = async () => {
            let cate = await fetch("http://localhost:3001/products");
            let data = await cate.json();
            setProduct(data);
        }
        fetchData()
    },[]);

    const handleSearch = async(e) => {
        const {data} = await axios.get(`http://localhost:3001/products/${e.id}`);
        setInput(data);
        console.log(data)
      }


    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }
      
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    
    const handleUpdate = async (e) => {
       const urlApi = `http://localhost:3001/products/${input.id}`;
       const dataPost = {
         name: input.name.toLowerCase(),
         description: input.description.toLowerCase(),
         price: input.price,
         stock: input.stock,
         image: input.image,
       };
        console.log(dataPost);
       await axios.put(urlApi , dataPost);
       await axios.post(`http://localhost:3001/products/${input.id}/category/${input.category}`)
       
     };

     const handlePost = async (e) => {
        const urlApi = `http://localhost:3001/products/`;
        const dataPost = {
          name: input.name.toLowerCase(),
          description: input.description.toLowerCase(),
          price: input.price,
          stock: input.stock,
          image: input.image,
        };
         console.log(dataPost);
        await axios.post(urlApi , dataPost);
        await axios.post(`http://localhost:3001/products/${input.id}/category/${input.category}`)
        
      };


     const handleDelete = async  (e) => {
        e.preventDefault();
        await axios.delete (`http://localhost:3001/products/${input.id}`);
        alert('Se ha eliminado correctamente')
      }
      
    return(
        <div>
            <h1 className='h11'>Products</h1>
        <div className = "divLinks">
        {product && product.map(function(p){
          return <Link onClick={(e) => handleSearch(p)} value={p.id} >{p.name}</Link> 
        })}<br/>
      </div>
        <div className="crud_product">
            <form className='form_update' onSubmit = {(e) =>handleSubmit(e)} >
                <div >
                    <div>
                        <label>Titulo:</label>
                        <br/>
                        <input type = "text" name = "name" onChange={(e) =>handleInputChange(e)} value = {input["name"]}  />
                    </div>
                    <div className='descripcion'>
                        <label>Descripción:</label><br/>
                        <input type = "text" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]}  />
                    </div>
                    <div className='Precio' >
                        <label>Precio:</label><br/>
                        <input type = "number" name = "price" onChange={(e) =>handleInputChange(e)} value = { input["price"]} />
                    </div>
                    <div className='stock' >
                        <label>Stock:</label><br/>
                        <input type = "number" name = "stock" onChange={(e) =>handleInputChange(e)} value = {input["stock"]} />
                    </div>
                    <div className='img' >
                        <label>Url-Imagen:</label><br/>
                        <input type = "text" name = "image" onChange={(e) =>handleInputChange(e)} value = {input["image"]} />
                    </div>
                    <div>
                        <select name='category' id='cate' onChange={(e)=>handleInputChange(e)}>
                            {categories && categories.map(p => <option value={p.id}>{p.name}</option>)}
                        </select>
                    </div>
                    <button  className='button' onClick={() => handlePost()} >Add</button><br/>
                    <button  className='button' onClick={()=>handleUpdate()} >Update</button><br/>
                    <button  className='button' onClick={(e)=>handleDelete(e)} >Delete</button><br/>
                </div>
            </form>
        </div>
        </div>
    )
}

export default Product