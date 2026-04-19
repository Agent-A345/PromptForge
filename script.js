/* File: script.js */

'use strict';

/* ── State ───────────────────────────────────────────────── */
let state = {
  persona: 'developer',
  creativity: 'med',
  length: 'med',
  tone: 'casual',
  history: [],
  chat: [],
  variationsMode: false,
  variations: [],
  currentVariation: 0,
  compareMode: false,
  darkMode: true,
};

/* ── Persona Response Libraries ──────────────────────────── */
const PERSONAS = {
  developer: {
    label: 'Dev AI',
    icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    code: [
      `Here's a clean implementation:\n\n\`\`\`js\n// Efficient solution using modern JS\nconst solution = (input) => {\n  if (!input || typeof input !== 'string') {\n    throw new TypeError('Expected a non-empty string');\n  }\n  return input\n    .split('')\n    .reverse()\n    .join('');\n};\n\nconsole.log(solution('hello')); // → 'olleh'\n\`\`\`\n\nTime complexity: O(n). Memory: O(n). For large strings, consider an in-place buffer approach.`,
      `\`\`\`python\ndef process_data(items: list) -> dict:\n    \"\"\"Transform items into a frequency map.\"\"\"\n    result = {}\n    for item in items:\n        result[item] = result.get(item, 0) + 1\n    return result\n\n# Example usage\nprint(process_data(['a', 'b', 'a', 'c']))\n# → {'a': 2, 'b': 1, 'c': 1}\n\`\`\`\n\nThis runs in O(n) time and space. For very large datasets, consider using \`collections.Counter\` which is implemented in C.`,
      `\`\`\`typescript\ninterface ApiResponse<T> {\n  data: T | null;\n  error: string | null;\n  status: number;\n}\n\nasync function fetchData<T>(url: string): Promise<ApiResponse<T>> {\n  try {\n    const res = await fetch(url);\n    if (!res.ok) throw new Error(\`HTTP \${res.status}\`);\n    const data = await res.json() as T;\n    return { data, error: null, status: res.status };\n  } catch (e) {\n    return { data: null, error: (e as Error).message, status: 0 };\n  }\n}\n\`\`\`\n\nGeneric, type-safe, error-handled. Swap \`fetch\` for \`axios\` if you need interceptors.`,
    ],
    explain: [
      `Let me break this down step-by-step:\n\n1. **Initialization** — Set up the core data structure (O(1) overhead).\n2. **Traversal** — Iterate over inputs using a depth-first approach for tree structures.\n3. **Processing** — Apply transformation at each node, caching results with a HashMap to avoid redundant computation.\n4. **Output** — Collect results and serialize to the required format.\n\nKey insight: memoization cuts repeated subproblem solving, dropping complexity from exponential to polynomial in most cases.`,
      `Here's the architecture breakdown:\n\n1. **Client Layer** — Sends HTTP requests; handles auth tokens via interceptors.\n2. **API Gateway** — Rate-limiting, auth validation, request routing.\n3. **Service Layer** — Business logic; stateless for horizontal scaling.\n4. **Data Layer** — Postgres for relational data; Redis for session cache.\n5. **Observability** — Structured logging, distributed tracing, alerting.\n\nUse feature flags for gradual rollouts, and circuit-breakers for downstream dependency failures.`,
    ],
    summarize: [
      `**TL;DR:**\n• Core algorithm: divide-and-conquer with O(n log n) complexity.\n• Data is immutable; state managed via reducers.\n• API is RESTful; versioned at \`/v1/\`.\n• Tests: 94% coverage, CI via GitHub Actions.\n• Deployment: Docker → Kubernetes, zero-downtime rolling updates.`,
      `**Key Points:**\n• The codebase uses a monorepo structure with shared packages.\n• Frontend: React + TypeScript; Backend: Node.js + Express.\n• Database: PostgreSQL with Prisma ORM.\n• Auth: JWT access tokens + refresh token rotation.\n• Main bottleneck: N+1 queries in the reporting module — needs eager loading.`,
    ],
    generic: [
      `Good question. From an engineering perspective:\n\nThe most robust approach is to separate concerns early. Define your interfaces first, then implement. Use dependency injection so components remain testable in isolation.\n\nFor production readiness, add:\n- Input validation at boundaries\n- Structured error types\n- Idempotency keys for mutating operations\n- Health-check endpoints\n\nWant me to scaffold a specific part of this?`,
      `Let's think about this systematically.\n\nFirst, identify the constraint: is this CPU-bound, I/O-bound, or memory-bound? That determines the right optimization path.\n\n- **CPU-bound** → Parallelize with worker threads.\n- **I/O-bound** → Use async/await with connection pooling.\n- **Memory-bound** → Stream data instead of loading into RAM.\n\nProfile before optimizing. Premature optimization is the root of most over-engineered systems.`,
      `A few patterns worth considering here:\n\n• **Strategy Pattern** — Swap algorithms at runtime without changing the caller.\n• **Observer Pattern** — Decouple event producers from consumers; great for analytics.\n• **Repository Pattern** — Abstract data access so you can swap DBs without touching business logic.\n\nWhich direction are you heading? I can dive deeper into any of these.`,
      `Here's my mental model for this problem:\n\n\`\`\`\nInput → [Validate] → [Transform] → [Process] → [Output]\n           ↓               ↓              ↓\n        Errors          Logs           Cache\n\`\`\`\n\nEvery stage should be a pure function where possible. Side effects live at the edges. This makes testing trivially easy and bugs obvious to trace.`,
    ],
  },

  writer: {
    label: 'Writer AI',
    icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>`,
    code: [
      `In the language of narrative, algorithms are just stories waiting to be told. Imagine your function as a protagonist with a singular purpose — it receives a stranger at the door (the input), contemplates its journey (the logic), and emerges transformed (the output).\n\nHere's your story in code:\n\`\`\`js\nconst transform = (hero) => hero.split('').reverse().join('');\n\`\`\`\n\nSimple. Elegant. Like a palindrome of intent.`,
    ],
    explain: [
      `Picture a vast library — infinite shelves stretching beyond sight. Every book is a piece of data, every librarian a function.\n\n1. The head librarian (your main function) receives a request.\n2. They delegate to specialists — sorting clerks, retrieval agents, archivists.\n3. Each returns with their piece of the answer.\n4. The head librarian composes the final response and hands it back.\n\nThe magic isn't in any single step — it's in the choreography between them.`,
      `Think of it as a recipe passed down through generations:\n\n1. **Gather your ingredients** (collect inputs).\n2. **Prep the mise en place** (validate and normalize).\n3. **Apply heat** (process and transform).\n4. **Plate beautifully** (format output for the consumer).\n\nThe best code, like the best food, looks effortless — but the effortlessness is itself a craft, honed over iterations and re-writes.`,
    ],
    summarize: [
      `In brief, stripped to its essence:\n\n• A world imagined boldly, then constrained by truth.\n• Characters who want things they cannot easily have.\n• Tension that breathes and bends but does not break — until it must.\n• A resolution that earns its peace.\n\nThe summary is a skeleton; the writing is the body that gives it life.`,
    ],
    generic: [
      `Words are the architecture of meaning. When you ask a question, you are drawing a blueprint — and every answer is a building that either shelters or crumbles.\n\nWhat you're reaching for here is nuance: the understanding that between yes and no lives an entire landscape of possibility. Let's explore that landscape together.\n\nTell me — which direction feels most true to you?`,
      `There is a particular kind of magic in the right sentence. It arrives like light through a cracked door: unexpected, warm, and suddenly obvious.\n\nWhat you're describing sounds like a story trying to find its spine. Every great narrative has one — the thing it's *really* about beneath all the plot mechanics.\n\nOnce you find that, every other decision — character, pacing, voice — falls into alignment almost on its own.`,
      `Consider the contrast:\n\n*Draft One*: "She was sad when he left."\n*Draft Two*: "She stood at the window long after his taillights disappeared, watching the space where a person used to be."\n\nSame fact. Utterly different truth.\n\nWriting is the discipline of choosing the second draft every time. It's exhausting and it's the only way.`,
      `The best stories are ecosystems — everything feeds everything else. A detail in chapter one should echo in chapter nine. A character's flaw should be both their wound and their weapon.\n\nWhat you're building here has that potential. I can feel the architecture wanting to emerge.\n\nShall we map it out together?`,
      `Imagine your reader at 2 AM, unable to sleep. They've picked up your pages without intention — just something to hold.\n\nAnd then they're *in*. The world outside dissolves.\n\nThat's the standard. Not critical acclaim, not commercial success — that one reader at 2 AM who forgets they're reading.\n\nLet's write toward that.`,
    ],
  },

  security: {
    label: 'CyberSec',
    icon: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    code: [
      `**Security-hardened implementation:**\n\n\`\`\`js\n// Input sanitization + parameterized query\nconst getUserData = async (userId) => {\n  // Validate — never trust raw input\n  if (!Number.isInteger(userId) || userId < 1) {\n    throw new RangeError('Invalid userId');\n  }\n  \n  // Parameterized query prevents SQL injection\n  const result = await db.query(\n    'SELECT id, name, email FROM users WHERE id = $1',\n    [userId]\n  );\n  \n  // Return only necessary fields (principle of least privilege)\n  return result.rows[0] ?? null;\n};\n\`\`\`\n\n⚠️ **Never** concatenate user input into SQL strings. Enable CSP headers. Rotate DB credentials quarterly.`,
      `\`\`\`python\nimport hashlib, secrets, hmac\n\ndef secure_hash(password: str) -> tuple[str, str]:\n    \"\"\"Hash a password with a cryptographic salt.\"\"\"\n    salt = secrets.token_hex(32)  # 256-bit entropy\n    key = hashlib.scrypt(\n        password.encode(),\n        salt=salt.encode(),\n        n=2**14, r=8, p=1,\n        dklen=64\n    )\n    return salt, key.hex()\n\ndef verify(password: str, salt: str, stored_hash: str) -> bool:\n    _, new_hash = secure_hash.__wrapped__(password, salt)\n    return hmac.compare_digest(new_hash, stored_hash)\n\`\`\`\n\nUse \`scrypt\`, \`argon2\`, or \`bcrypt\` — **never** MD5/SHA-1 for passwords. The \`compare_digest\` prevents timing attacks.`,
    ],
    explain: [
      `Let me walk you through the threat model systematically:\n\n1. **Identify Assets** — What data or systems are you protecting? (PII, credentials, financial data?)\n2. **Enumerate Attack Surfaces** — Every endpoint, every input, every dependency is a potential vector.\n3. **Map Threats (STRIDE):**\n   - **S**poofing identity\n   - **T**ampering with data\n   - **R**epudiation\n   - **I**nformation disclosure\n   - **D**enial of service\n   - **E**levation of privilege\n4. **Mitigate** — Apply controls proportional to risk: encryption, auth, rate-limiting, input validation.\n5. **Monitor** — Log everything suspicious. Set alerts. Conduct regular penetration testing.\n\nSecurity is not a feature — it's a discipline maintained continuously.`,
    ],
    summarize: [
      `**Security Assessment Summary:**\n\n• 🔴 Critical: Unpatched CVE-2024-XXXX in dependency; update immediately.\n• 🟡 High: API endpoints lack rate-limiting — susceptible to brute-force.\n• 🟡 High: Sensitive data logged in plaintext; mask before writing to log streams.\n• 🟢 Medium: CORS policy too permissive; restrict to known origins.\n• ✅ Compliant: TLS 1.3 enforced; HSTS headers present; CSP configured.\n\n**Immediate action required** on Critical and High findings.`,
    ],
    generic: [
      `From a security-first perspective, the core principle here is **Zero Trust**: never assume anything inside or outside your network is safe by default.\n\nKey controls to apply:\n- **Authentication**: MFA mandatory for privileged accounts.\n- **Authorization**: Least-privilege access; role-based controls.\n- **Encryption**: TLS in transit, AES-256 at rest.\n- **Audit logging**: Immutable logs, retained per compliance requirements.\n- **Incident response**: Have a runbook *before* you need it.\n\nSecurity debt compounds faster than technical debt. Address findings promptly.`,
      `Threat intelligence indicates this vector is increasingly exploited in the wild.\n\nRecommended hardening steps:\n1. Patch immediately — apply vendor updates within 72h of critical CVE disclosure.\n2. Rotate all credentials exposed to the affected system.\n3. Review access logs for anomalies in the 30-day window prior to discovery.\n4. Segment the affected service from your core network.\n5. Notify affected parties per your disclosure policy.\n\nDocumentation and post-incident review are not optional — they prevent recurrence.`,
      `The attack surface you're describing maps to **OWASP Top 10** entries A01 (Broken Access Control) and A03 (Injection).\n\nMitigation strategy:\n\n• **Input validation** — Allowlist over denylist, always.\n• **Output encoding** — Context-aware escaping for HTML, SQL, shell, etc.\n• **Access controls** — Enforce server-side; never rely on client-side checks.\n• **Dependencies** — Run \`npm audit\` / \`pip audit\` in CI/CD. Block deploys on critical findings.\n\nWant me to generate a security checklist for your specific stack?`,
      `Operational security reminder: the weakest link in most breaches isn't the code — it's human behaviour.\n\n**Social engineering defenses:**\n- Regular phishing simulations and awareness training.\n- Verify unusual requests via a second channel (never reply-to on suspicious emails).\n- Enforce a "verify before you trust" culture at every level.\n\nTechnical controls are necessary but insufficient. Culture is your last line of defense.`,
    ],
  },
};

