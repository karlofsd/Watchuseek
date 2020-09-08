import React,{useState, useEffect} from "react";
import Crud from "../crud/crud.js";
import Categories from "../Categories/Categories.js";
import Delete from "../Delete/Delete.js";
import CrudDelete from '../CrudDelete/crudDelete.js'
import CrudUpdate from "../CrudUpdate/CrudUpdate.js";
import Profile from "../Profile/Profile.js"
import "./Admin.css";
import CrudCategoryUpdate from '../CrudCategoryUpdate/CrudCategoryUpdate.js'
import { Link, BrowserRouter as Router, Route} from "react-router-dom";
import Category from '../Admin_product_category/category.js'
import Product from '../Admin_product_category/product.js'
import axios from 'axios'


const Admin = ({products}) => {
	
	const [categories,setCategories] = useState()

	useEffect(()=>{
        const fetchData = async () => {
            let cate = await fetch("http://localhost:3001/category");
			let data = await cate.json();
			setCategories(data);
        }
		fetchData()
	},[]);


 return(
	 <Router>
		<div className='mayor_content'>
        	<div className='panel'>
				<h3>Panel de Administrador</h3>
				<Link to='/admin/'>Perfil</Link>
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
								<Product categories={categories}/>
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