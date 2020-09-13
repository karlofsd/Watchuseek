import React from 'react'
import './orden.css'
import axios from "axios";

const Orden = ({order,total}) => {


  const comprar = async()=>{
     console.log(order[0].userId);   
    const { data } = await axios.get(`http://localhost:3001/user/${order[0].userId}/orders`);
    console.log(data.orders);
    data.orders.map( async (e) => {
        console.log(e)
        await axios.put(`http://localhost:3001/orders/${order[0].userId}/changeStatus/`)
    })
}

    
    return (
       <div className="card text-center shadow col-7 p-0 mx-auto" >
      <div className="card-header">
        <h2 className='title'>Orden N°{order[0].userId}</h2>
      </div>
      <div className="card-body">
        <div>
          <table>
            <tr className='columns'>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
            </tr>
            {order.map(o => 
              <tr className='columns'>
                <td>{o.name}</td>
                <td>${o.price}</td>
                <td>{o.quantity}</td>
              </tr>
            )}
          </table>
        </div>
        <h5 className="card-title">TOTAL: $USD {total}</h5>
        <p className="card-text">Status: {order[0].status}</p>
        <button onClick = {() => comprar()} className="btn btn-primary rounded-pill">ACEPTAR COMPRA</button>
      </div>
      <div className="card-footer text-muted">
        ORDEN DE COMPRA
      </div>

    </div>
    )
}

export default Orden;