
import React, {Fragment, useState} from "react";
import SearchBar from "../searchBar/searchBar.js";
import "./Nav.css";
import {Avatar,Button,MenuItem,Menu,Badge} from '@material-ui/core'
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import {useDispatch,useSelector} from "react-redux";
import {getCarrito} from "../../Redux/carrito.js";
import {getOrdersUser} from "../../Redux/orders.js";
import {logoutUser} from "../../Redux/users";
import axios from "axios";


const Nav = ({setSearchApp, categories,user}) => {
    const dispatch = useDispatch()
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchor, setAnchor] = useState(null)
    const cart = useSelector(store => store.carrito.carrito)

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClock = (event) => {
        setAnchor(event.currentTarget)
    }

    const handleCloser = () => {
        setAnchor(null)
    }


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
        <div className="content nav-background-color">
            <div className="categorias">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e) => handleClick(e)} >
                    <MenuIcon style={{ color: '#FFA62B' }} />
                </Button>

                <Menu
                    className='menu'
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} ><Link className='itemList' to='/catalogo/'>All</Link></MenuItem>
                    {categories && categories.map(function(e){
                     return <MenuItem key={e.id} onClick={handleClose}><Link className='itemList'to={`/catalogo/${e.id}`}>{e.name}</Link></MenuItem>
                    })}
                </Menu>
                <Link to='/catalogo'>Watches</Link>
            </div>
            <div>
                <SearchBar
                    setSearchApp={setSearchApp}
                />
            </div>
            <div className="logoconteiner" >
                <Link to='/' > <img className="logo" src="https://images.squarespace-cdn.com/content/v1/5b12409c7e3c3aefa533dc9b/1541399363634-4X65VEBY9Y6L21BB877G/ke17ZwdGBToddI8pDm48kAH-rRb1vQpTziZIFTqQBctZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVG5RzxJlIkHE-djMTvjefB_XwQ_QLa2-1fn_ftyfanSTjqWIIaSPh2v08GbKqpiV54/watchuseek-logo.png" /></Link>
            </div>
            <div className='left-nav'>
            <div className='links' style={{display:'flex',flexDirection:'row',justifyContent:'space-evenly',alignItems:'center',width:'250px',margin:0,padding:0}}>
                {/* {user.isAdmin && <Link to='/admin'>Admin</Link>} */}
                {!user.id && <Link to='/signup'>Sign up</Link> }
                {!user.id && <Link to='/login'>Log in</Link>}
                {user.id && <label style={{margin:0,color:'white'}}>¡Hello,  {user.name || user.username}!</label>}
            </div>

            <div className = "login">
                
                {/* {user.id && <Link to='/login' onClick={()=> dispatch(logoutUser())}>Cerrar sesión</Link>} */}
               {user.id && <Button aria-controls="fade-menu" aria-haspopup="true" onClick={(e)=> handleClock(e)} >
                <Avatar className='avtar' alt="Remy Sharp" src={user.image ? user.image : "https://img2.freepng.es/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg"} />
               </Button> 
               }
                <Menu
                  className='menu2'
                  id="simple-menu2"
                  anchorEl={anchor}
                  keepMounted
                  open={Boolean(anchor)}
                  onClose={handleCloser}
                >

               {!user.isAdmin && <MenuItem onClick={handleCloser} ><Link onClick = {() => dispatch(getOrdersUser(user))} className='itemList' to='/user'>Panel</Link></MenuItem>}
               {user.isAdmin && <MenuItem onClick={handleCloser} ><Link className='itemList' to='/admin' >Admin</Link></MenuItem>}
               <MenuItem onClick={handleCloser} ><Link to='/login' onClick={()=> dispatch(logoutUser())} className='itemList'>Log Out</Link></MenuItem>

               </Menu>
                {/* {user.id && <Link onClick = {() => dispatch(getOrdersUser(user))} to='/user/activity'><Avatar alt="Remy Sharp" src="https://img2.freepng.es/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg" /></Link>} */}
            </div>
            <Link onClick={()=> handleCarrito()} to='/carrito'> 
                <Badge badgeContent={cart.length} color='error'>
                    <div className='cart'>
                        <ShoppingCartIcon/>
                    </div>
                </Badge>
            </Link> 
            </div>
        </div>
    );
};

export default Nav;
