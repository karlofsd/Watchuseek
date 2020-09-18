import React from 'react';
import ProductCard from "../ProductCard/ProductCard.js";
import './Catalogo.css'


const Catalogo = ({products}) => {
    products = products.filter(e => e.stock > 0); 
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
                  stock={p.stock}
                  category={p.category}
                 />
             ))}  
             </section>
       </div>
    );
}
export default Catalogo;
