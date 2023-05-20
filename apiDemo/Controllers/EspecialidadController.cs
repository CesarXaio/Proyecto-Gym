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

namespace apiDemo.DTO
{
    [Route("api/[controller]")]
    public class EspecialidadController : Controller
    {
        private readonly AppDbContext context;
        public EspecialidadController(AppDbContext context)
        {
            this.context = context;
        }

        // GET: api/<controller>
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var especialidades = context.especialidades.ToList();
                var result = from e in especialidades
                             select e.nombre;
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // POST api/<controller>
        [HttpPost]
        public ActionResult Post([FromBody]string especialidad)
        {
            try
            {
                var especialidades = context.especialidades.ToList();
                var hayEspecialid = especialidades.Exists(e => e.nombre.Equals(especialidad));
                if (!hayEspecialid)
                {
                    var neoEspecialidad = new Especialidad
                    {
                        nombre = especialidad
                    };
                    context.especialidades.Add(neoEspecialidad);
                    context.SaveChanges();
                    return Ok(especialidad);
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
        [HttpPut("{oldEspecialidad}")]
        public ActionResult Put(string oldEspecialidad, [FromBody]string neoEspecialidad)
        {
            try
            {

                var especialidades = context.especialidades.ToList();
                var localEspecialidad = especialidades.FirstOrDefault(e => e.nombre.Equals(oldEspecialidad));

                if (localEspecialidad != null)
                {
                    var neoDataEspecialidad = new Especialidad
                    {
                        id_especialidad = localEspecialidad.id_especialidad,
                        nombre = neoEspecialidad
                    };
                    context.Entry(localEspecialidad).State = EntityState.Detached;
                    context.Entry(neoDataEspecialidad).State = EntityState.Modified;
                    context.SaveChanges();
                    return Ok(neoEspecialidad);
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
        [HttpDelete("{especialidad}")]
        public ActionResult Delete(string especialidad)
        {
            try
            {
                var delEspecialidad = context.especialidades.FirstOrDefault(e => e.nombre.Equals(especialidad));
                if (delEspecialidad != null)
                {
                    context.especialidades.Remove(delEspecialidad);
                    context.SaveChanges();
                    return Ok(especialidad);
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
