import React, {useState,useCallback,useEffect} from "react";
import SearchBar from "../searchBar/searchBar.js";
import "./Nav.css";
import {Avatar,Button,MenuItem,Menu} from '@material-ui/core'
import {Link} from "react-router-dom";
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import Categories from "../Categories/Categories.js";

const Nav = () => {
    // const categoria = [{name: "Mujer",id:1}, 
    // {name:"Hombre",id:2}, {name: "Acero",id:3}, 
    // {name: "Acero y Oro",id:4}, 
    // {name: "Oro",id:5}, {name: "Relojes engastados",id:6}]
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [categories, setCategories] = useState([]); 


    useEffect(async ()=>{
        let cate = await fetch("http://localhost:3001/category");
        let data = await cate.json();
        setCategories(data);
    },[]);

    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <div className = "content">
            <div className="categorias">
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={(e)=> handleClick(e)} >
                 <a href='#'>
                    <MenuIcon/>
                 </a>
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
                    {categories.map(function(e){
                     return <MenuItem key={e.id} onClick={handleClose}><Link className='itemList'to={`/catalogo/${e.id}`}>{e.name}</Link></MenuItem>
                    })}
                </Menu>
                <Link to='/catalogo'>Inicio</Link>
            </div>
            <div>
                <SearchBar/>
            </div>
            <div className = "logoconteiner" >
                <img className = "logo" src = "https://images.squarespace-cdn.com/content/v1/5b12409c7e3c3aefa533dc9b/1541399363634-4X65VEBY9Y6L21BB877G/ke17ZwdGBToddI8pDm48kAH-rRb1vQpTziZIFTqQBctZw-zPPgdn4jUwVcJE1ZvWEtT5uBSRWt4vQZAgTJucoTqqXjS3CfNDSuuf31e0tVG5RzxJlIkHE-djMTvjefB_XwQ_QLa2-1fn_ftyfanSTjqWIIaSPh2v08GbKqpiV54/watchuseek-logo.png" />
            </div>
            <div>
            <Link to='/CrudForm'>CrudForm</Link>
            </div>

            <div className = "login">
                <Link to='/crud'>Crud</Link>
                <a href = "#" >Registrate</a>
                <a href = "#" >Iniciar sesión</a>
                {/* <div>
                    <a href = "#" ><img className = "user" alt = "user" src ="https://f1.pngfuel.com/png/169/1023/715/login-logo-user-users-group-customer-education-button-typeface-credential-png-clip-art.png"/></a>
                </div> */}
                <Avatar alt="Remy Sharp" src="https://img2.freepng.es/20180623/iqh/kisspng-computer-icons-avatar-social-media-blog-font-aweso-avatar-icon-5b2e99c40ce333.6524068515297806760528.jpg" />
            </div>
            <div className='cart'>
                {/* <a href = "#">
                    <img className = "user" src = "https://w7.pngwing.com/pngs/1022/32/png-transparent-shopping-cart-icon-shopping-cart-logo-icon-shopping-cart-label-coffee-shop-shopping-mall.png"/>
                </a> */}
                <ShoppingCartIcon />
            </div>
        </div>
    );
};

export default Nav;
