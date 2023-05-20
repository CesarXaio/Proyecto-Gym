using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using apiDemo.Context;
using apiDemo.Models;
using apiDemo.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace apiDemo.Controllers
{
    [Route("api/[controller]")]
    public class ProductoController : Controller
    {
        private readonly AppDbContext context;
        public ProductoController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var productos = context.productos.ToList();
                var result = from p in productos
                             select new ProductoDTO
                             {
                                 cantidad = p.cantidad,
                                 precio = p.precio,
                                 descripcion = p.descripcion,
                                 codigo = p.codigo,
                                 iva10 = p.iva10,
                                 iva5 = p.iva5
                             };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<controller>/5
        [HttpGet("{codigo}", Name = "GetProducto")]
        public ActionResult Get(string codigo)
        {
            try
            {
                var productos = context.productos.ToList();
                var result = from p in productos
                             select new ProductoDTO
                             {
                                 cantidad = p.cantidad,
                                 precio = p.precio,
                                 descripcion = p.descripcion,
                                 codigo = p.codigo,
                                 iva10 = p.iva10,
                                 iva5 = p.iva5
                             };
                var cliente = result.FirstOrDefault(p => p.codigo.Equals(codigo));
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult Post([FromBody]ProductoDTO producto)
        {
            try
            {
                var productos = context.productos.ToList();
                var hayProducto = productos.Exists(p => p.codigo.Equals(producto.codigo));
                if (!hayProducto)
                {
                    var neoProducto = new Producto
                    {
                        cantidad = producto.cantidad,
                        precio = producto.precio,
                        descripcion = producto.descripcion,
                        codigo = producto.codigo,
                        iva10 = producto.iva10,
                        iva5 = producto.iva5
                    };
                    context.productos.Add(neoProducto);
                    context.SaveChanges();
                    return CreatedAtRoute("GetProducto", new { producto.codigo }, producto);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // PUT api/<controller>/5
        [HttpPut("{codigo}")]
        public ActionResult Put(string codigo, [FromBody]ProductoDTO producto)
        {
            try
            {

                var productos = context.productos.ToList();
                var localProducto = productos.FirstOrDefault(p => p.codigo.Equals(codigo));

                if (localProducto != null)
                {
                    var neoDataProducto = new Producto
                    {
                        id_producto = localProducto.id_producto,
                        cantidad = producto.cantidad,
                        precio = producto.precio,
                        descripcion = producto.descripcion,
                        codigo = producto.codigo,
                        iva10 = producto.iva10,
                        iva5 = producto.iva5
                    };
                    context.Entry(localProducto).State = EntityState.Detached;
                    context.Entry(neoDataProducto).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetProducto", new { producto.codigo }, producto);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE api/<controller>/5
        [HttpDelete("{codigo}")]
        public ActionResult Delete(string codigo)
        {
            try
            {
                var producto = context.productos.FirstOrDefault(p => p.codigo.Equals(codigo));
                if (producto != null)
                {
                    context.productos.Remove(producto);
                    context.SaveChanges();
                    return Ok(codigo);
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
