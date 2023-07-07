import React, { useState, useEffect } from "react";
import Usuarios from "./components/Usuarios";
import Boton from "./components/Boton";
import "./components/Boton";
import "./user.css"
import axios from "axios";
import moment from "moment/moment";

import Fiscales from "./components/modalUsers/fiscales";
import Medidas from "./components/modalUsers/Medidas";
import Membresia from "./components/modalUsers/Membresia";
import ModalUser from "./components/modalUsers/ModalUser";
import Mensaje from "../../Confirmacion/Mensaje";



const Users = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [contadorModal, setContadorModal] = useState(0);
  const [usuario, setUsuario] = useState({ estadoMembresia: 1 });
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [contador, setContador] = useState(-1);
  const [fechaDemo, setFechaDemo] = useState("Actualizar");
  const [especialidades, setEspecialidades] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [membresiaFiltro, setMembresiaFiltro] = useState("");
  const [estadoFiltro, setEstadoFiltro] = useState(-1);
  const [fechaInicioFiltro, setFechaInicioFiltro] = useState(moment().subtract(1, "month").format("YYYY-MM-DD"));
  const [fechaFinalFiltro, setFechaFinalFiltro] = useState(moment().add(1, "month").format("YYYY-MM-DD"));
  const [fechaFiltroCheck, setFechaFiltroCheck] = useState(false);

  useEffect(() => {
    // Función para obtener los Clientes de la base de datos
    const obtenerClientes = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Clientes
        const response = await fetch("https://localhost:7072/api/clientedata");
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
              entrenador_ci: c.membresia.entrenador.ci,
              estadoMembresia: conversorEstados(c.membresia.estado),
              modalidad: c.membresia.modalidad,
              modalidadPrecio: c.membresia.precio,
              fecha_final: c.membresia.fecha_final,
              fecha_local: new Date(c.membresia.fecha_final).toLocaleDateString(),
              fecha_getTime: (new Date(c.membresia.fecha_final).getTime() - 
              (new Date(c.membresia.fecha_final).getTimezoneOffset()*60000))
            }
          });
          const testeo =
          data.map((c) => {
            return {
              fecha_final: c.membresia.fecha_final,
              fecha_getTime: (new Date(c.membresia.fecha_final).getTime() - 
              (new Date(c.membresia.fecha_final).getTimezoneOffset()*60000))
            }
          });
        console.log(clientesData);
        setUsuarios(clientesData);
      } catch (error) {
        console.error("Error al obtener los Clientes:", error);
      }
    }
    const obtenerEspecialidades = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Clientes
        const response = await fetch("https://localhost:7072/api/especialidad");
        const data = await response.json();
        setEspecialidades(data);
      } catch (error) {
        console.error("Error al obtener los Clientes:", error);
      }
    };

    obtenerClientes(); // Llamar a la función para obtener los Productos al cargar el componente
    obtenerEspecialidades();
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
    return 1;
  };

  const conversorEstadosInt = (estadoInt) => {
    switch (estadoInt) {
      case 0:
        return "Pagado";
      case 1:
        return "Pendiente";
      case 2:
        return "Vencido";
      default:
        return "Pendiente";
    }
  };

  // const handleDetallesClick = () => {
  //   setShowModalDetalle(true);
  // };

  const handleAddUser = () => {
    //console.log("Entramos para agregar");
    let fecha_final;

    if (usuario.modalidad === "Diario") {
      fecha_final = moment().add(1, "day").format("YYYY-MM-DD");
    }

    if (usuario.modalidad === "Semanal") {
      fecha_final = moment().add(7, "days").format("YYYY-MM-DD");
    }

    if (usuario.modalidad === "Mensual") {
      fecha_final = moment().add(1, "month").format("YYYY-MM-DD");
    }
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
        fecha_inicio: moment().format("YYYY-MM-DD"),
        fecha_final: fecha_final,
        entrenador: {
          nombre: "",
          ci: usuario.entrenador,
          telefono: "",
          especialidad: usuario.especialidad
        }
      }
    };

    let medicion = {
      cliente_ci: usuario.cedula,
      entrenador_ci: usuario.entrenador,
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

    if (true) {     // TODO Verificar
      //console.log("Entramos post true");
      let data = JSON.stringify(cliente);

      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7072/api/clientedata',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };



      axios.request(config)
        .then((response) => {
          console.log("Enviando medidas");
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
            })
            .catch((error) => {
              console.log(error);
            });

          console.log(JSON.stringify(response.data));

          setUsuarios([...usuarios, usuario]);
          setMensaje("Usuario agregado con Exito!");
          console.log(usuario);
          setUsuario({ estadoMembresia: 1 });
          setContadorModal(0);
          setMostrarMensaje(true);
          setTimeout(() => {
            setMostrarMensaje(false);
          }, 1000);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const actualizador = (i) => {
    setContadorModal(contadorModal + i);
  };


  const avanzarContador = () => {
    const neoContador = contador + 1;
    if (neoContador >= 0) {
      setFechaDemo(moment().add(neoContador, 'days').format("DD-MM-YY"));
    }
    let data = JSON.stringify(moment().add(neoContador, 'days').format("YYYY-MM-DD"));

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://localhost:7072/api/actualizarEstado',
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setContador(neoContador);
        const obtenerClientes = async () => {
          try {
            // Realizar la petición a la API o a la base de datos para obtener los Clientes
            const response = await fetch("https://localhost:7072/api/clientedata");
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
                  entrenador_ci: c.membresia.entrenador.ci,
                  estadoMembresia: conversorEstados(c.membresia.estado),
                  modalidad: c.membresia.modalidad,
                  modalidadPrecio: c.membresia.precio
                }
              });
            console.log(clientesData);
            setUsuarios(clientesData);
          } catch (error) {
            console.error("Error al obtener los Clientes:", error);
          }
        };

        obtenerClientes();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleCategoriaChange = (event) => {
    setCategoriaFiltro(event.target.value);
  };

  const handleMembresiaChange = (event) => {
    setMembresiaFiltro(event.target.value);
  };

  const handleEstadoChange = (event) => {
    setEstadoFiltro(event.target.value);
  };

  const handleFechaInicioChange = (event) => {
    setFechaInicioFiltro(event.target.value);
    console.log(event.target.value);
  };

  const handleFechaFinalChange = (event) => {
    setFechaFinalFiltro(event.target.value);
    console.log(event.target.value);
  };
  const handleFiltroFechaChange = (event) => {
    //setFechaFinalFiltro(event.target.value);
    console.log(!fechaFiltroCheck);
    setFechaFiltroCheck(!fechaFiltroCheck);
  };
  // handleFiltroFechaChange
  // Para Rodrigo: className="Input-container-fiscal entero" cambiar el nombre de la clase
  // Hay Label con textos que estan con fuente negra, si puedes darles formato con css
  return (
    <div className="Coach-container">
      <div className="botonUser">
          <Boton palabra="Agregar" onClick={() => { actualizador(1); }} />
      </div>
      <div className="contendorFiltro">
        <select className="Input-container-fiscal-filtro categoriaSelect " value={categoriaFiltro} onChange={handleCategoriaChange}>
          <option value="">Elegir categoria</option>
          {especialidades.map((e) => (
            <option value={e}>{e}</option>
          ))}
        </select> 
        <select className="Input-container-fiscal-filtro membresiaSelect" value={membresiaFiltro} onChange={handleMembresiaChange}>
          <option value="">Elegir membresia</option>
          <option value="Diario">Diario</option>
          <option value="Semanal">Semanal</option>
          <option value="Mensual">Mensual</option>
        </select>
        <select className="Input-container-fiscal-filtro estadoSelect" value={estadoFiltro} onChange={handleEstadoChange}>
          <option value="-1">Elegir estado</option>
          <option value="0">Pagado</option>
          <option value="1">Pendiente</option>
          <option value="2">Vencido</option>
        </select>
        <label className="fechas inicio" for="start">Fecha Inicio:</label>
          <input className="fechas"type="date" id="start" name="trip-start" 
            value={fechaInicioFiltro} onChange={handleFechaInicioChange}
            min="2018-01-01" max="2024-12-31"></input>

        <label className="fechas fin" for="start">Fecha Final:</label>
          <input className="fechas" type="date" id="final" name="trip-start" 
            value={fechaFinalFiltro} onChange={handleFechaFinalChange}
            min="2018-01-01" max="2024-12-31"></input>

        <input className="fin"type="checkbox" id="filtroFecha" 
        onChange={handleFiltroFechaChange}></input>
      </div>
      <div className="contenedorTitulos">
        <h3 className="tituloUser otro">nombre y apellido</h3>
        <h3 className="tituloUser cedula">vencimiento</h3>
        <h3 className="tituloUser categoria">categoria</h3>
        <h3 className="tituloUser membresia">membresia</h3>
        <h3 className="tituloUser estado">estado</h3>
      </div>

      {usuarios.filter(u => u.especialidad === categoriaFiltro || categoriaFiltro === "")
      .filter(u => u.modalidad === membresiaFiltro || membresiaFiltro === "")
      .filter(u => u.estadoMembresia == estadoFiltro || estadoFiltro == -1)
      .filter(u => !fechaFiltroCheck || (u.fecha_getTime >= new Date(fechaInicioFiltro).getTime() && 
      u.fecha_getTime <= new Date(fechaFinalFiltro).getTime()) )
      .map((u, index) => (
        <Usuarios usuario={u} key={index} />
      ))}
      <div className="boton-container">
        <Boton palabra={fechaDemo} onClick={() => { avanzarContador(); }} />
      </div>
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
