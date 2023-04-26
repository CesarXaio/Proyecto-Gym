import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './Inicio.css';

import Sidebar from './components/Sidebar';
import Store from './Store';
import Coach from './Coach';
import Pay from './Pay';
import Users from './users';


function Inicio() {
  return (
    <BrowserRouter>
      <Sidebar> 
        <Routes>
          <Route path="/Store" element={<Store />}/>
          <Route path="/Coach" element={<Coach />} />
          <Route path="/Pay" element={<Pay />} />
          <Route path="/Users" element={<Users />} />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default Inicio;
