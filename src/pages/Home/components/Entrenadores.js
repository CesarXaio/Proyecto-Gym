import React from "react";
import './Entrenadores.css'


const Entrenadores = (props) =>{
    return(
        
        <div className="card">
        <img src={props.photo} alt="foto del usuario" className="card-img" />
        <h2 className="card-name">{props.name}</h2>
        <p className="card-modalidad">{props.modalidad}</p>
        
    </div>
    );

}

export default Entrenadores;