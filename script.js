const indices = {}; // armazena os índices de cada carrossel
const imagensPorVez = 4; // Número de imagens por clique

function moverCarrossel(direcao, id) {
    // Seleciona o carrossel específico com base no ID
    const carrosselContainer = document.querySelector(`.carrossel-container[data-carrossel="${id}"]`);
    const carrossel = carrosselContainer.querySelector('.carrossel');
    const imagens = carrosselContainer.querySelectorAll('.imagem');
    const totalImagens = imagens.length;

    // Define um índice inicial para o carrossel, se não existir ainda
    if (!(id in indices)) {
        indices[id] = 0;
    }

    // Calcula o número total de "páginas"
    const maxIndex = Math.ceil(totalImagens / imagensPorVez) - 1;

    // Atualiza o índice
    indices[id] += direcao;

    // Garante que o carrossel volte ao início ou fim conforme necessário
    if (indices[id] < 0) {
        indices[id] = maxIndex;
    } else if (indices[id] > maxIndex) {
        indices[id] = 0;
    }

    // Calcula o deslocamento com base na largura total do carrossel
    const larguraItem = imagens[0].clientWidth;
    const deslocamento = -(indices[id] * larguraItem * imagensPorVez);
    carrossel.style.transform = `translateX(${deslocamento}px)`;
}

// Ajusta automaticamente a largura do carrossel ao redimensionar
window.addEventListener('resize', () => {
    document.querySelectorAll('.carrossel-container').forEach((container) => {
        const carrossel = container.querySelector('.carrossel');
        const imagens = container.querySelectorAll('.imagem');
        const larguraImagem = imagens[0].clientWidth;
        carrossel.style.width = `${imagens.length * larguraImagem}px`;
    });
});

document.querySelectorAll('.imagem').forEach(img => {
    img.addEventListener('click', function() {
      const modal = document.getElementById('imageModal');
      const modalImg = document.getElementById('modalImage');
      const modalInfo = document.getElementById('modalInfo');
      
      modal.style.display = "block";
      modalImg.src = this.src;
      modalImg.alt = this.alt; // Preserva o texto alternativo
      
      // Desabilita o scroll da página quando o modal está aberto
      document.body.style.overflow = 'hidden';
      
      const title = this.getAttribute('data-title') || 'Título não disponível';
      const description = this.getAttribute('data-desc') || 'Descrição não disponível';
      const details = this.getAttribute('data-details') || '';
      
      modalInfo.innerHTML = `
        <h2>${title}</h2>
        <p>${description}</p>
        ${details ? `<div class="additional-details">${details}</div>` : ''}
      `;
    });
  });
  
  // Fechar o modal
  document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('imageModal').style.display = "none";
    document.body.style.overflow = 'auto'; // Restaura o scroll
  });
  
  // Fechar ao clicar fora do conteúdo
  window.addEventListener('click', function(event) {
    if (event.target == document.getElementById('imageModal')) {
      document.getElementById('imageModal').style.display = "none";
      document.body.style.overflow = 'auto';
    }
  });
  
  // Fechar com tecla ESC
  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
      document.getElementById('imageModal').style.display = "none";
      document.body.style.overflow = 'auto';
    }
  });
