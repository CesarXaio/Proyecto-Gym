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
    public class ClienteController : Controller
    {
        private readonly AppDbContext context;
        public ClienteController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var clientes = context.clientes.ToList();
                var result = from c in clientes
                             select new ClienteDTO
                             {
                                 nombre = c.nombre,
                                 ci = c.ci,
                                 telefono = c.telefono,
                                 ruc = c.ruc,
                                 correo = c.correo
                             };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<controller>/5
        [HttpGet("{ci}", Name = "GetCliente")]
        public ActionResult Get(string ci)
        {
            try
            {
                var clientes = context.clientes.ToList();
                var result = from c in clientes
                             select new ClienteDTO
                             {
                                 nombre = c.nombre,
                                 ci = c.ci,
                                 telefono = c.telefono,
                                 ruc = c.ruc,
                                 correo = c.correo
                             };
                var cliente = result.FirstOrDefault(c => c.ci.Equals(ci));
                return Ok(cliente);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult Post([FromBody]ClienteDTO cliente)
        {
            try
            {
                var clientes = context.clientes.ToList();
                var hayCliente = clientes.Exists(c => c.ci.Equals(cliente.ci));
                if (!hayCliente)
                {
                    var neoCliente = new Cliente
                    {
                        nombre = cliente.nombre,
                        ci = cliente.ci,
                        telefono = cliente.telefono,
                        ruc = cliente.ruc,
                        correo = cliente.correo
                    };
                    context.clientes.Add(neoCliente);
                    context.SaveChanges();
                    return CreatedAtRoute("GetCliente", new { cliente.ci }, cliente);
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
        [HttpPut("{ci}")]
        public ActionResult Put(string ci, [FromBody]ClienteDTO cliente)
        {
            try
            {
                var clientes = context.clientes.ToList();
                var localCliente = clientes.FirstOrDefault(c => c.ci.Equals(ci));

                if (localCliente != null)
                {
                    var neoDataCliente = new Cliente
                    {
                        id_cliente = localCliente.id_cliente,
                        nombre = cliente.nombre,
                        ci = cliente.ci,
                        telefono = cliente.telefono,
                        ruc = cliente.ruc,
                        correo = cliente.correo
                    };
                    context.Entry(localCliente).State = EntityState.Detached;
                    context.Entry(neoDataCliente).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetCliente", new { cliente.ci }, cliente);
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
        [HttpDelete("{ci}")]
        public ActionResult Delete(string ci)
        {
            try
            {
                var cliente = context.clientes.FirstOrDefault(c => c.ci.Equals(ci));
                if (cliente != null)
                {
                    context.clientes.Remove(cliente);
                    context.SaveChanges();
                    return Ok(ci);
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
