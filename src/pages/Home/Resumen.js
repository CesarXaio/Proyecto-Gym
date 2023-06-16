import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Resumen.css";
import moment from "moment/moment";

const Resumen = () => {
  const [montoCaja, setMontoCaja] = useState(100000);
  const [estadoCaja, setEstadoCaja] = useState(false);
  const [mostrarArqueo, setMostrarArqueo] = useState(false);
  const [arqueo, setArqueo] = useState({});
  const formattedMontoCaja = montoCaja.toLocaleString();
  const [tablaDatos, setTablaDatos] = useState([]);


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
      obtenerResumen();
    };

    const obtenerResumen = async () => {
      try {
        const response = await fetch("https://localhost:7072/api/resumen");
        const data = await response.json();
        const resumen = data.map(d => {
          return {
            nombre: d.nombre_cliente,
            descripcion: d.descripcion,
            valorTotal: d.valor_total
          }
        })

        console.log(resumen);
        setTablaDatos(resumen)
        
      } catch (error) {
        console.error("Error al obtener los resumen:", error);
      }
    };

    obtenerEstado();
    obtenerResumen();  // Llamar a la función para obtener los Productos al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente

  const abrirCaja = async () => {
    try {
      let data = JSON.stringify({
        "monto_inicial": 100000,
        "fecha": moment().format("YYYY-MM-DD"),
        "hora_inicio": moment().format("YYYY-MM-DD[T]hh:mm:[00]")
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
      let hora_final = moment().format("YYYY-MM-DD[T]hh:mm:[00]");

      const response = await fetch("https://localhost:7072/api/caja");
      const dataEstado = await response.json();

      const estadoArqueo = {
        fecha: new Date(dataEstado.fecha).toLocaleDateString(),
        hora_inicio: new Date(dataEstado.hora_inicio).toLocaleTimeString(),
        hora_final: new Date(hora_final).toLocaleTimeString(),
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
          setTablaDatos([])
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
            <div className="Arqueo-Final">
              <h4>Monto Inicial: {arqueo.monto_inicial} G$</h4>
              <h4>Monto Final: {arqueo.monto_actual} G$</h4>
              <p className="Apertura-Caja">Fecha: {arqueo.fecha}</p>
              <p className="Apertura-Caja">Hora de apertura de caja: {arqueo.hora_inicio}</p>
              <p className="Apertura-Caja">Hora de cierre de caja: {arqueo.hora_final}</p>
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
      {estadoCaja && (
        <table className="tabla-datos">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Valor Total</th>
            </tr>
          </thead>
          <tbody>
            {tablaDatos.map((dato, index) => (
              <tr key={index}>
                <td>{dato.nombre}</td>
                <td>{dato.descripcion}</td>
                <td>{dato.valorTotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Resumen;