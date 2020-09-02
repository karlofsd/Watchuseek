import React from "react";
import SearchBar from "../searchBar/searchBar.js";
import "./Nav.css";

const Nav = () => {

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
                <div>
                <a href = "#" ><img className = "user" alt = "user" src ="https://f1.pngfuel.com/png/169/1023/715/login-logo-user-users-group-customer-education-button-typeface-credential-png-clip-art.png"/></a>
            </div>
            </div>
            <div >
                <a href = "#"><img className = "user" src = "https://w7.pngwing.com/pngs/1022/32/png-transparent-shopping-cart-icon-shopping-cart-logo-icon-shopping-cart-label-coffee-shop-shopping-mall.png"/></a>
            </div>
        </div>
    );
};

export default Nav;