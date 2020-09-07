import React from "react";
import Crud from "../crud/crud.js";
import Categories from "../Categories/Categories.js";
import Delete from "../Delete/Delete.js";
import CrudDelete from '../CrudDelete/crudDelete.js'
import CrudUpdate from "../CrudUpdate/CrudUpdate.js";
import "./Admin.css";
import CrudCategoryUpdate from '../CrudCategoryUpdate/CrudCategoryUpdate.js'
import { Link, BrowserRouter as Router, Route} from "react-router-dom";


const Admin = () => {
    
 return(
	 <Router>
		<div className='mayor_content'>
         <div className='panel'>
				<h3>Panel de Administrador</h3>
				<Link to='/admin/'>Agregar Producto</Link>
				<Link to='/admin/addCategory'>Agregar Categoria</Link>
				<Link to='/admin/delCategory'>Eliminar Categoria</Link>
				<Link to='/admin/delProduct'>Eliminar Producto</Link>
				<Link to='/admin/updateProduct'>Modificar Producto</Link>
				<Link to='/admin/modCategory'>Modificar una categoria</Link>
			</div>
			<div className='content_admin'>
				<Route
					exact path='/admin'
					component={Crud}
				/>
				<Route
					exact path='/admin/addCategory'
					component={Categories}
				/>
				<Route
					exact path='/admin/delProduct'
					component={CrudDelete}
				/>
				<Route
					exact path='/admin/delCategory'
					component={Delete}
				/>
				<Route
				  exact path='/admin/modCategory'
				  component={CrudCategoryUpdate}
				/>
				<Route
				exact path = "/admin/updateProduct"
				component = {CrudUpdate}
				/>
			</div>
		</div>
	  </Router>
 );
}

export default Admin; 