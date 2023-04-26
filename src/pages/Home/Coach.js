import React, { useState } from "react";
import Entrenadores from "./components/Entrenadores";
import Boton from "./components/Boton";
import "./components/Boton";

const Coach = () => {
  const [showButton, setShowButton] = useState(true);

  return (
    <div className="Coach-container">
      <div className="boton-container">
        {showButton && <Boton palabra="Agregar" />}
      </div>
      <Entrenadores photo="./images/Entrenador3.jpg" name="Rodrigo Ibarra" modalidad="Crossfit" />
      <Entrenadores photo="./images/Entrenador3.jpg" name="Daniel Ferreira" modalidad="Pilates" />
      <Entrenadores photo="./images/Entrenador3.jpg" name="German Aquino" modalidad="Funcional" />
      <Entrenadores photo="./images/Entrenador3.jpg" name="German Aquino" modalidad="Funcional" />
      <Entrenadores photo="./images/Entrenador3.jpg" name="German Aquino" modalidad="Funcional" />
      <Entrenadores photo="./images/Entrenador3.jpg" name="German Aquino" modalidad="Funcional" />
      <Entrenadores photo="./images/Entrenador3.jpg" name="German Aquino" modalidad="Funcional" />
      <Entrenadores photo="./images/Entrenador3.jpg" name="German Aquino" modalidad="Funcional" />
    </div>
  );
};

export default Coach;
