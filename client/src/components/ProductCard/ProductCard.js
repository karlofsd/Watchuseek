import React, { useState } from 'react';
import './ProductCard.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import {useDispatch, useSelector } from "react-redux";
import {getCarrito} from '../../Redux/carrito'

const Card = ({ name, price, image, id, stock }) => {
  const dispatch = useDispatch()
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
      if(!data.carrito.some(p => p.productId === id )){
        data.carrito.push(dataValue);
        localStorage.setItem("carrito", JSON.stringify(data));
      };

      // setAddProduct(false);
      return effectAddingToCart();
    };
    await axios.post(`http://localhost:3001/user/${user.id}/carrito`, dataValue);
    dispatch(getCarrito(user.id))
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
                  <h5 className="text-center">Adding product to Shopping Cart</h5>
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
              <h4>{name = name.substring(0, 1).toUpperCase() + name.substring(1)}</h4>
              <p className='priceproductcard' >$USD {price}</p>
            </div>
            <button onClick={() => handleClick()} className="buy" ><i className="fas fa-shopping-cart"></i></button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Card;