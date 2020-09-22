import React from "react";
import "./Profile.css";

// import 

const Profile = ({user}) => {

console.log(user)

    return (
        <div className = "contentProfile">
            <div><h2 className= "adminAdmin" >Admin</h2></div>
            <img className = "logoProfile" src = "https://image.flaticon.com/icons/svg/1321/1321737.svg"/> 
            <br/>
            <br/>
            <h3 className= "nombreAdmin" >• Nombre completo: {user.email.split('@')[0]}</h3>
            <h3 className= "mailAdmin">• Correo: {user.email}</h3>
        </div>
    )
};

export default Profile;