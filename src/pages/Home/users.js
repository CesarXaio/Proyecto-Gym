import React, { useState, useEffect } from "react";
import Usuarios from "./components/Usuarios";
import Boton from "./components/Boton";
import "./components/Boton";
import "./user.css"

import Fiscales from "./components/modalUsers/fiscales";
import Medidas from "./components/modalUsers/Medidas";
import Membresia from "./components/modalUsers/Membresia";
import ModalUser from "./components/modalUsers/ModalUser";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [contadorModal, setContadorModal] = useState(0);
  const [usuario, setUsuario] = useState({});
  const handleAgregarClick = () => {
    setShowModal(true);
  };

  const handleAddUser = (usuario) => {
    setUsuarios([...usuarios, usuario]);
  };
  const actualizador = (i) => {
    setContadorModal(contadorModal+i);
    };
  return (
    <div className="Coach-container">
      <div className="boton-container">
        <Boton palabra="Agregar" onClick={() => {actualizador(1);}} />
      </div>
      <div className="contenedorTitulos">
        <h3 className="tituloUser">nombre y apellido</h3>
        <h3 className="tituloUser">C.I</h3>
        <h3 className="tituloUser">categoria</h3>
        <h3 className="tituloUser">membresia</h3>
        <h3 className="tituloUser">estado de membresia</h3>
      </div>
      {usuarios.map((usuario, index) => (
        <Usuarios key={index} name={usuario.name} lastname={usuario.lastname} />
      ))}
      {contadorModal === 1 && (
        <ModalUser usuario={usuario} onClickAvance={actualizador} />
      )}
      {contadorModal === 2 && (
        <Fiscales usuario={usuario} onClickAvance={actualizador} />
      )}
      {contadorModal === 3 && (
        <Membresia usuario={usuario} onClickAvance={actualizador} />
      )}
      {contadorModal === 4 && (
        <Medidas usuario={usuario} onClickAvance={actualizador} />
      )}
    </div>
  );
};


export default Users;
