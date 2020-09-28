import React, { useState, useEffect } from 'react';
import Catalogo from './components/Catalogo/Catalogo';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import './app.css';
import Nav from './components/Nav/Nav';
import Product from './components/Products/product.js';
import Admin from './components/Admin/Admin';
import Carrito from './components/Carrito/carrito.js';
import User from './components/User/user.js';
import Activity from './components/Activity/activity.js';
import Login from './components/LogIn/Login.js';
import Index from './components/Index/index.js';
import { validation, loginGoogle } from './Redux/users';
import { getCategories } from './Redux/categories.js';
import { getProducts } from './Redux/products.js';
import { getOrders } from "./Redux/orders.js";
import { useDispatch, useSelector } from 'react-redux';
import ForgotPassword from './components/Forgot-password/forgotPassword';
import ResetPassword from './components/Reset-password/resetPassword';
import Footer from './components/Footer/footer';
import { positions, Provider as ProviderAlert } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

const options = {
  timeout: 5000,
  position: positions.MIDDLE
};

function App() {
  const dispatch = useDispatch()
  const user = useSelector(store => store.users.user)
  const products = useSelector(store => store.products.products)
  const categories = useSelector(store => store.categories.categories)
  const [search, setSearchApp] = useState({
    array: [],
    word: "",
  });

  useEffect(() => {
    dispatch(getOrders());
    dispatch(validation());
    dispatch(getCategories());
    dispatch(getProducts());
  }, [])


  return (
    <ProviderAlert template={AlertTemplate} {...options}>
    <Router>
      <Nav user={user} categories={categories} setSearchApp={setSearchApp} />
      <Route
        exact path='/'
        component={Index}
      />
      <Route
        exact path="/products/search"

        render={()=> <Catalogo products = {search.array} search={search.word}/>}
        />
        
        <Route
        path='/admin'
        render={() => <Admin user={user} products={products} categories={categories}/>}
        />

        <Route 
         exact path='/catalogo'
         render={()=> <Catalogo /* products={products} */ />}
        />

        <Route 
         exact path= "/catalogo/:id"
         render={({match})=> <Catalogo products={products.filter(p => p.categoryId === Number(match.params.id))} category={Number(match.params.id)} />}
        />

        <Route
           path='/catalogo/product/:id'
          render={({match}) =>
          
          <div className='product'>
            <Product user={user} data={products.filter(p => p.id === Number(match.params.id))} />
          </div>}
      />
      <Route
        exact path='/signup'
        component={User}
      />
      <Route
        exact path='/login'
        component={Login}
      />

      <Route
        exact path='/user'
        render={() => <Activity user={user} />}
      />

      <Route
        exact path="/carrito"
        render={() => <Carrito user={user} products={products} />}
      />

      <Route
        exact path='/forgotpassword'
        component={ForgotPassword}
      />

      <Route
        exact path='/resetpassword/:token'
        render={({match}) => <ResetPassword  token={match.params.token}/>}
      />
  
      <Footer />

    </Router>
    </ProviderAlert>
  );
}

export default App;
