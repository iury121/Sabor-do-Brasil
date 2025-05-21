document.addEventListener('DOMContentLoaded', () => {
    // Adicionar eventos de like e dislike para os pratos
    document.querySelectorAll('.like-btn').forEach(likeButton => {
        likeButton.addEventListener('click', function () {
            const likeCountSpan = likeButton.nextElementSibling;
            const dislikeCountSpan = likeButton.nextElementSibling.nextElementSibling;
            
            // Atualizar contagem de likes
            let likeCount = parseInt(likeCountSpan.textContent);
            likeCount++;
            likeCountSpan.textContent = likeCount;

            // Garantir que dislike não seja negativo
            let dislikeCount = parseInt(dislikeCountSpan.textContent);
            if (dislikeCount > 0) {
                dislikeCount--;
                dislikeCountSpan.textContent = dislikeCount;
            }
        });
    });

    // Adicionar eventos de dislike
    document.querySelectorAll('.dislike-btn').forEach(dislikeButton => {
        dislikeButton.addEventListener('click', function () {
            const dislikeCountSpan = dislikeButton.previousElementSibling;
            const likeCountSpan = dislikeButton.previousElementSibling.previousElementSibling;

            // Atualizar contagem de dislikes
            let dislikeCount = parseInt(dislikeCountSpan.textContent);
            dislikeCount++;
            dislikeCountSpan.textContent = dislikeCount;

            // Garantir que like não seja negativo
            let likeCount = parseInt(likeCountSpan.textContent);
            if (likeCount > 0) {
                likeCount--;
                likeCountSpan.textContent = likeCount;
            }
        });
    });

    // Abrir/fechar modal de login
    document.getElementById('btn-login').onclick = () => {
        document.getElementById('login-modal').style.display = 'block';
    };
    document.getElementById('cancel-btn').onclick = () => {
        document.getElementById('login-modal').style.display = 'none';
    };

    // Abrir/fechar modal de registro
    document.getElementById('btn-register').onclick = () => {
        document.getElementById('register-modal').style.display = 'block';
    };
    document.getElementById('register-cancel-btn').onclick = () => {
        document.getElementById('register-modal').style.display = 'none';
    };

    // Fechar modais ao clicar fora
    window.onclick = function(event) {
        ['login-modal', 'register-modal', 'comment-modal'].forEach(id => {
            const modal = document.getElementById(id);
            if (event.target === modal) modal.style.display = 'none';
        });
    };

    // Cadastro
    document.getElementById('register-form').onsubmit = async function(e) {
        e.preventDefault();
        const email = document.getElementById('register-email').value;
        const senha = document.getElementById('register-password').value;
        const nome = email.split('@')[0];
        const res = await fetch('/api/usuario/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ nome, email, senhaHash: senha })
        });
        if (res.ok) {
            alert('Cadastro realizado!');
            document.getElementById('register-modal').style.display = 'none';
        } else {
            document.getElementById('register-error').style.display = 'block';
            document.getElementById('register-error').textContent = 'Erro ao cadastrar';
        }
    };

    // Login
    document.getElementById('login-form').onsubmit = async function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const senha = document.getElementById('password').value;
        const res = await fetch('/api/usuario/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ email, senhaHash: senha })
        });
        if (res.ok) {
            const user = await res.json();
            localStorage.setItem('usuarioId', user.id);
            alert('Login realizado!');
            document.getElementById('login-modal').style.display = 'none';
        } else {
            document.getElementById('login-error').style.display = 'block';
            document.getElementById('login-error').textContent = 'E-mail ou senha inválidos';
        }
    };

    // Like/Dislike integrado com backend
    document.querySelectorAll('.dish-container').forEach(container => {
        const likeBtn = container.querySelector('.bi-hand-thumbs-up-fill');
        const dislikeBtn = container.querySelector('.bi-hand-thumbs-down-fill');
        const likeCount = container.querySelector('.like-count');
        const dislikeCount = container.querySelector('.dislike-count');
        const receitaId = container.getAttribute('data-receita-id');

        likeBtn.onclick = async () => {
            const usuarioId = localStorage.getItem('usuarioId');
            if (!usuarioId) { alert('Faça login para curtir!'); return; }
            await fetch('/api/interacao', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ usuarioId, receitaId, tipoInteracao: 'like' })
            });
            likeCount.textContent = parseInt(likeCount.textContent) + 1;
        };
        dislikeBtn.onclick = async () => {
            const usuarioId = localStorage.getItem('usuarioId');
            if (!usuarioId) { alert('Faça login para descurtir!'); return; }
            await fetch('/api/interacao', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ usuarioId, receitaId, tipoInteracao: 'dislike' })
            });
            dislikeCount.textContent = parseInt(dislikeCount.textContent) + 1;
        };
    });

    // Comentário integrado com backend
    let currentDish = null;
    document.querySelectorAll('.dish-container').forEach(container => {
        const commentIcon = container.querySelector('.comment-icon');
        commentIcon.onclick = () => {
            currentDish = container;
            document.getElementById('comment-modal').style.display = 'block';
            document.getElementById('comment-text').value = '';
            document.getElementById('submit-comment').disabled = true;
        };
    });

    // Habilita botão comentar se tiver texto
    document.getElementById('comment-text').addEventListener('input', function() {
        document.getElementById('submit-comment').disabled = !this.value.trim();
    });

    // Adiciona comentário (exemplo simples, só mostra um alert)
    document.getElementById('submit-comment').onclick = async function() {
        const texto = document.getElementById('comment-text').value.trim();
        const usuarioId = localStorage.getItem('usuarioId');
        if (texto && currentDish && usuarioId) {
            const receitaId = currentDish.getAttribute('data-receita-id');
            await fetch('/api/comentario', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({ usuarioId, receitaId, comentarioTexto: texto })
            });
            alert('Comentário enviado!');
            document.getElementById('comment-modal').style.display = 'none';
        } else if (!usuarioId) {
            alert('Faça login para comentar!');
        }
    };
});
