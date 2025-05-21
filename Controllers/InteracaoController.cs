using Microsoft.AspNetCore.Mvc;
using meuprojeto.Data;
using meuprojeto.Models;

namespace meuprojeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class InteracaoController : ControllerBase
    {
        private readonly AppDbContext _context;
        public InteracaoController(AppDbContext context) => _context = context;

        [HttpPost]
        public async Task<IActionResult> Interagir([FromBody] Interacao interacao)
        {
            var existente = _context.Interacoes.FirstOrDefault(i => i.UsuarioId == interacao.UsuarioId && i.ReceitaId == interacao.ReceitaId);
            if (existente != null)
            {
                existente.TipoInteracao = interacao.TipoInteracao;
            }
            else
            {
                interacao.DataInteracao = DateTime.Now;
                _context.Interacoes.Add(interacao);
            }
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}
