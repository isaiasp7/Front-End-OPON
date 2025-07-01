const tipoSelecionado = "encanador"; // Pode vir de URL, localStorage, botão, etc.

//preencher o campo de nome 
function PreenchendoCampoEnvio() {
  const nome = sessionStorage.getItem("nome");
  const funcao = sessionStorage.getItem("funcao");


  if (nome && updateNome) {
    updateNome.innerHTML = "Profissional: <strong>" + nome + "</strong> (" + funcao + ")";

    // Cria o campo de rádio
    const radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = "opcao2";
    radioInput.name = "selectDest";
    radioInput.value = "especialized";
    radioInput.checked = true; // Marca o rádio como selecionado

    // Cria a label para o rádio (opcional, mas recomendado para acessibilidade)
    const radioLabel = document.createElement("label");
    radioLabel.setAttribute("for", "opcao2"); // Associa a label ao input
    radioLabel.textContent = " Selecionado automaticamente"; // Texto da label

    // Adiciona o input e a label ao DOM (onde você deseja que apareçam)
    const container = document.getElementsByClassName("destinationTo"); // Cria um contêiner para organizar
    container.appendChild(radioInput);
    container.appendChild(radioLabel);

    // Adiciona o contêiner ao elemento pai desejado.  Por exemplo, logo após o labelNome:
    updateNome.parentNode.insertBefore(container, updateNome.nextSibling);

  }
}



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
  PreenchendoCampoEnvio();
  const container = document.getElementById("form-container");
  //container.innerHTML = "<p>Carregando formulário...</p>";

  try {
    const resposta = await fetch(`questForm/formulario-${tipo}.json`);
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
    //container.innerHTML = `<p>Erro ao carregar o formulário: ${erro}</p>`;
  }
  
}

carregarFormulario(tipoSelecionado);
