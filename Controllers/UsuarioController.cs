using Microsoft.AspNetCore.Mvc;
using meuprojeto.Data;
using meuprojeto.Models;

namespace meuprojeto.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsuarioController : ControllerBase
    {
        private readonly AppDbContext _context;
        public UsuarioController(AppDbContext context) => _context = context;

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario usuario)
        {
            if (_context.Usuarios.Any(u => u.Email == usuario.Email))
                return BadRequest("E-mail já cadastrado.");

            usuario.DataCadastro = DateTime.Now;
            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();
            return Ok(usuario);
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            var user = _context.Usuarios.FirstOrDefault(u => u.Email == usuario.Email && u.SenhaHash == usuario.SenhaHash);
            if (user == null)
                return Unauthorized("E-mail ou senha inválidos.");
            return Ok(user);
        }
    }
}
