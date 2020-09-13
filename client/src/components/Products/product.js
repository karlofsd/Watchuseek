import React from 'react'
import './product.css'
import axios from 'axios'


const Product = ({ user, data }) => {
  console.log(data)
  const handleClick = async () => {
    const dataValue = {
      name: data[0].name,
      price: data[0].price,
      quantity: 1,
      status: "carrito"
    };
    await axios.post(`http://localhost:3001/user/${user.id}/carrito`, dataValue);

  }

  return (
    <div className="card text-center shadow col-7 p-0 mx-auto" >
      <div className="card-header">
        <h2 className='title'>{data[0].name = data[0].name.substring(0,1).toUpperCase() + data[0].name.substring(1)}</h2>
        <a href="javascript:history.back(1)" className='btn1' >
        <div >
        <button type="button" className="btn btn-danger">X</button>
      </div></a>
      </div>
      <div className="card-body">
        <img className='card-img w-25' src={data[0].image}/>
        <hr />
        <h5 className="card-title">Price: $USD {data[0].price}</h5>
        <p className="card-text">Description: {data[0].description = data[0].description.substring(0,1).toUpperCase() + data[0].description.substring(1)}</p>
        <button onClick={()=>handleClick()} className="btn btn-primary rounded-pill">Agregar al carrito</button>
      </div>
      <div className="card-footer text-muted">
        {data[0].stock} stock.
      </div>

    </div>
  );
}

export default Product;
