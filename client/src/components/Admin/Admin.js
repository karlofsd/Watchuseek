import React,{ Fragment, useEffect} from "react";
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


const Admin = ({user}) => {
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getOrders())
	},[])

const {isAdmin} = useSelector(store => store.users.user); 
	
 return  isAdmin ?  (
	 <Router>
		<div className='mayor_content'>
        	<div className='panel'>
				<h3 className='title-panel'>Admin Panel</h3>
				<Link to='/admin' className='panel-list'>Profile</Link>
				<Link to='/admin/categories' className='panel-list'>Categories</Link>
				<Link to='/admin/products' className='panel-list'>Products</Link>
				<Link to='/admin/orders' className='panel-list'>Orders</Link>
				<Link to= '/admin/users' className='panel-list'>Users</Link>
			</div>
			<div className='content_admin'>
				<Route
					exact path='/admin'
					render={()=>
						<Fragment>
						<div className='panel-h1'><h3 className='title-h3'>Profile</h3></div>
						<Profile user={user} />
						</Fragment>
					}
				/>
				<Route
					exact path='/admin/products'
					render={()=>
						<Fragment>
						<div className='panel-h1'><h3 className='title-h3'>Products</h3></div>
						<Product />
						</Fragment>
					}
				/>
				<Route
					exact path='/admin/categories'
					render={()=>
						<Fragment>
						<div className='panel-h1'><h3 className='title-h3'>Categories</h3></div>
						<Category />
						</Fragment>}
				/>
				<Route
					exact path='/admin/orders'
					render={() =>
						<Fragment>
							<div className='panel-h1'><h3 className='title-h3'>Orders</h3></div>
							<Orders />
						</Fragment>
					}
				/>
				<Route
					exact path='/admin/users'
					render={() =>
						<Fragment>
							<div className='panel-h1'><h3 className='title-h3'>Users</h3></div>
							<Users/>
						</Fragment>
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