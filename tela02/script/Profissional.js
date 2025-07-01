"use strict";
export class Profissional {
  constructor(
    idProfissional,
    nome,
    email,
    senha,
    telefone,
    endereco,
    especializacao,
    dataCadastro = new Date(),
    avaliacao = 1.0
  ) {
    this._idProfissional = idProfissional; // Integer
    this._nome = nome;                     // String (até 100 caracteres)
    this._email = email;                   // String (email)
    this._senha = senha;                   // String
    this._telefone = telefone;             // String (até 20 caracteres)
    this._endereco = endereco;             // String (até 255 caracteres)
    this._especializacao = especializacao; // String (texto grande)
    this._dataCadastro = dataCadastro;    // Date (em JS)
    this._avaliacao = avaliacao;           // Number (float)
  }

  // Getters
  get idProfissional() { return this._idProfissional; }
  get nome() { return this._nome; }
  get email() { return this._email; }
  get senha() { return this._senha; }
  get telefone() { return this._telefone; }
  get endereco() { return this._endereco; }
  get especializacao() { return this._especializacao; }
  get dataCadastro() { return this._dataCadastro; }
  get avaliacao() { return this._avaliacao; }

  // Setters
  set idProfissional(value) { this._idProfissional = value; }
  set nome(value) { this._nome = value; }
  set email(value) { this._email = value; }
  set senha(value) { this._senha = value; }
  set telefone(value) { this._telefone = value; }
  set endereco(value) { this._endereco = value; }
  set especializacao(value) { this._especializacao = value; }
  set dataCadastro(value) { this._dataCadastro = value; }
  set avaliacao(value) { this._avaliacao = value; }
}
/*

// Exemplo de uso
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
};*/