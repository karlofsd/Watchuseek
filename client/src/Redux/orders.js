import axios from 'axios'

// --- CONSTANTES ---
const GET_ORDERS = "GET_ORDERS"
const GET_ORDER = 'GET_ORDER'

// --- STATE ---

const initialState = {
    orders: [],
    order: {}
  };

// --- REDUCER ---

export default function ordersReducer (state = initialState,action) {
    switch(action.type){
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        
        case GET_ORDER:
            return{
                ...state,
                order: action.payload
            };
        default: 
            return {
                ...state
            }
    };
};


//---- ACTION -----
export const getOrders = () => async (dispatch,getState) => {
    try {
        const {data} = await axios.get(`http://localhost:3001/user/order/ordersAdmin`)
        dispatch({
            type: GET_ORDERS,
            payload: data,
        })
        
    } catch (error) {
        console.log(error);
    };
};

export const getOrder = (e) => async (dispatch,getState) => {
    try {
        console.log(e);
        const stat = e.status
        const {data} = await axios.get(`http://localhost:3001/user/${e.order}/admin/${stat}`)
        dispatch({
            type: GET_ORDER,
            payload: data,
        })
    } catch (error) {
        console.log(error);
    };
};