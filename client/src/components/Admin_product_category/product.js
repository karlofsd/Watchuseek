import {React, useState, useEffect} from 'react'


const Product = ({products}) => {
    
    const [input,setInput] = useState(
        {
            title: "",
            description: "",
            price: null,
            stock: null,
            image: "",
            category: null
        }
    )

    const [product,setProduct] = useState()
    
    const [categories,setCategories] = useState()

    useEffect(()=>{
        const fetchData = async () => {
            let cate = await fetch("http://localhost:3001/category");
            let data = await cate.json();
            setCategories(data);
        }
        fetchData()
    },[]);


    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }
      
    const handleSubmit = (e) => {
        e.preventDefault()
    }
    

    return(
        <div className="crud_contentUpdate">
            <form className='form_update' onSubmit = {(e) =>handleSubmit(e)} >
                <div >
                    {/* <div>
                        <label>Ingrese el id del producto a modificar:</label>
                        <br/>
                        <input type = "text" name = "id"  onChange={(e) =>handleUpdateChange(e)} value = {update.searchId} />
                        <button onClick= {(e) => handleSearch(e)} className='botonUpdate' >Buscar producto</button>
                    </div> */}
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
                    <button type = "submit" className='button' >Add</button>
                    <button type = "submit" className='button' >Update</button>
                    <button type = "submit" className='button' >Delete</button>
                </div>
            </form>
        </div>
    )
}

export default Product;