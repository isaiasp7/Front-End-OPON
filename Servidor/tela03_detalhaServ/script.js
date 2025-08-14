import { Servicos } from "../../Service_js/Servicos.js";

const categoriaElemento = document.getElementById("nome");
const tituloElemento = document.getElementById("funcao");
const descricaoElemento = document.getElementById("avaliacao");
const enderecoElemento = document.getElementById("servicos");
const conteudoDinamico = document.getElementById("conteudo-dinamico");

const objJSON = JSON.parse(sessionStorage.getItem("dadosServicos"));
console.log(objJSON);

categoriaElemento.textContent = objJSON.categoria;
tituloElemento.textContent = objJSON.titulo;
descricaoElemento.textContent = objJSON.descricao;
enderecoElemento.textContent = objJSON.totalServicos;

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