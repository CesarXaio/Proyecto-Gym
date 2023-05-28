import React, { useState, useEffect } from "react";
import Tarjetas from './components/Tarjetas';
import axios from 'axios';

const Store = () => {
  
  const [productos, setProductos] = useState([]);
  useEffect(() => {
    // Función para obtener los Productos de la base de datos
    const obtenerProductos = async () => {
      try {
        // Realizar la petición a la API o a la base de datos para obtener los Productos
        const response = await fetch("https://localhost:7072/api/Producto");
        const data = await response.json();
        const productosData = 
          data.map((p) => {
            return {
              descripcion: p.descripcion, 
              precio: p.precio, 
              cantidadDB: p.cantidad,
              codigo_barra: p.codigo_barra, 
              iva_10: p.iva_10, 
              iva_5: p.iva_5,
              imagen: `./images/${p.codigo_barra}.png` }
          });
        console.log(productosData);
        setProductos(productosData); // Asignar los Productos al estado
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    };

    obtenerProductos(); // Llamar a la función para obtener los Productos al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente

 
  return (
    <div className="tienda">
      <h5 className='Bebidas-text'>Productos</h5>
      {productos.map((producto) => (
        <Tarjetas key={producto.codigo_barra} {...producto} />
      ))}
    </div>
  );
};

export default Store;
