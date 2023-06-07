import React, { useState, useEffect } from "react";
import './Pay.css'
import Boton from "./components/Boton";
import Mensaje from "../../Confirmacion/Mensaje";
import Store from "./Store";
import Tarjetas from "./components/Tarjetas";
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

      return (
        <div>
          {productosCaja.map((productoCaja, index) => (
            <div className="Prod-Caja" key={index}>
             
              <p className="Nombre-Producto">{productoCaja.descripcion}</p>
              <p className="Precio-Producto">{productoCaja.precio} G$</p>
              <p className="Cantidad-Producto">{productoCaja.cantidad}x</p>
              <img className="Producto-Img"src={productoCaja.imagen} alt="Producto" />
              
            </div>
            
          ))}
          <div className="Suma-Total">Total: {total} G$</div>
          
        </div>
      );
      
}

export default Pay;