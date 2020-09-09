import axios from 'axios'

// --- CONSTANTES ---
const GET_CATEGORIES = 'GET_CATEGORIES'
const GET_CATEGORY = 'GET_CATEGORY'
const ADD_CATEGORY = 'ADD_CATEGORY'
const DEL_CATEGORY= 'DEL_CATEGORY'
const UP_CATEGORY = 'UP_CATEGORY'

// --- STATE ---
const initialState = {
    categories:[],
    category:{}
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
      default:
        return state;
    }
  }

// --- ACTIONS ---
export const getCategories = () => async(dispatch, getState) => {
  try{
    const res = await axios.get('http://localhost:3001/category/')
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    })
  }
  catch(error){
    console.log(error)
  }
}

export const getCategory = () => async(dispatch, getState) => {
  try{
    const res = await axios.get('http://localhost:3001/category/:id')
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    })
  }
  catch(error){
    console.log(error)
  }
}

export const addCategory = (data) => {
  return {type:ADD_CATEGORY,
          product:data
      };    
};

export const delCategory = (id)=>{
  return {
      type: DEL_CATEGORY,
      id:id
  };
};

export const upCategory = (id,data)=>{
  return {
      type: UP_CATEGORY,
      id: id,
      product:data
  };
};
  