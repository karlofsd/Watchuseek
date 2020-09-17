import React,{useEffect, useState} from "react";
import {useDispatch,useSelector} from "react-redux";
import {loginUser} from "../../Redux/users/users.js";
import "./Login.css";

const Login = ({history}) => {
    const user = useSelector(store => store.users.user)
    const error = useSelector(store => store.users.error)
    const dispatch = useDispatch()
    const name = (mail) => mail.split('@')[0]
    const [input, setInput] = useState({
        username:'',
        password: ""
  });
 
  useEffect(()=>{
    if(user.token){
      history.push('/')
    }
  },[error,user])

    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
          username: "",
          password: ""
        })
      }

    return (
      <div className='divlogin'>
        <div className = "contentLogin">
        {!user.id && <form className = "formLogin" onSubmit={(e)=>handleSubmit(e)}>
            <h1 className='login1'>Iniciar Sesion</h1>
            <div className = "divLogin" >
              <label className='emaillogin' >Username</label>
              <input placeholder='Ej. nombre123' className='inputlogin' type="text" autoComplete = "off" name = "username" onChange={(e) =>handleInputChange(e)} value = {input["username"]}  />
            </div>
            {/* <div className = "divLogin">
           <label className='emaillogin' >User Email</label><br/>        
     <input placeholder='  email@mail.com' className='inputlogin' type="email" autoComplete = "off" name = "email" onChange={(e) =>handleInputChange(e)} value = {input["email"]} />
            </div> */}
            <div>
            <label className='emaillogin' >User Password</label><br/>{error&&<span>{error}</span>}
     <input  placeholder='  your_password' className='inputlogin' type = "password" autoComplete = "off" name = "password" onChange={(e) =>handleInputChange(e)} value = {input["password"]} />
            </div>
         <button className = "btnLogin" onClick={(e)=> dispatch(loginUser(input))}>Iniciar sesión</button>
        </form>}
    </div>
    </div>
    )
}

export default Login;