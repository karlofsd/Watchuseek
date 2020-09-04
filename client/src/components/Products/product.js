import React from 'react'
import './product.css'

const Product = ({ data }) => {
  return (
    <div className="card text-center shadow col-7 p-0 mx-auto" >
      <div className="card-header">
        <h2 className='title'>{data[0].name}</h2>
        <a href="javascript:history.back(1)" className='btn1' >
        <div >
        <button type="button" className="btn btn-danger">X</button>
      </div></a>
      </div>
      <div className="card-body">
        <img className='card-img w-25' src={data[0].src}/>
        <hr />
        <h5 className="card-title">Price: $USD {data[0].precio}</h5>
        <p className="card-text">Description: {data[0].description}</p>
        <a href="#" className="btn btn-primary rounded-pill">Buy Now</a>
      </div>
      <div className="card-footer text-muted">
        {data[0].stock} stock.
      </div>

    </div>
  );
}

export default Product;
