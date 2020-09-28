import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './resetPassword.css';
import { resetPassword, cleanMessageResetPassword } from '../../Redux/users'

const ResetPassword = ({ token }) => {
  const resetPasswordMessage = useSelector(store => store.users.reset_password)
  const [input, setInput] = useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [displayPasswords, setDisplay] = useState(false);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setInput({
      newPassword: '',
      confirmPassword: ''
    })
  }

  const handleInputChange = function (e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
  }

  const handleResetPassword = async () => {
    if (input.newPassword === input.confirmPassword) {
      dispatch(resetPassword(input.newPassword, token));
    }
  }

  useEffect(() => {
    if (displayPasswords) {
      document.querySelector('#confirmPassword').focus();
    }
  }, [displayPasswords])

  useEffect(() => {
    return () => dispatch(cleanMessageResetPassword())
  }, [])

  return (
    <div className='container mt-2'>
      <div class="resetPassword-form">
        <form className='shadow pb-4' onSubmit={(e) => handleSubmit(e)}>
          <h3>Reset password</h3>
          <h6 class="hint-text">Enter your new password below!</h6>
          <hr />
          {
            resetPasswordMessage && <div className='mx-auto text-center'><span className={resetPasswordMessage.ok === true ? 'text-success' : 'text-danger'}>{resetPasswordMessage.message}</span></div>
          }
          <div class="form-group">
            <input type={displayPasswords ? 'text' : 'password'} class="form-control" id='newPassword' name="newPassword" onChange={(e) => handleInputChange(e)} value={input['newPassword']} placeholder="New password" required autoComplete="off" autoFocus />
          </div>
          <div class="form-group">
            <input type={displayPasswords ? 'text' : 'password'} class="form-control" id='confirmPassword' name="confirmPassword" onChange={(e) => handleInputChange(e)} value={input['confirmPassword']} placeholder="Confirm password" required autoComplete="off" />
          </div>
          <div class="form-group form-check">
            <label onClick={() => setDisplay(displayPasswords ? false : true)} class="form-check-label" htmlFor="checkPass">
              <input type="checkbox" class="form-check-input" id="checkPass" />
              {displayPasswords ? 'Hide passwords' : 'Show passwords'}
            </label>
          </div>
          <div class="form-group">
            <button onClick={() => handleResetPassword()} class="btn btn-lg btn-block bg-watchuseek">Reset password</button>
          </div>
        </form>
        <span class="text-center float-left"> <Link className='ml-2 text-info' to='/login'>Back to Login</Link>
        </span>
        <div class="text-center float-right"><Link className='ml-2 text-info' to='/signup'>Register</Link>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword
