document.addEventListener("DOMContentLoaded", function () {
    // 1. CONFIGURAÇÕES E CHAVE
    const GROQ_API_KEY = "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"; 
    let historicoConversa = []; 
    const promptSistema = `Você é o Assistente Virtual da Integra+, uma empresa especializada em acessibilidade corporativa.



A Integra+ ajuda empresas a implementarem acessibilidade em seus produtos, serviços e ambientes por meio de consultorias e orientação estratégica, promovendo inclusão, conformidade com normas e melhor experiência para todos.



MISSÃO:

Tornar empresas mais inclusivas, seguras e alinhadas às normas, melhorando a experiência de clientes e colaboradores.



VISÃO:

Fazer com que a acessibilidade seja vista como valor essencial, e não apenas obrigação.



VALORES:

Acessibilidade, Inclusão, Empatia, Respeito, Diversidade e Inovação.



ODS:

Atuamos alinhados aos ODS:

- ODS 9: inovação e acessibilidade

- ODS 10: redução das desigualdades

- ODS 17: parcerias para impacto social



---



REGRAS:

- Responda sempre em português

- Seja claro, direto e didático

- Evite respostas longas

- Não invente informações

- Não diga que a Integra+ desenvolve tecnologia assistiva

- Não forneça aconselhamento jurídico

- Se não souber algo, informe que não possui essa informação



---



COMPORTAMENTO:

- Explique de forma simples

- Conecte acessibilidade com impacto social e valor de negócio

- Relacione com ODS quando fizer sentido

- Destaque organização e clareza ao explicar processos

- Sugira de forma leve a consultoria da Integra+



---



BASE DE CONHECIMENTO:



CENÁRIO (Brasil 2025):

- Baixa adoção de acessibilidade em empresas

- Crescente valorização do tema

- Pouca fiscalização no setor privado

- Acessibilidade como diferencial competitivo



LEGISLAÇÃO:

- Lei Brasileira de Inclusão

- Decreto 5.296/2004

- LGPD

- Obrigatória principalmente no setor público e recomendada no privado



WCAG:

- Diretrizes internacionais baseadas em:

  Perceptível, Operável, Compreensível e Robusto



NBR 9050:

- Norma para acessibilidade em espaços físicos



---



SERVIÇOS:



Plano Gratuito:

- Diagnóstico inicial

- Identificação de melhorias



Diagnóstico Completo (R$ 297+):

- Auditoria

- Relatório detalhado

- Plano de ação



Plano de Adequação (R$ 1.200+):

- Correções

- Treinamento

- Suporte

- Adequação às normas



Monitoramento Contínuo (R$ 200/mês):

- Acompanhamento contínuo

- Relatórios mensais

- Atualizações e suporte



Serviço Individual:

- Consultoria personalizada sob demanda



---



PROCESSO:



1. Diagnóstico (2 a 5 dias)

- Identificação de barreiras



2. Plano de Ação (até 7 dias)

- Roadmap personalizado



3. Implementação

- Acompanhamento e resultados em até 6 meses



---



METODOLOGIA:

- Avaliação inicial

- Diagnóstico detalhado

- Treinamento da equipe

- Implementação e acompanhamento



---



AGENDAMENTO:

- Presencial ou online



---



TIPOS DE PERGUNTA:

- Institucionais

- Jurídicas

- Técnicas

- Negócio

- Objeções



Adapte sempre a resposta ao contexto.



---



EXEMPLOS:



Pergunta: O que é a Integra+?

Resposta: A Integra+ ajuda empresas a implementarem acessibilidade por meio de consultoria e estratégia, promovendo inclusão e melhor experiência para os usuários.



Pergunta: Por que acessibilidade é importante?

Resposta: Permite que mais pessoas utilizem serviços com autonomia, além de melhorar a experiência do cliente e ampliar o alcance das empresas.



Pergunta: Vocês têm plano gratuito?

Resposta: Sim, oferecemos um diagnóstico inicial gratuito para identificar melhorias na acessibilidade.



Pergunta: Como funciona o processo?

Resposta: Primeiro realizamos um diagnóstico, depois criamos um plano de ação e, por fim, acompanhamos a implementação das melhorias.



Pergunta do usuário:`; // Mantenha seu prompt completo aqui

    // 2. CRIAÇÃO DO HTML (Apenas uma vez!)
    const chatbotContainer = document.createElement("div");
    chatbotContainer.innerHTML = `
    <aside class="container_chatbot">
        <div class="chat_janela" id="chatJanela" style="display: none;">
            <div class="chat_header">
                <img src="img/Ícone de chatbot amistoso e moderno.png" class="foto_atendente">
                <button class="btn_fechar" id="btnFecharChat">×</button>
            </div>
            <div class="chat_body" id="chat-messages"></div>
            <div class="chat_footer">
                <div class="input_container">
                    <input type="text" id="user-input" placeholder="Escreva aqui...">
                    <button class="btn_enviar" id="btnEnviarMsg">
                        <img src="img/Vector (8).svg">
                    </button>
                </div>
            </div>
        </div>
        <div class="chat_icone_flutuante" id="btnAbrirChat">
            <img src="img/Chat_bot_icone.svg">
        </div>
    </aside>`;
    document.body.appendChild(chatbotContainer);

    // 3. MAPEAMENTO DE ELEMENTOS
    const abrirChat = document.getElementById('btnAbrirChat');
    const fecharChat = document.getElementById('btnFecharChat');
    const janelaChat = document.getElementById('chatJanela');
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const btnEnviar = document.getElementById("btnEnviarMsg");

    // 4. FUNÇÃO DE ADICIONAR MENSAGEM
    function adicionarMensagem(mensagem, tipo) {
        if (!chatMessages) return;
        const div = document.createElement("div");
        div.classList.add("message", tipo);
        div.innerHTML = mensagem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
        chatMessages.appendChild(div);
        
        // Garante que o scroll acompanhe a mensagem
        window.requestAnimationFrame(() => {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        });
        return div;
    }

    // 5. FUNÇÃO DE ENVIAR PARA API (GROQ)
    async function enviarMensagem() {
        const userMessage = userInput.value.trim();
        if (userMessage === "") return;

        adicionarMensagem(userMessage, "user");
        userInput.value = "";

        const msgBotAguardando = adicionarMensagem('<div class="typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>', "bot");

        try {
            const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + GROQ_API_KEY 
                },
                body: JSON.stringify({
                    model: "llama-3.3-70b-versatile",
                    messages: [{ role: "system", content: promptSistema }, ...historicoConversa, { role: "user", content: userMessage }],
                    temperature: 0.7
                })
            });

            const data = await response.json();
            if (response.ok && data.choices) {
                const respostaTexto = data.choices[0].message.content;
                msgBotAguardando.innerHTML = respostaTexto.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br>');
                historicoConversa.push({ role: "user", content: userMessage }, { role: "assistant", content: respostaTexto });
                if (historicoConversa.length > 10) historicoConversa.shift();
            }
        } catch (error) {
            msgBotAguardando.innerText = "Erro ao conectar com o assistente.";
        }
    }

    // 6. EVENTOS DE CLIQUE E TECLADO
    abrirChat.addEventListener('click', () => {
        janelaChat.style.display = 'flex'; 
        abrirChat.style.display = 'none';
        if (chatMessages.children.length === 0) {
            setTimeout(() => {
                adicionarMensagem("Olá! Bem-vindo à **Integra+**. Como posso ajudar sua empresa hoje?");
            }, 500);
        }
    });

    fecharChat.addEventListener('click', () => {
        janelaChat.style.display = 'none';
        abrirChat.style.display = 'block';
    });

    btnEnviar.addEventListener("click", enviarMensagem);

    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            enviarMensagem();
        }
    });
});