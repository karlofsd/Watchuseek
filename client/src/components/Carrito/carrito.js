import React, { useState, useEffect,Fragment } from 'react'
import axios from 'axios'
import { getCarrito, newOrden } from '../../Redux/carrito.js';
import {getProducts} from '../../Redux/products.js';
import { useSelector, useDispatch } from 'react-redux'
import "./carrito.css";

const Carrito = ({ user, products }) => {
    const [product, setProduct] = useState([]);
    const [total,setTotal] = useState(0);
    const dispatch = useDispatch();
    // const orden = useSelector(store => store.carrito.numeroOrden)
    const carrito = useSelector(store => store.carrito.carrito);

    useEffect(() => {
        if (!localStorage.token && localStorage.carrito) {
                let data = JSON.parse(localStorage.getItem("carrito"));
                return setProduct(data.carrito);
        }
        setProduct(carrito);

    }, [carrito])

    const handleBuy = () => {
        if(!user.id){
            return alert("Debes logearte primero");
        }
        console.log(product);
        dispatch(newOrden(user.id, carrito));
        dispatch(getProducts());
    }

    const handleInputChange = function (e, index) {
        let data = product;
        console.log(data[index]);
        data[index].quantity = Number(e.target.value)
        setProduct(data);
       
    };

    const eliminarTodo = async () => {
        if (!localStorage.token) {
            if (localStorage.carrito) {
                return localStorage.clear();
            }
        }
        await axios.delete(`http://localhost:3001/user/${user.id}/carrito`)
        setProduct([])
    }

    const eliminar = async (e, index) => {
        if (!localStorage.token) {
            if (localStorage.carrito) {
                console.log("esta entrando")
                let data = JSON.parse(localStorage.getItem("carrito"));
                let otradata = data.carrito.filter(p => p.productId !== e.productId);
                localStorage.setItem("carrito", JSON.stringify({ carrito: otradata }))
                return setProduct(otradata);
            }

        }
        await axios.delete(`http://localhost:3001/user/${user.id}/carrito/${e.productId}`)
        dispatch(getCarrito(e.userId))
    }


    return (
        <Fragment>
{product[0] && <table class="table table-striped table-dark">
  <thead >
    <tr>
      <th scope="col" >Name</th>
      <th scope="col" >Price</th>
      <th scope="col" >Stock</th>
      <th scope="col" >Quantity</th>
      <th scope="col" >Total</th>
    </tr>
  </thead>
  {product && product.map((e, index) => {
      console.log(e);
      return(
  <tbody>
  <tr>
  <td>{e.name}</td>
  <td>{e.price}</td>
  <td>{products.find(product => product.name === e.name.toLowerCase()).stock}</td>
  <td><input className="inputItem" type="number" min='1' max={products.find(product => product.name === e.name.toLowerCase()).stock} name={e.quantity} onChange={(e) => handleInputChange(e, index)} /></td>
  {/* <td>{e.quantity}</td> */}
  <td><button type="button" class="btn btn-danger" onClick={() => eliminar(e, index)}>Eliminar producto</button></td>
  </tr>
 </tbody>
  )})}
</table>}
            <div className="contentCarrito">
                {product[0] && <div  className='divcompras' >
                    <div className='botonescomprar1'  > 
                    <button type="button" class="btn btn-success" onClick={() => handleBuy()} >COMPRAR</button><br />
                    </div>
                    <div  className='botonescomprar' >
                    <button type="button" class="btn btn-danger" onClick={() => eliminarTodo()} >VACIAR CARRITO</button>
                    </div>
                 <div>
       
                 </div>
                </div>}
                {!product[0] && <div className='titnocarrito'>
                   
                    <h2>¡Su carrito está vacío!</h2>
                </div>}
            </div>
        </Fragment>
    )
}

export default Carrito