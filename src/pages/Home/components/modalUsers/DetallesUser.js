import React, { useState, useEffect } from "react";
import "././DetallesUser.css";

const DetallesUser = ({ usuario, onClickAvance, onClose, onAddTrainer }) => {


  const [medidas, setMedidas] = useState([]);
  useEffect(() => {
    const getMedidas = async () => {
      try {
        const response = await fetch("https://localhost:44373/api/caja");
        const data = await response.json();
        const medidas = {
          fecha: data.fecha,
          hora_inicio: data.hora_inicio,
          monto_inicial: data.monto_inicial,
          monto_actual: data.monto_actual,
          esAbierta: data.abierta
        }
        setMedidas(data)
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    };

    getMedidas(); // Llamar a la función para obtener los Productos al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente



  const medidasDiv = ((m) => {
    return (
      <div>
        <div className="elementoTarjeta separacion">{m.medidas.altura}</div>
        <div className="elementoTarjeta separacion">{m.medidas.peso}</div>
        <div className="elementoTarjeta separacion">{m.medidas.cintura}</div>
        <div className="elementoTarjeta separacion">{m.medidas.pecho}</div>
        <div className="elementoTarjeta separacion">{m.medidas.cadera}</div>
      </div>
    )
  })

  return (
    <>
      <div className="modal-overlay">
        <div className="modalUserSimpleDetalle">
          <div className="modal-body-User">
            {medidas.map(m => (
              medidasDiv(m)
            )
            )}
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