/* ── Safety Keywords ─────────────────────────────────────── */
const SAFETY_KEYWORDS = [
  'hack', 'crack', 'exploit', 'illegal', 'harmful', 'malware',
  'ransomware', 'phishing attack', 'how to steal', 'how to kill',
  'bomb', 'weapon', 'drug synthesis', 'bypass security',
];

/* ── Prompt Evaluation ───────────────────────────────────── */
function evaluatePrompt(text) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wc = words.length;

  // Clarity: based on word count and punctuation
  let clarity = 'low';
  if (wc >= 8 && wc <= 60) clarity = 'high';
  else if (wc >= 4) clarity = 'med';

  // Specificity: 1-10
  let spec = 1;
  if (wc >= 3)  spec = 3;
  if (wc >= 6)  spec = 5;
  if (wc >= 10) spec = 7;
  if (wc >= 15) spec = 9;
  if (text.includes('?') || text.includes(':')) spec = Math.min(10, spec + 1);

  // Tips
  const tips = [];
  if (!text.includes('why') && !text.includes('how') && !text.includes('what') && wc < 8) {
    tips.push('Add context like who, what, or why');
  }
  if (wc < 5) tips.push('Be more specific about your goal');
  if (!text.match(/[.?!]/)) tips.push('Consider ending with a clear question');

  return { clarity, spec, tip: tips[0] || null };
}

