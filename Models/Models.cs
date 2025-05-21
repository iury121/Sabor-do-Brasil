using System;
using System.ComponentModel.DataAnnotations;

namespace meuprojeto.Models
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string SenhaHash { get; set; } = string.Empty;
        public DateTime DataCadastro { get; set; }
    }

    public class Receita
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string ImagemUrl { get; set; } = string.Empty;
        public int? UsuarioId { get; set; }
        public DateTime DataPostagem { get; set; }
    }

    public class Interacao
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int ReceitaId { get; set; }
        public string TipoInteracao { get; set; } = string.Empty;
        public DateTime DataInteracao { get; set; }
    }

    public class Comentario
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public int ReceitaId { get; set; }
        public string ComentarioTexto { get; set; } = string.Empty;
        public DateTime DataComentario { get; set; }
    }
}
