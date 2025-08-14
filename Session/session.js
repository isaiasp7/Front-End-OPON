// Função principal para capturar e processar o objeto da sessão
function capturarObjetoSessao(chave) {
    try {
        // 1. Tentar recuperar o objeto da sessão
        const dadosSessao = sessionStorage.getItem(chave);
        
        if (!dadosSessao) {
            console.error(`Nenhum dado encontrado na sessão com a chave: ${chave}`);
            return null;
        }

        // 2. Converter de JSON para objeto JavaScript
        const objeto = JSON.parse(dadosSessao);
        
        // 3. Validar se é um objeto válido
        if (typeof objeto !== 'object' || objeto === null) {
            throw new Error('Dados da sessão não são um objeto válido');
        }

        console.log('Objeto capturado da sessão:', objeto);
        return objeto;

    } catch (error) {
        console.error('Erro ao processar objeto da sessão:', error);
        
        // Opcional: Limpar a sessão se os dados estiverem corrompidos
        sessionStorage.removeItem(chave);
        return null;
    }
}

// Exemplo de uso - como você mencionou
const objRecebido = capturarObjetoSessao("dadosProfissional");

if (objRecebido) {
    // Aqui você pode trabalhar com o objeto recebido
    console.log('Dados do profissional recebidos:', objRecebido);
    
    // Exemplo: exibir alguns dados na página
    document.getElementById('nome-profissional').textContent = objRecebido.nome || 'Não informado';
    document.getElementById('especialidade-profissional').textContent = objRecebido.especialidade || 'Não informada';
} else {
    console.warn('Nenhum dado profissional foi recebido');
    // Redirecionar ou mostrar mensagem de erro
    document.getElementById('aviso').textContent = 'Dados do profissional não encontrados';
}