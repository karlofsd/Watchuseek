import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getCarrito, newOrden } from '../../Redux/carrito/carrito'
import { useSelector, useDispatch } from 'react-redux'
import "./carrito.css";

const Carrito = ({ user, products }) => {
    const [product, setProduct] = useState([]);
    const dispatch = useDispatch()
    const orden = useSelector(store => store.carrito.numeroOrden)
    const carrito = useSelector(store => store.carrito.carrito)

    useEffect(() => {
        if (!localStorage.token) {
            if (localStorage.carrito) {
                let data = JSON.parse(localStorage.getItem("carrito"));
                return setProduct(data.carrito);
            }
        } else {
            if (localStorage.carrito) {
                let { carrito } = JSON.parse(localStorage.getItem("carrito"));
                carrito.map(async (p) => {
                    await axios.post(`http://localhost:3001/user/${user.id}/carrito`, p);
                })
                localStorage.removeItem("carrito");
            }
        }
        setProduct(carrito);
    }, [carrito])

    const handleBuy = () => {
        if(!user.id){
            return alert("Debes logearte primero");
        }
        dispatch(newOrden(user.id, carrito));
    }

    const handleInputChange = function (e, index) {
        let data = product;
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
    }

    const eliminar = async (e, index) => {
        if (!localStorage.token) {
            if (localStorage.carrito) {
                console.log("esta entrando")
                let data = JSON.parse(localStorage.getItem("carrito"));
                let otradata = data.carrito.filter(p => p.productId !== e);
                localStorage.setItem("carrito", JSON.stringify({ carrito: otradata }))
                return setProduct(otradata);
            }

        }
        await axios.delete(`http://localhost:3001/user/${user.id}/carrito/${e}`)
    }

    return (
        <div className='contentcarritomayor'>
            <h1 className="titleCarrito">Carrito del usuario</h1>
            <div className="contentCarrito">
                <div className="divcontentItems">
                    {product[0] && product.map((e, index) => {
                        return (
                            <div className="bordecarrito">
                                <button className='botonx' onClick={() => eliminar(e.productId, index)}>X</button>
                                <div className="divLabel">
                                    <label className='titlelableCarrito'>{e.name}</label><br />
                                    <label className='labelcarrito'>$USD{e.price}</label>
                                    <div>
                                        <label className='labelcarrito'>Cantidad:</label><br />
                                        <input className="inputItem" type="number" min='1' max={products[index].stock} name={e.quantity} onChange={(e) => handleInputChange(e, index)} />
                                    </div>
                                </div>
                            </div>)
                    })}
                </div>
                {product[0] && <div className='divboton' >
                    <button className="btnsCarrito" onClick={() => handleBuy()} >COMPRAR</button><br />
                    <button className="btnsCarrito" onClick={() => eliminarTodo()} >VACIAR CARRITO</button>
                </div>}
                {!product[0] && <div className="divcarritoVacio">
                    <img className="imgcarritoVacio" src="https://cdn.dribbble.com/users/204955/screenshots/4930541/emptycart.png" />
                    <h2>¡Su carrito está vacío!</h2>
                </div>}
            </div>
        </div>
    )
}

export default Carrito