"use strict";

export class Servicos {
  constructor(
    idServico,
    titulo,
    descricao,
    categoria,
    statusServico,
    dataSolicitada,
    dataConclusao,
    fkCliente,
    fkProfissional,
    avaliacoes = [],
    pagamentos = []
  ) {
    // ✅ Caso seja passado um único objeto com todas as informações
    if (typeof idServico === "object" && idServico !== null) {
      const obj = idServico;
      this._idServico = obj._idServico || null;
      this._titulo = obj._titulo || "";
      this._descricao = obj._descricao || "";
      this._categoria = obj._categoria || null;
      this._statusServico = obj._statusServico || "Pendente";
      this._dataSolicitada = obj._dataSolicitada ? new Date(obj._dataSolicitada) : new Date();
      this._dataConclusao = obj._dataConclusao ? new Date(obj._dataConclusao) : null;
      this._fkCliente = obj._fkCliente || null;
      this._fkProfissional = obj._fkProfissional || null;
      this._avaliacoes = obj._avaliacoes || [];
      this._pagamentos = obj._pagamentos || [];
    } else {
      // ✅ Caso os valores sejam passados individualmente
      this._idServico = idServico || null;
      this._titulo = titulo || "";
      this._descricao = descricao || "";
      this._categoria = categoria || null;
      this._statusServico = statusServico || "Pendente";
      this._dataSolicitada = dataSolicitada || new Date();
      this._dataConclusao = dataConclusao || null;
      this._fkCliente = fkCliente || null;
      this._fkProfissional = fkProfissional || null;
      this._avaliacoes = avaliacoes || [];
      this._pagamentos = pagamentos || [];
    }
  }

  // Getters
  get idServico() { return this._idServico; }
  get titulo() { return this._titulo; }
  get descricao() { return this._descricao; }
  get categoria() { return this._categoria; }
  get statusServico() { return this._statusServico; }
  get dataSolicitada() { return this._dataSolicitada; }
  get dataConclusao() { return this._dataConclusao; }
  get fkCliente() { return this._fkCliente; }
  get fkProfissional() { return this._fkProfissional; }
  get avaliacoes() { return this._avaliacoes; }
  get pagamentos() { return this._pagamentos; }

  // Setters
  set idServico(value) { this._idServico = value; }
  set titulo(value) { 
    if (value && value.length > 255) {
      throw new Error("Título deve ter no máximo 255 caracteres");
    }
    this._titulo = value; 
  }
  set descricao(value) { 
    if (value && value.length > 500) {
      throw new Error("Descrição deve ter no máximo 500 caracteres");
    }
    this._descricao = value; 
  }
  set categoria(value) { this._categoria = value; }
  set statusServico(value) { this._statusServico = value; }
  set dataSolicitada(value) { this._dataSolicitada = value; }
  set dataConclusao(value) { this._dataConclusao = value; }
  set fkCliente(value) { this._fkCliente = value; }
  set fkProfissional(value) { this._fkProfissional = value; }
  set avaliacoes(value) { this._avaliacoes = value || []; }
  set pagamentos(value) { this._pagamentos = value || []; }

  // Métodos auxiliares
  adicionarAvaliacao(avaliacao) {
    this._avaliacoes.push(avaliacao);
  }

  adicionarPagamento(pagamento) {
    this._pagamentos.push(pagamento);
  }

  // Método equivalente ao @PrePersist
  prepararParaPersistencia() {
    if (!this._dataSolicitada) {
      this._dataSolicitada = new Date();
    }
    if (!this._statusServico) {
      this._statusServico = "Pendente";
    }
  }

  // Método para conversão para JSON
  toJSON() {
    return {
      idServico: this._idServico,
      titulo: this._titulo,
      descricao: this._descricao,
      categoria: this._categoria,
      statusServico: this._statusServico,
      dataSolicitada: this._dataSolicitada?.toISOString(),
      dataConclusao: this._dataConclusao?.toISOString(),
      fkCliente: this._fkCliente,
      fkProfissional: this._fkProfissional,
      avaliacoes: this._avaliacoes,
      pagamentos: this._pagamentos
    };
  }
}