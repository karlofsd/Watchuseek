import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authGoogle, loginUser, validation, cleanError } from "../../Redux/users.js";
import { Link } from 'react-router-dom';
import "./Login.css";
import { loadAuth2 } from 'gapi-script';

const Login = ({ history }) => {
  const user = useSelector(store => store.users.user)
  const error = useSelector(store => store.users.error)
  const [displayPassword, setValue] = useState(false);
  const [input, setInput] = useState({
    username: '',
    password: ""
  });

  const dispatch = useDispatch();

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

  const handleLogin = () => {
    if (input.password && input.username) {
      dispatch(loginUser(input))
    }
  }

  const attachSignin = (element, auth2) => {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        dispatch(authGoogle(googleUser));
        element.removeEventListener('onclick');
      }, (error) => {
        console.log(JSON.stringify(error))
      });
  }

  useEffect(() => {
    const getApiGoogle = async () => {
      const CLIENT_GOOGLE = '1033383039118-g83u02eedeib2he6dhcbgua72vohhq9k.apps.googleusercontent.com';
      let auth2 = await loadAuth2(CLIENT_GOOGLE, '');
      attachSignin(document.querySelector('#btn-google'), auth2);
    }

    getApiGoogle();
  }, [])

  useEffect(() => {
    if (user.token) {
      history.push('/')
    }

    if (error) {
      setInput({
        username: '',
        password: ''
      });
    }

  }, [error, user])

  useEffect(() => {
    if (displayPassword) {
      document.querySelector('#password').focus();
    }
  }, [displayPassword])

  useEffect(() => {
    return () => dispatch(cleanError())
  }, [])

  return (
    <div className='container mt-2'>
      <div class="signin-form">
        <form className='shadow pb-4' onSubmit={(e) => handleSubmit(e)}>
          <h3>Sign in</h3>
          <h6 class="hint-text">Welcome back!</h6>
          <button onClick={(e) => e.preventDefault()} class="btn btn-block btn-outline-danger" id='btn-google'> <i className="fab fa-google-plus-g"></i>   Login via Google </button>
          <hr />
          {
            error && <div className='mx-auto text-center'><span className='text-center text-danger mb-1'>{error}</span></div>
          }
          <div class="form-group">
            <input type="text" class="form-control" name="username" onChange={(e) => handleInputChange(e)} value={input["username"]} placeholder="Username" required autoComplete="off" autoFocus />
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
          <div class="form-group row">
            <div class="col-6">
              <div class="form-group m-0 p-0">
                <button type="submit" class="btn bg-watchuseek btn-block" onClick={() => handleLogin()}> Login  </button>
              </div>
            </div>
            <div class="col-6 text-right">
              <Link class="small text-info" to='/forgotpassword'>Forgot password ?</Link>
            </div>
          </div>
        </form>
        <div class="text-center">You are not registered? <Link className='ml-2 text-info' to='/signup'>Sign up</Link>
        </div>
      </div>
    </div>
  )
}

export default Login;