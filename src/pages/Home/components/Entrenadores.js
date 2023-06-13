import React, { useState, useEffect } from "react";
import "./Entrenadores.css";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import ModalEditar from "./modalEditar/ModalEditar";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


const Entrenadores = (props) => {
  const { nombre, ci, telefono, especialidad } = props;
  const [esPrimerEntrenador, setEsPrimerEntrenador] = useState(true);
  const [entrenadores, setEntrenadores] = useState([]);
  const [entrenadorSeleccionado, setEntrenadorSeleccionado] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [entrenadorEditando, setEntrenadorEditando] = useState(null);

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


  const handleEditarEntrenador = (entrenador) => {
    setEntrenadorEditando(entrenador);
    setModalVisible(true);
  };

  const handleGuardarEdicion = (entrenadorEditado) => {
    setEntrenadores(entrenadores.map((e) => (e.ci === entrenadorEditado.ci ? entrenadorEditado : e)));
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    setEntrenadorEditando(null);
  };
  const handleEliminarEntrenador = (entrenador) => {
    setEntrenadorSeleccionado(entrenador);
    confirmAlert({
      title: 'Confirmar eliminación',
      message: `¿Estás seguro de que deseas eliminar al entrenador ${entrenador.nombre}?`,
      buttons: [
        {
          label: 'Eliminar',
          onClick: () => {
            axios.delete(`https://localhost:7072/api/Entrenador/${entrenador.ci}`)
              .then(() => {
                setEntrenadores(entrenadores.filter(e => e.ci !== entrenador.ci));
              })
              .catch((error) => {
                console.error("Error al eliminar el entrenador:", error);
              });
          }
        },
        {
          label: 'Cancelar',
          onClick: () => {}
        }
      ]
    });
  };


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
              <button className="btn-editar" onClick={() => handleEditarEntrenador(props)}>
                <FontAwesomeIcon icon={faEdit} />
              </button>
              <button className="btn-eliminar" onClick={() => handleEliminarEntrenador(props)}>
                <FontAwesomeIcon icon={faTrash} />
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

    return (
      <>
        {renderEntrenadores()}
        {modalVisible && (
        <ModalEditar
          entrenador={entrenadorEditando}
          onSave={handleGuardarEdicion}
          onClose={handleCerrarModal}
        />
      )}
      </>
    );
        };    

export default Entrenadores;
