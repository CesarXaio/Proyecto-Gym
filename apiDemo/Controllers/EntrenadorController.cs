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
    public class EntrenadorController : Controller
    {
        private readonly AppDbContext context;
        public EntrenadorController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var entrenadores = context.entrenadores.ToList();
                var especialidades = context.especialidades.ToList();
                var result = from ent in entrenadores
                             join esp in especialidades on ent.id_especialidad equals esp.id_especialidad
                             select new EntrenadorDTO
                             {
                                 nombre = ent.nombre,
                                 ci = ent.ci,
                                 telefono = ent.telefono,
                                 especialidad = esp.nombre
                             };
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // GET api/<controller>/5
        [HttpGet("{ci}", Name = "GetEntrenador")]
        public ActionResult Get(string ci)
        {
            try
            {
                var entrenadores = context.entrenadores.ToList();
                var especialidades = context.especialidades.ToList();
                var result = from ent in entrenadores
                             join esp in especialidades on ent.id_especialidad equals esp.id_especialidad
                             select new EntrenadorDTO
                             {
                                 nombre = ent.nombre,
                                 ci = ent.ci,
                                 telefono = ent.telefono,
                                 especialidad = esp.nombre
                             };

                var entrenador = result.FirstOrDefault(e => e.ci.Equals(ci.ToString()));
                return Ok(entrenador);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult Post([FromBody]EntrenadorDTO entrenador)
        {
            try
            {
                var entrenadores = context.entrenadores.ToList();
                var especialidades = context.especialidades.ToList();

                var especialidad = especialidades.FirstOrDefault(e => e.nombre.Equals(entrenador.especialidad));
                var hayEntrenador = entrenadores.Exists(e => e.ci.Equals(entrenador.ci));

                if (especialidad != null && !hayEntrenador)
                {
                    var neoEntrenador = new Entrenador
                    {
                        nombre = entrenador.nombre,
                        ci = entrenador.ci,
                        telefono = entrenador.telefono,
                        id_especialidad = especialidad.id_especialidad
                    };
                    context.entrenadores.Add(neoEntrenador);
                    context.SaveChanges();
                    return CreatedAtRoute("GetEntrenador", new { entrenador.ci }, entrenador);
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
        public ActionResult Put(string ci, [FromBody]EntrenadorDTO entrenador)
        {
            try
            {
                var entrenadores = context.entrenadores.ToList();
                var especialidades = context.especialidades.ToList();

                var especialidad = especialidades.FirstOrDefault(e => e.nombre.Equals(entrenador.especialidad));
                var localEntrenador = entrenadores.FirstOrDefault(e => e.ci.Equals(ci));

                if (especialidad != null && localEntrenador != null)
                {
                    var neoDataEntrenador = new Entrenador
                    {
                        id_entrenador = localEntrenador.id_entrenador,
                        nombre = entrenador.nombre,
                        ci = entrenador.ci,
                        telefono = entrenador.telefono,
                        id_especialidad = especialidad.id_especialidad
                    };
                    context.Entry(localEntrenador).State = EntityState.Detached;
                    context.Entry(neoDataEntrenador).State = EntityState.Modified;
                    context.SaveChanges();
                    return CreatedAtRoute("GetEntrenador", new { entrenador.ci }, entrenador);
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
                var entrenador = context.entrenadores.FirstOrDefault(e => e.ci.Equals(ci));
                if (entrenador != null)
                {
                    context.entrenadores.Remove(entrenador);
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
