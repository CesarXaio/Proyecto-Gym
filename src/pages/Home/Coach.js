import React, { useState, useEffect } from "react";
import Entrenadores from "./components/Entrenadores";
import Boton from "./components/Boton";
import Modal from "./components/Modal";
import "./components/Boton";

const Coach = () => {
  const [showModal, setShowModal] = useState(false);
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    // Función para obtener los entrenadores de la base de datos
    const obtenerEntrenadores = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los entrenadores
        const response = await fetch("https://localhost:7072/api/Entrenador");
        const data = await response.json();
        setEntrenadores(data); // Asignar los entrenadores al estado
      } catch (error) {
        console.error("Error al obtener los entrenadores:", error);
      }
    };

    obtenerEntrenadores(); // Llamar a la función para obtener los entrenadores al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente

  const handleAgregarClick = () => {
    setShowModal(true);
  };

  const handleAddTrainer = (trainer) => {
    setEntrenadores([...entrenadores, trainer]);
  };

  return (
    <div className="Coach-container">
      <div className="boton-container">
        <Boton palabra="Agregar" onClick={handleAgregarClick} />
      </div>
      {entrenadores.map((trainer, index) => (
        <Entrenadores key={index} photo={trainer.photo} name={trainer.name} modalidad={trainer.modalidad} />
      ))}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onAddTrainer={handleAddTrainer} />
      )}
    </div>
  );
};

export default Coach;
