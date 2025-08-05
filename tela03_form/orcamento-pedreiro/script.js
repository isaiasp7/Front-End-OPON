document.addEventListener('DOMContentLoaded', function () {
    // === Referências de seções e botões ===
    const servicoRadios = document.querySelectorAll('input[name="servico"]');
    const secaoGeral = document.getElementById('secao-construcao-geral');
    const secaoParedes = document.getElementById('secao-paredes');
    const secaoPisos = document.getElementById('secao-pisos');

    // ✅ Função acessível globalmente dentro do DOMContentLoaded
    function atualizarSecao() {
        const tipo = document.querySelector('input[name="servico"]:checked')?.value;
        secaoGeral.classList.add('hidden');
        secaoParedes.classList.add('hidden');
        secaoPisos.classList.add('hidden');

        if (tipo === 'Construção em Geral') secaoGeral.classList.remove('hidden');
        else if (tipo === 'Paredes e Estruturas') secaoParedes.classList.remove('hidden');
        else if (tipo === 'Pisos e Revestimentos') secaoPisos.classList.remove('hidden');
    }

    servicoRadios.forEach(radio => radio.addEventListener('change', atualizarSecao));
    atualizarSecao();

    // === Campos "Outro" ===
    function configurarCamposOutro(checkboxId, inputId) {
        const checkbox = document.getElementById(checkboxId);
        const input = document.getElementById(inputId);
        checkbox?.addEventListener('change', function () {
            input.classList.toggle('show', this.checked);
            if (!this.checked) input.querySelector('input').value = '';
        });
    }

    function configurarRadioOutro(radioId, inputId) {
        const radio = document.getElementById(radioId);
        const input = document.getElementById(inputId);
        radio?.addEventListener('change', function () {
            input.classList.toggle('show', this.checked);
            if (!this.checked) input.querySelector('input').value = '';
        });
    }

    const camposOutro = [
        ['servico-outro', 'servico-outro-input'],
        ['local-outro', 'local-outro-input'],
        ['servico-paredes-outro', 'servico-paredes-outro-input'],
        ['servico-pisos-outro', 'servico-pisos-outro-input'],
        ['medida-outro', 'medida-outro-input'],
        ['tempo-outro', 'tempo-outro-input'],
        ['materiais-outro', 'materiais-outro-input'],
        ['medida-paredes-outro', 'medida-paredes-outro-input'],
        ['tempo-paredes-outro', 'tempo-paredes-outro-input'],
        ['piso-outro', 'piso-outro-input'],
        ['medida-pisos-outro', 'medida-pisos-outro-input'],
        ['materiais-pisos-outro', 'materiais-pisos-outro-input'],
        ['outro-servico-outro', 'outro-servico-outro-input'],
        ['tempo-pisos-outro', 'tempo-pisos-outro-input']
    ];

    camposOutro.forEach(([idCheck, idInput]) => {
        if (idCheck.startsWith('medida') || idCheck.startsWith('tempo') || idCheck.startsWith('piso') || idCheck.startsWith('materiais')) {
            configurarRadioOutro(idCheck, idInput);
        } else {
            configurarCamposOutro(idCheck, idInput);
        }
    });

    // === Máscaras ===
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 2) value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
        if (value.length > 10) value = `${value.substring(0, 10)}-${value.substring(10, 15)}`;
        e.target.value = value;
    });

    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 5) value = `${value.substring(0, 5)}-${value.substring(5, 8)}`;
        e.target.value = value;
    });

    // === Submissão do Formulário ===
    const form = document.getElementById('orcamentoForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        const requiredInputs = form.querySelectorAll('input[required], textarea[required]');
        requiredInputs.forEach(input => {
            const errorEl = document.getElementById(input.id + '-error');
            if (!input.value.trim()) {
                input.classList.add('error');
                if (errorEl) errorEl.style.display = 'block';
                isValid = false;
            } else {
                input.classList.remove('error');
                if (errorEl) errorEl.style.display = 'none';
            }
        });

        const email = document.getElementById('email');
        const telefone = document.getElementById('telefone');
        const cep = document.getElementById('cep');

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
            email.classList.add('error');
            document.getElementById('email-error').style.display = 'block';
            isValid = false;
        }

        if (!/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(telefone.value)) {
            telefone.classList.add('error');
            document.getElementById('telefone-error').style.display = 'block';
            isValid = false;
        }

        if (!/^\d{5}-\d{3}$/.test(cep.value)) {
            cep.classList.add('error');
            document.getElementById('cep-error').style.display = 'block';
            isValid = false;
        }

        if (!isValid) {
            form.querySelector('.error')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // === Montar JSON do Orçamento ===
        // Profissão fixa (ou você pode torná-la dinâmica se quiser)
        const tipoProfissional = "pedreiro";  // <- ou "pintor", etc.

        // Tipo de serviço selecionado
        const tipoServico = document.querySelector('input[name="servico"]:checked')?.value || 'não especificado';

        // Adiciona como a primeira pergunta
        const perguntas = [{
        tipo: tipoServico.toLowerCase().replace(/\s/g, '-')
        }];

        // Depois adicione as demais perguntas normalmente
        form.querySelectorAll('input, textarea').forEach(el => {
        if (el.type === 'submit') return;
        if ((el.type === 'radio' || el.type === 'checkbox') && !el.checked) return;

        const label = el.closest('.question')?.querySelector('.question-title')?.innerText || el.placeholder || el.name;

        perguntas.push({
            id: el.name,
            placeholder: label,
            resposta: el.value
        });
        });

        const jsonData = {
        tipo: tipoProfissional,
        perguntas: perguntas
        };

        // === Gerar e Baixar Arquivo JSON ===
        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `orcamento-${jsonData.tipo}.json`;
        link.click();

        // === Mensagem Final ===
        const novaAcao = confirm("Orçamento enviado com sucesso!\nDeseja FAZER UM NOVO ORÇAMENTO?\nClique em OK para novo ou Cancelar para ir ao INÍCIO.");
        if (novaAcao) {
            form.reset();
            atualizarSecao();
            document.querySelectorAll('.other-input').forEach(el => {
                el.classList.remove('show');
                el.querySelector('input').value = '';
            });
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});
