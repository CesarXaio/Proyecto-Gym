import React, { useState, useEffect } from "react";
import "././DetallesUser.css";
import Medidas from "./Medidas";
import moment from "moment";
import axios from "axios";

const DetallesUser = ({ usuario, onClickAvance, onClose, onAddTrainer }) => {


  const [medidas, setMedidas] = useState([]);
  const [mostrarMedida, setMostrarMedida] = useState(false);
  useEffect(() => {
    const getMedidas = async () => {
      try {
        const response = await fetch(`https://localhost:7072/api/medicion/${usuario.cedula}`);
        const data = await response.json();
        setMedidas(data)
      } catch (error) {
        console.error("Error al obtener los Medidas:", error);
      }
    };

    getMedidas(); // Llamar a la función para obtener los Productos al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente



  const medidasDiv = ((m) => {
    return (
      <div className="tarjetasDetalle">
        <div className="elementosDetalles">{new Date(m.fecha).toLocaleDateString()}</div>
        <div className="elementosDetalles">{m.medidas.altura}cm</div>
        <div className="elementosDetalles">{m.medidas.peso}kg</div>
        <div className="elementosDetalles">{m.medidas.cintura}cm</div>
        <div className="elementosDetalles">{m.medidas.pecho}cm</div>
        <div className="elementosDetalles">{m.medidas.cadera}cm</div>
      </div>
    )
  })

  const mostrarMedidas = () => {
    setMostrarMedida(true);
  }

  const ocultarMedidas = () => {
    setMostrarMedida(false);
  }

  const enviarMedidas = () => {
    //console.log("Entramos para agregar");

    let medicion = {
      cliente_ci: usuario.cedula,
      entrenador_ci: usuario.entrenador_ci,
      fecha: moment().format("YYYY-MM-DD"),
      medidas: {
        altura: parseFloat(usuario.altura),
        peso: parseFloat(usuario.peso),
        cintura: parseFloat(usuario.cintura),
        pecho: parseFloat(usuario.pecho),
        cadera: parseFloat(usuario.cadera),
        edad: parseFloat(usuario.edad)
      }
    }

    let data = JSON.stringify(medicion);

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7072/api/medicion',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        console.log("Medidas recibidas");
        setMostrarMedida(false);
      })
      .catch((error) => {
        console.log(error);
      });

  };

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
            {medidas.map(m => (
              medidasDiv(m)
            )
            )}
            <div className="button-container">
              <a id="boton-off" onClick={() => { onClickAvance(-1); }}>
                cancelar
              </a>
              <button id="boton-ok" onClick={() => { mostrarMedidas() }}>
                nueva
              </button>
            </div>
            {mostrarMedida && (
              <Medidas usuario={usuario} onClickAvance={ocultarMedidas} onAddUser={enviarMedidas} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default DetallesUser;