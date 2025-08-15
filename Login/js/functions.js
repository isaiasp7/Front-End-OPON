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
            try {
                notificacao("Login realizado com sucesso!", "#4CAF50");
                
                // Armazena o estado básico de login
                sessionStorage.setItem('usuarioConectado', 'true');
                
                const data = await response.json();
                console.log('Dados da resposta:', data);
                
                limpar(); // Limpa o formulário
                
                // Armazena todos os dados do usuário antes do redirecionamento
                sessionStorage.setItem("usuarioData", JSON.stringify(data));
                
                setTimeout(() => {
                    
                    window.location.href = '../../Cliente/tela01 - cliente/index.html';
                }, 2500); // Reduzido para 2.5s para melhor UX
                
            } catch (error) {
                console.error('Erro ao processar login:', error);
                notificacao("Erro ao processar seu login", "#DC3545");
            }
        }else {
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
    try {
        notificacao("Login realizado com sucesso!", "#4CAF50");
        
        // Armazena o status de login e os dados do profissional
        sessionStorage.setItem('usuarioConectado', 'true');
        const data = await response.json();
        console.log('Dados do profissional:', data);
        
        limpar(); // Limpa o formulário de login
        
        // Prepara os dados para a próxima tela
        sessionStorage.setItem("dadosProfissional", JSON.stringify(data));
        
        // Configura o redirecionamento
        setTimeout(() => {
            
            window.location.href = '../../Servidor/tela01 - profissional/index.html';
        }, 2500); // 2.5 segundos para melhor UX
        
    } catch (error) {
        console.error('Erro no login do profissional:', error);
        notificacao("Erro ao processar login", "#DC3545");
        // Opcional: Limpar o sessionStorage em caso de erro
        sessionStorage.removeItem('usuarioConectado');
        sessionStorage.removeItem('dadosProfissional');
    }
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