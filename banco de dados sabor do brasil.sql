CREATE DATABASE sabor_do_brasil;

use sabor_do_brasil;

-- Tabela de usuários
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha_hash VARCHAR(255) NOT NULL,
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de receitas (ou postagens alimentícias)
CREATE TABLE receitas (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    descricao TEXT,
    imagem_url TEXT,
    usuario_id INTEGER REFERENCES usuarios(id),
    data_postagem TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de curtidas/descurtidas
CREATE TABLE interacoes (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    receita_id INTEGER REFERENCES receitas(id),
    tipo_interacao VARCHAR(10) CHECK (tipo_interacao IN ('like', 'dislike')),
    data_interacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE (usuario_id, receita_id) -- evita múltiplas interações do mesmo tipo
);

-- Tabela de comentários
CREATE TABLE comentarios (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    receita_id INTEGER REFERENCES receitas(id),
    comentario TEXT NOT NULL,
    data_comentario TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
