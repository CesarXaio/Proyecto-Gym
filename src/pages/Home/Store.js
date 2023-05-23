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
        setProductos(data); // Asignar los Productos al estado
      } catch (error) {
        console.error("Error al obtener los Productos:", error);
      }
    };

    obtenerProductos(); // Llamar a la función para obtener los Productos al cargar el componente
  }, []); // El segundo argumento es un arreglo vacío, esto indica que solo se ejecutará una vez al cargar el componente
    const bebidas = [
        { bebida: 'Agua', precio: 5.000, imagen: './images/RedBull.png' },
        { bebida: 'Powerate', precio: 10.000, imagen: './images/Gatorate.png' },
        { bebida: 'Red Bull', precio: 15.000, imagen: './images/RedBull.png' },
        { bebida: 'Red Bull', precio: 15.000, imagen: './images/RedBull.png' },
        { bebida: 'Red Bull', precio: 15.000, imagen: './images/RedBull.png' },
        
      ]; // Definimos un array con los datos de las bebidas
    
    const proteicos = [
        {proteico: 'Snack', imagen :'./images/Snack1.png'},
        {proteico: 'Snack', imagen :'./images/Snack1.png'},
        {proteico: 'Snack', imagen :'./images/Snack1.png'},
        {proteico: 'Snack', imagen :'./images/Snack1.png'},
        {proteico: 'Snack', imagen :'./images/Snack1.png'},
    ];  
  return (
    <div className="tienda">
      <h5 className='Bebidas-text'>Bebidas</h5>
      {bebidas.map((bebida) => (
        <Tarjetas key={bebida.bebida} {...bebida} />
      ))}
      <h5 className='Proteicos-text'>Proteicos</h5>
      {proteicos.map((proteico)=>(
         <Tarjetas key = {proteico.proteico}{...proteico} />
      ))}
    </div>
  );
};

export default Store;
