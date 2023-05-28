import React, { useState, useEffect } from "react";
import "./Entrenadores.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';


const Entrenadores = (props) => {
  const { nombre, ci, telefono, especialidad } = props;
  const [esPrimerEntrenador, setEsPrimerEntrenador] = useState(true);
  const [entrenadores, setEntrenadores] = useState([]);
  const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState(null);

const handleEditarEntrenador = (entrenador) => {
  setEntrenadorSeleccionado(entrenador);
  // Realizar las acciones necesarias para la edición del entrenador
};

const handleEliminarEntrenador = async (entrenador) => {
  try {
    await axios.delete(`https://localhost:7072/api/Entrenador/${entrenador.id}`);
    // Realizar las acciones necesarias después de eliminar el entrenador
  } catch (error) {
    console.error("Error al eliminar el entrenador:", error);
  }
};


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
      <div className={cardContainerClassName} key={ci}>
        <div className={cardClassName}>
          <div className={cardOverlayClassName}>
            <div className={cardInfoClassName}>
              <h3>{nombre}</h3>
              <h5>{especialidad}</h5>
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
            <div className="botones-acciones">
                <button className="btn-editar" onClick={() => handleEditarEntrenador(entrenadores)}>
                  Editar
                </button>
                <button className="btn-eliminar" onClick={() => handleEliminarEntrenador(entrenadores)}>
                  Eliminar
                </button>
              </div>
          </div>
          <img src={`./images/Entrenador3.jpg`} alt="foto del usuario" className={cardImgClassName} />
          <h2 className={cardNameClassName}>{nombre}</h2>
          <p className={cardEspecialidadClassName}>{especialidad}</p>
        </div>
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

  return renderEntrenadores();
};

export default Entrenadores;
