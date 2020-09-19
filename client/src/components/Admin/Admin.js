import React,{ useEffect} from "react";
import Profile from "../Profile/Profile.js";
import "./Admin.css";
import { Link, BrowserRouter as Router, Route} from "react-router-dom";
import Category from '../Admin_product_category/category.js';
import Product from '../Admin_product_category/product.js';
import Orders from '../OrdersAdmin/ordersAdmin.js';
import Users from '../UsersAdmin/usersAdmin.js';
import {useDispatch, useSelector} from 'react-redux'
import {getOrders} from '../../Redux/orders'
import { Redirect } from 'react-router-dom';


const Admin = () => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getOrders())
	},[])

const {isAdmin} = useSelector(store => store.users.user); 
	
 return  isAdmin ?  (
	 <Router>
		<div className='mayor_content'>
        	<div className='panel'>
				<h3>Panel de Administrador</h3>
				<Link to='/admin'>Perfil</Link>
				<Link to='/admin/orders'>Ordenes</Link>
				<Link to='/admin/products'>Productos</Link>
				<Link to='/admin/categories'>Categorias</Link>
				<Link to= '/admin/users'>Usuarios</Link>
			</div>
			<div className='content_admin'>
				<Route
					exact path='/admin'
					component={Profile}
				/>
				<Route
					exact path='/admin/products'
					render={()=>
						<div >
								<Product  />
						</div>}
				/>
				<Route
					exact path='/admin/categories'
					render={()=>
						<div>
								<Category />
						</div>}
				/>
				<Route
					exact path='/admin/orders'
					render={() =>
						<div>
								<Orders />
						</div>
					}
				/>
				<Route
					exact path='/admin/users'
					render={() =>
						<div>
								<Users />
						</div>
					}
				/>
			</div>
		</div>
	  </Router>
 ) : (
	 <Redirect to={{pathname: '/'}} />
 ) 
}

export default Admin;