import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Resumen.css";

const Resumen = () => {
  const [montoCaja, setMontoCaja] = useState(100000);
  const [estadoCaja, setEstadoCaja] = useState(false);
  const [mostrarArqueo, setMostrarArqueo] = useState(false);
  const [arqueo, setArqueo] = useState({});
  const formattedMontoCaja = montoCaja.toLocaleString();

  useEffect(() => {
    const obtenerEstado = async () => {
      try {
        const response = await fetch("https://localhost:7072/api/caja");
        const data = await response.json();
        const estado = {
          fecha: data.fecha,
          hora_inicio: data.hora_inicio,
          monto_inicial: data.monto_inicial,
          monto_actual: data.monto_actual,
          esAbierta: data.abierta
        }

        console.log(estado);
        //setArqueo(estado);
        setEstadoCaja(estado.esAbierta);
        if (estado.esAbierta) {
          setMontoCaja(estado.monto_actual);
        }
      } catch (error) {
        console.error("Error al obtener los Estado:", error);
      }
    };

    obtenerEstado(); // Llamar a la función para obtener los Productos al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente

  const abrirCaja = async () => {
    try {
      let data = JSON.stringify({
        "monto_inicial": 100000,
        "fecha": "2023-06-12T00:00:00",
        "hora_inicio": "2023-06-12T17:00:00"
      });

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7072/api/abrirCaja',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
        })
        .catch((error) => {
          console.log(error);
        });
      setEstadoCaja(true);
      setMostrarArqueo(false);
    } catch (error) {
      console.error(error);
    }
  };

  const cerrarCaja = async () => {
    try {
      let hora_final = "2023-06-12T18:00:00"; // verificar hora

      const response = await fetch("https://localhost:7072/api/caja");
      const dataEstado = await response.json();

      const estadoArqueo = {
        fecha: dataEstado.fecha,
        hora_inicio: dataEstado.hora_inicio,
        hora_final: hora_final,
        monto_inicial: dataEstado.monto_inicial,
        monto_actual: dataEstado.monto_actual
      }

      setArqueo(estadoArqueo);
      console.log(estadoArqueo);

      let data = JSON.stringify(hora_final);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7072/api/cerrarCaja',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          console.log(JSON.stringify(response.data));
          setTimeout(() => {
            setEstadoCaja(false);
            setMostrarArqueo(true);
          }, 300);
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="resumen-container">
      <div className="row1">
        <div className="Monto-Caja">
          {estadoCaja &&
            <h3>Monto Caja: {formattedMontoCaja} G$</h3>
          }
          {estadoCaja &&
            <p className="Texto-1">Monto actual en caja</p>
          }
          {!estadoCaja && !mostrarArqueo &&
            <h3>Caja Cerrada</h3>
          }
          <div className="divider"></div>
          {mostrarArqueo &&
            <div>
              <h4>Monto Inicial: {arqueo.monto_inicial} G$</h4>
              <h4>Monto Final: {arqueo.monto_actual} G$</h4>
              <p className="Apertura-Caja">Fecha {arqueo.fecha}</p>
              <p className="Apertura-Caja">Hora de apertura de caja {arqueo.hora_inicio}</p>
              <p className="Apertura-Caja">Hora de cierre de caja {arqueo.hora_final}</p>
            </div>
          }
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
