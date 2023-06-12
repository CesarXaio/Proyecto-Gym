import React from "react";
import "./Resumen.css";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';



const Resumen = () => {
  const montoCaja = 1000; // Cantidad de dinero en la caja
  const montoPlata = 500; // Cantidad de dinero en la sección "Plata"
  
  
  return (
    <div className="resumen-container">
      
      <div className="row1">
        <div className="Monto-Caja">
            <h3>Monto Caja: {montoCaja} G$</h3>
            <p className="Texto-1">Monto actual en caja</p>
          <div className="divider"></div>
          <p className="Apertura-Caja">Hora de apertura de caja 07:00 </p>
          <p className="Cierre-Caja">Hora de cierre de caja 18:00 </p>
        </div>
        <div className="Plata">
          <p>Deuda Actual: {montoPlata} G$</p>
          <p className="Texto-2">Deuda Actual</p>
          <div className="divider"></div>
          <p className="Apertura-Caja">Hora de apertura de caja 07:00 </p>
          <p className="Cierre-Caja">Hora de cierre de caja 18:00 </p>
        </div>
      </div>
      
    </div>
  );
};

export default Resumen;
