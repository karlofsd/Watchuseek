import React,{useState} from "react";
import {useDispatch} from "react-redux";
import {getUser} from "../../Redux/users/users.js";

const Login = () => {

    const dispatch = useDispatch()

    const [input, setInput] = useState({
        email: "",
        password: ""
  });

 
    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        });
      }

      const handleSubmit = (e) => {
        e.preventDefault();
      }

    //   const handleCreate= async(e)=>{
    //       e.preventDefault()
    //     const urlApi = 'http://localhost:3001/user';
    //     const dataPost = {
    //       email: input.email,
    //       password: input.password
    //     };

    //     await axios.post(urlApi , dataPost);
    //     alert('Agregado correctamente');
    //  }

    return (
        <div>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
           <label>User Email</label>     
     <input type="email" autoComplete = "off" name = "email" onChange={(e) =>handleInputChange(e)} value = {input["email"]} />
            </div>
            <div>
            <label>User Password</label>    
     <input type = "password" autoComplete = "off" name = "password" onChange={(e) =>handleInputChange(e)} value = {input["password"]} />
            </div>
         <button onClick={(e)=> dispatch(getUser(input.email))}>Iniciar sesión</button>
        </form>
    </div>
    )
}

export default Login;