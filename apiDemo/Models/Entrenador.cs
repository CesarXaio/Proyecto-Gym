using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiDemo.Models
{
    public class Entrenador
    {
        [Key]

        public int id_entrenador { get; set; }

        public string nombre { get; set; }

        public string ci { get; set; }

        public string telefono { get; set; }

        public int id_especialidad { get; set; }

    }
}
