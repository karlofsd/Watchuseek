import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { getCarrito, updateCarrito , getCheckout} from '../../Redux/carrito.js';
import { getProducts } from '../../Redux/products.js';
import { useSelector, useDispatch } from 'react-redux'
import Checkout from '../Checkout/Checkout'
import "./carrito.css";

const Carrito = ({ user, products }) => {
    const [product, setProduct] = useState([]);
    const [total, setTotal] = useState({});
    const [check, setCheck] = useState(false)

    const dispatch = useDispatch();
    
    const carrito = useSelector(store => store.carrito.carrito);
    
    useEffect(() => {
        if (check){dispatch(getCheckout())}
        if (check){setCheck(false)}
        if (!localStorage.token && localStorage.carrito) {
            let data = JSON.parse(localStorage.getItem("carrito"));
            return setProduct(data.carrito);
        }
        setProduct(carrito);

    }, [carrito]);

   const checkout = () => {
        if (!user.id) {
            return alert("Debes logearte primero");
        }
       setCheck(check ? false : true)
   }

    const handleInputChange = function (e, index, p) {
        let data = product;
        console.log(data[index]);
        data[index].quantity = Number(e.target.value)
        setProduct(data);
        setTotal({
            ...total,
            [p.name]: e.target.value * p.price,
        });
        dispatch(updateCarrito(e.target.value,index))

    };

    const eliminarTodo = async () => {
        if (!localStorage.token) {
            if (localStorage.carrito) {
                setProduct([])
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

    // console.log(products);

    return (
        <div>
            <div className='lista-carrito'>
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
                {product && product.map((p, index) => {
                    return (
                        <tbody>
                            <tr>
                                <td>{p.name}</td>
                                <td>{p.price}</td>
                                <td>{products.find(product => product.name.toLowerCase() === p.name.toLowerCase()).stock - p.quantity}</td>
                                <td><input className="inputItem" defaultValue='1' placeholder='1' type="number" value={p.quantity} min='1' max={products.find(product => product.name.toLowerCase() === p.name.toLowerCase()).stock} name={p.quantity} onChange={(e) => handleInputChange(e, index, p)} /></td>
                                <td>{total[p.name] ? total[p.name] : p.price * p.quantity}</td>
                                <td><button type="button" class="btn btn-danger" onClick={() => eliminar(p, index)}>Eliminar producto</button></td>
                            </tr>
                        </tbody>
                    )
                })}
            </table>}
            <div className="contentCarrito">
                {product[0] &&  <div className='divcompras' >
                    <div className='botonescomprar1'  >
                        <button type="button" name='checkout' class="btn btn-success" onClick={()=>checkout()}  >COMPRAR</button><br />
                    </div>
                    <div className='botonescomprar' >
                        <button type="button" class="btn btn-danger" onClick={() => eliminarTodo()} >VACIAR CARRITO</button>
                    </div>
                    <div>

                    </div>
                </div>}
                {!product[0] && <div className='titnocarrito'>
                    <div className='divcarritovacio'>
                    <img className = "imgCarrito" alt= "CarritoVacio" src = "data:image/png;base64,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"/>
                    <h2>¡Su carrito está vacío!</h2>
                    </div>
                </div>}
                
            </div>
            </div>
            {check && 
            <div className='pop-up'>
                <button type="button" class=" btn-x btn-danger"onClick={()=>checkout()} >X</button>
                <Checkout user={user}/>
            </div> }
        </div>
    )
}
export default Carrito;