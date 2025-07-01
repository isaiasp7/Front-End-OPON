"use strict";
import { Profissional } from "./script/Profissional.js"; // Importa o objeto Profissional
import { ApiService } from "./script/ConexaoBanco.js"; // Importa o serviço de API
//tsc -w para converter em tempo real ts para js

const grid = document.getElementById("grid");
const createCard = (Profissional) => {
    const card = document.createElement("div");
    card.className = "profile-card";
    card.innerHTML = `
    <div class="avatar"></div>
    <div class="name">${Profissional.nome}</div>
    <div class="role">${Profissional.especializacao}</div>
    <div class="experience">${Profissional.experiencia} de experiência</div>
    <div class="stars">${Profissional.avaliacao}</div>
  `; //avaliação ira ter uma condição para variar cor das estrelas
    card.addEventListener("mouseover", () => {
        document
            .querySelectorAll(".profile-card")
            .forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
    });
    card.addEventListener("click", () => {
        // Aqui você pode adicionar a lógica para redirecionar ou exibir detalhes do profissional
        console.log(`Profissional selecionado: ${Profissional}`);
        sessionStorage.setItem("dadosProfissional", JSON.stringify(Profissional));
        window.location.href = "../tela03_detalhaPr/index.html";
    });
    return card;
};

function recarregarCards(tipo) {
    const api = ApiService.getInstancia();
    api.get(
        "http://localhost:8080/profissional", // Substitua pelo URL real da API
        (profissionais) => {
            try {
                grid.innerHTML = ""; //limpara para depois atualizar de acordo com o filtro
                profissionais.forEach((p) => {
                    if (!tipo || p.especializacao === tipo) {
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

function buttonAtivo() {
    const buttons = document.querySelectorAll("button");
    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            buttons.forEach((btn) => btn.classList.remove("ativo"));
            button.classList.add("ativo");
            recarregarCards(button.value);
        });
    });
}

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
document.addEventListener("DOMContentLoaded", buttonAtivo); //Assim o navegador espera o carregamento do DOM antes de

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