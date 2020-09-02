import React from "react";
import "./searchBar.css";

const Search = () => {
    const [search, setSearch] = React.useState();

    function handleChange(e){
        setSearch(e.target.value);
    };

    function handleSubmit(e){
        e.preventDefault();
        alert(search);

    };

    return (
        <form onSubmit = {(e) => handleSubmit(e)}>
        <div>
          <div className = "searchBar">
              <input className = "search" type = "text" name = "search" onChange = {(e) => handleChange(e)} />
              <button className = "btn" type = "submit" >Buscar</button>
          </div>
        </div>
       </form> 
    );
}
export default Search;