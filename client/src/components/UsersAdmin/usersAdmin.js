import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch,connect} from 'react-redux';
import './usersAdmin.css';
import {getUser,getUsers} from '../../Redux/users.js';


const UsersAdmin = (usuarios) => {

    const dispatch = useDispatch();
   /*  const usuarios = useSelector(store => store.users.users); */
    const usuario = useSelector(store => store.users.user);
    console.log(usuarios)
     useEffect( () => {
        dispatch(getUsers())
    }, [])

    const handleSearch = async (e) => {
        dispatch(getUser(e));
    }
 
    return (
        <div className = "recuadro">
            <div className = "tablaUsuarios">
                <h1 className = "tituloTabla"> Usuarios </h1>
                <div className='user-list'>
                {usuarios.usuarios && usuarios.usuarios.map( (p) =>
                    <Link onClick={() => handleSearch (p)}>
                        <li>{p.username}</li>
                    </Link>
                )}
                </div>
            </div>
            
        </div>
            
    )
};

const mapStateToProps = (state) =>({
    usuarios : state.users.users
})

export default connect(mapStateToProps,null)(UsersAdmin); 