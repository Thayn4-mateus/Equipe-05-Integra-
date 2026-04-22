const questions = [
  {
    category: "ACESSIBILIDADE FÍSICA",
    text: "Sua empresa possui rampa de acesso ou elevador para pessoas com mobilidade reduzida?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Sim",
        sub: "Temos rampa e/ou elevador adequados",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Parcialmente",
        sub: "Existe algum recurso, mas incompleto",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Não",
        sub: "Não existe nenhum tipo de adaptação",
        score: 0,
      },
    ],
  },
  {
    category: "ACESSIBILIDADE FÍSICA",
    text: "Os banheiros da empresa possuem adaptações para pessoas com deficiência?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Sim",
        sub: "Banheiro adaptado conforme NBR 9050",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Parcialmente",
        sub: "Alguns itens adaptados, outros não",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Não",
        sub: "Sem qualquer adaptação nos banheiros",
        score: 0,
      },
    ],
  },
  {
    category: "ACESSIBILIDADE FÍSICA",
    text: "As portas e corredores permitem a circulação livre de cadeiras de rodas (mín. 80 cm)?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Sim",
        sub: "Largura adequada em todas as áreas",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Parcialmente",
        sub: "Algumas áreas com restrição de largura",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Não",
        sub: "Corredores e portas sem adequação",
        score: 0,
      },
    ],
  },
  {
    category: "ACESSIBILIDADE ORGANIZACIONAL",
    text: "Os funcionários recebem treinamento sobre inclusão e atendimento a pessoas com deficiência?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Sim",
        sub: "Treinamentos regulares e documentados",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Parcialmente",
        sub: "Treinamento ocorreu, mas não é regular",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Não",
        sub: "Nunca houve treinamento específico",
        score: 0,
      },
    ],
  },
  {
    category: "ACESSIBILIDADE ORGANIZACIONAL",
    text: "Já houve relatos ou situações de dificuldade no atendimento a clientes ou colaboradores com deficiência?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Não",
        sub: "Nenhum relato de dificuldade registrado",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Raramente",
        sub: "Poucos casos isolados relatados",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Sim, frequente",
        sub: "Existem relatos recorrentes de problemas",
        score: 0,
      },
    ],
  },
  {
    category: "ACESSIBILIDADE DIGITAL",
    text: "O site ou aplicativo da empresa segue as diretrizes de acessibilidade (WCAG)?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Sim",
        sub: "Auditado e em conformidade com WCAG 2.1",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Parcialmente",
        sub: "Algumas diretrizes atendidas, outras não",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Não",
        sub: "Sem preocupação com WCAG até o momento",
        score: 0,
      },
    ],
  },
  {
    category: "ACESSIBILIDADE DIGITAL",
    text: "Os materiais e interfaces digitais possuem bom contraste de cores e tamanho de texto adequado?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Sim",
        sub: "Contraste mínimo de 4:5:1 e fonte legível",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Parcialmente",
        sub: "Alguns textos atendem, outros não",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Não",
        sub: "Não existe preocupação formal com isso",
        score: 0,
      },
    ],
  },
  {
    category: "ACESSIBILIDADE DIGITAL",
    text: "Os sistemas digitais permitem navegação completa por teclado e são compatíveis com leitores de tela?",
    options: [
      {
        icon: "✅",
        cls: "green",
        label: "Sim",
        sub: "Totalmente navegável e compatível",
        score: 2,
      },
      {
        icon: "⚠️",
        cls: "yellow",
        label: "Parcialmente",
        sub: "Alguns fluxos funcionam, outros não",
        score: 1,
      },
      {
        icon: "❌",
        cls: "red",
        label: "Não",
        sub: "Sem suporte a teclado ou leitores de tela",
        score: 0,
      },
    ],
  },
];

let currentQ = 0;
let answers = new Array(questions.length).fill(null);

