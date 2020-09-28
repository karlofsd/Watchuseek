import React from 'react';
import ProductCard from "../ProductCard/ProductCard.js";
import './Catalogo.css'
import {useState,useEffect} from "react";
import {Pagination} from '@material-ui/lab'
import Axios from 'axios';


const Catalogo = ({category,search,products}) => {

    const [productscatalogo, setProductscatalogo] = useState();
    const [page,setPage] = useState(1)
    const [count,setCount] = useState()
    
    useEffect(() => {
        
        const fetchData = async()=>{

            const {data} = await Axios.get(`http://localhost:3001/products/page/${category? page+'?categoryId='+category : search ? page+'?name='+search : page}`)
            let counter = Math.ceil(data.count/6)
            setCount(counter)
            console.log(data)
            console.log('counter',counter)
            setProductscatalogo(data.rows)
        }
        fetchData()
        
        /* setProductscatalogo(props.products); */
    },[products,page])
    /* console.log(productscatalogo) */
    /* productscatalogo ? productscatalogo = productscatalogo.filter(e => e.stock > 0) : null */

    const handlePageChange = (event,value) => {
        setPage(value)
    }

    return (
            <div className='general'>
                <section className='cont-productos'>
                    {productscatalogo && productscatalogo.map(p=>(
                    <ProductCard
                    key={p.id}
                    id={p.id}
                    name={p.name}
                    price={p.price}
                    image={p.image}
                    stock={p.stock}
                    category={p.category}
                    />
                ))}
                </section>
                <div style = {{display: "flex", justifyContent: "center"}}>
                <Pagination
                className="my-3"
                count={count}
                page={page}
                siblingCount={1}
                boundaryCount={1}
                variant="outlined"
                shape="rounded"
                onChange={handlePageChange}
                />
                </div>
            </div>
    );
}
export default Catalogo;
