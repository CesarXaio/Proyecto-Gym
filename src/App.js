import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Login from './pages/Login/Login';
import Inicio from './pages/Home/Inicio';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <div className="App">
      {isAuthenticated ? <Inicio /> : <Login setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
}

export default App;
