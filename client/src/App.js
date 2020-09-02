import React from 'react';
// import logo from './logo.svg';
import Product from './components/product';
import './App.css';

function App() {
  return (
    <div className="App">
        <div className='container mt-5'>
        <Product name={'Rollex'} price={200} description={'Reloj muy caro'} stock={207} />
        </div>
    </div>
  );
}

export default App;
