import React, { useState, useEffect } from "react";
import Mensaje from "../../../../Confirmacion/Mensaje";
import "./Membresia.css";
import axios from "axios";

const Membresia = ({usuario, onClickAvance, onClose, onAddTrainer }) => {
  const [especialidad, setEspecialidad] = useState(usuario.especialidad);
  const [modalidad, setmodalidad] = useState(usuario.modalidad);
  const [entrenador, setEntrenador] = useState(usuario.entrenador);
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const [especialidades, setEspecialidades] = useState([]);
  const [modalidades, setModalidades] = useState([]);
  const [entrenadores, setEntrenadores] = useState([]);


  useEffect(() => {

    const obtenerEspecialidades = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Especialidades
        const response = await fetch("https://localhost:7072/api/especialidad");
        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error("Error al obtener los Especialidades:", error);
      }
    }

    const obtenerModalidades = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Productos
        const response = await fetch("https://localhost:7072/api/modalidad");
        const data = await response.json();
        setModalidades(data);
      } catch (error) {
        console.error("Error al obtener los Especialidades:", error);
      }
    }

    const obtenerEntrenadores = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Entrenadores
        const response = await fetch("https://localhost:7072/api/Entrenador");
        const data = await response.json();
        setEntrenadores(data); // Asignar los entrenadores al estado
      } catch (error) {
        console.error("Error al obtener los Entrenadores:", error);
      }
    }

    obtenerModalidades();
    obtenerEspecialidades();
    obtenerEntrenadores();
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente

  const handleEspecialidadChange = (event) => {
    setEspecialidad(event.target.value);
    usuario.especialidad = event.target.value;
  };

  const handlemodalidadChange = (event) => {
    setmodalidad(event.target.value);
    usuario.modalidad = event.target.value;
    let mod = modalidades.find( m => {
      return m.nombre === event.target.value
    });
    if(mod){
      usuario.modalidadPrecio = mod.precio;
    }
  };

  const handleEntrenador = (event) => {
    setEntrenador(event.target.value);
    usuario.entrenador = event.target.value;
  }



  const handleAddTrainer = () => {
    if (typeof onAddTrainer === "function") {
      const newTrainer = { especialidad, modalidad, entrenador };
      setMensaje("Usuario agregado con Exito!");
      setMostrarMensaje(true);
      setTimeout(() => {
        onAddTrainer(newTrainer);
        onClose();
        setMostrarMensaje(false);
      }, 1000);

    }
  };


  return (
    <>
      <div className="modal-overlay">
        <div className="modalUser">
          <nav className="contenedorBarra">
            <label>
              <label className="barra notSelec">datos personales</label>
              <label className="barra notSelec">datos fiscales</label>
              <label className="barra selec">membresia</label>
              <label className="barra notSelec">medidas iniciales</label>
            </label>
          </nav>
          <div className="modal-body">
            <div className="form-group">
            <select className= "Input-container-fiscal entero" value={especialidad} onChange={handleEspecialidadChange}>
                <option value="">Seleccionar especialidad de entrenamiento</option>
                {especialidades.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>
          <select className= "Input-container-fiscal entero" value={modalidad} onChange={handlemodalidadChange}>
              <option value="">Seleccionar frecuencia de entrenamiento</option>
              <option value="Diario">Diario</option>
              <option value="Semanal">Semanal</option>
              <option value="Mensual">Mensual</option>
            </select>
            <select className= "Input-container-fiscal entero" value={entrenador} onChange={handleEntrenador}>
              <option value="">Seleccionar entrenador</option>
              {entrenadores.filter(e => e.especialidad === usuario.especialidad).map(filEnt => (
              <option value={filEnt.ci}>{filEnt.nombre}</option>
            ))}
            </select>
          <div className="button-container-membrecia">
              <a id="boton-off" onClick={() => {onClickAvance(-1);}}>
                anterior
              </a>
              <button id="boton-ok" onClick={() => {onClickAvance(1);}}>
                siguiente
              </button>
            </div>
        </div>
      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </>
  );
};

export default Membresia;
