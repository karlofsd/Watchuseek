import React from "react";
import SearchBar from "../searchBar/searchBar.js";
import "./Nav.css";
import {Avatar,Button,Badge,ButtonGroup,MenuItem,Menu} from '@material-ui/core'
import {Link} from "react-router-dom"
import { withStyles } from '@material-ui/core/styles';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const Nav = () => {
    const categoria = [{name: "Mujer",id:1}, 
    {name:"Hombre",id:2}, {name: "Acero",id:3}, 
    {name: "Acero y Oro",id:4}, 
    {name: "Oro",id:5}, {name: "Relojes engastados",id:6}]
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    return (
        <div className = "content">
            <div className = "logoconteiner" >
                <img className = "logo" src = "https://static.dribbble.com/users/559871/screenshots/4751426/shopping_cart.jpg" />
            </div>
            <div>
                <SearchBar/>
            </div>
            <div className = "login">
                <a href = "#" >Registrate</a>
                <a href = "#" >Iniciar sesión</a>
                {/* <div>
                    <a href = "#" ><img className = "user" alt = "user" src ="https://f1.pngfuel.com/png/169/1023/715/login-logo-user-users-group-customer-education-button-typeface-credential-png-clip-art.png"/></a>
                </div> */}
                <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                <Link to='/crud'> Crud</Link>
            </div>
            
            <div className='cart'>
                
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                 <a href='#'>Categoria</a>
                </Button>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}><Link to='/catalogo/'>Todos</Link></MenuItem>
                    {categoria.map(function(e){
                     return <MenuItem onClick={handleClose}><Link to={`/catalogo/${e.id}`}>{e.name}</Link></MenuItem>
                    })}

                </Menu>
                {/* <a href = "#">
                    <img className = "user" src = "https://w7.pngwing.com/pngs/1022/32/png-transparent-shopping-cart-icon-shopping-cart-logo-icon-shopping-cart-label-coffee-shop-shopping-mall.png"/>
                </a> */}
                
                    
                <ShoppingCartIcon />
                    
                
            </div>
        </div>
    );
};

export default Nav;