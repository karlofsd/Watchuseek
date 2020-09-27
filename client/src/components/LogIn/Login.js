import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginGoogle, loginUser, validation } from "../../Redux/users.js";
import "./Login.css";
import {axios} from "axios";

const Login = ({ history }) => {
  const user = useSelector(store => store.users.user)
  const error = useSelector(store => store.users.error)
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    username: '',
    password: ""
  });
  useEffect(() => {
    if (user.token) {
      history.push('/')
    }
  }, [error, user])

  const handleInputChange = function (e) {
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

  /* function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  } */

  return (
    <div className='divlogin'>
      <div className="contentLogin">
        <form className="formLogin" onSubmit={(e) => handleSubmit(e)}>
          <h1 className='login1'>Log In</h1>
          <div className="divLogin" >
            <label className='emaillogin' >Username</label>
            <input placeholder='Ej. nombre123' className='inputlogin' type="text" autoComplete="off" name="username" onChange={(e) => handleInputChange(e)} value={input["username"]} />
          </div>
          <div>
            <label className='emaillogin' >User Password</label><br />{error && <span>{error}</span>}
            <input placeholder='  your_password' className='inputlogin' type="password" autoComplete="off" name="password" onChange={(e) => handleInputChange(e)} value={input["password"]} />
          </div>
          <button className="btnLogin" onClick={(e) => dispatch(loginUser(input))}>Log In</button>
          
        </form>
        <div>
          <button type="button" className="g-signin2 btn btn-gplus" data-onsuccess="onSignIn" ><i className="fab fa-google-plus-g pr-1"></i> Sign in</button>
          {/* <button className={"g-signin2 btn-secondary btn"} data-onsuccess="onSignIn">Sign in</button> */}
          
          <a href="javascript:signOut()">Sign out</a>
        </div>
      </div>
    </div>
  )
}

export default Login;