/* ── Response Generation ─────────────────────────────────── */
function detectIntent(prompt) {
  const p = prompt.toLowerCase();
  if (/\b(code|function|implement|write\s+(a\s+)?(function|script|program|class)|snippet|algorithm)\b/.test(p)) return 'code';
  if (/\b(explain|what\s+is|how\s+does|why\s+does|describe|tell\s+me\s+about)\b/.test(p)) return 'explain';
  if (/\b(summarize|summary|tl;dr|recap|brief|overview|key\s+points)\b/.test(p)) return 'summarize';
  return 'generic';
}

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function isSafe(prompt) {
  const p = prompt.toLowerCase();
  return !SAFETY_KEYWORDS.some(kw => p.includes(kw));
}

function generateResponse(prompt, persona, creativity, lengthPref, tone) {
  if (!isSafe(prompt)) return null; // signals safety block

  const lib = PERSONAS[persona];
  const intent = detectIntent(prompt);
  const pool = lib[intent] || lib.generic;

  // Creativity: how much variation to inject
  let candidates;
  if (creativity === 'low') candidates = pool.slice(0, 1);
  else if (creativity === 'high') candidates = [...lib.generic, ...(lib[intent] || [])];
  else candidates = pool;

  let response = pick(candidates.length ? candidates : lib.generic);

  // Tone prefix
  const tonePrefixes = {
    formal:   { developer: 'Formally: ', writer: 'To address this with precision: ', security: 'Per security protocol: ' },
    friendly: { developer: 'Hey! Great question. ', writer: 'Oh, I love this one! ', security: 'Glad you asked! Here\'s what to watch for: ' },
    casual:   { developer: '', writer: '', security: '' },
  };
  const prefix = tonePrefixes[tone]?.[persona] || '';

  // Length adjustment
  if (lengthPref === 'short') {
    // Truncate to first ~2 paragraphs
    const parts = response.split('\n\n');
    response = parts.slice(0, 2).join('\n\n');
  } else if (lengthPref === 'long') {
    // Append an extension
    const extensions = [
      '\n\nLet me know if you\'d like me to go deeper on any specific aspect — I can expand with examples, edge cases, or a working prototype.',
      '\n\nThis covers the fundamentals. For production use, also consider error handling, monitoring, and documentation. Happy to elaborate on any layer.',
      '\n\nFeel free to iterate — good solutions rarely arrive fully formed on the first pass. What would you like to refine next?',
    ];
    response += pick(extensions);
  }

  return prefix + response;
}

