import React, { useState } from "react";
import "./VentanaClientes.css";

const VentanaClientes = ({ clientes, onClose, Cliente }) => {
  const [selectedClient, setSelectedClient] = useState("");

  const handleClientSelection = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar las acciones necesarias con el cliente seleccionado
    console.log("Cliente seleccionado:", selectedClient);
    let clienteCaja = {
      ci: selectedClient
    };
    Cliente.ci = selectedClient;
    localStorage.setItem("clienteCaja", JSON.stringify(clienteCaja));
    onClose();
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="ventana-clientes-container">
      <div className="ventana-clientes">
        <div className="Select">
          <h2>Seleccionar Cliente</h2>
          
           
        </div>
        <div className="Clientes-pagar">
          <ul>
            {clientes.map((cliente) => (
              <li key={cliente.ci}>
                <label>
                  <input
                    type="radio"
                    value={cliente.ci}
                    checked={selectedClient === cliente.ci}
                    onChange={handleClientSelection}
                  />
                  {cliente.nombre}
                </label>
              </li>
            ))}
          </ul>
        </div>
        <div className="Boton-Cli">
          <button className="Aceptar" onClick={handleSubmit}>Aceptar</button>
          <button className="Cerrar" onClick={handleClose}>Cerrar</button>
        </div>

      </div>
    </div>
  );
};

export default VentanaClientes;
