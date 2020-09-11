import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Orden from '../Orden/orden'

const OrdersAdmin = ({orders}) => {
    
    const [order,setOrder] = useState()
    const [state,setState] = useState()

    const handleSearch = (e) => {
        setOrder(e)
    }

    const getdata = (orders) => {
        var array = [];
        var obj = {};
        for(var e in orders){
            obj = {
                userId: e,
                status: orders[e][0].status,
            };
            array.push(obj);
        };
    };

    return(
    
        <div className = "crud_content">
            <div className = "products">
                    <h1 className='h11'>Orders</h1>
                    {console.log(getdata(orders))}
                     {/* {orders[0] && orders.map(function (p) {
                         p.map(( e => {} ))
                        return <Link onClick={() => handleSearch(p)} value={p.id} > - {p.name} ({p.status})</Link>
                    })}<br />  */}
            </div>
            <Orden order={order}/>
        </div>
    )
}

export default OrdersAdmin;