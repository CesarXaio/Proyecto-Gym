import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "././ModalUser.css";

const ModalUser = ({usuario, onClickAvance, onClose, onAddTrainer })=> {
  const [name, setName] = useState(usuario.name);
  const [lastname, setLastname] = useState(usuario.lastname);
  const [modalidad, setModalidad] = useState(usuario.modalidad);
  const [cedula, setCedula] = useState(usuario.cedula);
  const [telefono, setTelefono] = useState(usuario.telefono);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
    usuario.name = event.target.value;
  };

  const handleLastnameChange = (event) => {
    setLastname(event.target.value);
    usuario.lastname = event.target.value;
  };

  const handleModalidadChange = (event) => {
    setModalidad(event.target.value);
    usuario.modalidad = event.target.value;
  };

  const handleCedulaChange = (event) => {
    setCedula(event.target.value);
    usuario.cedula = event.target.value;
  };

  const handleTelefonoChange = (event) => {
    setTelefono(event.target.value);
    usuario.telefono = event.target.value;
  };

  const cancelar = () => {
    onClose();
    onClickAvance(-1);
  };

  return (
    <>
      <div className="modal-overlay">
        <div className="modalUserSimple">
          <nav className="contenedorBarra">
            <label>
              <label className="barra selec">datos personales</label>
              <label className="barra notSelec">datos fiscales</label>
              <label className="barra notSelec">membrecia</label>
              <label className="barra notSelec">medidas iniciales</label>
            </label>
          </nav>
          <div className="modal-body-User">
            <div className="form-group">
            <input
                className="Input-container-User"
                id="name"
                name="name"
                type="text"
                placeholder="Nombre del nuevo usuario"
                value={name}
                onChange={handleNameChange}
              />
              <input
                className="Input-container-User"
                id="name"
                name="name"
                type="text"
                placeholder="Apellido del nuevo usuario"
                value={lastname}
                onChange={handleLastnameChange}
              />
              <input
                type="text"
                id="ciUser"
                placeholder="Cedula de Identidad"
                value={cedula}
                onChange={handleCedulaChange}
              />
              <input
                type="text"
                id="telefonoUser"
                placeholder="Número de Telefono"
                value={telefono}
                onChange={handleTelefonoChange}
              />
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={cancelar}>
                cancelar
              </a>
              <button id="boton-ok" onClick={() => { onClickAvance(1); }}>
                siguiente
              </button>
            </div>
          </div>
        </div>
      </div>

      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default ModalUser;
