using Microsoft.EntityFrameworkCore;
using meuprojeto.Models;

namespace meuprojeto.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Receita> Receitas { get; set; }
        public DbSet<Interacao> Interacoes { get; set; }
        public DbSet<Comentario> Comentarios { get; set; }
    }
}
