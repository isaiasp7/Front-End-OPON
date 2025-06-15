import { Profissional } from '../tela02/script/operario.js';

const nomeEl = document.getElementById("nome");
const funcaoEl = document.getElementById("funcao");
const avaliacaoEl = document.getElementById("avaliacao");
const servicosEl = document.getElementById("servicos");
const conteudoDinamico = document.getElementById("conteudo-dinamico");
const dadosFixos = document.getElementById("dados-fixos");
const tabButtons = document.querySelectorAll(".tab-button");

// Preencher dados fixos
nomeEl.textContent = Profissional.nome;
funcaoEl.textContent = Profissional.funcao;
avaliacaoEl.textContent = Profissional.avaliacao;
servicosEl.textContent = Profissional.totalServicos;

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

// Aba inicial
document.querySelector('.tab-button[data-tab="especificacoes"]').classList.add("active");
atualizarConteudo("especificacoes");
