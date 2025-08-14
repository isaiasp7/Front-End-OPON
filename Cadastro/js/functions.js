const usuario = document.getElementById('usuario')
const form = document.getElementById('form')
const nome = document.getElementById('nome')
const telefone = document.getElementById('telefone')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
const endereco = document.getElementById('endereco')
const especializacao = document.getElementById('especializacao')
const enviar = document.getElementById('enviar')

const URL_LOCAL = "http://localhost:8080";

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (nome.value === "") {
        alert('Preencha o campo Nome');
        nome.focus();
        return false;
    } else if (telefone.value === "") {
        alert('Preencha o campo Telefone');
        telefone.focus();
        return false;
    } else if (email.value === "") {
        alert('Preencha o campo Email');
        email.focus();
        return false;
    } else if (senha.value === "") {
        alert('Preencha o campo Senha');
        senha.focus();
        return false;
    } else if (endereco.value === "") {
        alert('Preencha o campo Endereco');
        endereco.focus();
        return false;
    }


    usuarioSelecionado = document.querySelector('input[name="usuario"]:checked').value;

    if (usuarioSelecionado === 'cliente') {
        cadastrarCliente();
    } else if (usuarioSelecionado === 'profissional') {
        cadastrarProfissional();
    }
})

async function cadastrarCliente() {

    try {
        const response = await fetch(`${URL_LOCAL}/cliente`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senha.value,
                telefone: telefone.value,
                endereco: endereco.value,
            })
        })

        console.log({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            telefone: telefone.value,
            endereco: endereco.value,
        })

        if (response.ok) {
            notificacao("Cadastro realizado com sucesso!!", "#4CAF50");
            const data = await response.json()
            console.log(data)
            limpar()
            setTimeout(() => {
                window.location.href = '../Login/html/index.html';
                setTimeout(() => notificacao.remove(), 500);
            }, 3000)
        } else {
            const errorData = await response.json();
            console.log('Erro: ', errorData.message);
            notificacao("Não foi possivel fazer o cadastro", "#DC3545")
        }

    } catch (error) {
        console.error('Erro ao fazer login', error)
        alert('Erro ao se conectar com o servidor')
    }

}

async function cadastrarProfissional() {

    try {
        const response = await fetch(`${URL_LOCAL}/profissional`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nome: nome.value,
                email: email.value,
                senha: senha.value,
                telefone: telefone.value,
                endereco: endereco.value,
                especializacao: especializacao.value
            })
        })

        console.log({
            nome: nome.value,
            email: email.value,
            senha: senha.value,
            telefone: telefone.value,
            endereco: endereco.value,
            especializacao: especializacao.value
        })

        if (response.ok) {
            notificacao("Cadastro realizado com sucesso!!", "#4CAF50");
            const data = await response.json()
            console.log(data)
            limpar()
            setTimeout(() => {
                window.location.href = '../Login/html/index.html';
                setTimeout(() => notificacao.remove(), 500);
            }, 3000)
        } else {
            const errorData = await response.json();
            console.log('Erro: ', errorData.message);
            notificacao("Não foi possivel fazer o cadastro", "#DC3545")
        }

    } catch (error) {
        console.error('Erro ao fazer login', error)
        alert('Erro ao se conectar com o servidor')
    }

}

function notificacao(texto, cor) {
    let notificacao = document.createElement("div");
    notificacao.classList.add("notificacao");
    notificacao.innerText = texto;
    notificacao.style.backgroundColor = cor;
    document.body.appendChild(notificacao);
    setTimeout(() => {
        notificacao.classList.add("fade-out");
        setTimeout(() => notificacao.remove(), 500);
    }, 3000);
}

function limpar() {
    email.value = "";
    senha.value = "";
}