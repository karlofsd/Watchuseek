import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import Orden from '../Orden/orden';
import './ordersAdmin.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOrder} from '../../Redux/orders'
import Axios from 'axios';

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const dispatch = useDispatch()
    const ordenes = useSelector(store => store.orders.orders);
    const orden = useSelector(store => store.orders.order);
    
	useEffect(()=> {
        
        /* const fetchData = async() => {
            if(sort === 'order') return await handleOrder()
            else if(sort === 'status')return await handleStatus();
            else return setOrders(ordenes)
        }
        fetchData() */
        return setOrders(ordenes)
    },[orden,ordenes])
    
    const handleSearch = async(e) => {
        dispatch(getOrder(e)); 
    }

    /* const handleOrder = async () => {
        
        const {data} = await Axios.get(`http://localhost:3001/user/${'order'}/ordersAdmin`)
        setOrders(data)
    };

    const handleStatus = async () => {
        const {data} = await Axios.get(`http://localhost:3001/user/${'status'}/ordersAdmin`)
        setOrders(data)
    }; */
    return(
    
        <div className = "crud_content">
            <div className = "tableOrders">
                {/* <div className = "divbutton">
                    <button className='buttonAdd' onClick={() => handleOrder()} >N° Orden</button><br />
                    <button className='buttonDelete' onClick={(e) => handleStatus(e)} >Status</button><br />
                </div> */}
                <h1 className='h11'>Orders</h1>

                    {orders.map(function (p) {
                    /* let date = ()=> p.createdAt.split('T')[0]
                    console.log(date) */
                    return <Link onClick={() => handleSearch(p)} >  {" >"}  Orden N°{p.order}______({p.status})</Link>
                })}<br /> 
            </div>
            {orden[0] && <div className='ordenes'><Orden order={orden}/></div>}
        </div>  
    );
};

export default OrdersAdmin; 