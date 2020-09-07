import React from "react";
import "./Profile.css";

const Profile = () => {
    return (
        <div className = "contentProfile">
            <div><h2 className= "h2Profile" >Admin</h2></div>
            <img className = "logoProfile" src = "https://image.flaticon.com/icons/svg/1321/1321737.svg"/> <br/>
            <h3 className= "nombreAdmin" >Nombre completo: Administrador Admin</h3>
            <h3 className= "numeroAdmin" >Numero de cuenta: #01</h3>
            <h3 className= "mailAdmin">Correo: nombreAdmin@watchuseek.com</h3>
        </div>
    )
};

export default Profile;