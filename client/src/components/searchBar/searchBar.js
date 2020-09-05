import React from "react";
import axios from "axios";
import "./searchBar.css";
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    const [search, setSearch] = React.useState();

    function handleChange(e){
        setSearch(e.target.value);
    };

    async function handleSubmit(e){
        e.preventDefault();        console.log(search)
        let data = await axios.get(`localhost:3000/search?name=${search}`)
    
        console.log(data);

    };

    return (
        <form onSubmit = {(e) => handleSubmit(e)}>
        <div>
          <div className = "searchBar">
              <input className = "search" type = "text" name = "search" onChange = {(e) => handleChange(e)} placeholder='Buscar productos...' />
              <button className = "btn2" type = "submit"><SearchIcon/></button>
          </div>
        </div>
       </form> 
    );
}
export default Search;