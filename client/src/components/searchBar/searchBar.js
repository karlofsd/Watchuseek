import React, {useState, useEffect} from "react";
import axios from "axios";
import "./searchBar.css";
import SearchIcon from '@material-ui/icons/Search';
import {Link} from 'react-router-dom';


const Search = ({setSearchApp}) => {
    const [search, setSearch] = useState();
    const [flag, setFlag] = useState(true);
    

   function handleChange(e){
        e.target.value.toLowerCase();
        setSearch(e.target.value);
    };


    async function handleSubmit(){
        setFlag(false);
        search.toLowerCase();
        let {data} = await axios.get(`http://localhost:3001/products/search?name=${search}`)
        console.log(data)
        setSearchApp({
            array: data,
            word: search,
        });
      
    };
     
    
    return (
        <form onSubmit = {(e) => handleSubmit(e)}>
        <div>
          <div className = "searchBar">
              <input className = "search" type = "text" name = "search" onChange = {(e) => handleChange(e)} placeholder='Buscar productos...' />
              <Link to = {`/products/search?name=${search}`}> <button className = "btn2" type = "submit" onClick={(e)=> handleSubmit(e)} ><SearchIcon/></button></Link>
          </div>
        </div>
       </form> 
    );
}
export default Search ;