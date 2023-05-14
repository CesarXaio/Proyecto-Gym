using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiDemo.Models
{
    public class Cliente
    {
        [Key]

        public int id_cliente { get; set; }

        public string nombre { get; set; }

        public string ci { get; set; }

        public string telefono { get; set; }

        public string ruc { get; set; }

        public string correo { get; set; }

    }
}
