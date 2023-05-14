using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace apiDemo.Models
{
    public class Producto
    {
        [Key]

        public int id_producto { get; set; }

        public int cantidad { get; set; }

        public int precio { get; set; }

        public string descripcion { get; set; }

        public string codigo { get; set; }

        public int iva10 { get; set; }

        public int iva5 { get; set; }

    }
}
