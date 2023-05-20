using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiDemo.Models
{
    public class Especialidad
    {
        [Key]
        public int id_especialidad { get; set; }

        public string nombre { get; set; }
    }
}
