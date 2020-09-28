import React from 'react';
import { useState } from "react";
import axios from 'axios'
import "./resetPassword.css"

export function validate(input) {
    let errors = {};
    if(!input.password){
      errors.password = 'Password is required';
    }else if(input.passwordone !== input.password){
      errors.password = 'Passwords are not the same ';
    }
  
    return errors;
  };
  
  const ResetPassword = (resetLink) => {
    const [errors, setErrors] = useState({});
    
    const [input, setInput] = useState({
      passwordone: "",
      password: "",
    }
    )
  
    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]: e.target.value
      });
  
      setErrors(validate({
        ...input,
        [e.target.name]: e.target.value
      }));
    }
  
    const handleSubmit = async(e) => {
      e.preventDefault();
      let info = {
        resetLink: resetLink,
        newPassword: input.secondpassword,
    }
    const { data } = await axios.put(`http://localhost:3001/auth/reset-password`, info)
    }
  
    return (
      <form className="contentReset" onSubmit={handleSubmit} >
        <h1 style={{ marginBottom: "30px" }}>Reset password</h1>
          <label>Enter your new password</label>
          <input autocomplete= "off" type="text" name="passwordone" className="resetInput" onChange={(e) =>handleInputChange(e)} value = {input["passwordone"]} />

          <label>Repeat password</label>
          <input autocomplete= "off" type="password" name="password" className="resetInput" onChange = {(e) => handleInputChange(e)} value= {input["password"]} />
          {errors.password && (
        <p className="danger">{errors.password}</p>
      )}
          <button disabled= {errors.password && "disabled"} className="resetbtn" type="submit" name="submit" onSubmit = {(e) => handleSubmit(e)}>Send</button>
      </form>
    )
  }

export default ResetPassword;
