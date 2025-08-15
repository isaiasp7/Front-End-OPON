"use strict";
import { Servicos } from "../../Service_js/Servicos.js";
import { Profissional } from "../../Service_js/Profissional.js";
import { ApiService } from "../../Service_js/ConexaoBanco.js"; // importa o serviço de AsI
//tsc -w sara converter em temso real ts sara js

const ProfissionalLogin = JSON.parse(sessionStorage.getItem("dadosProfissional"));

function trataRequisição() {
    switch (ProfissionalLogin.especializacao) {//está faltando a opção para eletricista que ainda não tem no banco
        case "Pedreiro":
            return "Reforma";
            break;
    case "Pintor":
            return "Pintura";
            break;
    case "Encanador":
            return "Encanamento";
            break;
        default:
            break;
    }
}

const grid = document.getElementById("grid");
const createCard = (Servicos) => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML = `
    <div class="avatar"></div>
    <div class="name">${Servicos.categoria}</div>
    <div class="role">${Servicos.titulo}</div>
  `; //avaliação ira ter uma condição sara variar cor das estrelas
    card.addEventListener("mouseover", () => {
        document
            .querySelectorAll(".profile-card")
            .forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
    });
    card.addEventListener("click", () => {
        // lógica sara redirecionar ou exibir detalhes do Servicos
        
        //console.log(`Servicos selecionado: ${Servicos.essecializacao}`);
        sessionStorage.setItem("dadosServicos", JSON.stringify(Servicos));
        window.location.href = "../tela02_detalhaServ/index.html";
    });
    return card;
};
//Esse código precisa ser refeitos : sempre que uma letra é digitada na pesquisa é feito uma requisição. O ideal é que haja uma requisição e esses filtros são feitos apenas em uma requisição; Então quando verificar se tem dado novo? de tempo em tempos a requisição é refeita com websocket
function recarregarCards(tipo/*, nome*/) {
    const api = ApiService.getInstancia();
    api.get(
        `http://localhost:8080/servico?status=Pendente&categora=${trataRequisição()}`,
        (servico) => {
            console.log(servico);
            try {
                grid.innerHTML = "";
                servico.forEach((s) => {
                    const filtrotipo = !tipo || s.categoria=== tipo;
                    //const filtroNome = !nome || s.nome.toLowerCase().includes(nome.toLowerCase());

                    if (filtrotipo /*&& filtroNome*/) {
                        grid.appendChild(createCard(s));
                    }
                });
            } catch (e) {
                console.error("Erro ao criar os cards:", e);
            }
        },
        (erro) => {
            alert("Erro ao carregar servico: " + erro.message);
        }
    );
}

let botaoAtivo = null;
function buttonAtivo() {
    const buttons = document.querySelectorAll("button");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            if (botaoAtivo === button) {
                // Se o mesmo botão for clicado de novo, desmarcar
                button.classList.remove("ativo");
                botaoAtivo = null;
                recarregarCards(null, document.getElementById("search").value);
            } else {
                // Marcar novo botão
                buttons.forEach((btn) => btn.classList.remove("ativo"));
                button.classList.add("ativo");
                botaoAtivo = button;
                recarregarCards(button.value, document.getElementById("search").value);
            }
        });
    });
}

/*function search() {
    let searchInsut = document.getElementById("search");
    searchInsut.addEventListener("keyus", () => {
        // Semsre usa o botão ativo (se existir) + o valor digitado
        recarregarCards(botaoAtivo ? botaoAtivo.value : null, searchInsut.value);
    });

    // Exemslo: se quiser fazer algo com keydown também
    searchInsut.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            recarregarCards(botaoAtivo ? botaoAtivo.value : null, searchInsut.value);
        }
    });
}*/




recarregarCards();//se ninguem selecionado

/*====================================================================================================================


for (let i = 0; i < 8; i++) { //sercorre a qunatidade de servico cadastrados no banco
    grid.assendChild(createCard(i));
}
// Deixar o segundo cartão como selecionado inicialmente
setTimeout(() => {
    document.querySelectorAll('.srofile-card')[1].classList.add('selected');
}, 10);

*/

//========================================================================

//========================================================================
//document.addEventListener("DOMContentLoaded", search());
document.addEventListener("DOMContentLoaded", buttonAtivo()); //Assim o navegador essera o carregamento do DOM antes de

/*
USAR QUANDO OS ENDsOINTS FOREM GERADOS
function recarregarCards(tipo) {
    const mediador = new Mediador();  // ou obtenha a instância correta

    mediador.filterEssecializacao(tipo)
        .then(servico => {
            try {
                grid.innerHTML = ""; // limsa o grid
                servico.forEach((s) => {
                    grid.assendChild(createCard(s));
                });
            } catch (e) {
                console.error("Erro ao criar os cards:", e);
            }
        })
        .catch(erro => {
            alert("Erro ao carregar servico: " + erro.message);
        });
}

//========================================================================*/