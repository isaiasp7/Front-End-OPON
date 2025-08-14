
// Recupera o profissional do sessionStorage
const objJSON = JSON.parse(sessionStorage.getItem("dadosProfissional"));

// Atualiza o campo "Servidor : {nome}"
function EnvioFormNomeUpdate() {
    if (objJSON && objJSON.nome) {
        document.getElementById('nomeServidor').textContent = 'Servidor : ' + objJSON.nome;
    } else {
        document.getElementById('nomeServidor').textContent = 'Servidor : não identificado';
    }
}

// Chama assim que a página carregar
window.onload = EnvioFormNomeUpdate;


//Formulário

document.getElementById("orcamentoForm").addEventListener("submit", function (event) {
    event.preventDefault();

    const nome = document.getElementById("nome").value.trim();
    const telefone = document.getElementById("telefone").value.trim();
    const email = document.getElementById("email").value.trim();
    const cep = document.getElementById("cep").value.trim();
    const prazo = document.querySelector("input[name='prazo']:checked");
    const destino = document.querySelector("input[name='destino']:checked");
    const detalhes = document.getElementById("detalhes").value.trim();

    // Validação
    if (!nome || !telefone || !email || !cep || !prazo || !destino || !detalhes) {
        alert("Por favor, preencha todos os campos obrigatórios!");
        return;
    }

    // JSON
    const dados = {
        profissao: "Eletricista",
        cliente: {
            nome: nome,
            telefone: telefone,
            email: email,
            cep: cep
        },
        prazo: prazo.value,
        detalhes: detalhes,
        destino: destino.value === "todos" ? "todos" : {
            id: objJSON?.id || null, // se houver id do servidor
            nome: objJSON?.nome || "Não identificado"
        }
    };

    console.log("JSON para enviar:", dados);

    // Envio para o backend Spring Boot
    fetch("http://localhost:8080/api/orcamentos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    })
    .then(response => {
        if (response.ok) {
            alert("Orçamento enviado com sucesso!");
            document.getElementById("orcamentoForm").reset();
        } else {
            alert("Erro ao enviar orçamento!");
        }
    })
    .catch(error => {
        console.error("Erro na requisição:", error);
        alert("Erro ao conectar com o servidor.");
    });
});
