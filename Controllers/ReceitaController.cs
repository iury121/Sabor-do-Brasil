using Microsoft.AspNetCore.Mvc;
using meuprojeto.Data;
using meuprojeto.Models;

namespace meuprojeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReceitaController : ControllerBase
    {
        private readonly AppDbContext _context;
        public ReceitaController(AppDbContext context) => _context = context;

        [HttpGet]
        public IActionResult GetReceitas()
        {
            var receitas = _context.Receitas.ToList();
            return Ok(receitas);
        }
    }
}
