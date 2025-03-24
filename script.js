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
