
// Função para criar os elementos do formulário
function buildForm() {
    const form = document.getElementById('surveyForm');
    form.innerHTML = `
            <text-paragraph class="page-title">
                Vamos nos conhecer melhor
                <acacia-badge-form style="margin-left: 10px;">
                    <small>
                        leva só 10 minutinhos
                    </small>
                </acacia-badge-form>
            </text-paragraph>
    `; // Limpa caso já exista algo

    questions.forEach((q, idx) => {
        // Cria um fieldset para cada pergunta
        if (q.type === 'paragraph') {
            const par = document.createElement('text-paragraph');
            par.innerHTML = q.question;
            par.style.width = '100%';
            par.id = q.id;
            form.appendChild(par);
            form.appendChild(document.createElement('horizontal-divider'));
            return; // pula para a próxima pergunta, sem criar fieldset
        }
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = `${idx + 1}. ${q.question}`;
        fieldset.appendChild(legend);

        if (q.type == 'text') {
            const input = document.createElement('input');
            input.type = 'text';
            input.placeholder = 'Escreva sua resposta aqui...';
            input.classList.add('acacia-input');
            input.style.width = '100%';
            input.name = q.id;
            input.id = q.id;
            fieldset.appendChild(input);
        }
        else if (q.type == 'textarea') {
            const textarea = document.createElement('textarea');
            textarea.name = q.id;
            textarea.id = q.id;
            textarea.classList.add('acacia-input');
            textarea.style.width = '100%';
            textarea.placeholder = 'Escreva sua resposta aqui...';
            textarea.style.resize = 'vertical';
            textarea.rows = 3;
            textarea.cols = 50;
            fieldset.appendChild(textarea);
        }
        else if (q.type == 'rating') {
            const scale = q.scale || 5;
            for (let i = 1; i <= scale; i++) {
                const label = document.createElement('label');
                label.classList.add('acacia-radio');
                const radio = document.createElement('input');
                const span = document.createElement('span');
                span.classList.add('checkmark');
                radio.type = 'radio';
                radio.name = q.id;
                radio.value = i;
                const textLabel = document.createElement('text-label');
                textLabel.textContent = i;
                label.appendChild(textLabel);
                label.appendChild(radio);
                label.appendChild(span);
                fieldset.appendChild(label);
                fieldset.appendChild(document.createTextNode(' '));
            }
        }
        else if (q.type == 'radio' || q.type == 'checkbox') {
            const isCheckbox = (q.type == 'checkbox');
            q.options.forEach(opt => {
                const label = document.createElement('label');
                label.classList.add(isCheckbox ? 'acacia-checkbox' : 'acacia-radio');
                const input = document.createElement('input');
                const span = document.createElement('span');
                span.classList.add('checkmark');
                input.type = isCheckbox ? 'checkbox' : 'radio';
                input.name = q.id;
                input.value = opt;
                const textLabel = document.createElement('text-label');
                textLabel.textContent = opt;
                label.appendChild(textLabel);
                label.appendChild(input);
                label.appendChild(span);
                fieldset.appendChild(label);
                /////////////
            });
        }
        else {
            // fallback
            const msg = document.createTextNode(`Tipo não suportado: ${q.type}`);
            fieldset.appendChild(msg);
        }

        form.appendChild(fieldset);
        form.appendChild(document.createElement('horizontal-divider'));
    });
}

// Coleta respostas e exibe no console e na tela
function collectAnswers() {
    const answers = {};
    questions.forEach(q => {
        const inputs = document.getElementsByName(q.id);
        if (inputs.length == 0) return;

        if (q.type == 'checkbox') {
            // múltipla escolha
            const checked = Array.from(inputs).filter(inp => inp.checked).map(inp => inp.value);
            if (checked.length == 0) {
                alert(`Por favor, selecione pelo menos uma opção para: "${q.question}"`);
                throw new Error(`Campo obrigatório não preenchido: ${q.question}`);
            }
            answers[q.id] = checked;
        }
        else if (q.type == 'radio') {
            const selected = Array.from(inputs).find(inp => inp.checked);
            if (!selected) {
                alert(`Por favor, selecione uma opção para: "${q.question}"`);
                throw new Error(`Campo obrigatório não preenchido: ${q.question}`);
            }
            answers[q.id] = selected ? selected.value : null;
        }
        else if (q.type == 'text') {
            answers[q.id] = inputs[0].value;
            if (!answers[q.id] || answers[q.id].trim() === '') {
                alert(`Por favor, preencha o campo: "${q.question}"`);
                throw new Error(`Campo obrigatório não preenchido: ${q.question}`);
            }
        }
        else if (q.type == 'rating') {
            const selected = Array.from(inputs).find(inp => inp.checked);
            answers[q.id] = selected ? parseInt(selected.value, 10) : null;
        } else if (q.type == 'textarea') {
            answers[q.id] = inputs[0].value;
        }
    });
    return answers;
}

