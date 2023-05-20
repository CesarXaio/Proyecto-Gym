using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiDemo.Models
{
    public class Proveedor
    {
        [Key]

        public int id_proveedor { get; set; }

        public string nombre { get; set; }

        public string codigo { get; set; }

        public string direccion { get; set; }

        public string correo { get; set; }

        public string numero { get; set; }
    }
}
