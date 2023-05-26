import React, { useState, useEffect } from "react";
import Store from "./Store";
import Tarjetas from "./components/Tarjetas";
const Pay = (props) =>{
    const [producto, setProducto] = useState([]);
    const [productosCaja, setProductosCaja] = useState([]);

    useEffect(() => {
        const productosGuardados = JSON.parse(localStorage.getItem("productosCaja"));
        if (productosGuardados) {
          setProductosCaja(productosGuardados);
        }
      }, []);
      
      return (
        <div>
          {productosCaja.map((productoCaja, index) => (
            <div key={index}>
             
              <p>{productoCaja.descripcion}</p>
              <p>{productoCaja.precio}</p>
              <p>{productoCaja.cantidad}</p>
            </div>
          ))}
        </div>
      );
      
}

export default Pay;