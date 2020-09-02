import React from 'react';
import SearchBar from "./components/searchBar/searchBar";
import Product from "./components/product.jsx";
import Nav from "./components/Nav/Nav.js";
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
        <div className='container mt-5'>
         <Nav />
        </div>
    </div>
  );
}

export default App;
