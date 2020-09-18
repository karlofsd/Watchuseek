import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import categoryReducer from '../categories'
import productReducer from '../products'
import userReducer from "../users.js";
import ordenReducer from "../carrito.js";
import ordersReducer from "../orders.js";

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer,
    users: userReducer,
    carrito: ordenReducer,
    orders: ordersReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)))
    return store;
}