import React, {useState} from 'react';
import axios from "axios";
import "./user.css";


const User =()=>{
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

      const handleCreate= async(e)=>{
          e.preventDefault()
        const urlApi = 'http://localhost:3001/user';
        const dataPost = {
          email: input.email,
          password: input.password
        };

        await axios.post(urlApi , dataPost);
        alert('Agregado correctamente');
     }

    return(
      <div className='divmayor'>
        <div className = "contentUser">
            <form className = "formUser" onSubmit={()=>handleSubmit()}>
              <h1 className='titulo'>Crear usuario</h1>
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