/* ── DOM Refs ─────────────────────────────────────────────── */
const $ = id => document.getElementById(id);
const promptInput   = $('prompt-input');
const chatOutput    = $('chat-output');
const generateBtn   = $('generate-btn');
const variationsBtn = $('variations-btn');
const clearBtn      = $('clear-btn');
const evalBadges    = $('eval-badges');
const charCount     = $('char-count');
const themeToggle   = $('theme-toggle');
const sidebarToggleBtn = $('sidebar-toggle-btn');
const historyToggleBtn = $('history-toggle-btn');
const compareToggleBtn = $('compare-toggle-btn');
const historyPanel  = $('history-panel');
const historyList   = $('history-list');
const clearHistoryBtn = $('clear-history-btn');
const historyCloseBtn = $('history-close-btn');
const sidebar       = $('sidebar');
const variationsBar = $('variations-bar');
const compareSection = $('compare-section');
const compareLeft   = $('compare-left');
const compareRight  = $('compare-right');
const sidebarHistory = $('sidebar-history');
const toast         = $('toast');

/* ── Toast ────────────────────────────────────────────────── */
let toastTimer;
function showToast(msg) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

/* ── Theme ───────────────────────────────────────────────── */
function applyTheme(dark) {
  document.documentElement.setAttribute('data-theme', dark ? 'dark' : 'light');
  state.darkMode = dark;
  localStorage.setItem('pf_theme', dark ? 'dark' : 'light');
}

