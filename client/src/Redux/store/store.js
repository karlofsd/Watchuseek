import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import categoryReducer from '../categories/categories'
import productReducer from '../products/products'
import userReducer from "../users/users.js";
import carritoReducer from "../carrito/carrito.js";

const rootReducer = combineReducers({
    categories: categoryReducer,
    products: productReducer,
    users: userReducer,
    carrito: carritoReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
    return store;
}