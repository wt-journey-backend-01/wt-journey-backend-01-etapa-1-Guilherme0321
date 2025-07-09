document.addEventListener('DOMContentLoaded', () => {
    const cardapioSection = document.querySelector('.cardapio');

    // Executa apenas se estiver na página principal (onde a seção .cardapio existe)
    if (cardapioSection) {
        fetch('/api/lanches')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na rede! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(lanches => {
                // Limpa o texto de "carregando"
                cardapioSection.innerHTML = '<h2>Nosso Cardápio</h2>';

                const lanchesList = document.createElement('div');
                lanchesList.className = 'lanches-list';

                lanches.forEach(lanche => {
                    const lancheItem = document.createElement('div');
                    lancheItem.className = 'lanche-item';
                    lancheItem.innerHTML = `
                        <h3>${lanche.nome}</h3>
                        <p>${lanche.ingredientes}</p>
                    `;
                    lanchesList.appendChild(lancheItem);
                });

                cardapioSection.appendChild(lanchesList);
            })
            .catch(error => {
                console.error('Falha ao buscar o cardápio:', error);
                cardapioSection.innerHTML += '<p style="color: red;">Não foi possível carregar o cardápio. Por favor, tente novamente mais tarde.</p>';
            });
    }
});