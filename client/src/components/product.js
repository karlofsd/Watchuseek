import React from 'react'

const Product = ({ name, price, description, stock }) => {
  return (
    <div className="card text-center shadow col-7 p-0 mx-auto">
      <div className="card-header">
        {name}
      </div>
      <div className="card-body">
        <img className='card-img w-25' src='https://i.pinimg.com/originals/45/7b/e2/457be2ce48176066fa700e18ae544852.jpg' />
        <hr />
        <h5 className="card-title">Price: $ {price}</h5>
        <p className="card-text">Description: {description}</p>
        <a href="#" className="btn btn-primary rounded-pill">Buy Now</a>
      </div>
      <div className="card-footer text-muted">
        {stock} stock.
      </div>

    </div>
  );
}

export default Product;
