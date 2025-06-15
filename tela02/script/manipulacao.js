"use strict";
//tsc -w para converter em tempo real ts para js

const grid = document.getElementById('grid');
const createCard = (index) => {
    const card = document.createElement('div');
    card.className = 'profile-card';
    card.innerHTML = `
        <div class="avatar"></div>
        <div class="name">Jose Carlos</div>
        <div class="role">Encanador</div>
        <div class="experience">3 anos de experiência</div>
        <div class="stars">★ ★ ★ ★ ★</div>
      `;
    card.addEventListener('click', () => {
        document.querySelectorAll('.profile-card').forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
    });
    return card;
};
for (let i = 0; i < 8; i++) { //percorre a qunatidade de profissionais cadastrados no banco
    grid.appendChild(createCard(i));
}
// Deixar o segundo cartão como selecionado inicialmente
setTimeout(() => {
    document.querySelectorAll('.profile-card')[1].classList.add('selected');
}, 10);



