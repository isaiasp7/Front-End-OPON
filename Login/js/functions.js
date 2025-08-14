const formulario = document.getElementById('form')
const email = document.getElementById('email')
const senha = document.getElementById('senha')
// export const estadoUsuario = {conectado : false};

const URL_LOCAL = "http://localhost:8080";

formulario.addEventListener('submit', async (event) => {
    event.preventDefault();
    await validar();
})

async function validar() {

    if (email.value === "") {
        alert('Preencha o campo Email');
        email.focus();
        return false;
    } else if (senha.value === "") {
        alert('Preenca o campo Senha');
        senha.focus();
        return false;
    }

    usuarioSelecionado = document.querySelector('input[name="usuario"]:checked').value;

    if (usuarioSelecionado === 'cliente') {
        validarCliente();
    } else if (usuarioSelecionado === 'profissional') {
        validarProfissional();
    }

}

async function validarCliente() {

    try {
        const response = await fetch(`${URL_LOCAL}/cliente/validar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                senha: senha.value
            })
        })

        console.log({
            email: email.value,
            senha: senha.value
        })

        if (response.ok) {
            notificacao("Login realizado com sucesso!!", "#4CAF50");
            // estadoUsuario.conectado = true;
            sessionStorage.setItem('usuarioConectado', 'true');
            const data = await response.json()
            console.log(data)
            limpar()
            setTimeout(() => {
                sessionStorage.setItem("dadosCliente", JSON.stringify(data));//envia dados do cliente para a próxima tela
                window.location.href = '../../Cliente/tela02/index.html'
                setTimeout(() => notificacao.remove(), 500);
            }, 3000)
        } else {
            const errorData = await response.json();
            console.log('Erro: ', errorData.message);
            notificacao("Credenciais inválidas", "#DC3545")
        }

    } catch (error) {
        console.error('Erro ao fazer login', error)
        alert('Erro ao se conectar com o servidor')
    }

}

async function validarProfissional() {

    try {
        const response = await fetch(`${URL_LOCAL}/profissional/validar`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email.value,
                senha: senha.value
            })
        })

        console.log({
            email: email.value,
            senha: senha.value
        })

        if (response.ok) {
            notificacao("Login realizado com sucesso!!", "#4CAF50");
            const data = await response.json()
            console.log(data)
            limpar()
            setTimeout(() => {
                sessionStorage.setItem("dadosProfissional", JSON.stringify(data));//envia dados do profissional para a próxima tela
                window.location.href = '../../Servidor/tela02/index.html'
                setTimeout(() => notificacao.remove(), 500);
            }, 3000)
        } else {
            const errorData = await response.json();
            console.log('Erro: ', errorData.message);
            notificacao("Credenciais inválidas", "#DC3545")
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