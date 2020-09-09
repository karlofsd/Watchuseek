import axios from 'axios'

// --- CONSTANTES ---
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const ADD_PRODUCT = 'ADD_PRODUCT'
const DEL_PRODUCT= 'DEL_PRODUCT'
const UP_PRODUCT = 'UP_PRODUCT'

// --- STATE ---
const initialState = {
    products:[],
    product:{}
  };

// --- REDUCER ---
export default function productReducer(state = initialState, action) {
    switch (action.type) {
      case GET_PRODUCTS : 
        return {
          ...state,
          products: action.payload
        }

      case GET_PRODUCT: 
       return {
         ...state,
         product: action.payload
       }  
      default:
        return state;
    } 
  }

// --- ACTIONS ---
export const getProducts = () => async(dispatch, getState) => {
  try{
    const {data} = await axios.get('http://localhost:3001/products')
    dispatch({
      type: GET_PRODUCTS,
      payload: data
    })
    console.log(data)
  }
  catch(error){
    console.log(error)
  }
  
}

export const getProduct = () => async(dispatch, getState) => {
  try{
    const res = await axios.get('http://localhost:3001/products/:id')
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    })
  }
  catch(error){
    console.log(error)
  }
}

export const addProduct = (data) => {
  return {
        type:ADD_PRODUCT,
        product:data
      };    
};

export const delProduct = (id)=>{
  return {
      type: DEL_PRODUCT,
      id:id
  };
};

export const upProduct = (id,data)=>{
  return {
      type: UP_PRODUCT,
      id: id,
      product:data
  };
};
  