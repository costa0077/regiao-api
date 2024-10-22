document.getElementById("buscarButton").addEventListener("click", function() {
    const bairro = document.getElementById("bairroInput").value.trim().toLowerCase();
    const resultado = document.getElementById("resultado");
    const loader = document.getElementById("loader");

    if (bairro === "") {
        resultado.textContent = "Por favor, digite um bairro.";
        return;
    }

    // Mostrar o loader enquanto busca o resultado
    resultado.textContent = "";
    loader.classList.remove("hidden");

    setTimeout(() => {
        fetch('zonas.json')
            .then(response => response.json())
            .then(data => {
                const bairroEncontrado = data.bairros.find(item => item.bairro.toLowerCase() === bairro);
                loader.classList.add("hidden");
                if (bairroEncontrado) {
                    resultado.textContent = `🌍 O bairro ${bairroEncontrado.bairro} pertence à zona ${bairroEncontrado.zona}.`;
                } else {
                    resultado.textContent = "Bairro não encontrado. Tente novamente!";
                }
            })
            .catch(error => {
                console.error("Erro ao carregar o arquivo JSON:", error);
                resultado.textContent = "Erro ao buscar os dados.";
                loader.classList.add("hidden");
            });
    }, 1000); // Simular tempo de busca
});
