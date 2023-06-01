import React, { useState } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "./Medidas.css";

const Medidas = ({ onClose, onAddTrainer }) => {
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
        <div className="modal">
          <nav className="contenedorBarra">
            <ul>
              <li className="barra"><a href="">datos personales</a></li>
              <li className="barra"><a href="">datos fiscales</a></li>
              <li className="barra"><a href="">membrecia</a></li>
              <li className="barra"><a href="">medidas inciales</a></li>
            </ul>
          </nav>
          <div className="modal-body">
            <div className="form-group">
              <input
                classaltura="Input-container"
                id="cedula"
                altura="altura"
                type="text"
                placeholder="Altura"
                value={altura}
                onChange={handlealturaChange}
              />
              <input
                classaltura="Input-container"
                id="cedula"
                altura="altura"
                type="text"
                placeholder="Peso"
                value={peso}
                onChange={handlepesoChange}
              />
              <input
                classaltura="Input-container"
                type="text"
                id="cedula"
                placeholder="Cintura"
                value={cintura}
                onChange={handlcinturaChange}
              />
              <input
                classaltura="Input-container"
                type="text"
                id="cedula"
                placeholder="Pecho"
                value={pecho}
                onChange={handlepechoChange}
              />
              <input
                classaltura="Input-container"
                id="cedula"
                altura="altura"
                type="text"
                placeholder="cadera"
                value={peso}
                onChange={handlecaderaChange}
              />
              <input
                classaltura="Input-container"
                id="cedula"
                altura="altura"
                type="text"
                placeholder="edad"
                value={edad}
                onChange={handledadChange}
              />
              <input
                classaltura="Input-container"
                id="cedula"
                altura="altura"
                type="text"
                placeholder="observaciones"
                value={observaciones}
                onChange={handlobservacionesChange}
              />
            </div>
            <div className="button-container">
              <a id="boton-off" onClick={onClose}>
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
