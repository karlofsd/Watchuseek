import React, { useEffect, useState } from 'react'
import './orden.css'
import axios from "axios";
import {useDispatch,useSelector,connect} from "react-redux";
import {getOrders,getOrder} from "../../Redux/orders.js";

import { makeStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles({
  table: {

    backgroundColor: 'whitesmoke',
  }
});

const Orden = ({order,orden}) => {

  const classes = useStyles();

  const ordenes = useSelector(store => store.orders.orders)
  /* const orden = useSelector(store => store.orders.order) */
  const dispatch = useDispatch();
  const [userData,setUserData] = useState({})
  const [totalPrice,setTotalPrice] = useState();
  const [check,setCheck] = useState(false)
  const [checkin,setCheckin] = useState({})

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
      const {data} = await axios.get(`http://localhost:3001/user/carrito/checkout/${order[0].order}`)
      setCheckin(data)
      if(check) return setCheck(false)
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

  const checkout = () => {
    
    setCheck(check ? false : true)
}
   
return (
    <div className='ordeness'>
      <div className="card-tab1 card text-center shadow " >
        <div className="orden-header">
          <h2 className='title-orden'>Orden N°{order[0].order}</h2>
          <div>
            <h3 className='userEmail'>User: {userData.email}</h3>
          </div>
        </div>
        <div className="card-bodyOrden">
          {/* <div>
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
          </div> */
          <TableContainer className='tcont' component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order.map((o) => (
                        <TableRow key={o.name}>
                          <TableCell component="th" scope="row">
                            {o.name}
                          </TableCell>
                          <TableCell align="right">${o.price}</TableCell>
                          <TableCell align="right">${o.price*o.quantity}</TableCell>
                          <TableCell align="center">{o.quantity}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>}
          <h5 className="card-title">TOTAL: $USD {totalPrice}</h5>
              <p className="card-text">Status: {orden[0].status}<span className='fecha'>{date('updatedAt')}</span></p>
              {order[0].status !== 'cancelada' && order[0].status !== 'completa' && <button onClick = {() => vender()} className="btn btn-primary rounded-pill">{
                order[0].status === 'procesando' ? 'COMPLETAR ORDEN' : 'PROCESAR ORDEN'
              }</button>}
      </div>
      <div className="card-footer text-muted">
        <button onClick = {() => checkout()} className="btn btn-primary rounded-pill">CHECKOUT</button>
      </div>
    </div>
    {check && 
    <div className="card-tab2 card" >
      <div className="card-body">
       <h5 className="card-title">{date('updatedAt')}</h5>
       <h6 className="card-subtitle mb-2 text-muted">User: {userData.email.split('@')[0]}</h6>
       <p className="card-text"> 
         Provincia: {checkin.provincia}<br/>
         Departamento: {checkin.departamento}<br/>
         Localidad: {checkin.localidad}<br/>
         Dirección: {checkin.direccion}<br/>
        </p><br/>
 
        <h5 className="card-title">Email: {checkin.email}</h5><br/>
        <p className="card-text">Telefono: {checkin.telefono}</p><br/>
   </div>
   </div>
    }
  </div>
    )
}

const mapStateToProps = (state) => ({
  orden : state.orders.order
})

export default connect(mapStateToProps,null)(Orden);

