import React, { useState, useEffect } from "react";
import Entrenadores from "./components/Entrenadores";
import Boton from "./components/Boton";
import Modal from "./components/Modal";
import "./components/Boton";

const Coach = () => {
  const [showModal, setShowModal] = useState(false);
  const [entrenadores, setEntrenadores] = useState([]);

  useEffect(() => {
    const obtenerEntrenadores = async () => {
      try {
        const response = await fetch("https://localhost:7072/api/Entrenador");
        const data = await response.json();
        setEntrenadores(data);
      } catch (error) {
        console.error("Error al obtener los entrenadores:", error);
      }
    };

    obtenerEntrenadores();
  }, []);

  const handleAgregarClick = () => {
    setShowModal(true);
  };

  const handleAddTrainer = (trainer) => {
    setEntrenadores([...entrenadores, trainer]);
  };

  const handleEditarEntrenador = async (entrenadorEditado) => {
    try {
      // Realizar la petición a la API para editar el entrenador
      await fetch(`https://localhost:7072/api/Entrenador/${entrenadorEditado.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(entrenadorEditado),
      });

      // Actualizar la lista de entrenadores después de editar
      const entrenadoresActualizados = entrenadores.map((entrenador) => {
        if (entrenador.id === entrenadorEditado.id) {
          return entrenadorEditado;
        }
        return entrenador;
      });

      setEntrenadores(entrenadoresActualizados);
    } catch (error) {
      console.error("Error al editar el entrenador:", error);
    }
  };

  const handleEliminarEntrenador = async (entrenadorEliminado) => {
    try {
      // Realizar la petición a la API para eliminar el entrenador
      await fetch(`https://localhost:7072/api/Entrenador/${entrenadorEliminado.id}`, {
        method: "DELETE",
      });

      // Actualizar la lista de entrenadores después de eliminar
      const entrenadoresActualizados = entrenadores.filter(
        (entrenador) => entrenador.id !== entrenadorEliminado.id
      );

      setEntrenadores(entrenadoresActualizados);
    } catch (error) {
      console.error("Error al eliminar el entrenador:", error);
    }
  };

  return (
    <div className="Coach-container">
      <div className="boton-container">
        <Boton palabra="Agregar" onClick={handleAgregarClick} />
      </div>
      {entrenadores.map((trainer, index) => (
        <Entrenadores
          key={index}
          {...trainer}
          onEditarEntrenador={handleEditarEntrenador}
          onEliminarEntrenador={handleEliminarEntrenador}
        />
      ))}
      {showModal && (
        <Modal onClose={() => setShowModal(false)} onAddTrainer={handleAddTrainer} />
      )}
    </div>
  );
};

export default Coach;