// Evento de submit
document.getElementById('submitBtn').addEventListener('click', async () => {
    const answers = collectAnswers();
    console.log(answers);
    await sendAnswers(answers);
    alert('Respostas coletadas! Obrigado por participar dessa pesquisa. 😊');
});

// Envio dos dados para localhost
async function sendAnswers(answers) {
    const url = 'https://www.jorgesouza.com.br/submit'; // Altere para o endpoint desejado
    console.log('Enviando respostas para:', url);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(answers),
        });
        if (response.ok) {
            alert('Respostas enviadas com sucesso!');
        } else {
            alert(`Erro ao enviar: ${response.status} - ${response.statusText}`);
        }
    } catch (error) {
        console.error('Falha na requisição:', error);
        alert('Não foi possível conectar ao servidor. Verifique se o localhost está rodando.');
    }
}

// Construir formulário ao carregar
window.addEventListener('DOMContentLoaded', buildForm);

// Function to generate sample answers for testing and fill the form with them (for development purposes)
function sampleAnswers() {
    const sampleAnswers = {
        "question-1": "João Silva",
        "question-2": "Prestadora de serviços",
        "question-3": "MEI",
        "question-4": "Redes sociais",
        "question-5": "Sim",
        "question-6": "Não",
        "question-7": [
            "Posts e reels",
            "Promoções",
            "Parcerias",
            "Gráfica"
        ],
        "question-8": "Tempo",
        "question-9": "Tempo",
        "question-10": "Tempo",
        "question-11": [
            "Deve auxiliar no controle financeiro",
            "Deve auxiliar no cadastro e gerenciamento de clientes",
            "Deve auxiliar na organização do meu tempo e tarefas",
            "Deve auxiliar no controle de vendas e faturamento"
        ],
        "question-12": 5,
        "question-13": 5,
        "question-14": [
            "✅ Simples",
            "🌟 Barata ou gratuita",
            "✨ Fácil de usar",
            "💎 Ter um plano de assinatura acordo com as minhas necessidades"
        ],
        "question-15": "Menos de 5 minutos",
        "question-16": "Sim",
        "question-17": "Não registro",
        "question-18": "Sim, com precisão",
        "question-19": "Sim",
        "question-20": "Menos de 10",
        "question-21": "Menos de 5",
        "question-22": "Sempre",
        "question-23": "Nada",
        "question-24": "Sim",
        "question-25": "Só eu",
        "question-26": "Sim",
        "question-27": "Sim",
        "question-28": "Sim",
        "question-29": "Financeiro/Contabilidade",
        "question-30": "Cliente demora em dar resposta",
        "question-31": [
            "Cliente demora em dar resposta",
            "Cliente pede orçamento e não responde",
            "Alta demanda"
        ],
        "question-32": "Desconto/promoção mal calculada",
        "question-33": "Perda de mercadoria (vencimento, quebra, furto, etc)",
        "question-34": "Perda de tempo",
        "question-35": "Até R$ 1.000,00 (Baixo)",
        "question-36": [
            "🌟 Teste gratuito",
            "👀 Ver funcionando",
            "💬 Atendimento humano"
        ],
        "question-37": "Seja simples e direta, sem muitas funcionalidades",
        "question-38": "Fluxo de caixa insuficiente mesmo com lucro alto",
        "question-39": "Equipe evoluindo com a empresa",
        "question-40": "O negócio me controla",
        "question-41": "Parcialmente",
        "question-42": "Preço do concorrente",
        "question-43": "Sim, é minha única forma de planejamento financeiro",
        "question-44": "Com certeza, é o que mais me ajudaria",
        "question-45": "Com certeza, são autônomos e seguem o protocolo operacional",
        "question-46": "Parcialmente padronizado",
        "question-47": "Logística",
        "question-48": "Raramente",
        "question-49": "Não",
        "question-50": "Compra de mercadoria errada ou exagerada",
        "question-51": "sdlfjlskdjflk sdfj skdj fjçsdjfjsdjf sdjflsdk fsdfweiuowe",
        "contact-email": "kaatancontos@gmail.com",
        "contact-phone": "77999030420",
        "contact-whatsapp": "77999030420",
        "contact-company-name": "Kaatan",
        "contact-industry": "dfsdfsdfsdf"
    };

    // Preenche o formulário com as respostas de exemplo
    for (const [key, value] of Object.entries(sampleAnswers)) {
        const inputs = document.getElementsByName(key);
        if (inputs.length === 0) continue;
        if (Array.isArray(value)) {
            value.forEach(v => {
                const input = Array.from(inputs).find(inp => inp.value === v);
                if (input) input.checked = true;
            });
        } else {
            const input = Array.from(inputs).find(inp => inp.value === value);
            if (input) input.checked = true;
        }
    }
    // Preenche campos de texto
    Object.keys(sampleAnswers).forEach(key => {
        const inputs = document.getElementsByName(key);
        if (inputs.length === 0) return;
        if (typeof sampleAnswers[key] === 'string') {
            inputs[0].value = sampleAnswers[key];
        }
    });
}
const a = sampleAnswers;

// EOF