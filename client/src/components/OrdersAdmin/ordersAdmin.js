import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import Orden from '../Orden/orden';
import Axios from 'axios';
import './ordersAdmin.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOrders,getOrder} from '../../Redux/orders'

const OrdersAdmin = () => {
    const [orders, setOrders] = useState([]);
    const [numOrder,setNumOrder] = useState()
    const dispatch = useDispatch()
    const ordenes = useSelector(store => store.orders.orders);
    const orden = useSelector(store => store.orders.order);
    
	useEffect(()=> {
        setOrders(ordenes);
    },[orders,orden])
    
    const handleSearch = async(e) => {
        dispatch(getOrder(e));
        setNumOrder(e)
    }
    
    return(
    
        <div className = "crud_content">
            <div className = "tableOrders">
                    <h1 className='h11'>Orders</h1>

                     {ordenes.map(function (p) {
                        /* let date = ()=> p.createdAt.split('T')[0]
                        console.log(date) */
                     return <Link onClick={() => handleSearch(p)} >  {"->"}  Orden N°{p.order}______({p.status})</Link>
                    })}<br /> 
            </div>
            {orden[0] && <div className='ordenes'><Orden order={orden} num={numOrder}/></div>}
        </div>  
    );
};

export default OrdersAdmin; 