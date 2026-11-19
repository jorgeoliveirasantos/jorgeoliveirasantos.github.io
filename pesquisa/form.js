// Dados do questionário (extraídos do JSON final)
const questions = [
    {
        "id": "paragraph-1",
        "question": "Olá! Obrigado por participar da pesquisa, suas respostas são muito importantes para nós. Vamos começar?",
        "type": "paragraph",
    },
    {
        "id": "question-1",
        "question": "Digite seu nome completo:",
        "type": "text"
    },
    {
        "id": "question-2",
        "question": "Sua empresa é:",
        "type": "radio",
        "options": [
            "Varejista",
            "Atacadista",
            "Indústria",
            "Prestadora de serviços",
            "Outro"
        ]
    },
    {
        "id": "question-3",
        "question": "Sua empresa é:",
        "type": "radio",
        "options": [
            "MEI",
            "ME",
            "EPP",
            "Outro"
        ]
    },
    {
        "id": "question-4",
        "question": "De onde você acredita que vêm a maioria dos seus clientes?",
        "type": "radio",
        "options": [
            "Redes sociais",
            "Indicação",
            "Visita presencial",
            "Anúncios em veículos de comunicação",
            "Outros"
        ]
    },
    {
        "id": "question-5",
        "question": "Você acredita ter potencial para mais clientes?",
        "type": "radio",
        "options": [
            "Sim",
            "Não"
        ]
    },
    {
        "id": "question-6",
        "question": "Sua empresa tem equipe de marketing ou social media?",
        "type": "radio",
        "options": [
            "Não",
            "Sim"
        ]
    },
    {
        "id": "question-7",
        "question": "Usa alguma estratégia de marketing?",
        "type": "checkbox",
        "multiple": true,
        "options": [
            "Posts e reels",
            "Promoções",
            "Parcerias",
            "Anúncios pagos na internet",
            "Anúncios em veículos de comunicação",
            "Gráfica",
            "Outros"
        ]
    },
    {
        "id": "question-8",
        "question": "Qual sua MAIOR dificuldade hoje:",
        "type": "radio",
        "options": [
            "Tempo",
            "Concorrência",
            "Lucro",
            "Clientes/vendas",
            "Espaço no mercado"
        ]
    },
    {
        "id": "question-9",
        "question": "Qual sua SEGUNDA maior dificuldade hoje:",
        "type": "radio",
        "options": [
            "Tempo",
            "Concorrência",
            "Lucro",
            "Clientes/vendas",
            "Espaço no mercado"
        ]
    },
    {
        "id": "question-10",
        "question": "Qual sua TERCEIRA maior dificuldade hoje:",
        "type": "radio",
        "options": [
            "Tempo",
            "Concorrência",
            "Lucro",
            "Clientes/vendas",
            "Espaço no mercado"
        ]
    },
    {
        "id": "question-11",
        "question": "Uma ferramenta tecnológica para você é algo que:",
        "type": "checkbox",
        "options": [
            "Deve auxiliar no controle financeiro",
            "Deve auxiliar no cadastro e gerenciamento de clientes",
            "Deve auxiliar na organização do meu tempo e tarefas",
            "Deve auxiliar no gerenciamento da minha equipe",
            "Deve auxiliar na organização do meu estoque e fornecedores",
            "Deve auxiliar no controle de vendas e faturamento",
            "Deve auxiliar no controle da operação diária",
            "Deve auxiliar na organização geral do meu negócio",
            "Não preciso de ferramenta tecnológica"
        ]
    },
    {
        "id": "question-12",
        "question": "De 1 a 5 qual sua familiaridade com ferramentas tecnológicas?",
        "type": "rating",
        "scale": 5
    },
    {
        "id": "question-13",
        "question": "De 1 a 5 qual sua familiaridade com ferramentas não tecnológicas?",
        "type": "rating",
        "scale": 5
    },
    {
        "id": "question-14",
        "question": "Uma ferramenta para você deve ser:",
        "type": "checkbox",
        "multiple": true,
        "options": [
            "✅ Simples",
            "🌟 Barata ou gratuita",
            "✨ Fácil de usar",
            "💪 Organizar meu tempo e minha vida",
            "🛡️ Me dar segurança e tranquilidade",
            "💎 Ter um plano de assinatura acordo com as minhas necessidades",
            "📈 Organizar minhas finanças",
            "💰 Me dar lucro"
        ]
    },
    {
        "id": "question-15",
        "question": "Quanto tempo, em média, você demora para responder um cliente novo?",
        "type": "radio",
        "options": [
            "Menos de 5 minutos",
            "5 a 30 minutos",
            "30 minutos a 2 horas",
            "Mais de 2 horas"
        ]
    },
    {
        "id": "question-16",
        "question": "Você já perdeu cliente por demora no atendimento?",
        "type": "radio",
        "options": [
            "Sim",
            "Não",
            "Não sei dizer"
        ]
    },
    {
        "id": "question-17",
        "question": "Hoje, onde ficam registrados seus clientes?",
        "type": "radio",
        "options": [
            "Não registro",
            "Caderno",
            "Planilha (Excel, Google Sheets, etc)",
            "Whatsapp",
            "Sistema virtual"
        ]
    },
    {
        "id": "question-18",
        "question": "Você consegue saber quantos atendimentos viraram venda no último mês?",
        "type": "radio",
        "options": [
            "Sim, com precisão",
            "Mais ou menos",
            "Não"
        ]
    },
    {
        "id": "question-19",
        "question": "Você sabe qual é o seu ticket médio?",
        "type": "radio",
        "options": [
            "Sim",
            "Não"
        ]
    },
    {
        "id": "question-20",
        "question": "Você tem uma média de quantos clientes atendidos por mês?",
        "type": "radio",
        "options": [
            "Menos de 10",
            "10 a 50",
            "50 a 200",
            "Mais de 200"
        ]
    },
    {
        "id": "question-21",
        "question": "Você tem uma média de quantos desses clientes são fixos ou recorrentes?",
        "type": "radio",
        "options": [
            "Menos de 5",
            "5 a 20",
            "20 a 100",
            "Mais de 100"
        ]
    },
    {
        "id": "question-22",
        "question": "Você faz acompanhamento com clientes que não fecharam?",
        "type": "radio",
        "options": [
            "Sempre",
            "Às vezes",
            "Nunca"
        ]
    },
    {
        "id": "question-23",
        "question": "O que acontece quando um cliente pede orçamento e não responde depois?",
        "type": "radio",
        "options": [
            "Nada",
            "Tento contato pessoalmente",
            "Tenho processo definido",
            "Outro"
        ]
    },
    {
        "id": "question-24",
        "question": "Você já perdeu informações importantes de clientes?",
        "type": "radio",
        "options": [
            "Sim",
            "Não"
        ]
    },
    {
        "id": "question-25",
        "question": "Quantas pessoas atendem clientes no seu negócio?",
        "type": "radio",
        "options": [
            "Só eu",
            "2 a 3 pessoas",
            "4 a 5 pessoas",
            "Mais de 5 pessoas"
        ]
    },
    {
        "id": "question-26",
        "question": "O atendimento depende de uma pessoa específica para funcionar bem?",
        "type": "radio",
        "options": [
            "Sim",
            "Não"
        ]
    },
    {
        "id": "question-27",
        "question": "Você sente que sua empresa é organizada hoje?",
        "type": "radio",
        "options": [
            "Sim",
            "Não",
            "Mais ou menos"
        ]
    },
    {
        "id": "question-28",
        "question": "Se você tivesse 50% mais clientes amanhã, conseguiria atender bem?",
        "type": "radio",
        "options": [
            "Sim",
            "Não",
            "Talvez"
        ]
    },
    {
        "id": "question-29",
        "question": "O que mais toma seu tempo hoje no trabalho?",
        "type": "radio",
        "options": [
            "Financeiro/Contabilidade",
            "Atendimento ao cliente",
            "Liderança e gestão de equipe",
            "Logística e estoque",
            "Operacional"
        ]
    },
    {
        "id": "question-30",
        "question": "Qual dessas situações acontece com maior frequência?",
        "type": "radio",
        "options": [
            "Cliente demora em dar resposta",
            "Cliente pede orçamento e não responde",
            "Equipe esquece de responder",
            "Perda de pedidos por falta de organização",
            "Alta demanda",
            "Falta de recursos",
            "Nenhuma dessas"
        ]
    },
    {
        "id": "question-31",
        "question": "Qual desses problemas você já tentou resolver?",
        "type": "checkbox",
        "multiple": true,
        "options": [
            "Cliente demora em dar resposta",
            "Cliente pede orçamento e não responde",
            "Equipe esquece de responder",
            "Perda de pedidos por falta de organização",
            "Alta demanda",
            "Falta de recursos",
            "Nenhuma dessas"
        ]
    },
    {
        "id": "question-32",
        "question": "Qual a PRINCIPAL fonte de desperdício que causa perdas financeiras em sua empresa?",
        "type": "radio",
        "options": [
            "Desconto/promoção mal calculada",
            "Perda de mercadoria (vencimento, quebra, furto, etc)",
            "Perda de tempo",
            "Erros operacionais",
            "Planejamento tributário (impostos mal calculados)",
            "Outro"
        ]
    },
    {
        "id": "question-33",
        "question": "Qual a SEGUNDA maior fonte de desperdício que causa perdas financeiras em sua empresa?",
        "type": "radio",
        "options": [
            "Desconto/promoção mal calculada",
            "Perda de mercadoria (vencimento, quebra, furto, etc)",
            "Perda de tempo",
            "Erros operacionais",
            "Planejamento tributário (impostos mal calculados)",
            "Outro"
        ]
    },
    {
        "id": "question-34",
        "question": "Qual a TERCEIRA maior fonte de desperdício que causa perdas financeiras em sua empresa?",
        "type": "radio",
        "options": [
            "Desconto/promoção mal calculada",
            "Perda de mercadoria (vencimento, quebra, furto, etc)",
            "Perda de tempo",
            "Erros operacionais",
            "Planejamento tributário (impostos mal calculados)",
            "Outro"
        ]
    },
    {
        "id": "question-35",
        "question": "Qual a faixa de perda por desperdícios em sua empresa?",
        "type": "radio",
        "options": [
            "Até R$ 1.000,00 (Baixo)",
            "De R$ 1.000,00 a R$ 5.000,00 (Leve)",
            "De R$ 5.000,00 a R$ 10.000,00 (Moderado)",
            "De R$ 10.000,00 a R$ 30.000,00 (Alto)",
            "Acima de R$ 30.000,00 (Crítico)"
        ]
    },
    {
        "id": "question-36",
        "question": "O que te faria confiar em uma solução nova?",
        "type": "checkbox",
        "multiple": true,
        "options": [
            "👥 Indicação",
            "🌟 Teste gratuito",
            "👀 Ver funcionando",
            "📈 Garantia de resultado",
            "💬 Atendimento humano"
        ]
    },
    {
        "id": "question-37",
        "question": "Você prefere uma solução de gerenciamento que:",
        "type": "radio",
        "options": [
            "Funcione sozinha (automática)",
            "Tenha suporte humano para me ajudar a usar",
            "Seja simples e direta, sem muitas funcionalidades",
            "Precise de configuração mas seja mais completa, com todas as funcionalidades que preciso",
            "Tenha aplicativo móvel"
        ]
    },
    {
        "id": "question-38",
        "question": "Se você pudesse resolver UMA coisa no seu negócio hoje, qual seria?",
        "type": "radio",
        "options": [
            "Poucas vendas",
            "Poucos clientes",
            "Margem de lucro baixa",
            "Fluxo de caixa insuficiente mesmo com lucro alto",
            "Posicionamento ruim no mercado",
            "Alta concorrência"
        ]
    },
    {
        "id": "question-39",
        "question": "O que mais te dá satisfação hoje no seu negócio:",
        "type": "radio",
        "options": [
            "Faturamento",
            "Autonomia e tempo livre",
            "Equipe evoluindo com a empresa",
            "Clientes satisfeitos",
            "Metas alncançadas",
            "Outro"
        ]
    },
    {
        "id": "question-40",
        "question": "Você sente que controla o negócio ou o negócio te controla?",
        "type": "radio",
        "options": [
            "Eu controlo o negócio",
            "O negócio me controla",
            "É equilibrado"
        ]
    },
    {
        "id": "question-41",
        "question": "Você confia nos números do seu negócio?",
        "type": "radio",
        "options": [
            "Sim",
            "Parcialmente",
            "Não"
        ]
    },
    {
        "id": "question-42",
        "question": "Como você decide preços hoje?",
        "type": "radio",
        "options": [
            "Custo + margem",
            "Preço do concorrente",
            "O que o cliente aceita pagar",
            "De acordo com a demanda",
            "Baseado em experiência e intuição",
            "Outro"
        ]
    },
    {
        "id": "question-43",
        "question": "Você tem um caderno cheio de contas matemáticas que é a joia da coroa da sua empresa?",
        "type": "radio",
        "options": [
            "Sim, é minha única forma de planejamento financeiro",
            "Sim, mas uso outras formas de planejamento financeiro",
            "Não, uso outras formas de planejamento financeiro"
        ]
    },
    {
        "id": "question-44",
        "question": "Trocar esse caderno por uma ferramenta automatizada é importante?",
        "type": "radio",
        "options": [
            "Com certeza, é o que mais me ajudaria",
            "Seria interessante, mas não é prioridade",
            "Não",
            "Não uso caderno"
        ]
    },
    {
        "id": "question-45",
        "question": "Sua equipe sabe exatamente o que fazer sem você?",
        "type": "radio",
        "options": [
            "Com certeza, são autônomos e seguem o protocolo operacional",
            "Não sei dizer, às vezes sim, às vezes não",
            "Não, tudo depende de mim, sou o único que detém controle operacional",
            "Em parte",
            "Não tenho equipe"
        ]
    },
    {
        "id": "question-46",
        "question": "Você tem processos definidos?",
        "type": "radio",
        "options": [
            "Tudo padronizado",
            "Parcialmente padronizado",
            "Planejo cada dia"
        ]
    },
    {
        "id": "question-47",
        "question": "O que mais te estressa na operação diária?",
        "type": "radio",
        "options": [
            "Clientes",
            "Equipe",
            "Fornecedores",
            "Logística",
            "Despesas",
            "Estoque",
            "Problemas generalizados (operação caótica)",
            "Nada me estressa na operação diária",
            "Outro"
        ]
    },
    {
        "id": "question-48",
        "question": "Com que frequência acontecem erros (pedido errado, atraso, retrabalho)?",
        "type": "radio",
        "options": [
            "Nunca",
            "Raramente",
            "Às vezes",
            "Frequentemente",
            "Quase sempre"
        ]
    },
    {
        "id": "question-49",
        "question": "Existe alguma tarefa que depende só de você e ninguém mais consegue fazer?",
        "type": "radio",
        "options": [
            "Sim",
            "Não",
            "Não tenho equipe"
        ]
    },
    {
        "id": "question-50",
        "question": "Você já tomou alguma decisão que depois percebeu que deu prejuízo? Qual?",
        "type": "radio",
        "options": [
            "Contratação",
            "Compra de mercadoria errada ou exagerada",
            "Desconto/promoção mal calculada",
            "Parceria/sociedade",
            "Investimento",
            "Crédito",
            "Outro"
        ]
    },
    {
        "id": "paragraph-2",
        "question": "<strong>Muito obrigado por participar da pesquisa! </strong> 💜❤️🩵 <br>Utilize o campo de texto a seguir para deixar algum comentário, anotações, dúvida ou sugestão que queira compartilhar:",
        "type": "paragraph"
    },
    {
        "id": "question-51",
        "question": "Anotações:",
        "type": "textarea"
    },
    {
        "id": "paragraph-3",
        "question": "🎁🎁🎁 Como retribuição por sua ajuda queremos te dar um presente especial! Que tal experimentar uma nova ferramenta por um período de 90 dias gratuitamente e ainda receber um mega desconto no preço de forma vitalícia? <br>Deixe seus dados aqui para entrar para a lista de espera:",
        "type": "paragraph"
    },
    {
        "id": "contact-email",
        "question": "E-mail (para contato e acesso à ferramenta gratuita):",
        "type": "text"
    },
    {
        "id": "contact-phone",
        "question": "Telefone fixo:",
        "type": "text"
    },
    {
        "id": "contact-whatsapp",
        "question": "Whatsapp:",
        "type": "text"
    },
    {
        "id": "contact-company-name",
        "question": "Nome da sua empresa:",
        "type": "text"
    },
    {
        "id": "contact-industry",
        "question": "Ramo de atuação:",
        "type": "text"
    },
    {
        "id": "paragraph-4",
        "question": "<i>Não dispararemos lista de e-mail nem campanhas de marketing no e-mail ou números de telefone/whatsapp informados.</i>",
        "type": "paragraph"
    },
    {
        "id": "paragraph-5",
        "question": "<i>Você pode excluir essas informações, com um único clique.</i>",
        "type": "paragraph"
    },
    {
        "id": "paragraph-6",
        "question": "<i>Os dados informados ou respostas da pesquisa não serão compartilhados com ninguém.</i>",
        "type": "paragraph"
    },
    {
        "id": "paragraph-7",
        "question": "<i>As respostas a essa pesquisa são anônimas e não ficam vinculadas ao seu nome ou aos dados pessoais e comerciais informados.</i>",
        "type": "paragraph"
    },
    {
        "id": "paragraph-8",
        "question": "<strong>Muito obrigado por sua ajuda! 🙏</strong>",
        "type": "paragraph"
    },
];
