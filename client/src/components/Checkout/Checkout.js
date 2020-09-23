import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useSelector, useDispatch} from 'react-redux'
import {  newOrden , getCarrito} from '../../Redux/carrito.js';
import { getProducts } from '../../Redux/products.js';
import './Checkout.css'


const Checkout =({ user})=>{

    const carrito = useSelector(store => store.carrito.carrito);
    const dispatch = useDispatch();

    const [input, setInput] = useState({
        provincia: "",
        departamento: "",
        localidad:"",
        direccion: "",
        email:"",
        telefono:"",
    })
    const [location,setLocation] = useState({
        provincias:[],
        departamentos:[],
        localidades:[]
    })
 
    const getProvincias = async ()=>{
        const {data} = await axios.get(`https://apis.datos.gob.ar/georef/api/provincias`)
        console.log(data)
        setLocation({
            provincias: data.provincias,
            departamentos: [],
            localidades:[]
        })

    }
    
    const getDepartamentos = async() => {
        const {data} = await axios.get(`https://apis.datos.gob.ar/georef/api/departamentos?provincia=${input.provincia}`)
        console.log(data)
        setLocation({
            ...location,
            departamentos: data.departamentos,
            localidades: []
        })
    }
    
    const getLocalidades = async() => {
        const {data} = await axios.get(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${input.provincia}&departamento=${input.departamento}`)
        
        setLocation({
            ...location,
            localidades: data.localidades
        })
        
    }
    
    useEffect(()=>{
        
        if (!input.provincia) {
            getProvincias();
        } else if (!input.departamento) {
            getDepartamentos();
        } else if (!input.localidades) {
            getLocalidades();
        }

        
    },[input]);
    
    const handleBuy = () => {
        
        dispatch(newOrden(user.id, carrito,input));
        dispatch(getProducts())
        setInput({
            provincia: "",
            departamento: "",
            localidad:"",
            direccion: "",
            email:"",
            telefono:""
        })
        alert('comprado');
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
    }

    const handleChange = (e) => {

        if ('provincia' === e.target.name) {
            setInput({
                ...input,
                provincia : e.target.value,
                departamento: "",
                localidad: ""
            })
        } else if ('departamento' === e.target.name){
            setInput({
                ...input,
                departamento: e.target.value,
                localidad: ""
            })
        } else if ('localidad' === e.target.name){
            setInput({
                ...input,
                localidad: e.target.value
            })
        } else {
            setInput({
                ...input,
                [e.target.name]:e.target.value
            })
        }
    }

    return(
        
        <div className='checkform col 12' >
             <form  onSubmit={(e)=> handleSubmit(e)} >
                <label for='provincia'>Provincia</label>
                <select id='provincia' name='provincia' onChange={(e)=> handleChange(e)}>
                   <option>--Seleccione su provincia--</option>
                    {location && location.provincias.map(e => 
                        <option>{e.nombre}</option>
                    )}
                </select><br/>
                <label for='departamento'>Departamento</label>
                <select id='departamento' name='departamento' onChange={(e)=> handleChange(e)}>
                    <option>--Seleccione su departamento--</option>
                    {location && location.departamentos.map(e =>
                        <option>{e.nombre}</option>
                    )}
                </select><br/>
                <label for='localidad'>Localidad</label>
                <select id='localidad' name='localidad' onChange={(e)=> handleChange(e)}>
                    <option>--Seleccione su localidad--</option>
                    {location && location.localidades.map(e =>        
                        <option>{e.nombre}</option>
                    )}
                </select><br/>
                <label for='direccion'>Dirección</label>
                <input id='direccion' type='text' name='direccion' placeholder='ingrese direccion de destino' onChange={(e)=> handleChange(e)}/><br/>
                <label for='email'>Email</label>
                <input id='email' type='text' name='email' placeholder='ingrese correo electrónico' onChange={(e)=> handleChange(e)}/><br/>
                <label for='telefono'>Telefono</label>
                <input id='telefono' type='text' name='telefono' onChange={(e)=> handleChange(e)}/><br/>
                <button type="button" class="btn btn-success" onClick={()=> handleBuy() } >Confirmar compra</button>
            </form>
        </div>
    )
}

export default Checkout