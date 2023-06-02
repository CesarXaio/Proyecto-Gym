import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "./fiscales.css";

const Fiscales = ({usuario, onClickAvance, onClose, onAddTrainer }) => {
  const [name, setName] = useState(usuario.name);
  const [lastname, setLastname] = useState(usuario.lastname);
  const [ruc, setruc] = useState(usuario.ruc);
  const [telefono, settelefono] = useState(usuario.telefono);
  const [domicilio, setdomicilio] = useState(usuario.domicilio);
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

  const handlerucChange = (event) => {
    setruc(event.target.value);
    usuario.ruc = event.target.value;
  };

  const handletelefonoChange = (event) => {
    settelefono(event.target.value);
    usuario.telefono = event.target.value;
  };
  const handledomicilioChange = (event) => {
    setdomicilio(event.target.value);
    usuario.domicilio = event.target.value;
  };

  const handleAddTrainer = () => {
    if (typeof onAddTrainer === "function") {
      const newTrainer = { name,lastname, ruc, telefono, domicilio };
      setMensaje("Usuario agregado con Exito!");
      setMostrarMensaje(true);
      setTimeout(() => {
        onAddTrainer(newTrainer);
        onClose();
        setMostrarMensaje(false);
      }, 1000);

    }
  };


  return (
    <>
      <div className="modal-overlay">
        <div className="modalUser">
          <nav className="contenedorBarra">
            <label>
              <label className="barra notSelec">datos personales</label>
              <label className="barra selec">datos fiscales</label>
              <label className="barra notSelec">membrecia</label>
              <label className="barra notSelec">medidas iniciales</label>
            </label>
          </nav>
          <div className="modal-body-fiscal">
            <div className="form-group">
              <input
                className="Input-container-fiscal"
                // id="cedula"
                name="name"
                type="text"
                placeholder="Nombre del usuario"
                value={name}
                onChange={handleNameChange}
              />
              <input
                className="Input-container-fiscal"
                // id="cedula"
                name="name"
                type="text"
                placeholder="Apellido del usuario"
                value={lastname}
                onChange={handleLastnameChange}
              />
              <input
                className="Input-container-fiscal"
                type="text"
                // id="cedula"
                placeholder="RUC"
                value={ruc}
                onChange={handlerucChange}
              />
              <input
                className="Input-container-fiscal"
                type="text"
                // id="cedula"
                placeholder="Numero de telefono"
                value={telefono}
                onChange={handletelefonoChange}
              />
              <input
                className="Input-container-fiscal entero"
                // id="name"
                // name="name"
                type="text"
                placeholder="Domicilio del usuario"
                value={domicilio}
                onChange={handledomicilioChange}
              />
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={() => {onClickAvance(-1);}}>
                anterior
              </a>
              <button id="boton-ok" onClick={() => {onClickAvance(1);}}>
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

export default Fiscales;
