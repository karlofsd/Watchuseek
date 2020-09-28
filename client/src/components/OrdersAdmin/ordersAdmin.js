import React, { useState,useEffect } from 'react';
import {Link} from 'react-router-dom';
import Orden from '../Orden/orden';
import './ordersAdmin.css'
import {useSelector, useDispatch} from 'react-redux'
import {getOrder} from '../../Redux/orders'
import Axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    
    root: {
      borderRadius:'0 0 10px 10px',
      color: 'white',
      backgroundColor: 'rgb(108 117 125)',
        overflow:'scroll'
    }
  });

const OrdersAdmin = () => {

    const classes = useStyles();

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
        return setOrders(ordenes.filter((e) => e.status !== "carrito"));
    },[orden,ordenes])
    
    const handleSearch = async(e) => {
        console.log('---order---')
        console.log(e)
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
                <div className={classes.root}>
                  <List component="nav" aria-label="secondary mailbox folders">
                    {orders.map(p => <ListItem button onClick={()=>handleSearch(p)}>
                      <ListItemText primary={`N° ${p.order}`} secondary={p.status}/>
                    </ListItem>)}
                  </List>
                </div>
            </div>
            {orden[0] && <Orden order={orden}/>}
        </div>  
    );
};

export default OrdersAdmin;