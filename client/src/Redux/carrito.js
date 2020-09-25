import axios from 'axios'

// --- CONSTANTES ---
const GET_CARRITO = "GET_CARRITO"
const SET_NUMORDEN = 'SET_NUMORDEN'
const UPDATE_CARRITO = "UPDATE_CARRITO"
const CHECKOUT = 'CHECKOUT'

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
        
        case CHECKOUT: 
            return {
                ...state
            }
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

let numOrden = 0;
let newdata = {}
export const newOrden = (userId, carrito,body) => async (dispatch, getState) => {
    try {
        console.log('--- userId dispatch ---')
        console.log(userId)
        console.log('---body---')
        console.log(body)
        await axios.post("http://localhost:3001/orders/counter");
        const { data } = await axios.get("http://localhost:3001/orders/counter/count")
        numOrden = data[0].id
        let info = {
            provincia: body.provincia,
            departamento: body.departamento,
            localidad: body.localidad,
            direccion: body.direccion,
            email: body.email,
            telefono: body.telefono,
            userId: userId,
            ordenfinalId: data[0].id
        }
        console.log('---info redux----')
        console.log(info)
        await axios.post(`http://localhost:3001/user/carrito/checkout`,info)
        
        carrito.map(async (e) => {
            const data2 = await axios.get(`http://localhost:3001/products/${e.productId}`)
            let stock = data2.data.stock - e.quantity;

            await axios.put(`http://localhost:3001/user/${userId}/cantidad/${e.id}`, e)
            await axios.put(`http://localhost:3001/products/mod/${e.productId}`, { stock });
            await axios.put(`http://localhost:3001/user/${userId}/creada/${data[0].id}`)

        })

        // const { data : otradata } = await axios.get(`http://localhost:3001/user/${userId}/carrito`)
        
        // console.log(otradata);

        setTimeout(async() => {
            const {data: infoCart} = await axios.get(`http://localhost:3001/user/${data[0].id}/admin/creada`)
            newdata = infoCart
        },2000)
        // console.log(infoCart)

        // const {data: message} = await axios.post('http://localhost:3001/orders/mail' , {infoCart.carrito});

        // console.log(message);

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

export const getCheckout = (mail) => async (dispatch) => {
    try{
        
        const config = {
            headers : {
                Authorization : 'Bearer ' + localStorage.getItem('token')
            }
        }
        /* const {data} = await axios.get(`http://localhost:3001/user/${numOrden}/admin/creada`) */
        setTimeout(async() => {
            console.log(newdata)
            await axios.post('http://localhost:3001/orders/mail' , newdata, config)
        },4000);
        dispatch({
            type: CHECKOUT
        })
    } catch(error){
        console.log(error)
    }
}