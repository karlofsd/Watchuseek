import axios from 'axios'

// --- CONSTANTES ---
const GET_USERS = 'GET_USERS'
const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'
const LOGIN_USER = 'LOGIN_USER'
const SET_USER = 'SET_USER'
const ERROR_LOGIN= 'ERROR_LOGIN'
const SIGN_UP = 'SIGN_UP'

// --- STATE ---

const initialState = {
    users: [],
    user:{
        id:"",
        email: "",
        password: "",
    },
  };

// --- REDUCER ---
export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case GET_USERS : 
        return {
          ...state,
          users: action.payload
        }

      case GET_USER: 
       return {
         ...state,
         user: action.payload
       }

      case SET_USER:
        return {
          ...state,
          user:action.payload
        }
      
      case SIGN_UP:
        return {
          ...state,
          message: 'Usuario creado.'
        } 
      case ERROR_LOGIN:
        return {
          ...state,
          error: 'Usuario o contraseña incorrectos.'
        }

      case LOGOUT_USER:
        return {
          ...state,
          user: {
            username:'',
            email: "",
            password: "",
          }
        }

      default :
        return {
          ...state,
        };
    } 
  }

// --- ACTIONS ---
export const getUsers = () => async(dispatch, getState) => {
  try{
    const {data} = await axios.get('http://localhost:3001/user')
    dispatch({
      type: GET_USERS,
      payload: data
    })
  }
  catch(error){
    console.log(error)
  }
  
}

export const getUser = (email) => async(dispatch, getState) => {
  try{
    const {data} = await axios.get(`http://localhost:3001/user/${email}`)
    dispatch({
      type: GET_USER,
      payload: data
    })
  }
  catch(error){
    console.log(error)
  
 }
}

export const loginUser = (user) => (dispatch,getState) => {
  try{
    
    axios.post('http://localhost:3001/auth/login',user)
    .then(user =>{
      localStorage.setItem("token", user.data.token);
      localStorage.setItem("user", user);
      dispatch({
        type: SET_USER,
        payload: user.data
      })
    })
    .catch(()=> {
      dispatch({
        type: ERROR_LOGIN,
      })
    })
    
  }
  catch(error){
    console.log(error)
  }
}

export const signUp = (datos) => async(dispatch) => {
  try{
    const {data} = await axios.post('http://localhost:3001/user',datos)
    dispatch({
      type: SIGN_UP,
      payload: data
    })
  }catch(error){
    console.log(error)
  }
}

export const validation = () => async (dispatch) => {
  try {
    const token = localStorage.getItem("token");
    if(token){
      
      const config = {
        headers: {
          'Authorization': 'Bearer ' +  token
        }
      };

      const {data} = await axios.get('http://localhost:3001/auth/me', config);

      dispatch({
        type: SET_USER,
        payload: data.user
      });
    }
    
  } catch (error) {
    console.log(error);
  };
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({type: LOGOUT_USER})
}