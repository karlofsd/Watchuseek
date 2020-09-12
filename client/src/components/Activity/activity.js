import React, {useEffect, useState} from 'react';
import axios from 'axios';

const Activity =()=>{
  const [ordenes, setOrden] = useState([]);


 useEffect(()=>{
  const fetchData = async ()=>{ 
  const {data} = await axios.get(`http://localhost:3001/user/${2}/orders`);
  setOrden(data); 
};
  fetchData();
 },[]);


    return(
        <div>
          <h1>User Activity</h1>
        {ordenes.orders && ordenes.orders.map(e=>{
            return(
            <div>
         <label>Name: {e.name}</label><br/> 
        <label>Price:{e.price}</label><br/> 
            <label>Quantity: {e.quantity}</label><br/> 
        <label>Status:{e.status}</label><br/> 
            </div>)
        })}
        </div>
    );
};

export default Activity;
