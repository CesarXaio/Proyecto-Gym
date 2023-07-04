import React, { useEffect, useState } from "react";
import Mensaje from "../../../Confirmacion/Mensaje";
import "./Modal.css";
import axios from "axios";

const ModalCompra = ({ onClose, onAddProducto }) => {
    const [productoSeleccionado, setProductoSeleccionado] = useState("");
    const [proveedorSeleccionado, setProveedorSeleccionado] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [proveedores, setProveedores] = useState([]);
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [productos, setProductos] = useState([]);
    const [mostrarMensaje, setMostrarMensaje] = useState(false);
    const [mensaje, setMensaje] = useState("");


    useEffect(() => {
        const obtenerProveedores = async () => {
            try {
                const response = await axios.get('https://localhost:7072/api/Proveedor');
                setProveedores(response.data);
            } catch (error) {
                console.error(error);
            }
        };
        const obtenerProductos = async () => {
            try {
                // Realizar la petición a la API o a la base de datos para obtener los Especialidades
                const response = await fetch("https://localhost:7072/api/producto");
                const data = await response.json();
                const productosData =
                    data.map((p) => {
                        return {
                            descripcion: p.descripcion,
                            precio: p.precio,
                            cantidadDB: p.cantidad,
                            codigo_barra: p.codigo_barra,
                            iva_10: p.iva_10,
                            iva_5: p.iva_5
                        }
                    });
                setProductos(productosData);
            } catch (error) {
                console.error("Error al obtener los Productos:", error);
            }
        }
        obtenerProductos();
        obtenerProveedores();

    }, []);

    const handlesetProductoSeleccionadoChange = (event) => {
        setProductoSeleccionado(event.target.value);
    };

    const handleProveedorSeleccionado = (event) => {
        setProveedorSeleccionado(event.target.value);
    };
    const handleCantidadChange = (event) => {
        setCantidad(event.target.value);
    };

    const handlePrecioChange = (event) => {
        setPrecio(event.target.value);
    };

    const aceptarHandle = async () => {

        let data = ({

            cantidad: cantidad * 1,
            precio: precio * 1,
            descripcion: productos.find(p => p.codigo_barra === productoSeleccionado).descripcion,
            codigo_barra: productoSeleccionado,
            iva_10: precio * 0.1,
            iva_5: precio * 0.05

        });

        onAddProducto(data);
        onClose();
        {/*let data = JSON.stringify({
            "codigo_proveedor": proveedorSeleccionado,
            "total": precio * cantidad,
            "fecha": "2023-06-11",
            "productos": [
                {
                    "cantidad": cantidad,
                    "precio": precio,
                    "descripcion": "",
                    "codigo_barra": productoSeleccionado,
                    "iva_10": precio * 0.1,
                    "iva_5": precio * 0.05
                }
            ]
        })
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:7026/api/compra',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
            })
            .catch((error) => {
                console.log(error);
            });*/}
    };


    return (
        <>
            <div className="modal-overlay">
                <div className="modalUser">
                    <div className="modal-body-fiscal">
                        <h2 className="modal-producto-titulo">Comprar Producto</h2>
                        <div className="form-group">
                            {/*<select className="Input-container-fiscal entero" value={proveedorSeleccionado} onChange={handleProveedorSeleccionado}>
                                <option value="">Seleccione un proveedor</option>
                                {proveedores.map((proveedor) => (
                                    <option value={proveedor.codigo}>{proveedor.nombre}</option>
                                ))}
                            </select>*/}
                            <select className="Input-container-fiscal entero" value={productoSeleccionado} onChange={handlesetProductoSeleccionadoChange}>
                                <option value="">Seleccione un producto</option>
                                {productos.map((producto) => (
                                    <option value={producto.codigo_barra}>{producto.descripcion}</option>
                                ))}
                            </select>
                            <input
                                className="Input-container-fiscal"
                                // id="cedula"
                                name="name"
                                type="text"
                                placeholder="Cantidad"
                                value={cantidad}
                                onChange={handleCantidadChange}
                            />
                            <input
                                className="Input-container-fiscal"
                                type="text"
                                // id="cedula"
                                placeholder="Precio"
                                value={precio}
                                onChange={handlePrecioChange}
                            />
                        </div>
                        <div className="button-container">
                            <a id="boton-off" onClick={onClose}>
                                Cancelar
                            </a>
                            <button id="boton-ok" onClick={aceptarHandle}>
                                Aceptar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <Mensaje mensaje={mensaje} mostrar={mostrarMensaje} />
        </>
    );
};

export default ModalCompra;
