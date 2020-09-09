import React from 'react';
import ProductCard from "../ProductCard/ProductCard.js";
import './Catalogo.css'
import {Link} from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux'
import {getProducts} from '../../Redux/products/products.js'


const Catalogo = ({products}) => {
   /*  const dispatch = useDispatch()
    const products = useSelector(store => store.products.products) */
    console.log(products)
    return (
         <div className='general'>
        
             <section className='cont-productos'>
                {products && products.map(p=>(
                 <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  price={p.price}
                  image={p.image}
                  category={p.category}
                 />
             ))}  
             </section>
       </div>
    );
}
export default Catalogo;
