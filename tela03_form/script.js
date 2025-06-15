const tipoSelecionado = "encanador"; // Pode vir de URL, localStorage, botão, etc.

function criarGrupoDePerguntas(titulo, perguntas) {
  const grupoHTML = document.createElement("div");

  const h3 = document.createElement("h3");
  h3.textContent = titulo;

  const inputBox = document.createElement("div");
  inputBox.className = "input-box";

  perguntas.forEach(p => {
    const campo = document.createElement("div");
    campo.className = "floating-label";

    const input = document.createElement("input");
    input.type = "text";
    input.id = p.id;
    input.required = true;

    const label = document.createElement("label");
    label.textContent = p.placeholder;

    campo.appendChild(input);
    campo.appendChild(label);
    inputBox.appendChild(campo);
  });

  grupoHTML.appendChild(h3);
  grupoHTML.appendChild(inputBox);
  return grupoHTML;
}

function aplicarEfeitoFlutuante(container) {
  const inputs = container.querySelectorAll("input");
  inputs.forEach(input => {
    input.addEventListener("input", () => {
      input.classList.toggle("not-empty", input.value.trim() !== "");
    });
  });
}

async function carregarFormulario(tipo) {
  const container = document.getElementById("formulario-container");
  container.innerHTML = "<p>Carregando formulário...</p>";

  try {
    const resposta = await fetch(`formularios/${tipo}.json`);
    const dados = await resposta.json();

    container.innerHTML = "";

    const grupo1 = criarGrupoDePerguntas("Descrição 1", dados.perguntas);
    const grupo2 = criarGrupoDePerguntas("Descrição 2", dados.perguntas);

    container.appendChild(grupo1);
    container.appendChild(grupo2);

    const botao = document.createElement("button");
    botao.className = "submit-btn";
    botao.textContent = "Submeter Serviço";
    container.appendChild(botao);

    aplicarEfeitoFlutuante(container);

  } catch (erro) {
    container.innerHTML = `<p>Erro ao carregar o formulário: ${erro}</p>`;
  }
}

carregarFormulario(tipoSelecionado);
