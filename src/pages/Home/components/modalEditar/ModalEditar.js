import React, { useState } from "react";
import "./ModalEditar.css";
import Mensaje from "../../../../Confirmacion/Mensaje";
import axios from "axios";

const ModalEditar = ({ entrenador, onSave, onClose }) => {
  const [nombre, setNombre] = useState(entrenador.nombre);
  const [especialidad, setEspecialidad] = useState(entrenador.especialidad);
  const [ci, setCI] = useState(entrenador.ci);
  const [telefono, setTelefono] = useState(entrenador.telefono);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  };

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
  };

  const handleCIChange = (event) => {
    setCI(event.target.value);
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
  };

  const handleGuardar = () => {
    const entrenadorEditado = {
      nombre,
      especialidad,
      ci,
      telefono,
    };

    axios
      .put(`https://localhost:7072/api/Entrenador/${entrenador.ci}`, entrenadorEditado)
      .then((response) => {
        onSave(entrenadorEditado); // Llamar a la función onSave con los datos del entrenador editado
        onClose(); // Cerrar el modal

        // Mostrar el mensaje de éxito
        setMensaje("Entrenador editado exitosamente");
        setMostrarMensaje(true);
        setTimeout(() => {
            setMostrarMensaje(false);
          }, 1000);
        })
      
      .catch((error) => {
        console.error("Error al editar el entrenador:", error);
        // Mostrar el mensaje de error
        setMensaje("Error al editar el entrenador");
        setMostrarMensaje(true);
        setTimeout(() => {
        setMostrarMensaje(false);
        }, 1000);
});
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Editar Entrenador</h2>
          </div>
          <div className="modal-body">
            <div className="form-group">
              <input
                className="Input-container"
                type="text"
                id="nombre"
                value={nombre}
                placeholder="Ingrese el nuevo entrenador"
                onChange={handleNombreChange}
              />
            </div>
            <div className="form-group">
              <select
                id="especialidad"
                value={especialidad}
                onChange={handleEspecialidadChange}
              >
                <option value="">Seleccionar especialidad</option>
                <option value="Fitness">Fitness</option>
                <option value="Pilates">Pilates</option>
                <option value="Yoga">Yoga</option>
              </select>
            </div>

            <div className="form-group">
              <input
                type="text"
                id="ci"
                placeholder="Cédula de Identidad"
                value={ci}
                onChange={handleCIChange}
              />

              <input
                type="text"
                id="telefono"
                placeholder="Número de Teléfono"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>

            <div className="button-container">
              <a id="boton-off" onClick={onClose}>
                Cancelar
              </a>
              <button id="boton-ok" onClick={handleGuardar}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default ModalEditar;
