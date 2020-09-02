import React from 'react';
import ProductCard from './ProductCard';
import './Catalogo.css'
const Catalogo = ({productos}) => {
    return (
         <div className='general'>
             <aside>
                 <p className='todos'>TODOS</p>
                 <p>RELOJES PARA MUJER</p>
                 <p>RELOJES DE ACERO</p>
                 <p>ACERO Y ORO</p>
                 <p>ORO</p>
                 <p>RELOJES ENGASTADOS</p>
             </aside>
             <section className='cont-productos'> 
              {productos.map(p=>(
                 <ProductCard
                  key={p.id}
                  name={p.name}
                  precio={p.precio}
                  src={p.src}
                 />
             ))}  
             </section>
       </div>
    );
}
export default Catalogo;
