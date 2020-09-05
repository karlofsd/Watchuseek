import React from 'react';
import ProductCard from "../ProductCard/ProductCard.js";
import './Catalogo.css'
import {Link} from "react-router-dom"


const Catalogo = ({products}) => {
 
    return (
         <div className='general'>
        
        
             <section className='cont-productos'>
                 {console.l} 
              {products.map(p=>(
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
