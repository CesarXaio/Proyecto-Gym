import React, { useState } from "react";
import "././DetallesUser.css";

const DetallesUser = ({usuario, onClickAvance, onClose, onAddTrainer })=> {

  return (
    <>
      <div className="modal-overlay">
        <div className="modalUserSimpleDetalle">
          <div className="modal-body-User">
              <div className="contenedorDetalle">
                <h3 className="tituloDetalle">fecha</h3>
                <h3 className="tituloDetalle">altura</h3>
                <h3 className="tituloDetalle">peso</h3>
                <h3 className="tituloDetalle">cintura</h3>
                <h3 className="tituloDetalle">pecho</h3>
                <h3 className="tituloDetalle">cadera</h3>
              </div>
              <div className="tarjetasDetalle">
                <div className="elementosDetalles">{usuario.altura}</div>
                <div className="elementosDetalles">{usuario.altura}</div>
                <div className="elementosDetalles">{usuario.peso}</div>
                <div className="elementosDetalles">{usuario.cintura}</div>
                <div className="elementosDetalles">{usuario.pecho}</div>
                <div className="elementosDetalles">{usuario.cadera}</div> 
              </div>
              <div className="tarjetasDetalle">
                <div className="elementosDetalles">{usuario.altura}</div>
                <div className="elementosDetalles">{usuario.altura}</div>
                <div className="elementosDetalles">{usuario.peso}</div>
                <div className="elementosDetalles">{usuario.cintura}</div>
                <div className="elementosDetalles">{usuario.pecho}</div>
                <div className="elementosDetalles">{usuario.cadera}</div> 
              </div>
              <div className="tarjetasDetalle">
                <div className="elementosDetalles">{usuario.altura}</div>
                <div className="elementosDetalles">{usuario.altura}</div>
                <div className="elementosDetalles">{usuario.peso}</div>
                <div className="elementosDetalles">{usuario.cintura}</div>
                <div className="elementosDetalles">{usuario.pecho}</div>
                <div className="elementosDetalles">{usuario.cadera}</div> 
              </div>
              <div className="button-container">
              <a id="boton-off" onClick={() => {onClickAvance(-1);}}>
                cancelar
              </a>
              <button id="boton-ok" onClick={() => {}}>
                nueva 
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallesUser;