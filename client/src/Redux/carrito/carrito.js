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
                numeroOrden: state.numeroOrden + 1
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
        let {data} = await axios.get(`http://localhost:3001/user/${userId}/carrito`)
        if(localStorage.carrito){
            console.log("en la condicional");
            let {carrito} = JSON.parse(localStorage.getItem("carrito"));
            data =  data.concat(carrito);
        }
        dispatch({
            type: GET_CARRITO,
            payload: data,
        })
        
    } catch (error) {
        console.log(error);
    };
};

export const newOrden = (userId,carrito) => async(dispatch,getState) => {
    try {
        await axios.post("http://localhost:3001/orders/counter");
        const {data} = await axios.get("http://localhost:3001/orders/counter/count")
        carrito.map( async (e) => {
            console.log("esto es e");
            console.log(e);
            let producto = await axios.get(`http://localhost:3001/products/${e.productId}`)
            console.log("esto es el producto");
            console.log(producto);
            producto.data.stock = producto.data.stock - e.quantity;
            await axios.put(`http://localhost:3001/user/${userId}/cantidad/${e.id}`, e)
            await axios.put(`http://localhost:3001/products/${e.productId}`, producto.data);
            await axios.put(`http://localhost:3001/user/${userId}/creada/${data[0].id}`)
            
        })
        dispatch({type:SET_NUMORDEN})
        dispatch({type: GET_CARRITO, payload: []})
    }
    catch(error){
        console.log(error)
    }
}