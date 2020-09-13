import React,{useState} from "react";
import {useDispatch} from "react-redux";
import {getUser} from "../../Redux/users/users.js";
import "./Login.css";

const Login = () => {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        email: "",
        password: ""
  });

 
    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      }

    return (
      <div className='divlogin'>
        <div className = "contentLogin">
        <form className = "formLogin" onSubmit={(e)=>handleSubmit(e)}>
            <h1 className='login1'>Iniciar Sesion</h1>
            <div className = "divLogin">
           <label className='emaillogin' >User Email</label><br/>        
     <input placeholder='  email@mail.com' className='inputlogin' type="email" autoComplete = "off" name = "email" onChange={(e) =>handleInputChange(e)} value = {input["email"]} />
            </div>
            <div>
            <label className='emaillogin' >User Password</label><br/>    
     <input  placeholder='  your_password' className='inputlogin' type = "password" autoComplete = "off" name = "password" onChange={(e) =>handleInputChange(e)} value = {input["password"]} />
            </div>
         <button className = "btnLogin" onClick={(e)=> dispatch(getUser(input.email))}>Iniciar sesión</button>
        </form>
    </div>
    </div>
    )
}

export default Login;