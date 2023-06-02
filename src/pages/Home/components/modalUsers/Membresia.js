import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "./Membresia.css";

const Membresia = ({usuario, onClickAvance, onClose, onAddTrainer }) => {
  const [especialidad, setEspecialidad] = useState(usuario.especialidad);
  const [modalidad, setmodalidad] = useState(usuario.modalidad);
  const [entrenador, setEntrenador] = useState(usuario.entrenador);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
    usuario.especialidad = event.target.value;
  };

  const handlemodalidadChange = (event) => {
    setmodalidad(event.target.value);
    usuario.modalidad = event.target.value;
  };

  const handleEntrenador = (event) => {
    setEntrenador(event.target.value);
    usuario.entrenador = event.target.value;
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
        <div className="modalUser">
          <nav className="contenedorBarra">
            <label>
              <label className="barra notSelec">datos personales</label>
              <label className="barra notSelec">datos fiscales</label>
              <label className="barra selec">membresia</label>
              <label className="barra notSelec">medidas iniciales</label>
            </label>
          </nav>
          <div className="modal-body">
            <div className="form-group">
            <select className= "Input-container-fiscal entero" value={especialidad} onChange={handleEspecialidadChange}>
                <option value="">Seleccionar especialidad de entrenamiento</option>
                <option value="Fitness">Fitness</option>
                <option value="Pilates">Pilates</option>
                <option value="Yoga">Yoga</option>
              </select>
            </div>
          </div>
          <select className= "Input-container-fiscal entero" value={modalidad} onChange={handlemodalidadChange}>
              <option value="">Seleccionar frecuencia de entrenamiento</option>
              <option value="Diario">Diario</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
            </select>
            <select className= "Input-container-fiscal entero" value={entrenador} onChange={handleEntrenador}>
              <option value="">Seleccionar entrenador</option>
              <option value="1">entrenador 1</option>
              <option value="2">entrenador 2</option>
              <option value="3">entrenador 3</option>
            </select>
          <div className="button-container-membrecia">
              <a id="boton-off" onClick={() => {onClickAvance(-1);}}>
                anterior
              </a>
              <button id="boton-ok" onClick={() => {onClickAvance(1);}}>
                siguiente
              </button>
            </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default Membresia;
