import React, { useState } from "react";
import "./Entrenadores.css";

const Entrenadores = (props) => {
  const [esPrimerEntrenador, setEsPrimerEntrenador] = useState(true);

  const cardContainerClassName = esPrimerEntrenador
    ? "card-container card-container-primer-entrenador"
    : "card-container";

  const cardClassName = esPrimerEntrenador
    ? "card card-primer-entrenador"
    : "card";

  const cardOverlayClassName = esPrimerEntrenador
    ? "card-overlay card-overlay-primer-entrenador"
    : "card-overlay";

  const cardInfoClassName = esPrimerEntrenador
    ? "card-info card-info-primer-entrenador"
    : "card-info";

  const cardImgClassName = esPrimerEntrenador
    ? "card-img card-img-primer-entrenador"
    : "card-img";

  const cardNameClassName = esPrimerEntrenador
    ? "card-name card-name-primer-entrenador"
    : "card-name";

  const cardModalidadClassName = esPrimerEntrenador
    ? "card-modalidad card-modalidad-primer-entrenador"
    : "card-modalidad";

  return (
    <div className={cardContainerClassName}>
      <div className={cardClassName}>
        <div className={cardOverlayClassName}>
          <div className={cardInfoClassName}>
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
        <img src={props.photo} alt="foto del usuario" className={cardImgClassName} />
        <h2 className={cardNameClassName}>{props.name}</h2>
        <p className={cardModalidadClassName}>{props.modalidad}</p>
      </div>
    </div>
  );
};

export default Entrenadores;
