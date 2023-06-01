import React, { useState, useEffect } from "react";
import Usuarios from "./components/Usuarios";
import Boton from "./components/Boton";
import "./components/Boton";

// import Fiscales from "./components/modalUsers/fiscales";
import Medidas from "./components/modalUsers/Medidas";
// import Membresia from "./components/modalUsers/Membresia";
// import ModalUser from "./components/modalUsers/ModalUser";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [contadorModal, setContadormodal] = useState(-1);
  // {
  //   contadorModal === 1 && (
  //     <ModalUser usuario={usuario} onClickAvance={actualizador}} />
  //   )
  // }
  const handleAgregarClick = () => {
    setShowModal(true);
  };

  const handleAddUser = (usuario) => {
    setUsuarios([...usuarios, usuario]);
  };

  return (
    <div className="Coach-container">
      <div className="boton-container">
        <Boton palabra="Agregar" onClick={handleAgregarClick} />
      </div>
      {usuarios.map((usuario, index) => (
        <Usuarios key={index} photo={usuario.photo} name={usuario.name} lastname={usuario.lastname} />
      ))}
      {showModal && (
        <Medidas onClose={() => setShowModal(false)} onAddUser={handleAddUser} />
      )}
            {/* \\{showModal && (
        <Fiscales onClose={() => setShowModal(false)} onAddUser={handleAddUser} />
      )}
            {showModal && (
        <Membresia onClose={() => setShowModal(false)} onAddUser={handleAddUser} />
      )}
            {showModal && (
        <Medidas onClose={() => setShowModal(false)} onAddUser={handleAddUser} />
      )} */}
    </div>
  );
};


export default Users;
