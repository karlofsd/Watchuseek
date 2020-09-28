import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import "./category.css";
import {getCategories, getCategory} from '../../Redux/categories.js';
import {connect} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  table: {
    /* minWidth: 650, */
    backgroundColor: 'whitesmoke',
  },
  root: {
    borderRadius:'0 0 10px 10px',
    color: 'white',
    backgroundColor: 'rgb(108 117 125)',
    height:'100%',
    overflow:'auto'
  }
});

const Category =({allCategories,currentCategory,setCategories})=>{
  
  const classes = useStyles();

  const [input, setInput] = useState({
        id: null,
        name: "",
        description: "",
  });

  useEffect(() => {
    setCategories();
  },[])

  const handleSearch = (data) => {
    setInput(data);
  }

    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      }


      const handleUpdate = async() => {

        const urlApi = `http://localhost:3001/category/${input.id}`;
        const dataPost = {
          name: input.name,
          description: input.description
        };
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        await axios.put(urlApi , dataPost, config);
        setCategories();
        setInput(currentCategory);
      }

     const handleCreate= async()=>{
       if(!input.name || !input.description){
         return alert("Debes completar todos los campos");
       }
        const urlApi = 'http://localhost:3001/category/create';
        const dataPost = {
          name: input.name,
          description: input.description
        };

        const token = localStorage.getItem('token');

        const config = {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }

        if (token) {
          await axios.post(urlApi , dataPost, config);
          alert('Agregado correctamente');
          setCategories();
          setInput(currentCategory);
        }

     }

     const handleDelete = async  () => {
        const token = localStorage.getItem('token')
        const config = {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }
        await axios.delete (`http://localhost:3001/category/${input.id}`,config);
        alert('Se ha eliminado correctamente');
        setCategories();
        setInput(currentCategory);
      }
      
     return(
        <div className = "contentCategory">

          <div className = "divcategories">
            <h1>Categories</h1>
            {/* {allCategories && allCategories.map(function(c){
              return <Link onClick={() => handleSearch(c)} value={c.id} >{c.name}</Link> 
            })} */}
            <div className={classes.root}>
              <List component="nav" aria-label="secondary mailbox folders">
                {allCategories && allCategories.map(c => <ListItem button onClick={() => handleSearch(c)} value={c.id} >
                  <ListItemText primary={c.name}/>
                </ListItem>)}
              </List>
            </div>
          </div>
          <form onSubmit = {(e) => handleSubmit(e)} className='Form' >
              <div >
                <div>
                    <label>Category:</label><br/>
                    <input type = "text" autoComplete = "off" name = "name" onChange={(e) =>handleInputChange(e)} value = {input["name"]} />
                </div>
                <div>
                    <label>Description:</label><br/>
                    <textarea className='textArea' type = "text" autoComplete = "off" name = "description" onChange={(e) =>handleInputChange(e)} value = {input["description"]} />
                </div>
                <div className = "divcategoriesbuttons">
                  <button type = "submit" className='buton1 btn btn-light' onClick={()=>handleCreate()} >Add</button>
                  <button type = "submit" className='buton1 btn btn-light' onClick={()=> handleUpdate()} >Edit</button>
                  <button type = "submit" className='buton1 btn btn-light' onClick={(e)=> handleDelete(e)} >Delete</button>
                </div>
              </div>
          </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
  setCategories: () => dispatch(getCategories()),
  setCategory: () => dispatch(getCategory())
})

const mapStateToProps = state => ({
  currentCategory: state.categories.category,
  allCategories: state.categories.categories,
})

export default connect(mapStateToProps,mapDispatchToProps)(Category)