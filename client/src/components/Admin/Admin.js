import React,{useState, useEffect} from "react";
import Profile from "../Profile/Profile.js";
import "./Admin.css";
import { Link, BrowserRouter as Router, Route} from "react-router-dom";
import Category from '../Admin_product_category/category.js';
import Product from '../Admin_product_category/product.js';
import Orders from '../OrdersAdmin/ordersAdmin.js';
import axios from "axios";

const Admin = () => {

	const [orders, setOrders] = useState([])

	useEffect(()=> {
		const fetchData = async () =>{
			const {data} = await axios.get(`http://localhost:3001/user/order/ordersAdmin`)
			console.log(data)
			setOrders(data)
		}
		fetchData();
	},[])

 return(
	 <Router>
		<div className='mayor_content'>
        	<div className='panel'>
				<h3>Panel de Administrador</h3>
				<Link to='/admin/'>Perfil</Link>
				<Link to='/admin/orders'>Ordenes</Link>
				<Link to='/admin/products'>Productos</Link>
				<Link to='/admin/categories'>Categorias</Link>
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
								<Orders orders={orders}/>
						</div>
					}
				/>
			</div>
		</div>
	  </Router>
 );
}

export default Admin;