import React, { useEffect, useState } from 'react'
import './orden.css'
import axios from "axios";
import {useDispatch,useSelector,connect} from "react-redux";
import {getOrders,getOrder} from "../../Redux/orders.js";

const Orden = ({order,orden}) => {
  const ordenes = useSelector(store => store.orders.orders)
  /* const orden = useSelector(store => store.orders.order) */
  const dispatch = useDispatch();
  const [userData,setUserData] = useState({})
  const [totalPrice,setTotalPrice] = useState();
  
  let date = (fecha)=> order[0][fecha].split('T')[0]
  
  const getTotal = (arg) => {
    let total = 0;
    for(var product in arg){
        total = total + (arg[product].price*arg[product].quantity);
    }
    return total;
};

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios.get(`http://localhost:3001/user/get/${order[0].userId}`)
      const total = getTotal(orden);
      console.log(total)
      setUserData(user.data)
      setTotalPrice(total)
      
    }
    fetchData()
  },[order])

  const vender = ()=>{
    order.map( async (e) => {
        await axios.put(`http://localhost:3001/orders/${order[0].order}/changeStatus/${e.status}`)
    })
    dispatch(getOrders());
    dispatch(getOrder(order))
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
              <th className='th1' >Name</th>
              <th className='th1' >Price</th>
              <th className='th1' >Total</th>
              <th className='th1' >Quantity</th>
            </tr>
            {order.map(o => 
              <tr className='columns'>
                <td className='td1'>{o.name}</td>
                
                <td className='td1' >${o.price}</td>
                <td className='td1' >${o.price*o.quantity}</td>       
                <td className='td1' >{o.quantity}</td>
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

const mapStateToProps = (state) => ({
  orden : state.orders.order
})

export default connect(mapStateToProps,null)(Orden);

