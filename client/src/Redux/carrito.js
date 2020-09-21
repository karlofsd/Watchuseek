import axios from 'axios'

// --- CONSTANTES ---
const GET_CARRITO = "GET_CARRITO"
const SET_NUMORDEN = 'SET_NUMORDEN'
const UPDATE_CARRITO = "UPDATE_CARRITO"

// --- STATE ---

const initialState = {
    carrito: [],
    numeroOrden: 1,
};

// --- REDUCER ---

export default function ordenReducer(state = initialState, action) {
    switch (action.type) {
        case SET_NUMORDEN:
            return {
                ...state,
                numeroOrden: state.numeroOrden + 1
            }

        case GET_CARRITO:
            const data = action.payload.map((product, index) => {
                // console.log(product)
                const quantity = state.carrito[index] ? state.carrito[index].quantity : product.quantity;
                product.quantity = quantity;
                console.log(quantity)
                return product;
            });

            return {
                ...state,
                carrito: data
            };

        case UPDATE_CARRITO:
            state.carrito[action.payload.index].quantity = parseInt(action.payload.quantity);
            return {
                ...state,
            };
        default:
            return {
                ...state
            }
    };
};


//---- ACTION -----
export const getCarrito = (userId) => async (dispatch, getState) => {
    try {

        const { data } = await axios.get(`http://localhost:3001/user/${userId}/carrito`)

        dispatch({
            type: GET_CARRITO,
            payload: data,
        })

    } catch (error) {
        console.log(error);
    };
};

export const newOrden = (userId, carrito) => async (dispatch, getState) => {
    try {
        await axios.post("http://localhost:3001/orders/counter");
        const { data } = await axios.get("http://localhost:3001/orders/counter/count")
        carrito.map(async (e) => {
            const data2 = await axios.get(`http://localhost:3001/products/${e.productId}`)
            let stock = data2.data.stock - e.quantity;

            await axios.put(`http://localhost:3001/user/${userId}/cantidad/${e.id}`, e)
            await axios.put(`http://localhost:3001/products/mod/${e.productId}`, { stock });
            await axios.put(`http://localhost:3001/user/${userId}/creada/${data[0].id}`)

        })
        dispatch({ type: SET_NUMORDEN });
        dispatch({
            type: GET_CARRITO,
            payload: [],
        })
    }
    catch (error) {
        console.log(error)
    }
}

export const updateCarrito = (quantity, index) => async (dispatch, getState) => {
    try {
        dispatch({
            type: UPDATE_CARRITO,
            payload: { quantity: quantity, index: index },
        })

    } catch (error) {
        console.log(error);
    };
};