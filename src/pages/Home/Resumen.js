import React from "react";
import "./Resumen.css";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-moment';



const Resumen = () => {
  const montoCaja = 1000; // Cantidad de dinero en la caja
  const montoPlata = 500; // Cantidad de dinero en la sección "Plata"
  const dataInforme1 = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
    datasets: [
      {
        label: 'Informe 1',
        data: [50, 75, 60, 80, 70, 90],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };
  
  const optionsInforme1 = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };
  
  const dataInforme2 = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
    datasets: [
      {
        label: 'Informe 2',
        data: [100, 150, 120, 180],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
      },
    ],
  };
  
  const optionsInforme2 = {
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
      },
    },
  };
  
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
      <div className="row2">
        <div className="Informe1">
            <Line className="Inf-1" data={dataInforme1} options={optionsInforme1} />
            <p className="Informe-Semanal">Informe semanal</p>
        </div>
        <div className="Informe2">
            
            <Line className="Inf-2" data={dataInforme2} options={optionsInforme2} />
            <p className="Informe-Semana2">Informe semanal</p>
        </div>
      </div>
    </div>
  );
};

export default Resumen;
