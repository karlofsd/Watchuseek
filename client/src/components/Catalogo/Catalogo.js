import React from 'react';
import ProductCard from "../ProductCard/ProductCard.js";
import './Catalogo.css'
import {Link} from "react-router-dom"


const Catalogo = ({productos}) => {
    const categoria = [{name: "Mujer",id:1}, 
    {name:"Hombre",id:2}, {name: "Acero",id:3}, 
    {name: "Acero y Oro",id:4}, 
    {name: "Oro",id:5}, {name: "Relojes engastados",id:6}];
    return (
         <div className='general'>
        
             {/* <aside className='links'>
                 <Link className='link' to='/catalogo'> Todo</Link>
                 {categoria.map(function(e){
                     return <Link className='link' to={`/catalogo/${e.id}`}>{e.name}</Link>
                 })}           
             </aside>
      */}
             <section className='cont-productos'> 
              {productos.map(p=>(
                 <ProductCard
                  key={p.id}
                  id={p.id}
                  name={p.name}
                  precio={p.precio}
                  src={p.src}
                  categoria={p.categoria}
                 />
             ))}  
             </section>
       </div>
    );
}
export default Catalogo;
