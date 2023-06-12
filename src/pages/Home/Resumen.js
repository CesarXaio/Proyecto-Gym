import React, { useState } from "react";
import axios from "axios";
import "./Resumen.css";

const Resumen = () => {
  const [montoCaja, setMontoCaja] = useState(100000);
  const formattedMontoCaja = montoCaja.toLocaleString();

  const abrirCaja = async () => {
    try {
      const response = await axios.post("api/abrirCaja", {
        fecha: new Date().toISOString(),
        hora_inicio: new Date().toLocaleTimeString(),
        monto_inicial: montoCaja
      });
      console.log(response.data); // Puedes realizar alguna acción adicional con la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarCaja = async () => {
    try {
      const response = await axios.post("api/cerrarCaja", {
        hora_final: new Date().toLocaleTimeString(),
        monto_final: montoCaja
      });
      console.log(response.data); // Puedes realizar alguna acción adicional con la respuesta
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="resumen-container">
      <div className="row1">
        <div className="Monto-Caja">
          <h3>Monto Caja: {formattedMontoCaja} G$</h3>
          <p className="Texto-1">Monto actual en caja</p>
          <div className="divider"></div>
          <p className="Apertura-Caja">Hora de apertura de caja 07:00</p>
          <p className="Cierre-Caja">Hora de cierre de caja 18:00</p>
        </div>
        <div className="Apertura-Cierre">
          <button className="aperturaCaja" onClick={abrirCaja}>
            Apertura de Caja
          </button>
          <button className="cierreCaja" onClick={cerrarCaja}>
            Cierre de Caja
          </button>
        </div>
      </div>
    </div>
  );
};

export default Resumen;
