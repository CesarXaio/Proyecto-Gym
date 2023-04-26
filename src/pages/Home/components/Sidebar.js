import React, {useState} from "react";
import { HiUsers } from "react-icons/hi";
import { GoCreditCard } from "react-icons/go";
import { SlBasket, SlUser } from "react-icons/sl";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = ({children}) => {
    const[isOpen ,setIsOpen] = useState(true);
    const toggle = () => setIsOpen (isOpen);
    const menuItem = [
        {
            path: "/store",
            icon: <img src="./iconos/tienda.png" alt="Icono de tienda" />

            
        },
        {
            path: "/users",
            
            icon: <img src="./iconos/clientes.png" alt="Icono de tienda" />
            
            
        },
        {
            path: "/coach",
            
            icon: <img src="./iconos/entrenadores.png" alt="Icono de tienda" />
        },
        {
            path: "/pay",
        
            icon: <img src="./iconos/caja.png" alt="Icono de tienda" />
        },
    ];
    
    return (
        <div className="container">
            <div style={{width: isOpen ? "150px" : "20px"}} className="sidebar">
                <div className="top_section">
                    <img src="/images/Ilustracion.png" alt="Logo de la pagina" style={{width: '114px', height: '114px',}} />
                    <div style={{marginLeft: isOpen ? "50px" : "0px"}} className="bars">
                    </div>j
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className="link" activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default Sidebar;
