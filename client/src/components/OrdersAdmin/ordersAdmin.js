import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import Orden from '../Orden/orden'
import Axios from 'axios'

const OrdersAdmin = ({orders}) => {
    
    const [order,setOrder] = useState([])
    const [totalPrice,setTotalPrice] = useState()
    const getTotal = (arg) => {
        let total = 0
        for(var product in arg){
            total = total + arg[product].price
        }
        return total
    }

    const handleSearch = async(e) => {
        console.log(e);
        const {data} = await Axios.get(`http://localhost:3001/user/${e}/admin`)
        console.log(data)
        const total = getTotal(data)
        
        setTotalPrice(total)
        setOrder(data)
    }
    
    return(
    
        <div className = "crud_content">
            <div className = "products">
                    <h1 className='h11'>Orders</h1>
                     {orders.map(function (p) {
                        return <Link onClick={() => handleSearch(p.userId)} >  {"->"}  Orden N°{p.userId}  ({p.status})</Link>
                    })}<br /> 
            </div>
            {order[0] && <Orden order={order} total={totalPrice}/>}
        </div>
    )
}

export default OrdersAdmin; 