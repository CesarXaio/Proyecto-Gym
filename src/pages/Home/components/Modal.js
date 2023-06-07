import React, { useEffect, useState } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Modal.css";
import axios from "axios";

const Modal = ({ onClose, onAddTrainer }) => {
  const [nombre, setNombre] = useState("");
  const [especialidad, setEspecialidad] = useState("");
  const [ci, setCI] = useState("");
  const [telefono, setTelefono] = useState("");
  
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [entrenadores, setEntrenadores] = useState([]); // Estado para almacenar los datos de los entrenadores

  useEffect(() => {
    // Realiza una solicitud GET para obtener los datos de los entrenadores desde la API
    const fetchEntrenadores = async () => {
      try {
        const response = await axios.get("https://localhost:7072/api/Entrenador");
        setEntrenadores(response.data);
      } catch (error) {
        console.log("Error al obtener los entrenadores:", error);
      }
    };

    fetchEntrenadores();
  }, []);

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

  const handleAddTrainer = () => {
    if (typeof onAddTrainer === "function") {
      const newTrainer = { nombre, especialidad, ci, telefono };
      
      setMensaje("Entrenador agregado con éxito!");
      setMostrarMensaje(true);
      setTimeout(() => {
        onAddTrainer(newTrainer);
        onClose();
        setMostrarMensaje(false);
        
        // Guardar los datos en la base de datos
        axios.post("https://localhost:7072/api/Entrenador", newTrainer)
          .then(response => {
            console.log("Entrenador guardado en la base de datos:", response.data);
          })
          .catch(error => {
            console.error("Error al guardar el entrenador en la base de datos:", error);
          });

        // Agregar el nuevo entrenador al estado entrenadores
        setEntrenadores(prevEntrenadores => [...prevEntrenadores, newTrainer]);
      }, 1000);
    }
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2>Nuevo Entrenador</h2>
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
              <select id="especialidad" value={especialidad} onChange={handleEspecialidadChange}>
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
              <button id="boton-ok" onClick={handleAddTrainer}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mostrar los entrenadores existentes */}
      <div>
        {entrenadores.map((entrenador) => (
          <div key={entrenador.id}>
            <h3>{entrenador.nombre}</h3>
            <p>Especialidad: {entrenador.especialidad}</p>
            <p>Cédula: {entrenador.ci}</p>
            <p>Teléfono: {entrenador.telefono}</p>
          </div>
        ))}
      </div>

      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default Modal;
