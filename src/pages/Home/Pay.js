import React, { useState, useEffect } from "react";
import './Pay.css'
import Store from "./Store";
import Tarjetas from "./components/Tarjetas";
import Mensaje from "../../Confirmacion/Mensaje";
import axios from 'axios';


const Pay = (props) => {
  const { imagen } = props;
  const [productosCaja, setProductosCaja] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [mostrarMensaje, setMostrarMensaje] = useState(false);

  useEffect(() => {
    const productosGuardados = JSON.parse(localStorage.getItem("productosCaja"));
    if (productosGuardados) {
      setProductosCaja(productosGuardados);
    }
  }, []);
  // Calcular el total de los productos
  const total = productosCaja.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);
  const iva_10 = total * 0.1;
  //const subtotal = total - iva_10;
  const handleAgregarClick = () => {

    let numeroFactura = JSON.parse(localStorage.getItem("numeroFactura"));

    if (numeroFactura === null) {
      numeroFactura = Math.floor(Math.random() * 1000) + 10000;
    } else {
      numeroFactura++;
    }
    localStorage.setItem("numeroFactura", JSON.stringify(numeroFactura));

    let factura = {
      ci_cliente: "121212", //TO DO Poder elegir el ci del cliente
      fecha: "2022-06-09", //TO DO La fecha de hoy
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
      })
    };

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

            let numeroFactura = JSON.parse(localStorage.getItem("numeroFactura"));
            console.log(`Venta efectuada - N° Factura: ${numeroFactura} - Total: ${total} `);
            console.log(JSON.stringify(respuesta));

            setMensaje(`Venta efectuada - N° Factura: ${numeroFactura} - Total: ${total} `);
            setMostrarMensaje(true);
            setTimeout(() => {
              setMostrarMensaje(false);
            }, 3000);

            localStorage.setItem("productosCaja", JSON.stringify([]));
            setProductosCaja([]);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div >
      {productosCaja.map((productoCaja, index) => (
        <div className="Prod-Caja" key={index}>

          <p className="Nombre-Producto">{productoCaja.descripcion}</p>
          <p className="Precio-Producto">{productoCaja.precio} G$</p>
          <p className="Cantidad-Producto">{productoCaja.cantidad}x</p>
          <img className="Producto-Img" src={productoCaja.imagen} alt="Producto" />

        </div>

      ))}
      <div className="Detalles-Pago">Detalles de Pago
        <div>
          <p className="SubTotal">Subtotal {total}G$</p>
          <p className="Iva">IVA (10%) {iva_10} G$</p>
        </div>
      </div>
      <div className="Suma-Total">Total: {total} G$</div>
      <div className="BotonesPagar">
        <button className="Boton Cancelar">Cancelar</button>
        <button className="Boton Pagar" onClick={handleAgregarClick}>Pagar</button>

      </div>
      <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
    </div>
  );

}

export default Pay;