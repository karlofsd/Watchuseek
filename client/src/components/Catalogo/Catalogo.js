import React from 'react';
import ProductCard from "../ProductCard/ProductCard.js";
import './Catalogo.css'
import {Link} from "react-router-dom"


const Catalogo = ({productos}) => {
    return (

        
         <div className='general'>
        
             <aside>
                 <Link to='/catalogo' ><p className='todos'>TODOS</p></Link>
                 <Link to='/catalogo/mujer'><p>RELOJES PARA MUJER</p></Link>
                 <Link to='/catalogo/hombre' ><p>RELOJES PARA HOMBRE</p></Link>
                 <Link to='/catalogo/acero' ><p>RELOJES DE ACERO</p></Link>
                 <Link to='/catalogo/acero-oro'><p>ACERO Y ORO</p></Link>
                 <Link to='/catalogo/oro' ><p>ORO</p></Link>
                 <Link to='/catalogo/engastados' ><p>RELOJES ENGASTADOS</p></Link>
               
             </aside>
             <section className='cont-productos'> 
              {productos.map(p=>(
                 <ProductCard
                  key={p.id}
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
