import React, { useState, useEffect } from "react";
import TarjetasProducto from './components/TarjetasProducto';
import TarjetasAnhadir from './components/TarjetasAnhadir';
import axios from 'axios';
import "./Product.css";



const ProveedorForm = () => {
  const obtenerProveedores = async () => {
    try {
      const response = await axios.get('https://localhost:7072/api/Proveedor');
      setProveedores(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const [productos, setProductos] = useState([]);
  const [actualizar, setActualizar] = useState(0);
  const [proveedores, setProveedores] = useState([]);
  const [mostrarProveedores, setMostrarProveedores] = useState(false);

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
              imagen: `./images/${p.codigo_barra}.png`
            }
          });
        console.log(productosData);
        setProductos(productosData); // Asignar los Productos al estado
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    };


    // Función para obtener los proveedores desde el servidor
    
    obtenerProductos(); // Llamar a la función para obtener los Productos al cargar el componente
    obtenerProveedores();
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente
  const cerrarListaProveedores = () => {
    setMostrarProveedores(false);
  };
  //////////////////////////////////////////////////////////////////
  const [producto, setProducto] = useState({});
  const mostrarListaProveedores = () => {
    setMostrarProveedores(true);
    obtenerProveedores();
  };


  return (

    <div className="tienda">
      <h5 className='Bebidas-text'>Productos</h5>
      {productos.map((producto) => (
        <TarjetasProducto key={producto.codigo_barra} {...producto} actualizar={actualizar} />
      ))}

      <TarjetasAnhadir key={producto.codigo_barra} {...producto} actualizar={actualizar} />
    </div>
);
}

export default ProveedorForm;