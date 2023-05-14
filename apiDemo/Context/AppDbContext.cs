using apiDemo.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace apiDemo.Context
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base(options)
        {

        }

        public DbSet<Cliente> clientes { get; set; }
        public DbSet<Producto> productos { get; set; }
        public DbSet<Entrenador> entrenadores { get; set; }
        public DbSet<Especialidad> especialidades { get; set; }

    }
}
