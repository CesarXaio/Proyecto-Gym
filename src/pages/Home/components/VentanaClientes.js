import React, { useState } from "react";
import "./VentanaClientes.css";

const VentanaClientes = ({ clientes, onClose, Cliente }) => {
  const [selectedClient, setSelectedClient] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleClientSelection = (event) => {
    setSelectedClient(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = () => {
    // Aquí puedes realizar las acciones necesarias con el cliente seleccionado
    console.log("Cliente seleccionado:", selectedClient);
    let clienteSeleccionado = clientes.find(cliente => cliente.ci === selectedClient);
    let clienteCaja = {
      ci: selectedClient,
      nombre: clienteSeleccionado.nombre
    };
    Cliente.ci = selectedClient;
    Cliente.nombre = clienteSeleccionado.nombre;
    localStorage.setItem("clienteCaja", JSON.stringify(clienteCaja));
    onClose();
  };
  

  const handleClose = () => {
    onClose();
  };

  const filteredClientes = clientes.filter((cliente) =>
    cliente.nombre.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="ventana-clientes-container">
      <div className="ventana-clientes">
        <div className="Select">
          
          <input
          className="Buscador-Clientes"
            type="text"
            placeholder="Buscar por nombre"
            value={searchValue}
            onChange={handleSearchChange}
          />
          <h2>Seleccionar Cliente</h2>
        </div>
        <div className="Clientes-pagar">
          <ul>
            {filteredClientes.map((cliente) => (
              <li key={cliente.ci}>
                <form>
                  <input
                    type="checkbox"
                    value={cliente.ci}
                    checked={selectedClient === cliente.ci}
                    onChange={handleClientSelection}
                  />
                  {cliente.nombre}
                </form>
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
