import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import Orden from '../Orden/orden';
import Axios from 'axios';
import './ordersAdmin.css'

const OrdersAdmin = ({orders}) => {
    
    const [order,setOrder] = useState([]);
    const [totalPrice,setTotalPrice] = useState();
    const getTotal = (arg) => {
        let total = 0;
        for(var product in arg){
            total = total + arg[product].price;
        }
        return total;
    };

    const handleSearch = async(e) => {
        const {data} = await Axios.get(`http://localhost:3001/user/${e}/admin`)
        const total = getTotal(data);
        setTotalPrice(total);
        setOrder(data);
    }
    
    return(
    
        <div className = "crud_content">
            <div className = "tableOrders">
                    <h1 className='h11'>Orders</h1>
                     {orders.map(function (p) {
                        let date = ()=>p.createdAt.split('T')[0]
                        console.log(date)
                     return <Link onClick={() => handleSearch(p.order)} >  {"->"}  Orden N°{p.order}______({date()})</Link>
                    })}<br /> 
            </div>
            {order[0] && <div className='ordenes'><Orden order={order} total={totalPrice}/></div>}
        </div>
    );
};

export default OrdersAdmin; 