import React, { useEffect, useState } from 'react'
import './orden.css'
import axios from "axios";
import './orden.css'
import {useDispatch,useSelector} from "react-redux";
import {getOrders,getOrder} from "../../Redux/orders.js";

const Orden = ({order,num}) => {
  const orden = useSelector(store => store.orders.order)
  
  const dispatch = useDispatch();
  const [userData,setUserData] = useState({})
  const [totalPrice,setTotalPrice] = useState();
  
  let date = (fecha)=> order[0][fecha].split('T')[0]
  
  const getTotal = (arg) => {
    let total = 0;
    for(var product in arg){
        total = total + arg[product].price;
    }
    return total*arg[product].quantity;
};
  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(`http://localhost:3001/user/get/${order[0].userId}`)
      const total = getTotal(order);
      setUserData(user.data)
      setTotalPrice(total)
    }
    fetchData()
  },[])

  const vender = async()=>{
    order.map( async (e) => {
        await axios.put(`http://localhost:3001/orders/${order[0].order}/changeStatus/${e.status}`)
    })
    dispatch(getOrders());
    
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
              <th>Total</th>
              <th>Quantity</th>
            </tr>
            {order.map(o => 
              <tr className='columns'>
                <td>{o.name}</td>
                
                <td>${o.price}</td>
                <td>${o.price*o.quantity}</td>       
                <td>{o.quantity}</td>
              </tr>
            )}
          </table>
        </div><br/>
        <br/>
        <h5 className="card-title">TOTAL: $USD {totalPrice}</h5><br/>
            <p className="card-text">Status: {orden[0].status}<span className='fecha'>{date('updatedAt')}</span></p><br/>
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