import React,{useState} from "react";

import "./Boton.css"

const Boton = (props) =>{
    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');

    function handleChange(name, value){
        if(name ==='usuario'){
            setUser(value);
        }else{
            setPassword(value);
        }
    };

    function handleSubmit() {
        let account = { user, password };
        if (account) {
          console.log('account:', account);
          //window.location()
        }
      };
    return(
        <div className="botton">
            <button onClick={handleSubmit}>
                {props.palabra}
            </button>
        </div>
    );
};

export default Boton;

