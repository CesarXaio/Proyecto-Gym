import React, { useState } from "react";
import Entrenadores from "./components/Entrenadores";
import Boton from "./components/Boton";
import Modal from "./components/ModalUser";
import "./components/Boton";

const Users = () =>{
  const [showModal, setShowModal] = useState(false);
  const [entrenadores, setEntrenadores] = useState([
    
  ]);

  const handleAgregarClick = () => {
    setShowModal(true);
  };

  const handleAddTrainer = (trainer) => {
    setEntrenadores([...entrenadores, trainer]);
  };
    return(
      <>
        <div className="boton-container">
          <Boton palabra="Agregar" onClick={handleAgregarClick} />
        </div>
        {entrenadores.map((trainer, index) => (
        <Entrenadores key={index} photo={trainer.photo} name={trainer.name} modalidad={trainer.modalidad} />
      ))}
        {showModal && (
          <Modal onClose={() => setShowModal(false)} onAddTrainer={handleAddTrainer} />
        )}
      </>  
    );
}

export default Users;