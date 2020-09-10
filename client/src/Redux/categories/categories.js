import axios from 'axios'

// --- CONSTANTES ---
const GET_CATEGORIES = 'GET_CATEGORIES';
const GET_CATEGORY = 'GET_CATEGORY';
const RESET_CATEGORY = "RESET_CATEGORY";

// --- STATE ---
const initialState = {
    categories:[],
    category:{
        name: "",
        description: "",
    }
  };

// --- REDUCER ---
export default function categoryReducer(state = initialState, action) {
    switch (action.type) {
      case GET_CATEGORIES : 
        return {
          ...state,
          categories: action.payload
        }

      case GET_CATEGORY: 
       return {
         ...state,
         category: action.payload
       } 
       
       case RESET_CATEGORY: 
        return state

      default:
        return {
          ...state,
          category:{
            name: "",
            description: "",
          }
        }
    }
  }

// --- ACTIONS ---
export const getCategories = () => async(dispatch, getState) => {
  try{
    const {data} = await axios.get('http://localhost:3001/category')
    dispatch({
      type: GET_CATEGORIES,
      payload: data
    })
  }
  catch(error){
    console.log(error)
  }
}

export const getCategory = () => async(dispatch, getState) => {
  try{
    const {data} = await axios.get('http://localhost:3001/category/:id')
    dispatch({
      type: GET_CATEGORY,
      payload: data
    })
  }
  catch(error){
    console.log(error)
  }
}

export const resetCategory = () => (dispatch) => dispatch({type: RESET_CATEGORY})