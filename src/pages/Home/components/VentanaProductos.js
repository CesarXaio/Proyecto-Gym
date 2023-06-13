import React from "react";
import './VentanaProductos.css'

const VentanaProductos = ({ productos, onClose }) => {
  return (
    <div className="ventana-productos">
      <div className="ventana-productos-contenido">
        <h2>Productos en Stock</h2>
        <ul>
          {productos.map((producto) => (
            <li key={producto.codigo_barra}>
              <span>{producto.descripcion}</span>
              <span>{producto.precio}</span>
              <span>{producto.cantidadDB} unidades</span>
              {/* Agrega más información del producto si deseas */}
            </li>
          ))}
        </ul>
        <button className="cerrar-ventana" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default VentanaProductos;
