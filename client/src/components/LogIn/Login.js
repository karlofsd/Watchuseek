import React,{useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {getUser,logoutUser} from "../../Redux/users/users.js";
import "./Login.css";

const Login = () => {
    const user = useSelector(store => store.users.user)
    const dispatch = useDispatch()
    const name = (mail) => mail.split('@')[0]
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
        setInput({
          email: "",
          password: ""
        })
      }

    return (
      <div className='divlogin'>
        <div className = "contentLogin">
        {!user.id && <form className = "formLogin" onSubmit={(e)=>handleSubmit(e)}>
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
        </form>}
        {user.id && <form className = "formLogin" onSubmit={(e)=>handleSubmit(e)}>
          <h1 className='login1'>Hola {name(user.email)}!</h1> 
          <button className = "btnLogin" onClick={(e)=> dispatch(logoutUser())}>Cerra sesión</button>
        </form>}  
    </div>
    </div>
    )
}

export default Login;