// ── RENDER QUESTION ──
function renderQuestion() {
  const q = questions[currentQ];
  const pct = ((currentQ + 1) / questions.length) * 100;
  const sel = answers[currentQ];
  const isLast = currentQ === questions.length - 1;

  document.getElementById("quiz-category").textContent = q.category;
  document.getElementById("progress-bar").style.width = pct + "%";
  document.getElementById("quiz-step-sm").textContent =
    `${currentQ + 1} / ${questions.length}`;
  document.getElementById("nav-step-label").textContent =
    `Pergunta ${currentQ + 1} de ${questions.length}`;

  const card = document.getElementById("quiz-card");
  card.style.animation = "none";
  card.offsetHeight; // reflow
  card.style.animation = "slideIn .35s ease forwards";

  card.innerHTML = `
    <div class="q-label">Pergunta ${String(currentQ + 1).padStart(2, "0")}</div>
    <div class="q-text">${q.text}</div>
    <div class="options">
      ${q.options
        .map(
          (o, i) => `
        <div class="option ${sel === i ? "selected" : ""}" onclick="selectOption(${i})">
          <div class="opt-icon ${o.cls}">${o.icon}</div>
          <div class="opt-info">
            <strong>${o.label}</strong>
            <span>${o.sub}</span>
          </div>
          <div class="opt-radio"></div>
        </div>
      `,
        )
        .join("")}
    </div>
    <div class="quiz-nav">
      <button class="btn-prev" onclick="prevQ()" ${currentQ === 0 ? "disabled" : ""}>‹ Anterior</button>
      <button class="btn-next" onclick="nextQ()" ${sel === null ? "disabled" : ""}>
        ${isLast ? "Ver resultado" : "PRÓXIMA"} →
      </button>
    </div>
  `;
}

function selectOption(i) {
  answers[currentQ] = i;
  renderQuestion();
}
function prevQ() {
  if (currentQ > 0) {
    currentQ--;
    renderQuestion();
  }
}
function nextQ() {
  if (answers[currentQ] === null) return;
  if (currentQ < questions.length - 1) {
    currentQ++;
    renderQuestion();
  } else showResults();
}

