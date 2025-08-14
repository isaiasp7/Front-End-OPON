import { Servicos } from "../../Service_js/Servicos";

const nomeEl = document.getElementById("nome");
const funcaoEl = document.getElementById("funcao");
const avaliacaoEl = document.getElementById("avaliacao");
const servicosEl = document.getElementById("servicos");
const conteudoDinamico = document.getElementById("conteudo-dinamico");
const dadosFixos = document.getElementById("dados-fixos");
const tabButtons = document.querySelectorAll(".tab-button");

const objJSON = JSON.parse(sessionStorage.getItem("dadosServicos"));
console.log(objJSON);

nomeEl.textContent = objJSON.nome;
funcaoEl.textContent = objJSON.especializacao;
avaliacaoEl.textContent = objJSON.avaliacao;
servicosEl.textContent = objJSON.totalServicos;

// Atualiza conteúdo com base na aba selecionada
function atualizarConteudo(tipo) {
  if (tipo === "especificacoes") {
    dadosFixos.style.display = "block";
    conteudoDinamico.innerHTML = `<p class="descricao">${Servicos.descricao}</p>`;
  } else {
    dadosFixos.style.display = "none";
    conteudoDinamico.innerHTML = `
      <p><strong>Últimos Serviços:</strong></p>
      <dl>${Servicos.historico.map(s => `<dt>${s}</dt>`).join('')}</dl>
    `;
  }
}

// Alterna abas
tabButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector(".tab-button.active")?.classList.remove("active");
    btn.classList.add("active");
    atualizarConteudo(btn.dataset.tab);
  });
});

//enviando dados para o formulário
export function enviarDados() {//Funções em módulos não são globalmente acessíveis no html.
  //console.log(objJSON.nome)
sessionStorage.setItem("dadosServicos", JSON.stringify(objJSON));

  
    
switch (objJSON.especializacao) {
  case "Pedreiro":
      window.location.href = "../tela03_form/orcamento-pedreiro/index.html";
    break;
   case "Pintor":
     window.location.href = "../tela03_form/orcamento-pintor/index.html";
  case "Eletricista":
      // window.location.href = "../tela03_form/orcamento-pintor";
    break;
    case "Encanador":
      // window.location.href = "../tela03_form/orcamento-pintor";
    // Expected output: "Mangoes and papayas are $2.79 a pound."
    break;
  default:
      console.log(`Sorry, we are out of ${objJSON.especializacao}.`); 
 
  
}
}



// Aba inicial
document.querySelector('.tab-button[data-tab="especificacoes"]').classList.add("active");
atualizarConteudo("especificacoes");

// Adiciona o event listener ao botão
document.getElementById("contratar-btn").addEventListener("click", enviarDados);