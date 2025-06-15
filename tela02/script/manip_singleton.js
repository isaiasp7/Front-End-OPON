"use strict";
import Singleton from './Singleton.js';

const grid = document.getElementById('grid');
const singleton = new Singleton();

// Simulando dados do banco (substitua por uma chamada real a uma API)
const profissionaisDoBanco = [
  { nome: "José Carlos", profissao: "Encanador", experiencia: "3 anos", avaliacao: "★★★★★" },
  { nome: "Maria Silva", profissao: "Eletricista", experiencia: "5 anos", avaliacao: "★★★★☆" },
  { nome: "Carlos Andrade", profissao: "Pedreiro", experiencia: "10 anos", avaliacao: "★★★★★" },
  { nome: "Ana Oliveira", profissao: "Pintora", experiencia: "2 anos", avaliacao: "★★★☆☆" },
  // Adicione mais profissionais conforme necessário
];

// Carrega os dados no Singleton
singleton.setProfissionais(profissionaisDoBanco);

// Função para criar um cartão baseado nos dados do profissional
const createCard = (profissional, index) => {
  const card = document.createElement('div');
  card.className = 'profile-card';
  card.innerHTML = `
    <div class="avatar"></div>
    <div class="name">${profissional.nome}</div>
    <div class="role">${profissional.profissao}</div>
    <div class="experience">${profissional.experiencia} de experiência</div>
    <div class="stars">${profissional.avaliacao}</div>
  `;
  
  card.addEventListener('click', () => {
    document.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    
    // Armazena o profissional selecionado no Singleton (opcional)
    singleton.addData({ selectedProfissional: profissional });
  });
  
  return card;
};

// Percorre a lista de profissionais do Singleton e cria os cartões
const profissionais = singleton.getProfissionais();
profissionais.forEach((profissional, index) => {
  grid.appendChild(createCard(profissional, index));
});

// Seleciona o segundo cartão por padrão (opcional)
setTimeout(() => {
  document.querySelectorAll('.profile-card')[1]?.classList.add('selected');
}, 10);