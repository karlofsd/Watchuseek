import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch,connect} from 'react-redux';
import './usersAdmin.css';
import {getUser,getUsers,} from '../../Redux/users.js';
import {Avatar} from '@material-ui/core'
import Axios from 'axios';

const UsersAdmin = (usuarios) => {

    const dispatch = useDispatch();
    
   /*  const usuarios = useSelector(store => store.users.users); */
    const usuario = useSelector(store => store.users.userSelected);
    console.log(usuario)
     useEffect( () => {
        dispatch(getUsers())
        if(usuario.email) return getUser(usuario.email)
    }, [usuario])

    const handleSearch = (e) => {
      console.log(e)  
      dispatch(getUser(e.email));
    }

    const handleUpgrade = async() => {
      const status = usuario.isAdmin
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: 'Bearer ' + token
        }
      };
      await Axios.put(`http://localhost:3001/auth/promote/${usuario.id}`,{status}, config);
      dispatch(getUsers())
      dispatch(getUser(usuario.email))
    }
 
    return (
        <div className='users-content'>
            <div className = "recuadro">
                <div className = "tablaUsuarios">
                    <h1 className = "tituloTabla"> Usuarios </h1>
                    <h6 className = "subtituloTabla">usernames </h6>
                    <div className='user-list'>
                    {usuarios.usuarios && usuarios.usuarios.map( (p) =>
                        <Link onClick={() => handleSearch (p)}>
                            <li>{p.username}______<span>{p.isAdmin ? 'Admin' : 'User'}</span></li>
                        </Link>
                    )}
                    </div>
                </div>
            </div>
            {usuario.email && <div className="card text-center shadow col-7 p-0 mx-auto" >
              <div className="orden-header">
                <div>
                  <Avatar className='img w-100px shadow mb-2'/>
                </div>
                <h2 className='title-orden'>{usuario.username}</h2>
                <div>
                </div>
              </div>
              <div className="card-bodyOrden">
                    <h3 className='userEmail'>Email: {usuario.email}</h3>
                <hr/>
                    <h5 className="card-title">Rol: {usuario.isAdmin ? 'Administrador' : 'Usuario'}</h5><br/>
                    <p className="card-text"><span className='fecha'>{/* {date('updatedAt')} */}</span></p><br/>
                    <button onClick = {() => handleUpgrade()} className="btn btn-primary rounded-pill">{
                      usuario.isAdmin ? 'QUITAR PERMISOS' : 'DAR PERMISOS'
                    }</button>
              </div>

            </div>}
            {/* {usuarios.usuarios[0] && <div className='ordenesUA'><User user={usuario}/></div>} */}
        </div>
            
    )
};

const mapStateToProps = (state) =>({
    usuarios : state.users.users
})

export default connect(mapStateToProps,null)(UsersAdmin); 