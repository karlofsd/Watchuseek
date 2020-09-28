import React, { useState, useEffect } from 'react';
import axios from "axios";
import "./user.css";
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect } from 'react-router-dom';
import { signUp, authGoogle, cleanMessage } from '../../Redux/users';
import { loadAuth2 } from 'gapi-script';
import { useAlert } from "react-alert";

const User = ({ history }) => {
  const alert = useAlert();
  const user = useSelector(store => store.users.user);
  const [displayPassword, setValue] = useState(false);

  const dispatch = useDispatch()

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: ""
  });

  useEffect(() => {
    if (user.token) {
      history.push('/')
    }

    return () => dispatch(cleanMessage())

  }, [user])

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
      email: "",
      password: ""
    })
  }

  const handleCreate = () => {
    const dataPost = {
      username: input.username,
      email: input.email,
      password: input.password,
      isAdmin: false
    };

    if (input.username && input.email && input.password) {
      dispatch(signUp(dataPost))
      alert.success('A new user was added!');
      // history.push('/login');
    }
  }

  const attachSignUp = (element, auth2) => {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        dispatch(authGoogle(googleUser));
        element.removeEventListener('onclick');
      }, (error) => {
        console.log(JSON.stringify(error))
      });
  }

  useEffect(() => {
    if (displayPassword) {
      document.querySelector('#password').focus();
    }
  }, [displayPassword])

  useEffect(() => {
    const getApiGoogle = async () => {
      const CLIENT_GOOGLE = '1033383039118-g83u02eedeib2he6dhcbgua72vohhq9k.apps.googleusercontent.com';
      let auth2 = await loadAuth2(CLIENT_GOOGLE, '');
      attachSignUp(document.querySelector('#btn-register-google'), auth2);
    }

    getApiGoogle();
  }, [])

  return (
    <div className='container mt-2'>
      <div class="signup-form">
        <form className='shadow' onSubmit={(e) => handleSubmit(e)}>
          <h3>Register</h3>
          <h6 class="hint-text">Create your account. It's free.</h6>
          <button onClick={e => e.preventDefault()} class="btn btn-block btn-outline-danger" id='btn-register-google'> <i className="fab fa-google-plus-g"></i>   Register via Google </button>
          <hr />
          <div class="form-group">
            <input type="text" class="form-control" name="username" onChange={(e) => handleInputChange(e)} value={input["username"]} placeholder="Username" required autoComplete="off" autoFocus/>
          </div>
          <div class="form-group">
            <input type="email" class="form-control" name="email" onChange={(e) => handleInputChange(e)} value={input["email"]} placeholder="Email" required autoComplete="off" />
          </div>
          <div class="form-group">
            <input type={displayPassword ? 'text' : 'password'} class="form-control" name="password" id='password' onChange={(e) => handleInputChange(e)} value={input["password"]} placeholder="Password" required autoComplete="off" />
          </div>
          <div class="form-group form-check">
            <label onClick={() => setValue(displayPassword ? false : true)} class="form-check-label" for="checkPass">
            <input type="checkbox" class="form-check-input" id="checkPass" />
            {displayPassword ? 'Hide password' : 'Show password'}
            </label>
          </div>
          <div class="form-group">
            <button onClick={(e) => handleCreate(e)} class="btn btn-lg btn-block bg-watchuseek">Register Now</button>
          </div>
        </form>
        <div class="text-center">Already have an account? <Link className='ml-2 text-info' to='/login'>Sign in</Link>
        </div>
      </div>
    </div>
  )
}

export default User;