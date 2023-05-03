import React,{useState} from "react";

import "./Boton.css"

const Boton = ({ palabra, onClick })=>{
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
            <button className="boton" onClick={onClick}>
                {palabra}
            </button>
        </div>
    );
};

export default Boton;

