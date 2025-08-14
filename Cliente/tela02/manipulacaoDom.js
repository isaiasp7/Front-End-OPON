"use strict";
import { Profissional } from "../../Service_js/Profissional.js"; // Importa o objeto Profissional
import { ApiService } from "../../Service_js/ConexaoBanco.js"; // Importa o serviço de API
//tsc -w para converter em tempo real ts para js

/*
const objJSON = JSON.parse(sessionStorage.getItem("dadosCliente"));
console.log(objJSON);//recebe os dados de login do cliente
*/ 

const grid = document.getElementById("grid");
const createCard = (Profissional) => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML = `
    <div class="avatar"></div>
    <div class="name">${Profissional.nome}</div>
    <div class="role">${Profissional.especializacao}</div>
    <div class="stars">${Profissional.avaliacao}</div>
  `; //avaliação ira ter uma condição para variar cor das estrelas
    card.addEventListener("mouseover", () => {
        document
            .querySelectorAll(".profile-card")
            .forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
    });
    card.addEventListener("click", () => {
        // lógica para redirecionar ou exibir detalhes do profissional
        
        //console.log(`Profissional selecionado: ${Profissional.especializacao}`);
        sessionStorage.setItem("dadosProfissional", JSON.stringify(Profissional));
        window.location.href = "../tela03_detalhaPr/index.html";
    });
    return card;
};
//Esse código precisa ser refeitos : sempre que uma letra é digitada na pesquisa é feito uma requisição. O ideal é que haja uma requisição e esses filtros são feitos apenas em uma requisição; Então quando verificar se tem dado novo?
function recarregarCards(tipo, nome) {
    const api = ApiService.getInstancia();
    api.get(
        "http://localhost:8080/profissional",
        (profissionais) => {
            try {
                grid.innerHTML = "";
                profissionais.forEach((p) => {
                    const filtroTipo = !tipo || p.especializacao === tipo;
                    const filtroNome = !nome || p.nome.toLowerCase().includes(nome.toLowerCase());

                    if (filtroTipo && filtroNome) {
                        grid.appendChild(createCard(p));
                    }
                });
            } catch (e) {
                console.error("Erro ao criar os cards:", e);
            }
        },
        (erro) => {
            alert("Erro ao carregar profissionais: " + erro.message);
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

function search() {
    let searchInput = document.getElementById("search");
    searchInput.addEventListener("keyup", () => {
        // Sempre usa o botão ativo (se existir) + o valor digitado
        recarregarCards(botaoAtivo ? botaoAtivo.value : null, searchInput.value);
    });

    // Exemplo: se quiser fazer algo com keydown também
    searchInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            recarregarCards(botaoAtivo ? botaoAtivo.value : null, searchInput.value);
        }
    });
}




recarregarCards();//se ninguem selecionado

/*====================================================================================================================


for (let i = 0; i < 8; i++) { //percorre a qunatidade de profissionais cadastrados no banco
    grid.appendChild(createCard(i));
}
// Deixar o segundo cartão como selecionado inicialmente
setTimeout(() => {
    document.querySelectorAll('.profile-card')[1].classList.add('selected');
}, 10);

*/

//========================================================================

//========================================================================
document.addEventListener("DOMContentLoaded", search());
document.addEventListener("DOMContentLoaded", buttonAtivo()); //Assim o navegador espera o carregamento do DOM antes de

/*
USAR QUANDO OS ENDPOINTS FOREM GERADOS
function recarregarCards(tipo) {
    const mediador = new Mediador();  // ou obtenha a instância correta

    mediador.filterEspecializacao(tipo)
        .then(profissionais => {
            try {
                grid.innerHTML = ""; // limpa o grid
                profissionais.forEach((p) => {
                    grid.appendChild(createCard(p));
                });
            } catch (e) {
                console.error("Erro ao criar os cards:", e);
            }
        })
        .catch(erro => {
            alert("Erro ao carregar profissionais: " + erro.message);
        });
}

//========================================================================*/