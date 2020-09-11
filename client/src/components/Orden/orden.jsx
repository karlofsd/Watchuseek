import React from 'react'
import './orden.css'

const Orden = ({order,total}) => {
    console.log('---- ordenes ----')
    console.log(order)
    console.log('-----------------')
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
        <a href="#" className="btn btn-primary rounded-pill">ACEPTAR COMPRA</a>
      </div>
      <div className="card-footer text-muted">
        ORDEN DE COMPRA
      </div>

    </div>
    )
}

export default Orden;