import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch,connect} from 'react-redux';
import './usersAdmin.css';
import {getUser,getUsers} from '../../Redux/users.js';
import User from '../User/user.js';

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
        <div>
            <div className = "recuadro">
                <div className = "tablaUsuarios">
                    <h1 className = "tituloTabla"> Usuarios </h1>
                    <h6 className = "subtituloTabla">usernames </h6>
                    <div className='user-list'>
                    {usuarios.usuarios && usuarios.usuarios.map( (p) =>
                        <Link onClick={() => handleSearch (p)}>
                            <li>{p.username}</li>
                        </Link>
                    )}
                    </div>
                </div>
            </div>
            {/* <div className="card text-center shadow col-7 p-0 mx-auto" >
      <div className="orden-header">
        <h2 className='title-orden'></h2>
        <div>
          <h3 className='userEmail'>User: </h3>
        </div>
      </div>
      <div className="card-bodyOrden">
        <div>
          
        </div><br/>
        <br/>
        <h5 className="card-title">TOTAL: $USD {totalPrice}</h5><br/>
            <p className="card-text">Status: {orden[0].status}<span className='fecha'>{date('updatedAt')}</span></p><br/>
            {order[0].status !== 'cancelada' && order[0].status !== 'completa' && <button onClick = {() => vender()} className="btn btn-primary rounded-pill">{
              order[0].status === 'procesando' ? 'COMPLETAR ORDEN' : 'PROCESAR ORDEN'
            }</button>}
      </div>
      <div className="card-footer text-muted">
        ORDEN DE COMPRA
      </div>

    </div> */}
            {/* {usuarios.usuarios[0] && <div className='ordenesUA'><User user={usuario}/></div>} */}
        </div>
            
    )
};

const mapStateToProps = (state) =>({
    usuarios : state.users.users
})

export default connect(mapStateToProps,null)(UsersAdmin); 