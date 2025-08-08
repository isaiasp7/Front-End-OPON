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
    dataCadastro,
    avaliacao
  ) {
    // ✅ Caso seja passado um único objeto com todas as informações (ex: do sessionStorage)
    if (typeof idProfissional === "object" && idProfissional !== null) {
      const obj = idProfissional;
      this._idProfissional = obj._idProfissional || null;
      this._nome = obj._nome || "Nome Padrão";
      this._email = obj._email || "";
      this._senha = obj._senha || "";
      this._telefone = obj._telefone || "";
      this._endereco = obj._endereco || "";
      this._especializacao = obj._especializacao || "";
      this._dataCadastro = obj._dataCadastro
        ? new Date(obj._dataCadastro)
        : new Date();
      this._avaliacao = obj._avaliacao || 1.0;
    } else {
      // ✅ Caso os valores sejam passados individualmente
      this._idProfissional = idProfissional || null;
      this._nome = nome || "Nome Padrão";
      this._email = email || "";
      this._senha = senha || "";
      this._telefone = telefone || "";
      this._endereco = endereco || "";
      this._especializacao = especializacao || "";
      this._dataCadastro = dataCadastro || new Date();
      this._avaliacao = avaliacao || 1.0;
    }
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