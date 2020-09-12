import axios from 'axios'

// --- CONSTANTES ---
const GET_USERS = 'GET_USERS'
const GET_USER = 'GET_USER'
const LOGOUT_USER = 'LOGOUT_USER'

// --- STATE ---

const initialState = {
    users: [],
    user:{
        email: "",
        password: "",
    }
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

      case LOGOUT_USER:
        return state

      default :
        return {
          ...state,
          user: {
            email: "",
            password: "",
          }
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

export const logoutUser = () => (dispatch) => dispatch({type: LOGOUT_USER})