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
  const [mostrarVentas, setMostrarVentas] = useState(false);
  const [numCajero, setNumCajero] = useState(1);
  const [historialVentas, setHistorialVentas] = useState([]);
  const [fechaHistorial, setFechaHistorial] = useState(moment().format("YYYY-MM-DD"));



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
        };

        console.log(estado);
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
        const resumen = data.map((d) => {
          return {
            nombre: d.nombre_cliente,
            descripcion: d.descripcion,
            valorTotal: d.valor_total
          };
        });

        console.log(resumen);
        setTablaDatos(resumen);
      } catch (error) {
        console.error("Error al obtener los resumen:", error);
      }
    };

    obtenerArqueos();
    obtenerEstado();
    obtenerResumen();
  }, []);
  useEffect(() => {
    const storedMostrarVentas = localStorage.getItem("mostrarVentas");
    if (storedMostrarVentas) {
      setMostrarVentas(JSON.parse(storedMostrarVentas));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("mostrarVentas", JSON.stringify(mostrarVentas));
  }, [mostrarVentas]);

  const obtenerArqueos = async (fechaIngresada) => {
    
    let data;
    if(fechaIngresada){
      data = fechaIngresada;
    } else {
      data = JSON.stringify(fechaHistorial);
    }

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7072/api/arqueo',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        let numeroCajero = 0;
        const ventasCajero = tablaDatos.slice(); // Copia de tablaDatos
        const historial = response.data.map((a) => {
          return {
            turno: `Turno: ${++numeroCajero}`,
            fecha: new Date(a.fecha).toLocaleDateString(),
            hora_inicio: new Date(a.hora_inicio).toLocaleTimeString(),
            hora_final: new Date(a.fora_final).toLocaleTimeString(),
            monto_inicial: a.monto_inicial,
            monto_final: a.monto_final,
            ventas: a.ventas.map((v) => {
              return {
                nombre: v.nombre_cliente,
                descripcion: v.descripcion,
                valorTotal: v.valor_total
              }
            })
          }
        }); 
        
        console.log(historial);
        setHistorialVentas(historial);
      })
      .catch((error) => {
        console.log(error);
      });
  }

const abrirCaja = async () => {
  try {
    let data = JSON.stringify({
      monto_inicial: 100000,
      fecha: moment().format("YYYY-MM-DD"),
      hora_inicio: moment().format("YYYY-MM-DD[T]hh:mm:[00]"),
      cajero: `Cajero ${numCajero}`
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://localhost:7072/api/abrirCaja",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setMontoCaja(100000); // Restablecer el monto inicial
      })
      .catch((error) => {
        console.log(error);
      });

    if (!estadoCaja) {
      setEstadoCaja(true);
      setMostrarArqueo(false);
      setNumCajero(numCajero + 1);
      setTablaDatos([]); // Borrar la tabla de ventas al abrir la caja
    }
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
    };

    setArqueo(estadoArqueo);
    console.log(estadoArqueo);

    let data = JSON.stringify(hora_final);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://localhost:7072/api/cerrarCaja",
      headers: {
        "Content-Type": "application/json"
      },
      data: data
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));

        // Obtener una copia independiente de los datos de la tabla
        const ventasCajero = tablaDatos.slice(); // Copia de tablaDatos

        // Agregar el historial de ventas del cajero actual al historial general
        setHistorialVentas((prevHistorial) => [
          ...prevHistorial,
          {
            cajero: `Cajero ${numCajero - 1}`,
            ventas: ventasCajero
          }
        ]);

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

  const handleFechaHistorialChange = (event) => {
  setFechaHistorial(event.target.value);
  obtenerArqueos(event.target.value);
  console.log("Cambio filtro");
  console.log(event.target.value);
};
  
  const mostrarVentasPopUp = () => {
    setMostrarVentas(true);
    
  };

  return (
    <div className="resumen-container">
      <div className="row1">
        <div className="Monto-Caja">
          {estadoCaja && (
            <div>
              <h3>Monto Caja: {formattedMontoCaja} G$</h3>
              <p className="Texto-1">Monto actual en caja</p>
            </div>
          )}
          {!estadoCaja && !mostrarArqueo && <h3>Caja Cerrada</h3>}
          <div className="divider"></div>
          {mostrarArqueo && (
            <div className="Arqueo-Final">
              <h4>Monto Inicial: {arqueo.monto_inicial} G$</h4>
              <h4>Monto Final: {arqueo.monto_actual} G$</h4>
              <p className="Apertura-Caja">Fecha: {arqueo.fecha}</p>
              <p className="Apertura-Caja">Hora de apertura de caja: {arqueo.hora_inicio}</p>
              <p className="Apertura-Caja">Hora de cierre de caja: {arqueo.hora_final}</p>
            </div>
          )}
        </div>
        {mostrarVentas && (
          <div className="ventana-emergente">
            <h3>Historial de Ventas</h3>
            <input type="date" id="start" name="trip-start"
              value={fechaHistorial} onChange={handleFechaHistorialChange}
              min="2018-01-01" max="2024-12-31"></input>
            {historialVentas.map((cajero, index) => (
              <div key={index}>
                <h4>{`${cajero.turno} - ${cajero.fecha} - ${cajero.hora_inicio} / ${cajero.hora_final} `}</h4>
                <table className="tabla-datos">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Valor Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cajero.ventas.map((venta, index) => (
                      <tr className="si" key={index}>
                        <td>{venta.nombre}</td>
                        <td>{venta.descripcion}</td>
                        <td>{venta.valorTotal}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
            
            <button className="cerrar-ventana" onClick={() => setMostrarVentas(false)}>
          Cerrar
        </button>
          </div>
        )}
        <div className="Apertura-Cierre">
          <button className="aperturaCaja" onClick={abrirCaja}>
            Apertura de Caja
          </button>
          <button className="cierreCaja" onClick={cerrarCaja}>
            Cierre de Caja
          </button>
          <button className="mostrarVentas" onClick={mostrarVentasPopUp}>
            Mostrar Historial
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
