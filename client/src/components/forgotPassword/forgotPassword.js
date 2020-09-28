import React, {Fragment} from "react";
import {useState} from "react";
import axios from "axios";
import "./forgotPassword.css"

const ForgotPassword = ({resetLink}) => {
  
    const [email, setEmail] = useState();

   const onChangeMail=(e)=>{
     e.preventDefault()
     setEmail(e.target.value)
    }
  
   const onSubmit =async (e)=>{
       e.preventDefault()
       const {data} = await axios.put(`http://localhost:3001/auth/forgot-password`,{email})   
   }
  
   
    return (
        <Fragment>
        <form className = "contentForgot" onSubmit={(e)=> onSubmit(e)} >
              <h3>If you have forgotten your password, enter your email address.</h3>
             <input className = "forgotInput" placeholder = "Enter your email here. " type='email' onChange={(e)=>onChangeMail(e)} value={email} />
          <button className = "btnforgot" type='submit' > Send </button>
         </form>  
        </Fragment>
    )
}

export default ForgotPassword;
