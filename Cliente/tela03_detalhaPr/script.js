
import { Profissional } from "../../Service_js/Profissional.js";


const nomeEl = document.getElementById("nome");
const funcaoEl = document.getElementById("funcao");
const avaliacaoEl = document.getElementById("avaliacao");
const servicosEl = document.getElementById("servicos");
const conteudoDinamico = document.getElementById("conteudo-dinamico");
const dadosFixos = document.getElementById("dados-fixos");
const tabButtons = document.querySelectorAll(".tab-button");

const objJSON = JSON.parse(sessionStorage.getItem("dadosProfissional"));
console.log(objJSON);

nomeEl.textContent = objJSON.nome;
funcaoEl.textContent = objJSON.especializacao;
avaliacaoEl.textContent = objJSON.avaliacao;
servicosEl.textContent = objJSON.totalServicos;

// Atualiza conteúdo com base na aba selecionada
function atualizarConteudo(tipo) {
  if (tipo === "especificacoes") {
    dadosFixos.style.display = "block";
    conteudoDinamico.innerHTML = `<p class="descricao">${Profissional.descricao}</p>`;
  } else {
    dadosFixos.style.display = "none";
    conteudoDinamico.innerHTML = `
      <p><strong>Últimos Serviços:</strong></p>
      <dl>${Profissional.historico.map(s => `<dt>${s}</dt>`).join('')}</dl>
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
  sessionStorage.setItem("dadosProfissional", JSON.stringify(objJSON));



  switch (objJSON.especializacao) {
    case "Pedreiro":
      window.location.href = "../tela03_form/orcamento-pedreiro final/index.html";
      break;
    case "Pintor":
      window.location.href = "../tela03_form/orcamento-pintor final/index.html";
      break;
    case "Eletricista":
      window.location.href = "../tela03_form/orcamento-eletricista final/index.html";
      break;
    case "Encanador":
      window.location.href = "../tela03_form/orcamento-encanador final/index.html";
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
document.getElementById("contratar-btn").addEventListener("click", () => {

  // if (estadoUsuario.conectado) {
  if (sessionStorage.getItem('usuarioConectado') === 'true') {
    enviarDados()
  } else {
    notificacao("Você não está logado no sistema. Redirecionando para a tela de login", "#DC3545");
    setTimeout(() => {
      window.location.href = '../../Login/html/index.html'
      setTimeout(() => notificacao.remove(), 500);
    }, 3000)
  }
  // enviarDados()
});

function notificacao(texto, cor) {
  let notificacao = document.createElement("div");
  notificacao.classList.add("notificacao");
  notificacao.innerText = texto;
  notificacao.style.backgroundColor = cor;
  document.body.appendChild(notificacao);
  setTimeout(() => {
    notificacao.classList.add("fade-out");
    setTimeout(() => notificacao.remove(), 500);
  }, 3000);
}