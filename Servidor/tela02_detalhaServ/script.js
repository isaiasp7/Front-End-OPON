import { ApiService } from "../../Service_js/ConexaoBanco.js";
import { Servicos } from "../../Service_js/Servicos.js";

const categoriaElemento = document.getElementById("nome");
const tituloElemento = document.getElementById("funcao");
const descricaoElemento = document.getElementById("avaliacao");
const enderecoElemento = document.getElementById("servicos");
const conteudoDinamico = document.getElementById("conteudo-dinamico");

const servico = JSON.parse(sessionStorage.getItem("dadosServicos"));//informações sobre os serviços


categoriaElemento.textContent = servico.categoria;
tituloElemento.textContent = servico.titulo;
descricaoElemento.textContent = servico.descricao;
//enderecoElemento.textContent = servico.totalServicos;


//enviando dados para o formulário
export function aceitarTrabalho() {
  const profissional = JSON.parse(sessionStorage.getItem("dadosProfissional"));//informações sobre o profissional que fez login
  //Atualiza o serviço
  console.log(profissional);
  console.log(`Servico :${JSON.stringify(servico,null,2)}`);
const servicoPayload = {
  idServico: servico.idServico, // usando getter
  titulo: servico.titulo,
  descricao: servico.descricao,
  categoria: servico.categoria,
  statusServico: "Aceito",
  fkCliente: servico.fkCliente.idCliente ,
  fkProfissional: profissional.idProfissional
};
  console.log(`Servico pos update :${JSON.stringify(servicoPayload,null,2)}`);


  
  //Envia para o banco
   api.put(`http://localhost:8080/servico/${servico.idServico}`, servicoPayload, function (resposta) {
  // Verifica se deu certo
  if (resposta.status >= 200 && resposta.status < 300) {
    notificacao("Serviço aceito, entraremos em contato. Redirecionando para inicial", "#120fc9ff");
    console.log("Atualizado com PUT:", resposta);
    // Aqui o user é enviado de volta a tela inicial
      window.location.href = "../tela01 - profissional/index.html";
  } else {
    console.error("Erro ao atualizar:", resposta);
  }
});

function fazerAlgo() {
  console.log("Requisição deu certo, executando ação!");
  // colocar o que você quiser aqui
}


  //


  //Funções em módulos não são 
}
document.getElementById("contratar-btn").addEventListener("click", () => {

  // if (estadoUsuario.conectado) {
  if (sessionStorage.getItem('usuarioConectado') !== 'true'){
    notificacao("Você não está logado no sistema. Redirecionando para a tela de login", "#DC3545");
    /*setTimeout(() => {

      window.location.href = '../../Login/html/index.html'
      setTimeout(() => notificacao.remove(), 500);
    }, 3000)*/
  }

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




// Adiciona o event listener ao botão
document.getElementById("contratar-btn").addEventListener("click", aceitarTrabalho);
const login = sessionStorage.getItem('usuarioConectado');
console.log(`usuario conectado = ${login}`);