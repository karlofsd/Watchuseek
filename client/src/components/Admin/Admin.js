import React,{useState, useEffect} from "react";
import Profile from "../Profile/Profile.js"
import "./Admin.css";
import { Link, BrowserRouter as Router, Route} from "react-router-dom";
import Category from '../Admin_product_category/category.js';
import Product from '../Admin_product_category/product.js';
import { useDispatch } from "react-redux";
import {getCategories} from '../../Redux/categories/categories.js'
import {getProducts} from '../../Redux/products/products.js'



const Admin = ({products,categories}) => {
	const dispatch = useDispatch();

 return(
	 <Router>
		<div className='mayor_content'>
        	<div className='panel'>
				<h3>Panel de Administrador</h3>
				<Link to='/admin/'>Perfil</Link>
				<Link onClick = {() => dispatch(getProducts())} to='/admin/products'>Productos</Link>
				<Link onClick = {() => dispatch(getCategories())} to='/admin/categories'>Categorias</Link>
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
								<Product products={products} categories={categories}/>
						</div>}
				/>
				<Route
					exact path='/admin/categories'
					render={()=>
						<div>
								<Category categories={categories}/>
						</div>}
				/>	
			</div>
		</div>
	  </Router>
 );
}

export default Admin; 