import React, { useState, useEffect } from "react";
import Tarjetas from './components/Tarjetas';
import VentanaProductos from './components/VentanaProductos'; // Importa el componente VentanaProductos
import './Store.css'
import axios from 'axios';

const Store = () => {
  const [productos, setProductos] = useState([]);
  const [mostrarVentanaProductos, setMostrarVentanaProductos] = useState(false);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const response = await fetch("https://localhost:7072/api/Producto");
        const data = await response.json();
        const productosData = data.map((p) => {
          return {
            descripcion: p.descripcion,
            precio: p.precio,
            cantidadDB: p.cantidad,
            codigo_barra: p.codigo_barra,
            iva_10: p.iva_10,
            iva_5: p.iva_5,
            imagen: `./images/${p.codigo_barra}.png`,
          };
        });
        setProductos(productosData);
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    };

    obtenerProductos();
  }, []);

  const abrirVentanaProductos = () => {
    setMostrarVentanaProductos(true);
  };

  const cerrarVentanaProductos = () => {
    setMostrarVentanaProductos(false);
  };

  return (
    <div className="tienda">
      <h5 className="Bebidas-text">Productos</h5>
      <button className="BotonProductosStore" onClick={abrirVentanaProductos}>
        Mostrar Productos
      </button>
      {productos.map((producto) => (
        <Tarjetas key={producto.codigo_barra} {...producto} />
      ))}
      {mostrarVentanaProductos && (
        <VentanaProductos
          productos={productos}
          onClose={cerrarVentanaProductos}
        />
      )}
    </div>
  );
};

export default Store;
