import axios from 'axios'

// --- CONSTANTES ---
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_PRODUCT = 'GET_PRODUCT'
const RESET_PRODUCT = 'RESET_PRODUCT'

// --- STATE ---

const initialState = {
    products: [],
    product:{
        name: "",
        description: "",
        price: "",
        stock: "", 
        image: "",
        categoryId: ""
    }
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

      case RESET_PRODUCT:
        return state

      default :
        return {
          ...state,
          product: {
            name: "",
            description: "",
            price: "",
            stock: "",
            image: "",
            categoryId: ""
          }
        };
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
  }
  catch(error){
    console.log(error)
  }
  
}

export const getProduct = (id) => async(dispatch, getState) => {
  try{
    const {data} = await axios.get(`http://localhost:3001/products/${id}`)
    dispatch({
      type: GET_PRODUCT,
      payload: data
    })
  }
  catch(error){
    console.log(error)
  }
}

export const resetProduct = () => (dispatch) => dispatch({type: RESET_PRODUCT})
 
