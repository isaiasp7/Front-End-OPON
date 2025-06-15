/*"use strict";
export class Operario {
    constructor(nome, identificador, avaliacao, email, telefone, endereco, especializacao) {
        this._historico = [];
        this.nome = nome;
        this._identificador = identificador;
        this._avaliacao = avaliacao;
        this._email = email;
        this._telefone = telefone;
        this._endereco = endereco;
        this._especializacao = especializacao;
    }
    // Getters para acessar os atributos privados
    get historicos() {
        return this._historico;
    }
    get identificador() {
        return this._identificador;
    }
    get avaliacao() {
        return this._avaliacao;
    }
    get email() {
        return this._email;
    }
    get telefone() {
        return this._telefone;
    }
    get endereco() {
        return this._endereco;
    }
    get especializacao() {
        return this._especializacao;
    }
}
*/
export const Profissional = {
  nome: "Jose Carlos",
  funcao: "Encanador",
  avaliacao: 4.8,
  totalServicos: 123,
  descricao: "Profissional com mais de 10 anos de experiência em encanamentos residenciais e industriais. Comprometido com a qualidade e pontualidade.",
  historico: [
    "Instalação de caixa d’água – 5 estrelas",
    "Reparo em cano de PVC – 4 estrelas",
    "Troca de torneira – 5 estrelas"
  ]
};