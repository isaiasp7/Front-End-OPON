import { Profissional } from '../tela02/script/Profissional.js';

const nomeEl = document.getElementById("nome");
const funcaoEl = document.getElementById("funcao");
const avaliacaoEl = document.getElementById("avaliacao");
const servicosEl = document.getElementById("servicos");
const conteudoDinamico = document.getElementById("conteudo-dinamico");
const dadosFixos = document.getElementById("dados-fixos");
const tabButtons = document.querySelectorAll(".tab-button");

const dadosProfissional = JSON.parse(sessionStorage.getItem("dadosProfissional"));
// Preencher dados fixos
nomeEl.textContent = dadosProfissional.nome;
funcaoEl.textContent = dadosProfissional.funcao;
avaliacaoEl.textContent = dadosProfissional.avaliacao;
servicosEl.textContent = dadosProfissional.totalServicos;

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
  console.log(sessionStorage.setItem("nome", Profissional.nome))
  sessionStorage.setItem("nome", Profissional.nome);
  sessionStorage.setItem("funcao", Profissional.funcao);
  window.location.href = "../tela03_form/index.html";
  
}



// Aba inicial
document.querySelector('.tab-button[data-tab="especificacoes"]').classList.add("active");
atualizarConteudo("especificacoes");

// Adiciona o event listener ao botão
document.getElementById("contratar-btn").addEventListener("click", enviarDados);