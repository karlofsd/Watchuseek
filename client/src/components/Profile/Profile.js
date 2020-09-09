import React from "react";
import "./Profile.css";

const Profile = () => {
    return (
        <div className = "contentProfile">
            <div><h2 className= "adminAdmin" >Admin</h2></div>
            <img className = "logoProfile" src = "https://image.flaticon.com/icons/svg/1321/1321737.svg"/> <br/>
            <h3 className= "nombreAdmin" >• Nombre completo: Administrador Admin</h3>
            <h3 className= "numeroAdmin" >• Numero de cuenta: #01</h3>
            <h3 className= "mailAdmin">• Correo: nombreadmin@watchuseek.com</h3>
        </div>
    )
};

export default Profile;