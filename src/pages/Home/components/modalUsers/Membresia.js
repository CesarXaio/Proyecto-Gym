import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "./Membresia.css";

const Membresia = ({ onClose, onAddTrainer }) => {
  const [especialidad, setEspecialidad] = useState("");
  const [modalidad, setmodalidad] = useState("");
  const [entrenador, setEntrenador] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
  };

  const handlemodalidadChange = (event) => {
    setmodalidad(event.target.value);
  };

  const handlEntrenador = (event) => {
    setEntrenador(event.target.value)
  }



  const handleAddTrainer = () => {
    if (typeof onAddTrainer === "function") {
      const newTrainer = { especialidad, modalidad, entrenador };
      setMensaje("Usuario agregado con Exito!");
      setMostrarMensaje(true);
      setTimeout(() => {
        onAddTrainer(newTrainer);
        onClose();
        setMostrarMensaje(false);
      }, 1000);

    }
  };


  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <nav className="contenedorBarra">
            <ul>
              <li className="barra"><a href="">datos personales</a></li>
              <li className="barra"><a href="">datos fiscales</a></li>
              <li className="barra"><a href="">membrecia</a></li>
              <li className="barra"><a href="">medidas inciales</a></li>
            </ul>
          </nav>
          <div className="modal-body">
            <div className="form-group">
              <select id="especialidad" value={especialidad} onChange={handleEspecialidadChange}>
                <option value="">Seleccionar especialidad</option>
                <option value="Fitness">Fitness</option>
                <option value="Pilates">Pilates</option>
                <option value="Yoga">Yoga</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <select id="especialidad" value={modalidad} onChange={handlemodalidadChange}>
              <option value="">Seleccionar modalidad</option>
              <option value="Fitness">Diario</option>
              <option value="Pilates">Semanal</option>
              <option value="Yoga">Mensual</option>
            </select>
          </div>
          <div className="form-group">
            <select id="especialidad" value={entrenador} onChange={handlEntrenador}>
              <option value="">Seleccionar entrenador</option>
              <option value="">entrenador 1</option>
              <option value="">entrenador 2</option>
              <option value="">entrenador 3</option>
            </select>
          </div>
          <div className="button-container">
              <a id="boton-off" onClick={onClose}>
                Cancelar
              </a>
              <button id="boton-ok" onClick={handleAddTrainer}>
                Siguiente
              </button>
            </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default Membresia;
