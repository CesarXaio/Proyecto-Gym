import React from "react";
import "./VentanaProductos.css";

const VentanaProductos = ({ productos, onClose }) => {
  return (
    <div className="ventana-productos">
      <div className="ventana-productos-contenido">
        <h2>Productos en Stock</h2>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.codigo_barra}>
                <td>{producto.descripcion}</td>
                <td>{producto.precio}</td>
                <td>{producto.cantidadDB} unidades</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="cerrar-ventana" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default VentanaProductos;
