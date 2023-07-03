import React, { useState, useEffect } from "react";
import './Pay.css'
import VentanaClientes from "./components/VentanaClientes"; // Importa el componente VentanaClientes
import Mensaje from "../../Confirmacion/Mensaje";
import axios from 'axios';
import moment from "moment/moment";


const Pay = (props) => {
  const { imagen } = props;
  const [productosCaja, setProductosCaja] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);
  const [membresiaCaja, setMembresiaCaja] = useState([]);
  const [clienteCaja, setClienteCaja] = useState({
    ci: "",
    nombre: ""
  });
  const [mostrarVentanaClientes, setMostrarVentanaClientes] = useState(false);
  const [clientes, setClientes] = useState([]); // Estado para almacenar los clientes de la base de datos
  const [busquedaCliente, setBusquedaCliente] = useState(""); // Estado para almacenar la búsqueda del cliente


  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productosCaja"));
    if (productosGuardados) {
      setProductosCaja(productosGuardados);
    }

    const membresiaGuardado = JSON.parse(localStorage.getItem("membresiaCaja"));
    if (membresiaGuardado) {
      setMembresiaCaja(membresiaGuardado);
    }

    const clienteGuardado = JSON.parse(localStorage.getItem("clienteCaja"));
    if (clienteGuardado) {
      setClienteCaja(clienteGuardado);
    }

  }, []);
  // Calcular el total de los productos
  const total = productosCaja.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0) +
    (membresiaCaja.precio ? membresiaCaja.precio : 0);
  const iva_10 = total / 11;
  //const subtotal = total - iva_10;
  const handleEliminar = () => {
    localStorage.removeItem("productosCaja");
    localStorage.removeItem("membresiaCaja");
    localStorage.removeItem("clienteCaja");
    setProductosCaja([]);
    setMembresiaCaja([]);
    setClienteCaja([]);
  };

 
  const cerrarVentanaClientes = () => {
    setMostrarVentanaClientes(false);
  };

  const abrirVentanaClientes = () => {
    // Realizar solicitud a la API para obtener los clientes de la base de datos
    axios.get('https://localhost:7072/api/clientedata')
      .then((response) => {
        setClientes(response.data);
        setMostrarVentanaClientes(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAgregarClick = () => {
    if (!clienteCaja.ci) {
      abrirVentanaClientes();
      return ;
    }
    
    let numeroFactura = JSON.parse(localStorage.getItem("numeroFactura"));

    if (numeroFactura === null) {
      numeroFactura = Math.floor(Math.random() * 1000) + 10000;
    } else {
      numeroFactura++;
    }
    localStorage.setItem("numeroFactura", JSON.stringify(numeroFactura));

    let factura = {
      ci_cliente: clienteCaja.ci, //TO DO Poder elegir el ci del cliente
      fecha: moment().format("YYYY-MM-DD"), //TO DO La fecha de hoy
      timbrado: "753951", // Tal vez el timbrado dejar
      numero: numeroFactura,
      total_pagar: null,
      total_iva: null,
      productos: productosCaja.map(p => {
        return {
          cantidad: p.cantidad,
          precio: p.precio,
          descripcion: p.descripcion,
          codigo_barra: p.codigo_barra,
          iva_10: p.iva_10,
          iva_5: p.iva_5
        }
      }),
      membresia: null
    };

    if (membresiaCaja.precio) {
      factura.membresia = {
        descripcion: membresiaCaja.descripcion,
        modalidad: membresiaCaja.modalidad,
        precio: membresiaCaja.precio,
        iva_10: membresiaCaja.iva_10,
        iva_5: membresiaCaja.iva_5
      }
    }

    console.log(factura);

    let data = JSON.stringify(factura);
    if (true) { // Verificar el factura.ci_cliente si es valido
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'https://localhost:7072/api/venta',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      axios.request(config)
        .then((response) => {
          let respuesta = response.data;

          if (JSON.stringify(respuesta) == JSON.parse(localStorage.getItem("numeroFactura"))) {

            let data = JSON.stringify({
              "numero_factura": parseInt(JSON.stringify(respuesta)),
              "fecha": moment().format("YYYY-MM-DD"),
              "hora": moment().format("YYYY-MM-DD[T]hh:mm:[00]")
            });

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: 'https://localhost:7072/api/movimiento',
              headers: {
                'Content-Type': 'application/json'
              },
              data: data
            };

            axios.request(config)
              .then((response) => {
                console.log(JSON.stringify(response.data));

                let numeroFactura = JSON.parse(localStorage.getItem("numeroFactura"));
                console.log(`Venta efectuada - N° Factura: ${numeroFactura} - Total: ${total} `);
                console.log(JSON.stringify(respuesta));

                setMensaje(`Venta efectuada - N° Factura: ${numeroFactura} - Total: ${total} `);
                setMostrarMensaje(true);
                setTimeout(() => {
                  setMostrarMensaje(false);
                }, 3000);

                localStorage.setItem("productosCaja", JSON.stringify([]));
                localStorage.removeItem("membresiaCaja");
                localStorage.removeItem("clienteCaja");
                setProductosCaja([]);
                setMembresiaCaja([]);
                setClienteCaja([]);

              })
              .catch((error) => {
                console.log(error);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      {productosCaja.map((productoCaja, index) => (
        <div className="Prod-Caja" key={index}>
          <p className="Nombre-Producto">{productoCaja.descripcion}</p>
          <p className="Precio-Producto">{productoCaja.precio} G$</p>
          <p className="Cantidad-Producto">{productoCaja.cantidad}x</p>
          <img className="Producto-Img" src={productoCaja.imagen} alt="Producto" />
        </div>
      ))}
      {mostrarVentanaClientes && (
        <VentanaClientes
          clientes={clientes}
          onClose={cerrarVentanaClientes}
          Cliente={clienteCaja}
        />
      )}
      {membresiaCaja.precio && (
        <div className="Prod-Caja" key="membresia">
          <p className="Nombre-Producto">{membresiaCaja.descripcion}</p>
          <p className="Precio-Producto">{membresiaCaja.precio} G$</p>
          <p className="Cantidad-Producto">{membresiaCaja.cantidad}x</p>
          <img className="Producto-Img" src={membresiaCaja.imagen} alt="Producto" />
        </div>
      )}
      <div className="Detalles-Pago">
        Detalles de Pago <br></br>
        Nombre: {clienteCaja.nombre}<br></br>
        CI: {clienteCaja.ci}
  <div>
    <p className="SubTotal">Subtotal {total} G$</p>
    <p className="Iva">IVA (10%) {iva_10} G$</p>
  </div>
</div>

      <div className="Suma-Total">Total: {total} G$</div>
      
      <div className="BotonesPagar">
        <button className="Boton Cancelar" onClick={handleEliminar}>Cancelar</button>
        <button className="Boton Pagar" onClick={handleAgregarClick}>Pagar</button>
      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </div>
  );
      }
  export default Pay;
  