themeToggle.addEventListener('click', () => applyTheme(!state.darkMode));

// Init theme
(function initTheme() {
  const saved = localStorage.getItem('pf_theme');
  if (saved) applyTheme(saved === 'dark');
  else applyTheme(window.matchMedia('(prefers-color-scheme: dark)').matches);
})();

/* ── Sidebar Toggle ──────────────────────────────────────── */
sidebarToggleBtn.addEventListener('click', () => {
  sidebar.classList.toggle('collapsed');
});

/* ── History Panel ───────────────────────────────────────── */
historyToggleBtn.addEventListener('click', () => {
  const isHidden = historyPanel.hasAttribute('hidden');
  if (isHidden) {
    historyPanel.removeAttribute('hidden');
  } else {
    historyPanel.setAttribute('hidden', '');
  }
});

historyCloseBtn.addEventListener('click', () => {
  historyPanel.setAttribute('hidden', '');
});

/* ── Compare Mode ────────────────────────────────────────── */
compareToggleBtn.addEventListener('click', () => {
  state.compareMode = !state.compareMode;
  compareSection.classList.toggle('hidden', !state.compareMode);
  compareToggleBtn.style.color = state.compareMode ? 'var(--accent)' : '';
  if (state.compareMode) showToast('Compare mode on — generate a response to compare personas');
});

/* ── Persona Tabs ────────────────────────────────────────── */
document.querySelectorAll('.persona-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.persona-tab').forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    state.persona = tab.dataset.persona;
    localStorage.setItem('pf_persona', state.persona);
  });
});

/* ── Settings ────────────────────────────────────────────── */
$('creativity-select').addEventListener('change', e => {
  state.creativity = e.target.value;
  saveSettings();
});
$('length-select').addEventListener('change', e => {
  state.length = e.target.value;
  saveSettings();
});
$('tone-select').addEventListener('change', e => {
  state.tone = e.target.value;
  saveSettings();
});

function saveSettings() {
  localStorage.setItem('pf_settings', JSON.stringify({
    creativity: state.creativity,
    length: state.length,
    tone: state.tone,
  }));
}

function loadSettings() {
  try {
    const s = JSON.parse(localStorage.getItem('pf_settings') || '{}');
    if (s.creativity) { state.creativity = s.creativity; $('creativity-select').value = s.creativity; }
    if (s.length)     { state.length = s.length;         $('length-select').value = s.length; }
    if (s.tone)       { state.tone = s.tone;             $('tone-select').value = s.tone; }
  } catch {}

  const p = localStorage.getItem('pf_persona');
  if (p) {
    state.persona = p;
    document.querySelectorAll('.persona-tab').forEach(t => {
      const active = t.dataset.persona === p;
      t.classList.toggle('active', active);
      t.setAttribute('aria-selected', String(active));
    });
  }
}

