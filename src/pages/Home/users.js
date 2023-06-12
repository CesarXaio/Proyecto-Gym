import React, { useState, useEffect } from "react";
import Usuarios from "./components/Usuarios";
import Boton from "./components/Boton";
import "./components/Boton";
import "./user.css"
import axios from "axios";

import Fiscales from "./components/modalUsers/fiscales";
import Medidas from "./components/modalUsers/Medidas";
import Membresia from "./components/modalUsers/Membresia";
import ModalUser from "./components/modalUsers/ModalUser";
import Mensaje from "../../Confirmacion/Mensaje";

const Users = () => {
  const [showModal, setShowModal] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [contadorModal, setContadorModal] = useState(0);
  const [usuario, setUsuario] = useState({ estadoMembresia: 1 });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    // Función para obtener los Clientes de la base de datos
    const obtenerClientes = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Clientes
        const response = await fetch("https://localhost:7072/api/cliente");
        const data = await response.json();
        const clientesData =
          data.map((c) => {
            return {
              name: c.nombre, // Se guarda el nombre completo
              lastname: "", // TODO Mirar luego
              cedula: c.ci,
              telefono: c.telefono,
              ruc: c.ruc,
              domicilio: "",
              especialidad: c.membresia.entrenador.especialidad,
              entrenador: c.membresia.entrenador.nombre,
              estadoMembresia: conversorEstados(c.membresia.estado),
              modalidad: c.membresia.modalidad
            }
          });
        console.log(clientesData);
        setUsuarios(clientesData);
      } catch (error) {
        console.error("Error al obtener los Clientes:", error);
      }
    };

    obtenerClientes(); // Llamar a la función para obtener los Productos al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente

  const conversorEstados = (estadoStr) => {
    if (estadoStr === "Pagado") {
      return 0;
    }
    if (estadoStr === "Pendiente") {
      return 1;
    }
    if (estadoStr === "Vencido") {
      return 2;
    }
  };

  const conversorEstadosInt = (estadoInt) => {
    switch (estadoInt) {
      case 0:
        return "Pagado";
      case 1:
        return "Pendiente";
      case 2:
        return "Vencido";
    }
  };

  const handleAgregarClick = () => {
    setShowModal(true);
  };

  const handleAddUser = () => {
    //console.log("Entramos para agregar");
    let cliente = {

      nombre: `${usuario.name} ${usuario.lastname}`,
      ci: usuario.cedula,
      telefono: usuario.telefono,
      ruc: usuario.ruc,
      correo: "",
      membresia: {
        estado: conversorEstadosInt(usuario.estadoMembresia),
        modalidad: usuario.modalidad,
        precio: 0,
        fecha_inicio: "2023-06-09T00:00:00",
        fecha_final: "2023-07-09T00:00:00",
        entrenador: {
          nombre: "",
          ci: usuario.entrenador,
          telefono: "",
          especialidad: usuario.especialidad
        }
      }
    };

    if (true) {     // TODO Verificar
      //console.log("Entramos post true");
      let data = JSON.stringify(cliente);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7072/api/cliente',
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

          console.log("ERROR------------------");
        });
    }

    setUsuarios([...usuarios, usuario]);
    setMensaje("Usuario agregado con Exito!");
    console.log(usuario);
    setUsuario({ estadoMembresia: 1 });
    setMostrarMensaje(true);
    setTimeout(() => {
      setContadorModal(0);
      setMostrarMensaje(false);
    }, 1000);
  };
  const actualizador = (i) => {
    setContadorModal(contadorModal + i);
  };

  return (
    <div className="Coach-container">
      <div className="boton-container">
        <Boton palabra="Agregar" onClick={() => { actualizador(1); }} />
      </div>
      <div className="contenedorTitulos">
        <h3 className="tituloUser otro">nombre y apellido</h3>
        <h3 className="tituloUser cedula">C.I</h3>
        <h3 className="tituloUser categoria">categoria</h3>
        <h3 className="tituloUser membresia">membresia</h3>
        <h3 className="tituloUser estado">estado</h3>
      </div>
      {usuarios.map((u, index) => (
        <Usuarios usuario={u} key={index} />
      ))}
      {contadorModal === 1 && (
        <ModalUser usuario={usuario} onClickAvance={actualizador} onClose={() => { setUsuario({}); }} />
      )}
      {contadorModal === 2 && (
        <Fiscales usuario={usuario} onClickAvance={actualizador} />
      )}
      {contadorModal === 3 && (
        <Membresia usuario={usuario} onClickAvance={actualizador} />
      )}
      {contadorModal === 4 && (
        <Medidas usuario={usuario} onClickAvance={actualizador} onAddUser={handleAddUser} />
      )}
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </div>
  );
};


export default Users;
