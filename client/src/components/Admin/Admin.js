import React from "react";
import Crud from "../crud/crud.js";
import Categories from "../Categories/Categories.js";
import Delete from "../Delete/Delete.js";
import CrudDelete from '../CrudDelete/crudDelete.js'
import CrudUpdate from "../CrudUpdate/CrudUpdate.js";
import Profile from "../Profile/Profile.js"
import "./Admin.css";
import CrudCategoryUpdate from '../CrudCategoryUpdate/CrudCategoryUpdate.js'
import { Link, BrowserRouter as Router, Route} from "react-router-dom";


const Admin = ({products,category}) => {
    
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
						<div className='box'>
							<div className='list_box'>
								{products.map(p => 
									<label >{p.name}</label>
								)}
							</div>
							<div className = "crud">
								<Crud/>
							</div>
						</div>}
				/>
				<Route
					exact path='/admin/categories'
					render={()=>
						<div className='box'>
							<div className='list_box'>
								{category.map(c => 
									<label>{c}</label>
								)}
							</div>
							<div>
								<Categories/>
							</div>
						</div>}
				/>	
			</div>
		</div>
	  </Router>
 );
}

export default Admin; 