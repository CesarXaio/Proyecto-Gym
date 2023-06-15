import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const toggle = () => setIsOpen(isOpen);
  const menuItem = [
    {
      path: "/resumen",
      icon: <img src="./iconos/arqueo.png" alt="Icono de tienda" />,
    },
    {
      path: "/store",
      icon: <img src="./iconos/tienda.png" alt="Icono de tienda" />,
    },
    {
      path: "/users",
      icon: <img src="./iconos/clientes.png" alt="Icono de clientes" />,
    },
    {
      path: "/coach",
      icon: <img src="./iconos/entrenadores.png" alt="Icono de entrenadores" />,
    },
    {
      path: "/pay",
      icon: <img src="./iconos/caja.png" alt="Icono de caja" />,
    },
    {
      path: "/product",

      icon: <img src="./iconos/productos.png" alt="Icono de tienda" />
    },
    {
      path: "/buy",

      icon: <img src="./iconos/buy.png" alt="Icono de tienda" />
    },
  ];

  return (
    <div className="container">
      <div style={{ width: isOpen ? "150px" : "20px" }} className="sidebar">
        <div className="top_section">

          <img src="/images/Ilustracion.png" alt="Logo de la pagina" style={{ width: '114px', height: '114px' }} />

          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars"></div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink to={item.path} key={index} className="link" activeClassName="active">
            <div className="icon">{item.icon}</div>
            <div style={{ display: isOpen ? "block" : "none" }} className="link_text">{item.name}</div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};

export default Sidebar;
