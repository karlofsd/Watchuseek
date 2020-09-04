import React from "react";
import "./searchBar.css";
import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    const [search, setSearch] = React.useState();

    function handleChange(e){
        setSearch(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        if(!e.target.value){
            return alert("Ingresa una busqueda valida");
        }
        alert(search);

    };

    return (
        <form onSubmit = {(e) => handleSubmit(e)}>
        <div>
          <div className = "searchBar">
              <input className = "search" type = "text" name = "search" onChange = {(e) => handleChange(e)} placeholder='Buscar productos...' />
              <button className = "btn" type = "submit"><SearchIcon/></button>
          </div>
        </div>
       </form> 
    );
}
export default Search;