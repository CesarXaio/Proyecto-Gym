import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "./Medidas.css";

const Medidas = ({usuario, onClickAvance, onClose, onAddTrainer }) => {
  const [altura, setaltura] = useState("");
  const [peso, setpeso] = useState("");
  const [cintura, setcintura] = useState("");
  const [pecho, setpecho] = useState("");
  const [cadera, setcadera] = useState("");
  const [edad, setedad] = useState("");
  const [observaciones, setobservaciones] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handlealturaChange = (event) => {
    setaltura(event.target.value);
  };

  const handlepesoChange = (event) => {
    setpeso(event.target.value);
  };

  const handlcinturaChange = (event) => {
    setcintura(event.target.value);
  };

  const handlepechoChange = (event) => {
    setpecho(event.target.value);
  };
  const handlecaderaChange = (event) => {
    setcadera(event.target.value);
  };
  const handledadChange = (event) => {
    setedad(event.target.value);
  }
  const handlobservacionesChange = (event) => {
    setobservaciones(event.target.value);
  }


  const handleAddTrainer = () => {
    if (typeof onAddTrainer === "function") {
      const newTrainer = {altura, peso, cintura, pecho, cadera, edad, observaciones };
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
              <label className="barra notSelec">datos fiscales</label>
              <label className="barra notSelec">membrecia</label>
              <label className="barra selec">medidas iniciales</label>
            </label>
          </nav>
          <div className="modal-body">
            <div className="form-group">
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="Altura"
                value={altura}
                onChange={handlealturaChange}
              />
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="Peso"
                value={peso}
                onChange={handlepesoChange}
              />
            </div>
            <div className="form-group">
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                type="text"
                // id="cedula"
                placeholder="Cintura"
                value={cintura}
                onChange={handlcinturaChange}
              />
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                type="text"
                // id="cedula"
                placeholder="Pecho"
                value={pecho}
                onChange={handlepechoChange}
              />
            </div>
            <div className="form-group">
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="cadera"
                value={peso}
                onChange={handlecaderaChange}
              />
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="edad"
                value={edad}
                onChange={handledadChange}
              />
            </div>
            <div className="form-group">
              <input
                className="Input-container-fiscal entero"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="observaciones"
                value={observaciones}
                onChange={handlobservacionesChange}
              />
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={() => {onClickAvance(-1);}}>
                atras
              </a>
              <button id="boton-ok" onClick={handleAddTrainer}>
                Aceptar
              </button>
            </div>
          </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default Medidas;
