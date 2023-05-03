import React, { useState } from "react";
import "./Entrenadores.css";

const Entrenadores = (props) => {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-overlay">
          <div className="card-info">
            <h3>{props.name}</h3>
            <h5>{props.modalidad}</h5>
            <div className="DiaHora">
              <div className="Dia">
                <p>Lunes</p>
                <p>Martes</p>
                <p>Miercoles</p>
                <p>Jueves</p>
                <p>Viernes</p>
              </div>
              <div className="Hora">
                <p className="hora-izquierda">7:00 - 12:00</p>
                <p className="hora-derecha">15:00 - 18:00</p>
                <p className="hora-izquierda">12:00 - 15:00</p>
                <p className="hora-derecha">9:00 - 12:00</p>
                <p className="hora-izquierda">15:00 - 18:00</p>
              </div>
            </div>
            <hr className="linea-horizontal" />
            <hr className="linea-horizontal2" />
          </div>
        </div>
        <img src={props.photo} alt="foto del usuario" className="card-img" />
        <h2 className="card-name">{props.name}</h2>
        <p className="card-modalidad">{props.modalidad}</p>
      </div>
    </div>
  );
};

export default Entrenadores;
