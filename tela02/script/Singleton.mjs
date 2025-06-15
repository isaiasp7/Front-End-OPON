class Singleton {
  constructor() {
    if (!Singleton.instance) {
      Singleton.instance = this;
      this.profissionais = []; // Aqui ficará a lista de profissionais
    }
    return Singleton.instance;
  }

  setProfissionais(profissionais) {
    this.profissionais = profissionais;
  }

  getProfissionais() {
    return this.profissionais;
  }

  addProfissional(profissional) {
    this.profissionais.push(profissional);
  }
}

Object.freeze(Singleton);
export default Singleton;