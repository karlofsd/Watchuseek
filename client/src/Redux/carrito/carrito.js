import axios from 'axios'

// --- CONSTANTES ---
const GET_CARRITO = "GET_CARRITO"
const SET_NUMORDEN = 'SET_NUMORDEN'

// --- STATE ---

const initialState = {
    carrito: [],
    numeroOrden: 1,
  };

// --- REDUCER ---

export default function ordenReducer (state = initialState,action) {
    switch(action.type){
        case SET_NUMORDEN:
            return {
                ...state,
                numeroOrden: action.payload
            }
        
        case GET_CARRITO:
            return{
                ...state,
                carrito: action.payload
            };
        default: 
            return {
                ...state
            }
    };
};


//---- ACTION -----
export const getCarrito = (userId) => async (dispatch,getState) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/user/${userId}/carrito`)
        console.log(data);
        dispatch({
            type: GET_CARRITO,
            payload: data,
        })
        
    } catch (error) {
        console.log(error);
    };
};

export const newOrden = (userId,carrito) => async(dispatch,getState) => {
    const lastorder = getState().carrito.numeroOrden
    console.log(`lastorder: ${lastorder}`);
    const neworder = lastorder + 1
    console.log(`neworder : ${neworder}`)
    try {
        console.log(carrito);
        carrito.map( async (e) => {
            console.log(e)
            await axios.put(`http://localhost:3001/user/${userId}/cantidad/${e.id}`, e)
            await axios.put(`http://localhost:3001/user/${userId}/creada/${lastorder}`)
        })
        dispatch({type:SET_NUMORDEN, payload:neworder})
    }
    catch(error){
        console.log(error)
    } 
}
