import React from 'react';
import Tarjetas from './components/Tarjetas';

const Store = () => {
    
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
