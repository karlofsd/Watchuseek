import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import './forgotPassword.css';
import { Link, Redirect } from 'react-router-dom';
import { recoverPassword, cleanMessageForgotPassword } from '../../Redux/users'
import axios from 'axios';

const ForgotPassword = () => {
  const forgotPassword = useSelector(store => store.users.forgot_password)
  const [input, setInput] = useState({
    email: ""
  });

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      email: ''
    })
  }

  const handleInputChange = function (e) {
    setInput({
      email: e.target.value
    });
  }

  const handleRecoverPassword = async () => {
    if (input.email) {
      dispatch(recoverPassword(input));
    }
  }

  useEffect(() => {
    document.querySelector('#email').focus();
  },[forgotPassword])

  useEffect(() => {
    return () => dispatch(cleanMessageForgotPassword())
  }, [])

  return (
    <div className='container mt-2'>
      <div class="forgotPassword-form">
        <form className='shadow pb-4' onSubmit={(e) => handleSubmit(e)}>
          <h3>Recover password</h3>
          <h6 class="hint-text">Enter your address below to begin the reset process.</h6>
          <hr />
          {
            forgotPassword && <div className='mx-auto text-center'><span className={forgotPassword.ok === true ? 'text-success' : 'text-danger'}>{forgotPassword.message}</span></div>
          }
          <div class="form-group">
            <input type="email" class="form-control" id='email' name="email" onChange={(e) => handleInputChange(e)} value={input['email']} placeholder="Email" required autoComplete="off" autoFocus />
          </div>
          <div class="form-group">
            <button onClick={() => handleRecoverPassword()} class="btn btn-lg btn-block bg-watchuseek">Email me a recovery link</button>
          </div>
        </form>
        <span class="text-center float-left"> <Link className='ml-2 text-info' to='/login'>Want to Login?</Link>
        </span>
        <div class="text-center float-right"><Link className='ml-2 text-info' to='/signup'>Create an Account?</Link>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