/* ── History ─────────────────────────────────────────────── */
function loadHistory() {
  try {
    state.history = JSON.parse(localStorage.getItem('pf_history') || '[]');
  } catch { state.history = []; }
  renderHistory();
}

function saveHistory(prompt) {
  state.history.unshift({ prompt, persona: state.persona, ts: Date.now() });
  if (state.history.length > 10) state.history.pop();
  localStorage.setItem('pf_history', JSON.stringify(state.history));
  renderHistory();
}

function renderHistory() {
  // Full panel
  historyList.innerHTML = '';
  state.history.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'history-item';
    li.setAttribute('role', 'listitem');
    li.innerHTML = `
      <span class="history-item-persona">${item.persona}</span>
      <span class="history-item-text">${escapeHtml(item.prompt)}</span>
    `;
    li.addEventListener('click', () => {
      promptInput.value = item.prompt;
      charCount.textContent = item.prompt.length + ' chars';
      evalBadgesUpdate(item.prompt);
      promptInput.focus();
      historyPanel.setAttribute('hidden', '');
    });
    historyList.appendChild(li);
  });

  // Sidebar mini list
  sidebarHistory.innerHTML = '';
  state.history.slice(0, 5).forEach(item => {
    const li = document.createElement('li');
    li.className = 'sidebar-history-item';
    li.textContent = item.prompt.substring(0, 50) + (item.prompt.length > 50 ? '…' : '');
    li.title = item.prompt;
    li.addEventListener('click', () => {
      promptInput.value = item.prompt;
      charCount.textContent = item.prompt.length + ' chars';
      evalBadgesUpdate(item.prompt);
      promptInput.focus();
    });
    sidebarHistory.appendChild(li);
  });
}

clearHistoryBtn.addEventListener('click', () => {
  state.history = [];
  localStorage.removeItem('pf_history');
  renderHistory();
  showToast('History cleared');
});

/* ── Prompt Evaluation Badges ─────────────────────────────── */
let evalDebounce;
function evalBadgesUpdate(text) {
  clearTimeout(evalDebounce);
  evalDebounce = setTimeout(() => {
    if (!text.trim()) { evalBadges.innerHTML = ''; return; }
    const { clarity, spec, tip } = evaluatePrompt(text);
    const clarityClass = `badge-clarity-${clarity}`;
    const clarityLabel = { high: '✓ Clear', med: '~ Moderate', low: '! Vague' }[clarity];
    evalBadges.innerHTML = `
      <span class="eval-badge ${clarityClass}" title="Clarity based on length and structure">${clarityLabel}</span>
      <span class="eval-badge badge-specificity" title="Specificity score">Specificity: ${spec}/10</span>
      ${tip ? `<span class="eval-badge badge-tip" title="Tip">💡 ${escapeHtml(tip)}</span>` : ''}
    `;
  }, 300);
}

promptInput.addEventListener('input', () => {
  charCount.textContent = promptInput.value.length + ' chars';
  evalBadgesUpdate(promptInput.value);
});

/* ── Templates ───────────────────────────────────────────── */
document.querySelectorAll('.template-btn, .quick-tpl').forEach(btn => {
  btn.addEventListener('click', () => {
    promptInput.value = btn.dataset.template;
    charCount.textContent = promptInput.value.length + ' chars';
    evalBadgesUpdate(promptInput.value);
    promptInput.focus();
    // Remove welcome msg if present
    const welcome = chatOutput.querySelector('.welcome-msg');
    if (welcome) welcome.remove();
  });
});

