import React, {Fragment, useEffect, useState} from 'react';
import axios from 'axios';
import "./activity.css";
import {useDispatch,useSelector} from "react-redux";
import {getOrder} from "../../Redux/orders.js";
import {Route,BrowserRouter as Router, Link} from "react-router-dom"
import {validation} from '../../Redux/users'
import CancelIcon from '@material-ui/icons/Cancel';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles({
  table: {
    /* minWidth: 650, */
    backgroundColor: 'whitesmoke',
  },
  root: {
    borderRadius:'5px',
    color: 'white',
    backgroundColor: 'rgb(108 117 125)'
  }
});

//--------------------------------
const Activity =({user})=>{

  const classes = useStyles();

  const [ordenes, setOrdenes] = useState([]);
  const [usuario,setUsuario] = useState({})
  const [update, setUpdate] = useState(false)
  
  const [current,setCurrent] = useState()

  const dispatch = useDispatch();
  const order = useSelector(store => store.orders.order);

  const name = (mail) => mail.split('@')[0]
  
  const deleteOrder = async(e) =>{
    await axios.delete(`http://localhost:3001/user/orders/${e.order}`)
  }

  const Cancelar = async (e)=>{
    await axios.put(`http://localhost:3001/user/${user.id}/cancelada/${e.id}`);
    dispatch(getOrder(current));
  }

  const fetchData = async() =>{
    const {data} = await axios.get(`http://localhost:3001/orders/user/${user.id}`)
    setOrdenes(data)
  }

  useEffect(()=>{
    fetchData()
    setUsuario(user)
    setUpdate(false)
  },[ordenes,user,order]);
  
  const handleSubmit = (e) => e.preventDefault()

  const handleInputChange = (e) => {
    setUsuario({
      ...usuario,
      [e.target.name] : e.target.value
    })
  }
  const updateProfile = async() => {
    if(update){
      await axios.put(`http://localhost:3001/user/${user.id}`,usuario)
      dispatch(validation());
    }
    setUpdate(update ? false : true)
  }

  const cancelUpdate = () => {
    setUsuario(user)
    setUpdate(false)
  }

  const uploadImage = async (e) => {
        
    const file = e.target.files[0]
    const base64 = await convertBase64(file)
    
    setUsuario({
      ...usuario,
      image: base64});
    e.preventDefault();

  };
  
  const convertBase64 = (file) => {
    return new Promise ((resolve, reject) =>{
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
  
        fileReader.onload = () => {
            resolve(fileReader.result)
        }
        
        fileReader.onerror = (error) => {
            reject(error);
        }
     })
  };

  const handleSearch = (e) => {
    console.log('---order---')
    console.log(e)
    setCurrent(e)
    dispatch(getOrder(e)); 
}

    return(
      <Router>
        <div className='mayor_content'>
          <div className='panel'>
            <h3 className='title-panel'>Your Panel</h3>
            <Link to='/user' className='panel-list'>Profile</Link>
            <Link to='/user/activity' className='panel-list'>Activity</Link>
            <Link to='/user/account' className='panel-list'>Account</Link>
          </div>
        <div className='content_admin'>
				<Route
					exact path='/user'
          render={()=>
            <Fragment>
            <div className='panel-h1'><h3 className='title-h3'>Profile</h3></div>
						<div className = "content-Profile">
              <div className = "divInfo">
                <img className = "imgActivity"  src = {usuario.image || "data:image/png;base64,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"} />
                {update && <input className = "file" /* style={{display:'none'}} */ type="file" name="image" onChange={uploadImage}/>}
              </div>
              <div className = "crud_userpanel" >
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div >
                        <div className='form-group'>
                            <label for='name'>Name</label>
                            <input id='name' className = "form-control" type="text" name="name"  placeholder='Your name...' onChange={(e)=> handleInputChange(e)} value={usuario.name} disabled={!update} />
                        </div>
                        <div className='form-group'>
                            <label for='username'>Username</label>
                            <input id='username' className = "form-control" type="text" name="username" value={usuario.username} disabled/>
                        </div>
                        <div className='form-group' >
                            <label for='email'>Email</label><br />
                            <input id='email' className = "form-control" type="text" name="email" onChange={(e)=> handleInputChange(e)} value={usuario.email} disabled={!update} />
                        </div>
                        <div className = "profile-button">
                        <button type='button' className='btn btn-light' onClick={()=>updateProfile()} >{update ? "Save" :"Edit"}</button>
                        {update && <button type='button' className='btn btn-light' onClick={()=>cancelUpdate()}>Cancel</button>}
                        </div>
                    </div>
                </form>
            </div>
            </div>
            </Fragment>
					}
				/>
				<Route
					exact path='/user/activity'
          render={()=>
            <Fragment>
            <div className='panel-h1'><h3 className='title-h3'>Activity</h3></div>
            <div className='activities'>
              <div className = "contentOrder">
                  {/* <div className = "divbutton">
                      <button className='buttonAdd' onClick={() => handleOrder()} >N° Orden</button><br />
                      <button className='buttonDelete' onClick={(e) => handleStatus(e)} >Status</button><br />
                  </div> */}
                  <h1 className='title1-act'>Orders</h1>
                  <div className={classes.root}>
                  <List component="nav" aria-label="secondary mailbox folders">
                    {ordenes.map(p => <ListItem button onClick={()=>handleSearch(p)}>
                      <ListItemText primary={`N° ${p.order}`} secondary={p.status}/>
                      <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>)}
                  </List>
                </div>
              </div>
              <div className = "contentActivity">
                <h1 className = "titleHistory">Items</h1>
                {/* <div className = 'card-bodyact'>
                  <table>
                    <tr className='columns-act col-10'>
                      <th className='th1-act col-5' >Name</th>
                      <th className='th1-act col-2' >Price</th>
                      <th className='th1-act col-2' >Quantity</th>
                      <th className='th1-act col-2' >Status</th>
                    </tr>
                    {order[0] && order.map(o => 
                      <tr className='columns-act col-10'>
                        <td className='td1-act col-5'>{o.name}</td>
                        <td className='td1-act col-2' >${o.price}</td>
                        <td className='td1-act col-2' >{o.quantity}</td>
                        <td className='td1-act col-2' >{o.status}</td>
                        { o.status === "creada"  || o.status === "procesando" ?        
                        <button className='btoncancelar' onClick={()=> Cancelar(o)} >Cancel</button> : null}       
                      </tr>
                    )}
                  </table>
                </div> */}
                <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Price</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="center">Status</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {order[0] && order.map((o) => (
                        <TableRow key={o.name}>
                          <TableCell component="th" scope="row">
                            {o.name}
                          </TableCell>
                          <TableCell align="right">${o.price}</TableCell>
                          <TableCell align="center">{o.quantity}</TableCell>
                          <TableCell align="right">{o.status}</TableCell>
                          { o.status === "creada"  || o.status === "procesando" ?        
                          <CancelIcon className='btoncancelar' onClick={()=> Cancelar(o)} >Cancel</CancelIcon> : null}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                
              </div>
            </div>
            
            </Fragment>
            }
				/>
				<Route
					exact path='/user/account'
					render={()=>
						
								<div className='panel-h1'><h3 className='title-h3'>Account</h3></div>
						}
				/>
			</div>
		</div>
	  </Router>
    );
};

export default Activity;
