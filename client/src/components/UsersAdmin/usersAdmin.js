// import React, {useState, useEffect} from 'react';
// import {Link} from 'react-router-dom';
// import {useSelector, useDispatch} from 'react-redux';
// import './usersAdmin.css';
// import {getUser} from '../../Redux/users.js';
// //import Orden from '../Orden/orden';

// const usersAdmin = () => {
//     const [users, setUsers] = useState([]);
//     const dispatch = useDispatch();
//     const usuarios = useSelector(store => store.users.users);
//     const usuario = useSelector(store => store.users.user);

//     useEffect( () => {
//         setUsers(usuarios);
//     }, [users, usuario])

//     const handleSearch = async (e) => {
//         dispatch(getUser(e));
//     }

//     return (
//         <div className = "recuadro">
//             <div className = "tablaUsuarios">
//                 <h1 className = "tituloTabla"> Usuarios </h1>

//                 {/* {usuarios.map( (p) => {
//                     return <Link onClick={() => handleSearch (p)} > 
//                 })} */}

//             </div>
            
//         </div>
            
//     )


// };


// export default usersAdmin; 