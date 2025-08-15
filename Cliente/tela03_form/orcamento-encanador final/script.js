// Recupera o profissional do sessionStorage
  const profissional = JSON.parse(sessionStorage.getItem("dadosProfissional"));
    const usuario = JSON.parse(sessionStorage.getItem("usuarioData"));
// Atualiza o campo "Servidor : {nome}"
function EnvioFormNomeUpdate() {
    if (profissional && profissional.nome) {
        document.getElementById('nomeServidor').textContent = 'Servidor : ' + profissional.nome;
    } else {
        document.getElementById('nomeServidor').textContent = 'Servidor : não identificado';
    }
}

// Chama assim que a página carregar
window.onload = EnvioFormNomeUpdate;

// Função para fazer POST
function post(url, dados, callback) {
    fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(dados),
    })
    .then((res) => res.json())
    .then((data) => callback(data))
    .catch((err) => console.error("Erro no POST:", err));
}

// Formulário
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

    // Formatando os dados para o formato esperado pelo endpoint
    const dadosParaEnvio = {
        titulo: "Solicitação de serviço de eletricista",
        descricao: detalhes,
        categoria: "Elétrica",
        statusServico: "Pendente", // Assumindo que é o status inicial
        endereco: cep, // Ou você pode ter um campo específico para endereço
         fkCliente: servico.fkCliente.idCliente ,
  fkProfissional: profissional.idProfissional,
        dataSolicitada: new Date().toISOString(), // Data atual
        dataConclusao: null // Não definida inicialmente
    };

    console.log("Dados formatados para envio:", dadosParaEnvio);

    // Exemplo de uso da função post (substitua a URL pela correta)
    post('http://localhost:8080/servico', dadosParaEnvio, function(response) {
        console.log("Resposta do servidor:", response);
        alert("Solicitação enviada com sucesso!");
        // Aqui você pode redirecionar ou limpar o formulário se necessário
    });
});