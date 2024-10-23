document.getElementById("buscarButton").addEventListener("click", function() {
    const estado = document.getElementById("estadoSelect").value;
    const bairroInput = document.getElementById("bairroInput");
    const bairro = bairroInput.value.trim();
    const loader = document.getElementById("loader");
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");
    const closePopup = document.getElementById("closePopup");

    if (estado === "") {
        alert("Por favor, selecione um estado.");
        return;
    }

    if (bairro === "") {
        alert("Por favor, digite um bairro.");
        return;
    }

    // Mostrar o loader enquanto busca o resultado
    loader.classList.remove("hidden");

    setTimeout(() => {
        fetch('zonas.json')
            .then(response => response.json())
            .then(data => {
                console.log(data); // Verificar os dados carregados

                // Função para normalizar strings
                const normalizeString = (str) => {
                    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
                };

                const bairrosEstado = data.bairros.filter(item => item.estado === estado);
                const bairroUsuario = normalizeString(bairro);

                const bairroEncontrado = bairrosEstado.find(item => normalizeString(item.bairro) === bairroUsuario);
                if (bairroEncontrado) {
                    popupMessage.innerHTML = `🌍 O bairro <strong>${bairroEncontrado.bairro}</strong> pertence à zona <strong>${bairroEncontrado.zona}</strong>.`;
                } else {
                    popupMessage.textContent = "Bairro não encontrado no estado selecionado. Tente novamente!";
                }
                // Limpar o campo de entrada
                bairroInput.value = '';
                // Exibir o pop-up
                popup.classList.remove("hidden");
            })
            .catch(error => {
                console.error("Erro ao carregar o arquivo JSON:", error);
                popupMessage.textContent = "Erro ao buscar os dados.";
                // Exibir o pop-up
                popup.classList.remove("hidden");
            })
            .finally(() => {
                // Ocultar o loader em qualquer caso
                loader.classList.add("hidden");
            });
    }, 1000); // Simular tempo de busca
});

// Fechar o pop-up ao clicar no "x"
document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").classList.add("hidden");
});

window.addEventListener("click", function(event) {
    const popup = document.getElementById("popup");
    if (event.target === popup) {
        popup.classList.add("hidden");
    }
});
document.getElementById("buscarButton").addEventListener("click", function() {

    fetch('zonas.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na rede ao tentar carregar o arquivo JSON.');
            }
            return response.json();
        })
        .then(data => {
            console.log('Dados carregados:', data);
            // ... restante do código ...
        })
        .catch(error => {
            console.error("Erro ao carregar o arquivo JSON:", error);
            popupMessage.textContent = "Erro ao buscar os dados: " + error.message;
            // Exibir o pop-up
            popup.classList.remove("hidden");
        })
        .finally(() => {
            // Ocultar o loader em qualquer caso
            loader.classList.add("hidden");
        });
});
