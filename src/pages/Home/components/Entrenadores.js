import React, { useState, useEffect } from "react";
import "./Entrenadores.css";
import axios from "axios";

const Entrenadores = () => {
  const [esPrimerEntrenador, setEsPrimerEntrenador] = useState(true);
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    const fetchEntrenadores = async () => {
      try {
        const response = await axios.get("https://localhost:7072/api/Entrenador");
        setEntrenadores(response.data);
        console.log(response.data) 
      } catch (error) {
        console.error("Error al obtener los entrenadores:", error);
      }
    };

    fetchEntrenadores();
  }, []);

  const renderEntrenadores = () => {
    return (
      <div>
        {entrenadores.map((entrenador) => (
          <div className={cardContainerClassName} key={entrenador.id}>
            <div className={cardClassName}>
              <div className={cardOverlayClassName}>
                <div className={cardInfoClassName}>
                  <h3>{entrenador.nombre}</h3>
                  <h5>{entrenador.especialidad}</h5>
                  <div className="DiaHora">
                    <div className="Dia">
                      <p>Lunes</p>
                      <p>Martes</p>
                      <p>Miércoles</p>
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
              <img src={entrenador.photo} alt="foto del usuario" className={cardImgClassName} />
              <h2 className={cardNameClassName}>{entrenador.nombre}</h2>
              <p className={cardEspecialidadClassName}>{entrenador.especialidad}</p>
            </div>
          </div>
        ))}
      </div>
    );
  };

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

  const cardEspecialidadClassName = esPrimerEntrenador
    ? "card-especialidad card-especialidad-primer-entrenador"
    : "card-especialidad";

  return <div>{entrenadores.length > 0 && renderEntrenadores()}</div>;
};

export default Entrenadores;
