import React, { useState, useEffect } from "react";
import axios from "axios";
//import "./Repots.css";
import moment from "moment/moment";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Reports = () => {
    const [informeFiltro, setInformeFiltro] = useState("");
    const [mostrarVentas, setMostrarVentas] = useState(false);
    const [mostrarCompras, setMostrarCompras] = useState(false);
    const [fechaFiltro, setFechaFiltro] = useState(moment().format("YYYY-MM-DD"));
    const [ventasDatos, setVentasDatos] = useState([]);
    const [comprasDatos, setComprasDatos] = useState([]);
    const [ventasTotal, setVentasTotal] = useState(0);
    const [compraTotal, setCompraTotal] = useState(0);

    const obtenerVentas = async (fechaIngresada) => {
        if (fechaIngresada === undefined) {
            fechaIngresada = fechaFiltro;
        }
        let data = fechaIngresada;
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://localhost:7072/api/informeVenta',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);

                const ventas = response.data.map((v) => {
                    return {
                        cliente: v.cliente,
                        descripcion: v.descripcion,
                        precio: v.precio,
                        cantidad: v.cantidad,
                        total: v.total
                    }
                });
                const total = ventas.reduce((sum, venta) => sum + venta.total, 0);
                setVentasTotal(total);
                setVentasDatos(ventas);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        obtenerVentas();
    }, []);

    const handleInformeFiltroChange = (event) => {
        setInformeFiltro(event.target.value);
        if (event.target.value === "compras") {
            setMostrarVentas(false);
            setMostrarCompras(true);
            console.log("compras");
        }
        if (event.target.value === "ventas") {
            setMostrarVentas(true);
            setMostrarCompras(false);
            console.log("ventas");
        }
        if (event.target.value === "") {
            setMostrarVentas(false);
            setMostrarCompras(false);
            console.log("nada");
        }
    };

    const handleFechaFiltro = (event) => {
        setFechaFiltro(event.target.value);
        obtenerVentas(event.target.value);
        console.log("Cambio filtro");
        console.log(event.target.value);
    };

    return (
        <div className="repots-container">
            <select className="Input-container-fiscal entero" value={informeFiltro} onChange={handleInformeFiltroChange}>
                <option value="">Elegir tipo de Informe</option>
                <option value="ventas">Ventas por dia</option>
                <option value="compras">Compras por dia</option>
            </select>
            <input type="date" id="start" name="trip-start"
                value={fechaFiltro} onChange={handleFechaFiltro}
                min="2018-01-01" max="2024-12-31"></input>

            {mostrarVentas && <table className="tabla-datos">
                <thead>
                    <tr>
                        <th>Cliente</th>
                        <th>Descripcion</th>
                        <th>Precio U.</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {ventasDatos.map((v, index) => (
                        <tr key={index}>
                            <td>{v.cliente}</td>
                            <td>{v.descripcion}</td>
                            <td>{v.precio} G$</td>
                            <td>{v.cantidad}</td>
                            <td>{v.total} G$</td>
                        </tr>
                    ))}
                    <tr key={ventasDatos.length}>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{ventasTotal} G$</td>
                    </tr>
                </tbody>
            </table>}

            {mostrarCompras && <table className="tabla-datos">
                <thead>
                    <tr>
                        <th>Proveedor</th>
                        <th>Descripcion</th>
                        <th>Precio U.</th>
                        <th>Cantidad</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {comprasDatos.map((v, index) => (
                        <tr key={index}>
                            <td>{v.proveedor}</td>
                            <td>{v.descripcion}</td>
                            <td>{v.precio} G$</td>
                            <td>{v.cantidad}</td>
                            <td>{v.total} G$</td>
                        </tr>
                    ))}
                    <tr key={comprasDatos.length}>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>-</td>
                        <td>{compraTotal} G$</td>
                    </tr>
                </tbody>
            </table>}
        </div>
    );
};

export default Reports;
