import React from 'react';
import './ProductCard.css';
import {Link} from 'react-router-dom'

const Card = ({name,precio,src,id}) => {
    return ( 
        <div className="wrapper">
        <div className="container">
          <div className="top">
            <Link to={`/catalogo/product/${id}`}>
              <img src={src} alt="reloj"/>
            </Link>
          </div>
          <div className="bottom">
            <div className="left">
              <div className="details">
                <h1>{name}</h1>
                <p>$USD {precio}</p>
              </div>
              <div className="buy"><i className="fas fa-shopping-cart"></i></div>
            </div>
          </div>
        </div>
    </div>
     );
}
export default Card;