import React,{useState, useEffect} from 'react';
import Catalogo from './components/Catalogo/Catalogo';
import {Route, BrowserRouter as Router} from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Product from './components/Products/product.js';
import './app.css';
import Admin from './components/Admin/Admin'

import {useSelector} from 'react-redux'

function App() {
  
  const products = useSelector(store => store.products.products)
  const categories = useSelector(store => store.categories.categories)
  const [search,setSearchApp] = useState({
    array: [],
    word: "",
  });

  return (
    <Router>
        <Nav 
        render={()=><Nav setSearchApp={setSearchApp} />}
        />

        <Route
        exact path="/products/search"
        render={()=> <Catalogo products = {
          search.array
        }/>}
        />
        
        <Route
        path='/admin'
        render={() => <Admin products={products} categories={categories}/>}
        />

        <Route 
         exact path='/catalogo'
         render={()=> <Catalogo products={products} />}
        />

        <Route 
         exact path= "/catalogo/:id"
         render={({match})=> <Catalogo products={products.filter(p => p.categoryId === Number(match.params.id))} />}
        />

        <Route
           path='/catalogo/product/:id'
          render={({match}) => 
          <div className='product'>
            <Product data={products.filter(p => p.id === Number(match.params.id))}/>
          </div>}
        />

    </Router>
  );
}

export default App;
