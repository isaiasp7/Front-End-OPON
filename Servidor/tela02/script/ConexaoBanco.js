// Singleton para gerenciar requisições HTTP e WebSocket
export const ApiService = (function() {
    let instancia; // Armazena a única instância do singleton
    let socket = null; // Conexão WebSocket
    let callbacks = {}; // Objeto para armazenar callbacks por tipo de mensagem

    function criarInstancia() {
        return {
            /**
             * Requisição GET - Lê dados de uma URL
             * @param {string} url - Endpoint da API
             * @param {function} callback - Função para processar a resposta
             */
            get: function(url, callback) {
                fetch(url)
                    .then((res) => res.json())
                    .then((data) => callback(data))
                    .catch((err) => console.error("Erro no GET:", err));
            },

            /**
             * Requisição POST - Cria novo recurso
             * @param {string} url - Endpoint da API
             * @param {object} dados - Dados a serem enviados
             * @param {function} callback - Função para processar a resposta
             */
            post: function(url, dados, callback) {
                fetch(url, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dados),
                    })
                    .then((res) => res.json())
                    .then((data) => callback(data))
                    .catch((err) => console.error("Erro no POST:", err));
            },

            /**
             * Requisição PUT - Atualiza recurso existente
             * @param {string} url - Endpoint da API com ID do recurso
             * @param {object} dados - Dados completos para atualização
             * @param {function} callback - Função para processar a resposta
             */
            put: function(url, dados, callback) {
                fetch(url, {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dados),
                    })
                    .then((res) => res.json())
                    .then((data) => callback(data))
                    .catch((err) => console.error("Erro no PUT:", err));
            },

            /**
             * Requisição PATCH - Atualiza parte de um recurso
             * @param {string} url - Endpoint da API com ID do recurso
             * @param {object} dados - Dados parciais para atualização
             * @param {function} callback - Função para processar a resposta
             */
            patch: function(url, dados, callback) {
                fetch(url, {
                        method: "PATCH",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(dados),
                    })
                    .then((res) => res.json())
                    .then((data) => callback(data))
                    .catch((err) => console.error("Erro no PATCH:", err));
            },

            /**
             * Requisição DELETE - Remove recurso
             * @param {string} url - Endpoint da API com ID do recurso
             * @param {function} callback - Função para processar a resposta
             */
            delete: function(url, callback) {
                fetch(url, { method: "DELETE" })
                    .then((res) => {
                        if (res.ok) callback({ sucesso: true });
                        else callback({ sucesso: false });
                    })
                    .catch((err) => console.error("Erro no DELETE:", err));
            },

            /**
             * Conecta ao servidor WebSocket para receber atualizações em tempo real
             * @param {string} url - Endpoint do WebSocket (ex: ws://seuservidor/atualizacoes)
             */
            connectWebSocket: function(url) {
                // Fecha conexão existente se houver
                if (socket) socket.close();

                // Cria nova conexão WebSocket
                socket = new WebSocket(url);

                // Configura manipulador de mensagens
                socket.onmessage = function(event) {
                    const message = JSON.parse(event.data);

                    // Verifica se há callback registrado para este tipo de mensagem
                    if (callbacks[message.tipo]) {
                        callbacks[message.tipo](message.dados);
                    }
                };

                // Configura manipulador de erros
                socket.onerror = function(error) {
                    console.error("Erro no WebSocket:", error);
                };

                // Configura reconexão automática quando fechado
                socket.onclose = function() {
                    console.log("WebSocket desconectado. Tentando reconectar...");
                    setTimeout(() => this.connectWebSocket(url), 3000);
                };
            },

            /**
             * Registra um callback para um tipo específico de mensagem WebSocket
             * @param {string} tipo - Tipo da mensagem (ex: 'profissionais_update')
             * @param {function} callback - Função para processar a mensagem
             */
            onWebSocketMessage: function(tipo, callback) {
                callbacks[tipo] = callback;
            },

            /**
             * Envia mensagem através do WebSocket
             * @param {object} mensagem - Objeto a ser enviado
             */
            sendWebSocketMessage: function(mensagem) {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(JSON.stringify(mensagem));
                } else {
                    console.error("WebSocket não está conectado");
                }
            },

            /**
             * Fecha a conexão WebSocket
             */
            disconnectWebSocket: function() {
                if (socket) {
                    socket.close();
                    socket = null;
                }
                callbacks = {}; // Limpa todos os callbacks
            },
        };
    }

    return {
        /**
         * Obtém a instância singleton do ApiService
         * @returns {object} Instância do ApiService
         */
        getInstancia: function() {
            if (!instancia) {
                instancia = criarInstancia();
            }
            return instancia;
        },
    };
})();
/*💡 Como usar esse serviço genérico:
1. Obter a instância:

javascript

const api = ApiService.getInstancia();
2. Buscar todos os itens:

javascript

api.get("https://jsonplaceholder.typicode.com/posts", function (dados) {
    console.log("Dados recebidos:", dados);
});
3. Criar novo item:

javascript

const novoItem = { title: "Novo Post", body: "Conteúdo do post", userId: 1 };
api.post("https://jsonplaceholder.typicode.com/posts", novoItem, function (resposta) {
    console.log("Criado:", resposta);
});
4. Atualizar item inteiro:

javascript

const itemAtualizado = { id: 1, title: "Post Atualizado", body: "Novo conteúdo", userId: 1 };
api.put("https://jsonplaceholder.typicode.com/posts/1", itemAtualizado, function (resposta) {
    console.log("Atualizado com PUT:", resposta);
});
5. Atualizar apenas parte:

javascript

api.patch("https://jsonplaceholder.typicode.com/posts/1", { title: "Título Editado" }, function (resposta) {
    console.log("Atualizado com PATCH:", resposta);
});
6. Remover item:

javascript

api.delete("https://jsonplaceholder.typicode.com/posts/1", function (resposta) {
    console.log("Item removido com sucesso?", resposta.sucesso);
});



//========================================================================
ApiService.get( 
    'https://api.example.com/profissionais', // Substitua pelo URL real da API
  (profissionais) => {
    try {
      profissionais.forEach(p => {
        grid.appendChild(createCard(p));
      });
    } catch (e) {
      console.error("Erro ao criar os cards:", e);
    }
  },
  (erro) => {
    alert("Erro ao carregar profissionais: " + erro.message);
  }
);
//========================================================================*/