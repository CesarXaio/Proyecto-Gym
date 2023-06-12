import React, { useState } from "react";
import Modal from "react-modal";
import "./VentanaClientes.css";
import ReactModal from "react-modal";




const VentanaClientes = ({ clientes, onClose }) => {
  const [selectedClient, setSelectedClient] = useState("");

  const handleClientSelection = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar las acciones necesarias con el cliente seleccionado
    console.log("Cliente seleccionado:", selectedClient);
    onClose();
  };

  return (
    <Modal
      isOpen={true} // Puedes ajustar la prop "isOpen" según tu implementación
      onRequestClose={onClose}
      contentLabel="Seleccionar Cliente"
      className="ventana-clientes-modal"
      overlayClassName="ventana-clientes-overlay"
    >
      <h2 className="Select">Seleccionar Cliente</h2>
      <ul>
        {clientes.map((cliente) => (
          <li key={cliente.id}> {/* Agrega la propiedad key con un valor único */}
            <label className="Clientes-pagar">
              <input
                type="radio"
                value={cliente.id}
                checked={selectedClient === cliente.id}
                onChange={handleClientSelection}
              />
              {cliente.nombre}
            </label>
          </li>
        ))}
      </ul>
      <button className="Boton-Cli" onClick={handleSubmit}>Aceptar</button>
    </Modal>
  );
        };  
export default VentanaClientes;
