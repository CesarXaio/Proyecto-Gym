import React, { useState, useEffect } from "react";
import "./Medidas.css"

const Medidas = ({usuario, onClickAvance, onClose, onAddUser }) => {
  const [altura, setaltura] = useState(usuario.altura);
  const [peso, setpeso] = useState(usuario.peso);
  const [cintura, setcintura] = useState(usuario.cintura);
  const [pecho, setpecho] = useState(usuario.pecho);
  const [cadera, setcadera] = useState(usuario.cadera);
  const [edad, setedad] = useState(usuario.edad);
  const [observaciones, setobservaciones] = useState(usuario.observaciones);

  const handlealturaChange = (event) => {
    setaltura(parseFloat(event.target.value));
    usuario.altura = event.target.value;
  };

  const handlepesoChange = (event) => {
    setpeso(parseFloat(event.target.value));
    usuario.peso = event.target.value;
  };

  const handlcinturaChange = (event) => {
    setcintura(parseFloat(event.target.value));
    usuario.cintura = event.target.value;
  };

  const handlepechoChange = (event) => {
    setpecho(parseFloat(event.target.value));
    usuario.pecho = event.target.value;
  };
  const handlecaderaChange = (event) => {
    setcadera(parseFloat(event.target.value));
    usuario.cadera = event.target.value;
  };
  const handledadChange = (event) => {
    setedad(parseFloat(event.target.value));
    usuario.edad = event.target.value;
  }
  const handlobservacionesChange = (event) => {
    setobservaciones(event.target.value);
    usuario.observaciones = event.target.value;
  }

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
            <div>
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="Altura (cm)"
                value={altura}
                onChange={handlealturaChange}
              />
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="Peso (kg)"
                value={peso}
                onChange={handlepesoChange}
              />
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                type="text"
                // id="cedula"
                placeholder="Cintura (cm)"
                value={cintura}
                onChange={handlcinturaChange}
              />
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                type="text"
                // id="cedula"
                placeholder="Pecho (cm)"
                value={pecho}
                onChange={handlepechoChange}
              />
              <input
                className="Input-container-fiscal"
                classaltura="Input-container"
                // id="cedula"
                altura="altura"
                type="text"
                placeholder="cadera (cm)"
                value={cadera}
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
                anterior
              </a>
              <button id="boton-ok" onClick={() => { onAddUser(); }}>
                guardar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Medidas;
