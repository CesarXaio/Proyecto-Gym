import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Inicio.css';

import Sidebar from './components/Sidebar';
import Store from './Store';
import Coach from './Coach';
import Pay from './Pay';
import Users from './users';
import Resumen from './Resumen'; // Importa el componente Resumen

function Inicio() {
  return (
    <BrowserRouter>
      <Sidebar> 
        <Routes>
          <Route path="/resumen" element={<Resumen />} /> {/* Ruta por defecto */}
          <Route path="/store" element={<Store />} />
          <Route path="/coach" element={<Coach />} />
          <Route path="/pay" element={<Pay />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default Inicio;
