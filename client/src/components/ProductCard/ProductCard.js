import React from 'react';
import './ProductCard.css';
const Card = ({name,precio,src}) => {
    return ( 
        <div className="wrapper">
        <div className="container">
          <div className="top"><img src={src} alt="reloj"/></div>
          <div className="bottom">
            <div className="left">
              <div className="details">
                <h1>{name}</h1>
                <p>${precio}</p>
              </div>
              <div className="buy"><i className="fas fa-shopping-cart"></i></div>
            </div>
          </div>
        </div>
    </div>
     );
}
export default Card;