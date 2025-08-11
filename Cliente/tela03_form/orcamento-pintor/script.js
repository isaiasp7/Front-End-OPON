const objJSON = JSON.parse(sessionStorage.getItem("dadosProfissional"));
function EnvioFormNomeUpdate(params) {//atualiza o campo de envio "SErvidor : {nome}"
    document.getElementById('nomeServidor').textContent = objJSON.nome;

}
document.addEventListener('DOMContentLoaded', function () {
    const propertyTypeRadios = document.querySelectorAll('input[name="propertyType"]');
    const externalSection = document.getElementById('externalSection');
    const internalSection = document.getElementById('internalSection');

    propertyTypeRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            if (this.value === 'Externo') {
                externalSection.classList.remove('hidden');
                internalSection.classList.add('hidden');
            } else if (this.value === 'Interno') {
                externalSection.classList.add('hidden');
                internalSection.classList.remove('hidden');
            }
        });
    });

    function setupOtherInputs(radioName, inputId) {
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);
        const otherInput = document.getElementById(inputId);
        radios.forEach(radio => {
            radio.addEventListener('change', function () {
                otherInput.classList.toggle('show', this.value === 'Outro' && this.checked);
            });
        });
    }

    function setupOtherCheckboxes(checkboxId, inputId) {
        const checkbox = document.getElementById(checkboxId);
        const otherInput = document.getElementById(inputId);
        checkbox.addEventListener('change', function () {
            otherInput.classList.toggle('show', this.checked);
        });
    }

    // Campos "Outro"
    setupOtherInputs('externalPropertyType', 'externalOtherInput');
    setupOtherInputs('externalSurfaceCondition', 'externalConditionOtherInput');
    setupOtherInputs('externalAccess', 'externalAccessOtherInput');
    setupOtherInputs('externalTiming', 'externalTimingOtherInput');
    setupOtherInputs('internalPropertyType', 'internalOtherInput');
    setupOtherInputs('internalSurfaceCondition', 'internalConditionOtherInput');
    setupOtherInputs('internalTiming', 'internalTimingOtherInput');
    setupOtherInputs('roomsToPaint', 'roomsOtherInput');
    setupOtherInputs('furniture', 'furnitureOtherInput');

    setupOtherCheckboxes('externalSurfacesOther', 'externalSurfacesOtherInput');
    setupOtherCheckboxes('internalSurfacesOther', 'internalSurfacesOtherInput');
    setupOtherCheckboxes('internalPaintTypeOther', 'internalPaintTypeOtherInput');

    const form = document.getElementById('paintingForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        let isValid = true;
        const selectedPropertyType = form.querySelector('input[name="propertyType"]:checked')?.value;

        if (!selectedPropertyType) {
            alert("Por favor, selecione se o serviço é Externo ou Interno.");
            return;
        }

        // === Validação apenas da seção relevante ===
        const visibleSection = selectedPropertyType === 'Externo' ? externalSection : internalSection;
        const allVisibleFields = visibleSection.querySelectorAll('input, select, textarea');

        allVisibleFields.forEach(input => {
            const type = input.type;
            const tag = input.tagName.toLowerCase();
            const question = input.closest('.question');

            const isRadioGroup = type === 'radio';
            const isCheckboxGroup = type === 'checkbox';
            const isTextInput = ['text', 'email', 'tel', 'number'].includes(type) || tag === 'textarea' || tag === 'select';

            if (isTextInput && input.offsetParent !== null) {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#d23f3';
                } else {
                    input.style.borderColor = '#dadce0';
                }
            }

            if ((isRadioGroup || isCheckboxGroup) && question) {
                const inputs = question.querySelectorAll(`input[name="${input.name}"]`);
                const checked = Array.from(inputs).some(i => i.checked);
                const label = question.querySelector('.question-title');
                if (!checked) {
                    isValid = false;
                    if (label) label.style.color = '#d23f3';
                } else {
                    if (label) label.style.color = '#202124';
                }
            }
        });

        if (!isValid) {
            alert('Por favor, preencha todos os campos obrigatórios da seção selecionada.');
            return;
        }

        // Coletar os dados do formulário
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        });

        const perguntas = [];

        Object.keys(data).forEach(key => {
            const input = form.querySelector(`[name="${key}"]`);
            let pergunta = '';

            if (input) {
                const questionDiv = input.closest('.question');
                const title = questionDiv ? questionDiv.querySelector('.question-title') : null;
                pergunta = title ? title.textContent.trim() : '';
            }

            perguntas.push({
                id: key,
                placeholder: pergunta,
                resposta: data[key]
            });
        });

        const jsonOutput = {
            tipo: 'pintor',
            perguntas: perguntas
        };

        const blob = new Blob([JSON.stringify(jsonOutput, null, 2)], { type: 'application/json' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'orcamento-pintor.json';
        link.click();

        const option = confirm("Orçamento enviado com sucesso!\n\nDeseja FAZER UM NOVO ORÇAMENTO?");
        if (option) {
            form.reset();
            externalSection.classList.add('hidden');
            internalSection.classList.add('hidden');
            document.querySelectorAll('.other-input').forEach(input => input.classList.remove('show'));
        } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
});

EnvioFormNomeUpdate();