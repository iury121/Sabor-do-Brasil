using Microsoft.AspNetCore.Mvc;
using meuprojeto.Data;
using meuprojeto.Models;

namespace meuprojeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ComentarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ComentarioController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> Comentar([FromBody] Comentario comentario)
        {
            comentario.DataComentario = DateTime.Now;
            _context.Comentarios.Add(comentario);
            await _context.SaveChangesAsync();
            return Ok(comentario);
        }

        [HttpGet("{receitaId}")]
        public IActionResult GetComentarios(int receitaId)
        {
            var comentarios = _context.Comentarios.Where(c => c.ReceitaId == receitaId)
                .Select(c => new { c.Id, c.UsuarioId, c.ReceitaId, Comentario = c.ComentarioTexto, c.DataComentario })
                .ToList();
            return Ok(comentarios);
        }
    }
}
