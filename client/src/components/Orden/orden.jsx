import React from 'react'
import './orden.css'
import axios from "axios";
import './orden.css'

const Orden = ({order,total,userData}) => {
  let date = (fecha)=> order[0][fecha].split('T')[0]
  console.log(order)
  const vender = async()=>{
    const { data } = await axios.get(`http://localhost:3001/user/${order[0].order}/orders`);
    console.log(data)
    data.orders.map( async () => {
        await axios.put(`http://localhost:3001/orders/${order[0].order}/changeStatus/`)
    })
}

    
    return (
       <div className="card text-center shadow col-7 p-0 mx-auto" >
      <div className="orden-header">
        <h2 className='title-orden'>Orden N°{order[0].order}</h2>
        <div>
          <h3 className='userEmail'>User: {userData.email}</h3>
        </div>
      </div>
      <div className="card-bodyOrden">
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
        </div><br/>
        <br/>
        <h5 className="card-title">TOTAL: $USD {total}</h5><br/>
            <p className="card-text">Status: {order[0].status}<span className='fecha'>{date('updatedAt')}</span></p><br/>
            {order[0].status !== 'cancelada' && order[0].status !== 'completa' && <button onClick = {() => vender()} className="btn btn-primary rounded-pill">{
              order[0].status === 'procesando' ? 'COMPLETAR ORDEN' : 'PROCESAR ORDEN'
            }</button>}
      </div>
      <div className="card-footer text-muted">
        ORDEN DE COMPRA
      </div>

    </div>
    )
}

export default Orden;