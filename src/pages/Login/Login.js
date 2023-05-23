import React, { useState } from "react";

import "./Login.css"
import Title from "./components/title/Title";
import Input from "./components/input/Input";
import Inicio from "../Home/Inicio";

const Login = () => {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);


  
  function handleChange(name, value){
    if(name ==='usuario'){
      setUser(value);
    } else {
      setPassword(value);
    }
  };

  function handleSubmit() {
    if (user === 'Admin' && password === 'gym') {
      console.log('Logged in!');
      setLoggedIn(true);
    } else {
      alert('Usuario Incorrecto')
    }
  };

  if (loggedIn) {
    return <Inicio />
  }

  return(
    <div className="login-container" style={{display: 'flex', flexDirection: 'row'}}>
      <div className="half-box" style={{flexBasis: '50%'}}>
        <img src="/images/Ilustracion2.png" alt="Logo de la pagina" style={{width: '700px', height: '720px',}} />
      </div>
      <div className="half-box" style={{flexBasis: '50%'}}>
        <Title />
        <Input attribute={{
          id:'usuario',
          name:'usuario',
          type:'text',
          placeholder:'Ingrese su usuario'
        }}
        handleChange={handleChange}
        />
        <Input attribute={{
          id:'contraseña',
          name:'contraseña',
          type:'password',
          placeholder:'Ingrese su contraseña'
        }}
        handleChange={handleChange}
        />
        <div className="botton">
          <button onClick={handleSubmit}>
            Ingresar
          </button>
          <a className="olvidar-password" href="url">Olvide mi contraseña</a>
        </div>
      </div>
    </div>
  ); 
};

export default Login;
