import React, {useState} from "react";
import SearchBar from "../searchBar/searchBar.js";
import "./Nav.css";
import {Avatar,Button,MenuItem,Menu} from '@material-ui/core'
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch} from "react-redux";
import {getCarrito} from "../../Redux/carrito.js";
import {getOrdersUser} from "../../Redux/orders.js";
import {logoutUser} from "../../Redux/users";
import axios from "axios";

const Nav = ({setSearchApp, categories,user}) => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const handleCarrito = () => {
      if (localStorage.token && localStorage.carrito) {
                let { carrito } = JSON.parse(localStorage.getItem("carrito"));
                carrito.map(async (p) => {
                    await axios.post(`http://localhost:3001/user/${user.id}/carrito`, p);
                })
                localStorage.removeItem("carrito");
            }
            dispatch(getCarrito(user.id))
        }

    return (
        <div className = "content">
            <div className="categorias">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e)=> handleClick(e)} >
                    <MenuIcon style={{color:'#FFA62B'}}/>
                </Button>
                
                <Menu
                    className='menu'
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} ><Link className='itemList' to='/catalogo/'>Todos</Link></MenuItem>
                    {categories && categories.map(function(e){
                     return <MenuItem key={e.id} onClick={handleClose}><Link className='itemList'to={`/catalogo/${e.id}`}>{e.name}</Link></MenuItem>
                    })}
                </Menu>
                <Link to='/catalogo'>Inicio</Link>
            </div>
            <div>
                <SearchBar
                setSearchApp={setSearchApp}
                />
            </div>
            <div className = "logoconteiner" >
            <Link to='/' > <img className = "logo" src = "https://images.squarespace-cdn.com/content/v1/5b12409c7e3c3aefa533dc9b/1541399363634-4X65VEBY9Y6L21BB877G/ke17ZwdGBToddI8pDm48kAH-rRb1vQpTziZIFTqQBctZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVG5RzxJlIkHE-djMTvjefB_XwQ_QLa2-1fn_ftyfanSTjqWIIaSPh2v08GbKqpiV54/watchuseek-logo.png" /></Link>
            </div>
            {user.id &&
            <div>
                <Link to='/admin'>Admin</Link>
            </div>}

            <div className = "login">
                {!user.id && <Link to='/user'>Registrate</Link> }
                {!user.id && <Link to='/login'>Iniciar sesión</Link>}
                {user.id && <Link to='/login' onClick={()=> dispatch(logoutUser())}>Cerrar sesión</Link>}
                {user.id && <Link onClick = {() => dispatch(getOrdersUser(user))} to='/user/activity'><Avatar alt="Remy Sharp" src="https://img2.freepng.es/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg" /></Link>}
            </div>
            <Link onClick={()=> handleCarrito()} to='/carrito'> 
                <div className='cart'>
                    <ShoppingCartIcon/>
                </div>
            </Link> 
        </div>
    );
};

export default Nav;
