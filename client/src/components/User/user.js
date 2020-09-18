import React, {useState,useEffect} from 'react';
import axios from "axios";
import "./user.css";
import {useDispatch, useSelector} from 'react-redux'
import {signUp} from '../../Redux/users'

const User =({history})=>{
    const message = useSelector(store => store.users.message)
    const dispatch = useDispatch()

    const [input, setInput] = useState({
        username: "",
        email: "",
        password: ""
  });

  useEffect(()=>{
    if(message){
      history.push('/login')
    }
  },[message])
    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
        setInput({
          username:"",
          email: "",
        password: ""
        })
      }

      const handleCreate= ()=>{
        const dataPost = {
          username:input.username,
          email: input.email,
          password: input.password
        };
        dispatch(signUp(dataPost))
        alert('Agregado correctamente');
     }

    return(
      <div className='divmayor'>
        <div className = "contentUser">
            <form className = "formUser" onSubmit={(e)=>handleSubmit(e)}>
              <h1 className='titulo'>Crear usuario</h1>
              <div className = "divLogin" >
              <label className='labelemail' >Username</label><br/>
              <input placeholder='Ej. nombre123' className='inputemail' type="text" autoComplete = "off" name = "username" onChange={(e) =>handleInputChange(e)} value = {input["username"]}  />
            </div>
                <div className = "divLogin">
               <label className='labelemail'>User Email</label> <br/>   
         <input placeholder='   email@mail.com' className='inputemail' type="email" autoComplete = "off" name = "email" onChange={(e) =>handleInputChange(e)} value = {input["email"]} />
                </div>
                <div>
                <label className='labelemail' >User Password</label> <br/>    
         <input placeholder='   your_password' className='inputemail' type = "password" autoComplete = "off" name = "password" onChange={(e) =>handleInputChange(e)} value = {input["password"]} />
                </div>
             <button className = "btnUser" onClick={(e)=>handleCreate(e)}>Aceptar</button>
            </form>
        </div>
        </div>
    )
}

export default User;