// ── RESULTS ──
function showResults() {
  const dims = {
    fisica: { qs: [0, 1, 2], score: 0, max: 6 },
    organizacional: { qs: [3, 4], score: 0, max: 4 },
    digital: { qs: [5, 6, 7], score: 0, max: 6 },
  };
  let total = 0,
    maxTotal = 0;
  Object.values(dims).forEach((d) => {
    d.qs.forEach((qi) => {
      if (answers[qi] !== null)
        d.score += questions[qi].options[answers[qi]].score;
    });
    total += d.score;
    maxTotal += d.max;
  });

  const pct = Math.round((total / maxTotal) * 100);
  let level, levelClass, barColor, levelDesc, recs;

  if (pct >= 70) {
    level = "Alto";
    levelClass = "high";
    barColor = "var(--green)";
    levelDesc =
      "Parabéns! Sua empresa já tem uma base sólida de acessibilidade. Continue evoluindo para garantir inclusão total e manter a conformidade com normas atualizadas.";
    recs = [
      {
        icon: "🔍",
        title: "Auditoria de manutenção",
        text: "Realize auditorias periódicas para manter a conformidade com NBR 9050 e WCAG 2.2 em todas as áreas.",
      },
      {
        icon: "🏆",
        title: "Certificação de acessibilidade",
        text: "Considere obter certificação oficial para destacar seu compromisso com inclusão no mercado.",
      },
      {
        icon: "📚",
        title: "Treinamento avançado",
        text: "Aprofunde o treinamento da equipe com foco em comunicação aumentativa e alternativa (CAA).",
      },
      {
        icon: "📣",
        title: "Comunicação inclusiva",
        text: "Adapte materiais de marketing para formatos acessíveis como Libras, Braille e audiodescrição.",
      },
    ];
  } else if (pct >= 40) {
    level = "Médio";
    levelClass = "medium";
    barColor = "var(--yellow)";
    levelDesc =
      "Sua empresa já deu passos importantes, mas ainda há oportunidades relevantes de melhoria. Com ajustes pontuais, é possível avançar muito em pouco tempo.";
    recs = [
      {
        icon: "♿",
        title: "Adequar acesso físico",
        text: "Instale rampas e sinalizações tácteis conforme NBR 9050. Priorize a entrada e circulação principal.",
      },
      {
        icon: "🚻",
        title: "Adaptar banheiros",
        text: "Adicione barras de apoio, espaço para manobra e sinalização em banheiros acessíveis.",
      },
      {
        icon: "💻",
        title: "Revisar acessibilidade digital",
        text: "Realize uma auditoria WCAG 2.1 AA no site e corrija os problemas mais críticos primeiro.",
      },
      {
        icon: "🎓",
        title: "Treinar a equipe",
        text: "Implante treinamento semestral sobre atendimento inclusivo para todos os colaboradores.",
      },
    ];
  } else {
    level = "Baixo";
    levelClass = "low";
    barColor = "var(--red)";
    levelDesc =
      "O diagnóstico revela oportunidades significativas de melhoria em todas as dimensões avaliadas. A boa notícia: empresas que partem desse ponto frequentemente percebem as mudanças mais transformadoras — e estamos aqui para guiar cada passo.";
    recs = [
      {
        icon: "♿",
        title: "Adequar acesso físico urgente",
        text: "Instale rampas, corrimãos e sinalização táctil conforme NBR 9050. Priorize as entradas e circulação principal.",
      },
      {
        icon: "🚻",
        title: "Adaptar banheiros e espaços",
        text: "Instale barras de apoio, espaço para manobra de cadeira de rodas e sinalização adequada.",
      },
      {
        icon: "👥",
        title: "Implantar treinamento de inclusão",
        text: "Crie programa contínuo de treinamento sobre atendimento e inclusão para toda a equipe.",
      },
      {
        icon: "📋",
        title: "Criar protocolos de atendimento",
        text: "Documente fluxos diferenciados e crie canais de feedback para clientes com deficiência.",
      },
      {
        icon: "🔎",
        title: "Auditoria de acessibilidade digital",
        text: "Realize auditoria do site com base no WCAG 2.1 AA, priorizando teclado e leitores de tela.",
      },
      {
        icon: "🎨",
        title: "Corrigir contraste e tipografia",
        text: "Ajuste a paleta para contraste mínimo de 4.5:1, aumente fontes e adicione textos alternativos.",
      },
    ];
  }

  const dF = Math.round((dims.fisica.score / dims.fisica.max) * 100);
  const dO = Math.round(
    (dims.organizacional.score / dims.organizacional.max) * 100,
  );
  const dD = Math.round((dims.digital.score / dims.digital.max) * 100);

  // Switch pages
  document.getElementById("page-quiz").classList.remove("active");
  document.getElementById("page-results").classList.add("active");
  document.getElementById("nav-step-label").textContent =
    "Diagnóstico concluído";
  window.scrollTo(0, 0);

  document.getElementById("result-content").innerHTML = `
    <div style="text-align:center;margin-bottom:4px;">
      <div class="score-badge ${levelClass}">${pct}<small>pts</small></div>
      <div class="score-dash"><div class="score-dash-fill" id="sdash" style="width:0%;background:${barColor};"></div></div>
    </div>
    <h2 class="result-title">Nível de Acessibilidade ${level}</h2>
    <p class="result-desc">${levelDesc}</p>

    <div class="dim-card">
      <h4>Desempenho por dimensão</h4>
      <div class="dim-bar-row">
        <div class="dim-bar">
          <span class="dim-label">Acessibilidade física</span>
          <div class="dim-track"><div class="dim-fill" id="df1" style="width:0%;background:var(--orange);"></div></div>
          <span class="dim-pct">${dF}%</span>
        </div>
        <div class="dim-bar">
          <span class="dim-label">Atendimento &amp; equipe</span>
          <div class="dim-track"><div class="dim-fill" id="df2" style="width:0%;background:var(--orange);"></div></div>
          <span class="dim-pct">${dO}%</span>
        </div>
        <div class="dim-bar">
          <span class="dim-label">Acessibilidade digital</span>
          <div class="dim-track"><div class="dim-fill" id="df3" style="width:0%;background:var(--orange);"></div></div>
          <span class="dim-pct">${dD}%</span>
        </div>
      </div>
    </div>

    <div class="recs-grid">
      ${recs
        .map(
          (r) => `
        <div class="rec-card">
          <div class="rec-icon">${r.icon}</div>
          <h5>${r.title}</h5>
          <p>${r.text}</p>
        </div>
      `,
        )
        .join("")}
    </div>

    <div class="result-cta">
      <h3>Transforme este diagnóstico em ação real</h3>
      <p>O diagnóstico revela oportunidades significativas de melhoria em todas as dimensões avaliadas.</p>
      <div class="cta-btns">
        <button class="btn-orange">📋 Receber Plano Completo</button>
        <button class="btn-outline-w">💬 Falar com especialista</button>
      </div>
    </div>

    <div class="restart-row">
      <button class="btn-restart" onclick="restartQuiz()">↩ Refazer o diagnóstico</button>
    </div>

  `;

  setTimeout(() => {
    document.getElementById("sdash").style.width = pct + "%";
    document.getElementById("df1").style.width = dF + "%";
    document.getElementById("df2").style.width = dO + "%";
    document.getElementById("df3").style.width = dD + "%";
  }, 300);
}

function restartQuiz() {
  currentQ = 0;
  answers = new Array(questions.length).fill(null);
  document.getElementById("page-results").classList.remove("active");
  document.getElementById("page-quiz").classList.add("active");
  document.getElementById("result-content").innerHTML = "";
  window.scrollTo(0, 0);
  renderQuestion();
}

// Init
renderQuestion();