/* ── Chat Rendering ──────────────────────────────────────── */
function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatResponse(text) {
  // Code blocks
  text = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<pre><code>${escapeHtml(code.trim())}</code></pre>`;
  });
  // Inline code
  text = text.replace(/`([^`]+)`/g, (_, c) => `<code>${escapeHtml(c)}</code>`);
  // Bold
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Line breaks
  text = text.replace(/\n/g, '<br>');
  return text;
}

function renderSafetyBubble() {
  const div = document.createElement('div');
  div.className = 'safety-bubble';
  div.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
    <p><strong>Safety Notice:</strong> This request contains content that cannot be processed safely. Please rephrase your prompt to focus on constructive goals.</p>
  `;
  chatOutput.appendChild(div);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function renderChatPair(userText, aiText, personaLabel) {
  const pair = document.createElement('div');
  pair.className = 'chat-pair';

  const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  pair.innerHTML = `
    <div class="chat-bubble user">
      <div class="bubble-content">
        <div class="bubble-meta user-meta">You · ${now}</div>
        <div class="bubble-text">${escapeHtml(userText)}</div>
      </div>
      <div class="bubble-avatar user-av" aria-hidden="true">You</div>
    </div>
    <div class="chat-bubble ai">
      <div class="bubble-avatar ai-av" aria-hidden="true">AI</div>
      <div class="bubble-content">
        <div class="bubble-meta">${escapeHtml(personaLabel)} · ${now}</div>
        <div class="bubble-text ai-response-text typing-cursor"></div>
        <div class="bubble-actions">
          <button class="bubble-action-btn copy-btn" aria-label="Copy AI response">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>
            Copy
          </button>
        </div>
      </div>
    </div>
  `;

  chatOutput.appendChild(pair);
  chatOutput.scrollTop = chatOutput.scrollHeight;

  // Typing animation
  const textEl = pair.querySelector('.ai-response-text');
  typeResponse(textEl, aiText, () => {
    textEl.classList.remove('typing-cursor');
  });

  // Copy button
  pair.querySelector('.copy-btn').addEventListener('click', () => {
    navigator.clipboard.writeText(aiText).then(() => showToast('Copied to clipboard!')).catch(() => showToast('Copy failed'));
  });

  return pair;
}

/* ── Typing Animation ────────────────────────────────────── */
function typeResponse(el, fullText, onDone) {
  const FORMATTED = formatResponse(fullText);
  // For HTML content, do a "reveal" approach by tracking visible chars
  // We'll type into plain text first, then swap at completion
  const plainText = fullText;
  let i = 0;
  const speed = Math.max(8, Math.min(25, Math.floor(1800 / plainText.length)));

  function tick() {
    if (i < plainText.length) {
      // Show formatted up to current char count via substring on plain
      el.textContent = plainText.substring(0, i + 1);
      i++;
      chatOutput.scrollTop = chatOutput.scrollHeight;
      setTimeout(tick, speed);
    } else {
      // Finalize with rich formatting
      el.innerHTML = FORMATTED;
      chatOutput.scrollTop = chatOutput.scrollHeight;
      if (onDone) onDone();
    }
  }
  tick();
}

/* ── Generate ────────────────────────────────────────────── */
async function doGenerate() {
  const prompt = promptInput.value.trim();
  if (!prompt) { promptInput.focus(); return; }

  // Remove welcome message
  const welcome = chatOutput.querySelector('.welcome-msg');
  if (welcome) welcome.remove();

  // Loading state
  generateBtn.classList.add('loading');
  generateBtn.querySelector('svg').outerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>`;

  // Fake latency
  await delay(600 + Math.random() * 400);

  generateBtn.classList.remove('loading');
  generateBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3"/></svg> Generate`;

  // Safety check
  if (!isSafe(prompt)) {
    // Still show user bubble
    const pair = document.createElement('div');
    pair.className = 'chat-pair';
    pair.innerHTML = `
      <div class="chat-bubble user">
        <div class="bubble-content">
          <div class="bubble-meta user-meta">You</div>
          <div class="bubble-text">${escapeHtml(prompt)}</div>
        </div>
        <div class="bubble-avatar user-av">You</div>
      </div>
    `;
    chatOutput.appendChild(pair);
    renderSafetyBubble();
    saveHistory(prompt);
    renderHistory();
    return;
  }

  const lib = PERSONAS[state.persona];
  const response = generateResponse(prompt, state.persona, state.creativity, state.length, state.tone);

  // Compare mode
  if (state.compareMode) {
    const devResponse = generateResponse(prompt, 'developer', state.creativity, state.length, state.tone);
    const writerResponse = generateResponse(prompt, 'writer', state.creativity, state.length, state.tone);
    compareLeft.innerHTML = `<strong>Developer:</strong><br><br>${devResponse ? formatResponse(devResponse) : '—'}`;
    compareRight.innerHTML = `<strong>Writer:</strong><br><br>${writerResponse ? formatResponse(writerResponse) : '—'}`;
  }

  renderChatPair(prompt, response, lib.label);
  saveHistory(prompt);

  // State
  state.chat.push({ user: prompt, ai: response, persona: state.persona });
  localStorage.setItem('pf_chat_last', JSON.stringify(state.chat.slice(-20)));
}

/* ── Variations ──────────────────────────────────────────── */
async function doVariations() {
  const prompt = promptInput.value.trim();
  if (!prompt) { promptInput.focus(); return; }

  const welcome = chatOutput.querySelector('.welcome-msg');
  if (welcome) welcome.remove();

  if (!isSafe(prompt)) { renderSafetyBubble(); return; }

  // Generate 3 variations
  state.variations = [
    generateResponse(prompt, state.persona, 'low', state.length, state.tone),
    generateResponse(prompt, state.persona, 'med', state.length, state.tone),
    generateResponse(prompt, state.persona, 'high', state.length, state.tone),
  ];
  state.currentVariation = 0;
  state.variationsMode = true;

  variationsBar.classList.remove('hidden');
  document.querySelectorAll('.var-tab').forEach((t, i) => {
    t.classList.toggle('active', i === 0);
    t.setAttribute('aria-selected', String(i === 0));
  });

  const lib = PERSONAS[state.persona];
  // Clear chat output for variations
  chatOutput.innerHTML = '';
  renderChatPair(prompt, state.variations[0], lib.label + ' (Var 1)');
  saveHistory(prompt);
}

document.querySelectorAll('.var-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const idx = parseInt(tab.dataset.var);
    if (!state.variations[idx]) return;

    document.querySelectorAll('.var-tab').forEach((t, i) => {
      t.classList.toggle('active', i === idx);
      t.setAttribute('aria-selected', String(i === idx));
    });

    chatOutput.innerHTML = '';
    const lib = PERSONAS[state.persona];
    renderChatPair(promptInput.value.trim(), state.variations[idx], `${lib.label} (Var ${idx + 1})`);
    state.currentVariation = idx;
  });
});

