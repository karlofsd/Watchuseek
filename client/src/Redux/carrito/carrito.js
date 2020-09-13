// import axios from 'axios'

// // --- CONSTANTES ---
// const GET_CARRITO = 'GET_CARRITO'
// const RESET_CARRITO = 'RESET_CARRITO'

// // --- STATE ---

// const initialState = {
//     carrito: []
//   };

// // --- REDUCER ---
// export default function productReducer(state = initialState, action) {
//     switch (action.type) {
//       case GET_CARRITO : 
//         return {
//           ...state,
//           carrito: action.payload
//         }
//       case RESET_PRODUCT:
//         return state

//       default :
//         return 
//     } 
//   }

// // --- ACTIONS ---
// export const getCarrito = (id) => async(dispatch, getState) => {
//   try{
//     const {data} = await axios.get(`http://localhost:3001/user/${id}/carrito`)
//     dispatch({
//       type: GET_PRODUCTS,
//       payload: data
//     })
//   }
//   catch(error){
//     console.log(error)
//   }
  
// }

// export const getProduct = (id) => async(dispatch, getState) => {
//   try{
//     const {data} = await axios.get(`http://localhost:3001/products/${id}`)
//     dispatch({
//       type: GET_PRODUCT,
//       payload: data
//     })
//   }
//   catch(error){
//     console.log(error)
//   }
// }

// export const resetProduct = () => (dispatch) => dispatch({type: RESET_PRODUCT})