import React, { useState } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useSelector } from "react-redux";

const Card = ({ name, price, image, id, stock }) => {

  const user = useSelector(store => store.users.user);
  const [addProduct, setAddProduct] = useState(false);

  const effectAddingToCart = () => {
    return setTimeout(() => {
      setAddProduct(false);
    }, 1000);
  }

  const handleClick = async (e) => {

    setAddProduct(true);

    const dataValue = {
      name: name,
      price: price,
      quantity: 1,
      productId: id,
    };

    if (!localStorage.token) {
      if (!localStorage.carrito) {
        localStorage.setItem("carrito", JSON.stringify({ carrito: [dataValue] }));
        return effectAddingToCart();
      }
      const data = JSON.parse(localStorage.getItem("carrito"));
      data.carrito.push(dataValue);
      localStorage.setItem("carrito", JSON.stringify(data));
      setAddProduct(false);
        return effectAddingToCart();
    };


    await axios.post(`http://localhost:3001/user/${user.id}/carrito`, dataValue);
    
    return effectAddingToCart();
  }

  return (
    <div className={`wrapper ${addProduct ? 'card-waiting' : ''}`}>
      <div className="container">
        <div className="top">
          <Link to={`/catalogo/product/${id}`}>
            <img src={image} className='reloj-img' alt="reloj" />
            {
              addProduct ?
                <div className='message-waiting-card p-3 rounded-lg'>
                  <h5 className="text-center">Agregando al carrito</h5>
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border spinner-bg" role="status">
                      <span className="sr-only"></span>
                    </div>
                  </div>
                </div>
                : null
            }
          </Link>

        </div>
        <div className="bottom">
          <div className="left">
            <div className="details">
              <h1>{name = name.substring(0, 1).toUpperCase() + name.substring(1)}</h1>
              <p>$USD {price}</p>
            </div>
            <button onClick={() => handleClick()} className="buy" ><i className="fas fa-shopping-cart"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;