/* ── Clear ───────────────────────────────────────────────── */
clearBtn.addEventListener('click', () => {
  promptInput.value = '';
  charCount.textContent = '0 chars';
  evalBadges.innerHTML = '';
  chatOutput.innerHTML = `
    <div class="welcome-msg">
      <div class="welcome-icon">
        <svg width="32" height="32" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path d="M11 2L3 6v10l8 4 8-4V6L11 2z" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
          <path d="M11 2v18M3 6l8 4 8-4" stroke="currentColor" stroke-width="1.2" stroke-linejoin="round"/>
        </svg>
      </div>
      <h2>PromptForge</h2>
      <p>Select a persona, tweak settings, then write your first prompt.</p>
      <div class="quick-templates">
        <button class="quick-tpl" data-template="Explain quantum computing like I'm 5 years old">✦ Explain it simply</button>
        <button class="quick-tpl" data-template="Write code to reverse a linked list in JavaScript">✦ Generate code</button>
        <button class="quick-tpl" data-template="Summarize the key ideas behind machine learning">✦ Summarize a topic</button>
        <button class="quick-tpl" data-template="Generate 10 creative startup ideas for 2025">✦ Brainstorm ideas</button>
      </div>
    </div>
  `;
  // Re-attach quick template listeners
  chatOutput.querySelectorAll('.quick-tpl').forEach(btn => {
    btn.addEventListener('click', () => {
      promptInput.value = btn.dataset.template;
      charCount.textContent = promptInput.value.length + ' chars';
      evalBadgesUpdate(promptInput.value);
      promptInput.focus();
    });
  });
  variationsBar.classList.add('hidden');
  compareLeft.innerHTML = '';
  compareRight.innerHTML = '';
  state.chat = [];
  state.variations = [];
  state.variationsMode = false;
  promptInput.focus();
});

/* ── Event Listeners ─────────────────────────────────────── */
generateBtn.addEventListener('click', doGenerate);
variationsBtn.addEventListener('click', doVariations);

promptInput.addEventListener('keydown', e => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    doGenerate();
  }
});

/* ── Utility ─────────────────────────────────────────────── */
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/* ── Init ────────────────────────────────────────────────── */
(function init() {
  loadSettings();
  loadHistory();

  // Restore sidebar state
  const sidebarCollapsed = localStorage.getItem('pf_sidebar') === 'collapsed';
  if (sidebarCollapsed) sidebar.classList.add('collapsed');

  sidebarToggleBtn.addEventListener('click', () => {
    const collapsed = sidebar.classList.contains('collapsed');
    localStorage.setItem('pf_sidebar', collapsed ? 'open' : 'collapsed');
  });
})();
