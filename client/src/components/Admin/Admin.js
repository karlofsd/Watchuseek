import React from "react";
import Crud from "../crud/crud.js";
import Categories from "../Categories/Categories.js";
import Delete from "../Delete/Delete.js";
import CrudDelete from '../CrudDelete/crudDelete.js'
import CrudUpdate from "../CrudUpdate/CrudUpdate.js";
import "./Admin.css";

const Admin = () => {
    
 return(
     <div className='contentMayor'>
         <div className ="content5">
             <Crud />
         </div>
         <div className ="content6">
             <Categories /> 
         </div>
         <div className='content7'>
         <Delete />
         </div>
         <div className='content8'>
         <CrudDelete/>
         </div>
         <div className='content9' >
             <CrudUpdate/>
         </div>
     </div>
 );
}

export default Admin; 