import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch,connect} from 'react-redux';
import './usersAdmin.css';
import {getUser,getUsers,resetUser} from '../../Redux/users.js';
import {Avatar} from '@material-ui/core'
import Axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  root: {
    borderRadius:'0 0 10px 10px',
    color: 'white',
    backgroundColor: 'rgb(108 117 125)',
    overflow:'scroll'
  }
});

const UsersAdmin = (usuarios) => {

    const classes = useStyles();
    const dispatch = useDispatch();
    
    const usuario = useSelector(store => store.users.userSelected);
   
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
    
    const deleteUser = async() => {
      await Axios.delete(`http://localhost:3001/user/${usuario.id}`)
      dispatch(getUsers())
      dispatch(resetUser())
    }

    return (
        <div className='users-content'>
            <div className = "recuadro">
                
                    <h1 className = "tituloTabla"> Users </h1>
                    {/* <h6 className = "subtituloTabla">usernames </h6> */}
                    <div className={classes.root}>
                    <List component="nav" aria-label="secondary mailbox folders">
                      {usuarios.usuarios && usuarios.usuarios.map(p => <ListItem button onClick={()=>handleSearch(p)}>
                        <ListItemText primary={p.username}/>
                        <ListItemText secondary={p.isAdmin ? 'Admin' : 'User'}/>
                      </ListItem>)}
                    </List>
                </div>
            </div>
            {usuario.email && <div className="card3 card text-center shadow " >
              <div className="orden-header">
                <div className='w-50px '>
                  {usuario.image ? <img className='imguserAdmin' src={usuario.image}/> : <Avatar className='img w-100px shadow mb-2'/>}
                </div>
                <h2 className='title-orden'>{usuario.username}</h2>
                <div>
                </div>
              </div>
              <div className="card-bodyOrden">
                    <h3 className='userEmail'>Email: {usuario.email}</h3>
                <hr/>
                    <h5 className="card-title">Role: {usuario.isAdmin ? 'Administrador' : 'Usuario'}</h5>
                    <p className="card-text"><span className='fecha'>{usuario.updatedAt.split('T')[0]}</span></p>
                    <button onClick = {() => handleUpgrade()} className="btn btn-primary rounded-pill">{
                      usuario.isAdmin ? 'QUITAR PERMISOS' : 'DAR PERMISOS'
                    }</button>
                    <button onClick={()=> deleteUser()} className="btn btn-secondary rounded-pill">Unsubscribe</button>
              </div>

            </div>}
        </div>
            
    )
};

const mapStateToProps = (state) =>({
    usuarios : state.users.users
})

export default connect(mapStateToProps,null)(UsersAdmin); 