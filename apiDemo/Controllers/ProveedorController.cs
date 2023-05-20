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
    public class ProveedorController : Controller
    {
        private readonly AppDbContext context;
        public ProveedorController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var proveedores = context.proveedores.ToList();
                var result = from p in proveedores
                             select new ProveedorDTO
                             {
                                 nombre = p.nombre,
                                 codigo = p.codigo,
                                 direccion = p.direccion,
                                 correo = p.correo,
                                 numero = p.numero
                             };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<controller>/5
        [HttpGet("{codigo}", Name = "GetProveedor")]
        public ActionResult Get(string codigo)
        {
            try
            {
                var proveedores = context.proveedores.ToList();
                var result = from p in proveedores
                             select new ProveedorDTO
                             {
                                 nombre = p.nombre,
                                 codigo = p.codigo,
                                 direccion = p.direccion,
                                 correo = p.correo,
                                 numero = p.numero
                             };
                var proveedor = result.FirstOrDefault(p => p.codigo.Equals(codigo));
                return Ok(proveedor);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult Post([FromBody]ProveedorDTO proveedor)
        {
            try
            {
                var proveedores = context.proveedores.ToList();
                var hayProveedor = proveedores.Exists(p => p.codigo.Equals(proveedor.codigo));
                if (!hayProveedor)
                {
                    var neoProveedor = new Proveedor
                    {
                        nombre = proveedor.nombre,
                        codigo = proveedor.codigo,
                        direccion = proveedor.direccion,
                        correo = proveedor.correo,
                        numero = proveedor.numero
                    };
                    context.proveedores.Add(neoProveedor);
                    context.SaveChanges();
                    return CreatedAtRoute("GetProveedor", new { proveedor.codigo }, proveedor);
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
        public ActionResult Put(string codigo, [FromBody]ProveedorDTO proveedor)
        {
            try
            {
                var proveedores = context.proveedores.ToList();
                var localProveedor = proveedores.FirstOrDefault(p => p.codigo.Equals(codigo));

                if (localProveedor != null)
                {
                    var neoDataProveedor = new Proveedor
                    {
                        id_proveedor = localProveedor.id_proveedor,
                        nombre = proveedor.nombre,
                        codigo = proveedor.codigo,
                        direccion = proveedor.direccion,
                        correo = proveedor.correo,
                        numero = proveedor.numero
                    };
                    context.Entry(localProveedor).State = EntityState.Detached;
                    context.Entry(neoDataProveedor).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetProveedor", new { proveedor.codigo }, proveedor);
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
                var proveedor = context.proveedores.FirstOrDefault(p => p.codigo.Equals(codigo));
                if (proveedor != null)
                {
                    context.proveedores.Remove(proveedor);
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
