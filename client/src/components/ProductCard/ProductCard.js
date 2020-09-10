import React, { useEffect } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom'
import axios from 'axios'

const Card = ({ name, price, image, id }) => {


  const handleClick = async (e) => {
    const data = {
      name,
      price,
      quantity: 1,
      user,
      id
    };

    const { data } = await axios.post(`http://localhost:3001/user/${5}/carrito`, data);

    console.log(data);
  }

  return (
    <div className="wrapper">
      <div className="container">
        <div className="top">
          <Link to={`/catalogo/product/${id}`}>
            <img src={image} className='reloj-img' alt="reloj" />
          </Link>

        </div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h1>{name = name.substring(0, 1).toUpperCase() + name.substring(1)}</h1>
              <p>$USD {price}</p>
            </div>
            <div onClick={() => handleClick} className="buy"><i className="fas fa-shopping-cart"></i></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;