import { useEffect, useRef, useState } from 'react'
import './App.css'

const STORAGE_KEY = 'socraticlab-demo-v1'
const THEME_STORAGE_KEY = 'socraticlab-theme'

function loadTheme() {
  try {
    return window.localStorage.getItem(THEME_STORAGE_KEY) === 'dark' ? 'dark' : 'light'
  } catch (error) {
    console.error('Could not load SocraticLab theme preference from localStorage.', error)
    return 'light'
  }
}

function cleanGeminiFormatting(text) {
  return text
    .replace(/(^|\n)[ \t]*\*[ \t]+/g, '$1• ')
    .replace(/\*\*(.+?)\*\*/g, '$1')
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=$|[\s).,!?:;])/g, '$1$2')
}

function Icon({ name, size = 16 }) {
  const paths = {
    spark: <><path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7L12 3Z" /><path d="m19 15 .8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8L19 15Z" /></>,
    book: <><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" /><path d="M4 18a2 2 0 0 1 2-2h14M8 7h8m-8 4h6" /></>,
    network: <><circle cx="12" cy="5" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="m11 7-4 9m6-9 4 9M8 18h8" /></>,
    brain: <><path d="M12 4a3 3 0 0 0-5.8 1.1A3.5 3.5 0 0 0 5 11a3 3 0 0 0 1 5.5A3.5 3.5 0 0 0 12 19V4Zm0 0a3 3 0 0 1 5.8 1.1A3.5 3.5 0 0 1 19 11a3 3 0 0 1-1 5.5A3.5 3.5 0 0 1 12 19" /><path d="M8 9h1m6 3h1m-8 3h1m5-8h1" /></>,
    flask: <><path d="M9 3h6m-5 0v6l-5.5 9.2A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-2.8L14 9V3m-7 12h10" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18m-12 4h.01M15 14h.01M9 17h.01" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    play: <path d="m8 5 12 7-12 7V5Z" />,
    check: <path d="m5 12 4 4L19 6" />,
    flame: <path d="M12 22c4 0 7-3 7-7 0-3-2-5-4-7 0 3-1 4-2 4 0-5-3-8-5-10 0 4-1 6-3 9-3 5 0 11 7 11Z" />,
    rocket: <><path d="M4 16c-1.2 2-.9 4-.9 4s2 .3 4-.9m8.9-5.2-5-5c1.4-3.4 4-5.7 9-6 0 5-2.3 7.6-6 9ZM9 10l-3 .5L4 14l4 .5m5 5 .5-3 3.5-2-1 5-3 2Z" /><circle cx="15" cy="8" r="1" /></>,
    person: <><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
    cpu: <><rect x="5" y="5" width="14" height="14" rx="2" /><path d="M9 9h6v6H9zM9 2v3m6-3v3M9 19v3m6-3v3M2 9h3m-3 6h3m14-6h3m-3 6h3" /></>,
    tree: <><circle cx="12" cy="5" r="2" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /><path d="M12 7v5m-6 4v-3h12v3" /></>,
    alert: <><path d="m12 3 10 18H2L12 3Z" /><path d="M12 9v5m0 3h.01" /></>,
    lock: <><rect x="4" y="10" width="16" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 4v3" /></>,
    refresh: <><path d="M20 7v5h-5M4 17v-5h5" /><path d="M5.5 9A7 7 0 0 1 18 6l2 6M4 12l2 6a7 7 0 0 0 12.5-3" /></>,
    download: <><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3" /></>,
    pulse: <><path d="M3 12h4l3-8 4 16 3-8h4" /></>,
    target: <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.5 8.5 0 1 0 20.5 14.5Z" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
  }

  return (
    <svg aria-hidden="true" className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}

const tracks = [
  { icon: 'play', type: 'COMPUTER SCIENCE', title: 'Data Structures & Algorithms', desc: 'Focusing on Pointer graphs, Recursion limits, and BST inversions.', progress: 74, verified: '18/24 Verified Concepts', student: 'Theo', next: 'Dangling Pointers', flag: '2 Gaps Spotted', flagType: 'red' },
  { icon: 'cpu', type: 'SYSTEMS ARCHITECTURE', title: 'OS & Concurrency', desc: 'Multithreading, race conditions, atomic registers, and virtual memory.', progress: 45, verified: '12/26 Verified Concepts', student: 'Maya', next: 'Mutex Deadlocks', flag: 'Stable Flow', flagType: 'green' },
  { icon: 'tree', type: 'MATHEMATICS FOR AI', title: 'Linear Algebra for ML', desc: 'Eigenvectors, matrix decompositions, transformation null spaces.', progress: 60, verified: '15/25 Verified Concepts', student: 'Julian', next: 'Vector Projections', flag: '1 Unresolved Analogy', flagType: 'gold' },
]

const initialData = {
  sessions: [
    { id: 'seed-1', title: 'Stacks vs Heap Memory Allocation', track: 'Data Structures', persona: 'Theo (Peer, Lv. 2)', status: 'Mastered (94%)', state: 'good', duration: '18m 42s', output: '3 intuitive analogies verified' },
    { id: 'seed-2', title: 'Binary Search Tree Inversions', track: 'Algorithms', persona: 'Maya (Skeptic, Lv. 3)', status: 'Needs Review (1 Gap)', state: 'needs-review', duration: '24m 10s', output: 'Induction gap detected on edge cases' },
    { id: 'seed-3', title: 'Virtual Memory & Paging Tables', track: 'Operating Systems', persona: 'Theo (Peer, Lv. 2)', status: 'Mastered (91%)', state: 'good', duration: '32m 05s', output: 'Zero argument fallacies awarded' },
  ],
  inquiryReplies: {},
  trackProgress: {},
  persona: 'Curious Peer (Lv. 2)',
}

function loadDemoData() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    if (!saved) return initialData
    const parsed = JSON.parse(saved)
    if (!Array.isArray(parsed.sessions) || !parsed.inquiryReplies || !parsed.trackProgress) {
      throw new Error('Saved demo data has an invalid shape.')
    }
    return {
      ...initialData,
      ...parsed,
      sessions: parsed.sessions,
      inquiryReplies: parsed.inquiryReplies,
      trackProgress: parsed.trackProgress,
    }
  } catch (error) {
    console.error('Could not load SocraticLab demo data from localStorage.', error)
    return initialData
  }
}

const inquiries = [
  {
    id: 'theo-memory-leak',
    name: 'Theo (Curious Peer • Lv. 2)',
    persona: 'Theo (Peer, Lv. 2)',
    topic: 'C++ POINTERS & MEMORY',
    question: 'Alex, what actually happens to the stack pointer when a function returns without calling delete on raw allocated memory?',
    track: 'Data Structures & Algorithms',
    concept: 'Pointers & Heap Memory',
    age: '12m ago',
  },
  {
    id: 'maya-deadlock',
    name: 'Maya (Skeptical Interlocutor • Lv. 3)',
    persona: 'Maya (Skeptic, Lv. 3)',
    topic: 'OPERATING SYSTEMS CONCURRENCY',
    question: 'Can a deadlock occur if both threads acquire their nested mutexes in the exact same strict hierarchical order? Prove it.',
    track: 'OS & Concurrency',
    concept: 'Mutex Deadlocks',
    age: '1h ago',
  },
]

const personas = ['Curious Peer (Lv. 2)', 'Skeptical Interlocutor (Lv. 3)', 'Friendly Beginner (Lv. 1)']

function getTrackTitle(trackName) {
  if (/^(data structures|algorithms)$/i.test(trackName)) return tracks[0].title
  if (/^(operating systems|os & concurrency)$/i.test(trackName)) return tracks[1].title
  if (/^linear algebra/i.test(trackName)) return tracks[2].title
  return tracks.find((track) => track.title === trackName)?.title ?? tracks[0].title
}

function App() {
  const [data, setData] = useState(loadDemoData)
  const [theme, setTheme] = useState(loadTheme)
  const [activeNav, setActiveNav] = useState('Learning Hub')
  const [notice, setNotice] = useState('')
  const [modal, setModal] = useState(null)
  const [sessionForm, setSessionForm] = useState({ concept: '', track: tracks[0].title, persona: personas[0] })
  const [reply, setReply] = useState('')
  const [geminiPrompt, setGeminiPrompt] = useState('')
  const [geminiMessages, setGeminiMessages] = useState([])
  const [geminiError, setGeminiError] = useState('')
  const [geminiLoading, setGeminiLoading] = useState(false)
  const noticeTimer = useRef(null)

  useEffect(() => () => window.clearTimeout(noticeTimer.current), [])

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    if (!modal) return undefined
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setModal(null)
    }
    window.addEventListener('keydown', closeOnEscape)
    return () => window.removeEventListener('keydown', closeOnEscape)
  }, [modal])

  const showNotice = (message) => {
    window.clearTimeout(noticeTimer.current)
    setNotice(message)
    noticeTimer.current = window.setTimeout(() => setNotice(''), 3200)
  }

  const saveData = (nextData, message) => {
    setData(nextData)
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextData))
      if (message) showNotice(message)
    } catch (error) {
      console.error('Could not save SocraticLab demo data to localStorage.', error)
      showNotice('Hindi na-save sa browser. Subukang magbakante ng storage at ulitin.')
    }
  }

  const startSession = (defaults = {}) => {
    setSessionForm({
      concept: defaults.concept ?? '',
      track: defaults.track ?? tracks[0].title,
      persona: defaults.persona ?? data.persona,
    })
    setModal({ type: 'session' })
  }

  const openInquiry = (inquiry) => {
    setReply(data.inquiryReplies[inquiry.id] ?? '')
    setModal({ type: 'inquiry', inquiry })
  }

  const openGemini = () => {
    setGeminiPrompt('')
    setGeminiMessages([])
    setGeminiError('')
    setModal({ type: 'gemini' })
  }

  const askGemini = async (event) => {
    event.preventDefault()
    const prompt = geminiPrompt.trim()
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (!prompt || geminiLoading) return
    if (!apiKey) {
      setGeminiError('Walang API key. Ilagay ang VITE_GEMINI_API_KEY sa .env.local at i-restart ang dev server.')
      return
    }

    setGeminiLoading(true)
    setGeminiError('')
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: 'You are a Socratic study partner helping a student learn, not a tool for producing copy-ready homework. For every reply, first respond briefly and helpfully to what the student said, using a small hint, a simple explanation, or an example when useful. Never provide a complete essay, finished assignment, or answer intended to be submitted as the student’s own work. Instead, break problems into manageable steps and ask exactly one specific, open-ended question that makes the student explain, predict, compare, or try the next step. Always end by asking the student a question, including when they ask a direct factual question. Adapt to their answer: acknowledge sound reasoning, gently correct misconceptions, and give another hint before asking the next question. Keep replies concise, supportive, and age-appropriate. Do not use asterisks or Markdown formatting; use plain paragraphs or numbered lists. Do not claim to be human.' }],
          },
          contents: [
            ...geminiMessages.map((message) => ({
              role: message.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: message.text }],
            })),
            { role: 'user', parts: [{ text: prompt }] },
          ],
          generationConfig: { temperature: 0.7, maxOutputTokens: 700 },
        }),
      })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error?.message ?? `Gemini API request failed (${response.status}).`)
      }
      const answer = result.candidates?.[0]?.content?.parts
        ?.map((part) => part.text)
        .filter(Boolean)
        .join('\n')
      if (!answer) throw new Error('Walang text response mula sa Gemini. Subukan ulit gamit ang ibang tanong.')
      setGeminiMessages((messages) => [
        ...messages,
        { role: 'user', text: prompt },
        { role: 'assistant', text: cleanGeminiFormatting(answer) },
      ])
      setGeminiPrompt('')
    } catch (error) {
      console.error('Gemini request failed.', error)
      setGeminiError(error instanceof Error ? error.message : 'Hindi makakonekta sa Gemini. Suriin ang network at subukan ulit.')
    } finally {
      setGeminiLoading(false)
    }
  }

  const submitSession = (event) => {
    event.preventDefault()
    const concept = sessionForm.concept.trim()
    if (!concept) return

    const track = tracks.find((item) => item.title === sessionForm.track)
    const session = {
      id: `session-${Date.now()}`,
      title: concept,
      track: track?.title ?? sessionForm.track,
      persona: sessionForm.persona,
      status: 'Mastered (88%)',
      state: 'good',
      duration: '12m 00s',
      output: 'First-principles explanation saved locally',
      createdAt: new Date().toISOString(),
    }
    const nextData = {
      ...data,
      sessions: [session, ...data.sessions],
      trackProgress: {
        ...data.trackProgress,
        [session.track]: Math.min(100, (data.trackProgress[session.track] ?? track?.progress ?? 0) + 3),
      },
    }
    setModal(null)
    saveData(nextData, `Session complete! Na-save ang "${concept}" sa demo log.`)
  }

  const submitReply = (event) => {
    event.preventDefault()
    const answer = reply.trim()
    if (!answer || modal?.type !== 'inquiry') return
    const inquiry = modal.inquiry
    saveData({
      ...data,
      inquiryReplies: { ...data.inquiryReplies, [inquiry.id]: answer },
    }, `Na-save ang sagot mo kay ${inquiry.name.split(' ')[0]}.`)
    setModal(null)
  }

  const cyclePersona = () => {
    const currentIndex = personas.indexOf(data.persona)
    const nextPersona = personas[(currentIndex + 1) % personas.length]
    saveData({ ...data, persona: nextPersona }, `AI persona: ${nextPersona}.`)
  }

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(nextTheme)
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
    } catch (error) {
      console.error('Could not save SocraticLab theme preference to localStorage.', error)
      showNotice('Theme changed, but the preference could not be saved on this device.')
    }
  }

  const exportLogs = () => {
    const rows = [['Concept taught', 'Track', 'AI persona', 'Diagnostic state', 'Duration', 'Pedagogical output']]
    data.sessions.forEach((session) => rows.push([session.title, session.track, session.persona, session.status, session.duration, session.output]))
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    link.download = 'socraticlab-teaching-sessions.csv'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000)
    showNotice('Na-export ang kasalukuyang teaching session log.')
  }

  const navItems = [
    ['Learning Hub', 'book', '#home'],
    ['Socratic Studio', 'spark', '#tracks'],
    ['Concept Trees & Mastery', 'network', '#concept-graph'],
    ['Pedagogical Jargon Insights', 'brain', '#insights'],
  ]

  return (
    <div className="app-shell" data-theme={theme}>
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="SocraticLab home">
          <span className="brand-mark"><Icon name="spark" size={19} /></span>
          <span><strong>SocraticLab</strong><small>REVERSE STUDIO</small></span>
        </a>
        <nav aria-label="Study perspectives" className="sidebar-nav">
          <p className="nav-heading">STUDY PERSPECTIVES</p>
          {navItems.map(([item, icon, href]) => (
            <a
              key={item}
              className={`nav-link ${activeNav === item ? 'selected' : ''}`}
              href={href}
              onClick={() => setActiveNav(item)}
            >
              <Icon name={icon} size={14} /><span>{item}</span>
            </a>
          ))}
        </nav>
        <div className="persona">
          <p className="nav-heading">TARGET AI PERSONA</p>
          <button type="button" className="persona-button" onClick={cyclePersona} title="Click to switch AI persona">
            <span>{data.persona}</span><b>Change</b>
          </button>
        </div>
        <div className="health-card">
          <div><strong>Socratic Health</strong><b>92%</b></div>
          <div className="health-bar"><span /></div>
          <small>Cognitive flow stable</small>
        </div>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}>
          <Icon name={theme === 'light' ? 'moon' : 'sun'} size={14} />
          <span>{theme === 'light' ? 'Dark mode' : 'Light mode'}</span>
        </button>
      </aside>

      <main className="main-area" id="home">
        <header className="topbar">
          <div className="topic-pill"><small>ACTIVE TOPIC</small><span>Pointers &amp; Dynamic Memory in C++</span></div>
          <div className="topic-pill secondary-topic"><small>ACTIVE TOPIC</small><span>Pointers &amp; Dynamic Memory in C++</span></div>
        </header>

        <div className="dashboard">
          <section className="welcome-card">
            <div className="welcome-copy">
              <p className="eyebrow"><span className="ready-dot" /> SOCRATIC ENGINE READY <i>Semester 2 · Fall Track</i></p>
              <h1>Welcome back, Alex!</h1>
              <p>Your AI agents are ready for today’s sessions. Try to master a concept, teach it from first principles.</p>
              <div className="welcome-actions">
                <button className="button primary" type="button" onClick={() => startSession()}>＋ Start New Teaching Session</button>
                <button className="button quiet" type="button" onClick={() => startSession({ concept: 'Pointers & Heap Memory', track: tracks[0].title })}><Icon name="play" size={12} /> Resume: Pointers &amp; Heap Memory (Theo)</button>
                <button className="button quiet" type="button" onClick={openGemini}><Icon name="spark" size={12} /> Ask SocraticLab</button>
              </div>
            </div>
            <span className="online-status"><i /> Cognitive Synthesis Engine Online</span>
          </section>

          <section className="inquiries-section">
            <div className="section-heading">
              <h2><Icon name="person" size={16} /> Pending AI Peer Inquiries <span className="count-pill">{inquiries.filter((inquiry) => !data.inquiryReplies[inquiry.id]).length} Awaiting Socratic Answers</span></h2>
              <p>Responses calibrate AI student mastery models</p>
            </div>
            <div className="inquiry-grid">
              {inquiries.map((inquiry, index) => {
                const answered = Boolean(data.inquiryReplies[inquiry.id])
                return (
                  <article className={`inquiry-card ${index === 0 ? 'theo-card' : 'maya-card'}`} key={inquiry.id}>
                    <div className="peer-icon"><Icon name="person" size={19} /><i>{answered ? '✓' : index === 0 ? '!' : '✓'}</i></div>
                    <div className="inquiry-content">
                      <div className="inquiry-top"><strong>{inquiry.name}</strong><time>{answered ? 'Answered' : inquiry.age}</time></div>
                      <small className="topic-label">{inquiry.topic}</small>
                      <p>{answered ? `Your answer: “${data.inquiryReplies[inquiry.id]}”` : `“${inquiry.question}”`}</p>
                      <div className="inquiry-bottom">
                        <span className={answered || index === 1 ? 'success-text' : 'warning-text'}>{answered ? '✓ Answer saved on this device' : index === 0 ? '◉ Clarification Needed: Memory Leaks' : '✓ Ready for Proof by Analogy'}</span>
                        <button type="button" className={`button ${index === 0 && !answered ? 'tiny-primary' : 'quiet tiny'}`} onClick={() => openInquiry(inquiry)}>{answered ? 'Edit Answer' : index === 0 ? 'Reply in Studio' : 'Answer'} <Icon name="chevron" size={12} /></button>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="tracks-section" id="tracks">
            <div className="section-heading">
              <h2><Icon name="flask" size={16} /> Active Teaching Tracks</h2>
              <a className="view-all" href="#tracks">VIEW ALL SUBJECTS <Icon name="arrow" size={12} /></a>
            </div>
            <div className="track-grid">
              {tracks.map((track) => {
                const progress = data.trackProgress[track.title] ?? track.progress
                return (
                  <article className="track-card" key={track.title}>
                    <div className="track-card-top"><span className={`track-icon ${track.icon}`}><Icon name={track.icon} size={18} /></span><span className={`track-flag ${track.flagType}`}>{track.flag}</span></div>
                    <small className="track-type">{track.type}</small>
                    <h3>{track.title}</h3>
                    <p className="track-description">{track.desc}</p>
                    <div className="mastery-label"><span>Mastery Score</span><b>{progress}% Verified</b></div>
                    <div className="mastery-bar"><span style={{ width: `${progress}%` }} /></div>
                    <p className="verified-count">{track.verified}<span> AI Student: {track.student}</span></p>
                    <div className="track-next"><span><small>Next In Line</small><b>{track.next}</b></span><button type="button" className="button quiet tiny" onClick={() => startSession({ track: track.title, concept: track.next })}>Enter Studio</button></div>
                  </article>
                )
              })}
            </div>
          </section>

          <section className="graph-section" id="concept-graph">
            <div className="graph-header">
              <div><h2><Icon name="network" size={16} /> Concept Trees &amp; Live Mastery Graph</h2><p>First-principles dependency mapping generated from your teaching conversations.</p></div>
              <div className="graph-legend"><span className="green"><Icon name="check" size={12} /> 42 Mastered</span><span><Icon name="refresh" size={12} /> 8 In Progress</span><span className="orange"><Icon name="alert" size={12} /> 3 Gaps Spotted</span><span className="muted"><Icon name="lock" size={11} /> 15 Locked</span></div>
            </div>
            <div className="concept-flow">
              {[
                { icon: 'check', name: 'Pointers Basics', state: '100% Mastered', style: 'done' },
                { icon: 'refresh', name: 'Stack vs Heap', state: 'In Progress', style: 'progress' },
                { icon: 'alert', name: 'Memory Leaks', state: 'Gap Spotted', style: 'gap' },
                { icon: 'lock', name: 'Smart Pointers', state: 'Locked', style: 'locked' },
              ].map((node) => (
                <div className={`concept-node ${node.style}`} key={node.name}>
                  <span className="node-icon"><Icon name={node.icon} size={18} /></span>
                  <b>{node.name}</b><small>{node.state}</small>
                </div>
              ))}
            </div>
            <div className="graph-footer"><span>Path: Foundations of Systems Architecture &gt; Memory Management</span><button className="button quiet tiny" type="button" onClick={() => setModal({ type: 'graph' })}>Open Full Interactive Concept Graph <Icon name="arrow" size={12} /></button></div>
          </section>

          <section className="sessions-section" id="sessions">
            <div className="section-heading">
              <h2><Icon name="calendar" size={15} /> Recent Teaching Sessions (Feynman Log)</h2>
              <button type="button" className="export-button" onClick={exportLogs}>EXPORT LOGS <Icon name="download" size={12} /></button>
            </div>
            <div className="sessions-table-wrap">
              <table>
                <thead><tr><th>CONCEPT TAUGHT</th><th>AI PERSONA</th><th>DIAGNOSTIC STATE</th><th>DURATION</th><th>PEDAGOGICAL OUTPUT</th><th>ACTIONS</th></tr></thead>
                <tbody>{data.sessions.map((session) => (
                  <tr key={session.id}>
                    <td><strong>{session.title}</strong><small>Track: {session.track}</small></td>
                    <td><span className="persona-dot" />{session.persona}</td>
                    <td><span className={`state-pill ${session.state}`}>{session.state === 'good' ? '✓' : '●'} {session.status}</span></td>
                    <td>{session.duration}</td>
                    <td className={session.state === 'needs-review' ? 'output-warning' : ''}>{session.output}</td>
                    <td className="row-actions"><button type="button" onClick={() => setModal({ type: 'notes', session })}>Review<br />Notes</button><button type="button" className={session.state === 'needs-review' ? 'emphasis' : ''} onClick={() => startSession({ concept: session.title, track: getTrackTitle(session.track), persona: session.persona })}>{session.state === 'needs-review' ? <>Address<br />Gap</> : <>Re-<br />teach</>}</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </section>

          <section className="summary-stats" id="insights" aria-label="Learning summary">
            <article><span className="stat-icon pencil">✎</span><div><strong>{data.sessions.length > initialData.sessions.length ? '89.8%' : '89.2%'}</strong><small>Jargon-Free Simplicity Index</small></div></article>
            <article><span className="stat-icon pulse"><Icon name="pulse" size={19} /></span><div><strong>3.4x Faster</strong><small>Retention vs. Passive Reading</small></div></article>
            <article><span className="stat-icon target"><Icon name="target" size={19} /></span><div><strong>{38 + Math.max(0, data.sessions.length - initialData.sessions.length)} Queries Solved</strong><small>AI Student Misconceptions Cleared</small></div></article>
          </section>
        </div>
      </main>

      {modal && (
        <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setModal(null) }}>
          {modal.type === 'session' && (
            <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="session-modal-title">
              <button className="modal-close" type="button" aria-label="Close" onClick={() => setModal(null)}>×</button>
              <p className="eyebrow"><span className="ready-dot" /> LOCAL DEMO SESSION</p>
              <h2 id="session-modal-title">Teach a concept</h2>
              <p className="modal-description">Complete a sample first-principles session. Your result will appear in the log and stay in this browser.</p>
              <form onSubmit={submitSession}>
                <label htmlFor="session-concept">Concept to teach</label>
                <input id="session-concept" autoFocus required maxLength={100} value={sessionForm.concept} onChange={(event) => setSessionForm({ ...sessionForm, concept: event.target.value })} placeholder="e.g. How pointers work" />
                <label htmlFor="session-track">Subject track</label>
                <select id="session-track" value={sessionForm.track} onChange={(event) => setSessionForm({ ...sessionForm, track: event.target.value })}>
                  {tracks.map((track) => <option key={track.title} value={track.title}>{track.title}</option>)}
                </select>
                <label htmlFor="session-persona">AI student</label>
                <select id="session-persona" value={sessionForm.persona} onChange={(event) => setSessionForm({ ...sessionForm, persona: event.target.value })}>
                  {personas.map((persona) => <option key={persona} value={persona}>{persona}</option>)}
                  {!personas.includes(sessionForm.persona) && <option value={sessionForm.persona}>{sessionForm.persona}</option>}
                </select>
                <div className="modal-actions"><button className="button quiet" type="button" onClick={() => setModal(null)}>Cancel</button><button className="button primary" type="submit">Finish demo session</button></div>
              </form>
            </section>
          )}
          {modal.type === 'gemini' && (
            <section className="demo-modal gemini-modal" role="dialog" aria-modal="true" aria-labelledby="gemini-modal-title">
              <button className="modal-close" type="button" aria-label="Close" onClick={() => setModal(null)}>×</button>
              <p className="eyebrow"><span className="ready-dot" /> GEMINI STUDY PARTNER</p>
              <h2 id="gemini-modal-title">Ask SocraticLab</h2>
              <p className="modal-description">Learn through hints and follow-up questions. Gemini will help you work it out instead of giving you a copy-ready answer.</p>
              {geminiMessages.length > 0 && (
                <div className="gemini-chat" aria-live="polite">
                  {geminiMessages.map((message, index) => (
                    <div className={`gemini-message ${message.role === 'assistant' ? 'gemini-answer' : 'gemini-question'}`} key={`${message.role}-${index}`}>
                      <b>{message.role === 'assistant' ? 'Gemini' : 'You'}</b>
                      <p>{message.text}</p>
                    </div>
                  ))}
                </div>
              )}
              {geminiLoading && <p className="gemini-thinking" role="status">Gemini is thinking of a hint and a question...</p>}
              {geminiError && <p className="gemini-error" role="alert">{geminiError}</p>}
              <form className="gemini-input" onSubmit={askGemini}>
                <label htmlFor="gemini-prompt">{geminiMessages.length > 0 ? 'Your response' : 'What are you working on?'}</label>
                <textarea id="gemini-prompt" autoFocus required maxLength={2000} rows={3} value={geminiPrompt} onChange={(event) => setGeminiPrompt(event.target.value)} placeholder={geminiMessages.length > 0 ? 'Share your thinking or answer Gemini’s question...' : 'Ask about a topic or problem you want to understand...'} />
                <div className="modal-actions"><button className="button quiet" type="button" onClick={() => setModal(null)}>Close</button><button className="button primary" type="submit" disabled={geminiLoading || !geminiPrompt.trim()}>{geminiLoading ? 'Thinking...' : geminiMessages.length > 0 ? 'Send reply' : 'Ask SocraticLab'}</button></div>
              </form>
            </section>
          )}
          {modal.type === 'inquiry' && (
            <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="reply-modal-title">
              <button className="modal-close" type="button" aria-label="Close" onClick={() => setModal(null)}>×</button>
              <p className="eyebrow"><span className="ready-dot" /> SOCRATIC REPLY STUDIO</p>
              <h2 id="reply-modal-title">Reply to {modal.inquiry.name.split(' ')[0]}</h2>
              <p className="modal-question">“{modal.inquiry.question}”</p>
              <form onSubmit={submitReply}>
                <label htmlFor="inquiry-reply">Your explanation</label>
                <textarea id="inquiry-reply" autoFocus required maxLength={500} rows={5} value={reply} onChange={(event) => setReply(event.target.value)} placeholder="Explain it in your own words..." />
                <div className="modal-actions"><button className="button quiet" type="button" onClick={() => setModal(null)}>Cancel</button><button className="button primary" type="submit">Save answer</button></div>
              </form>
            </section>
          )}
          {modal.type === 'notes' && (
            <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="notes-modal-title">
              <button className="modal-close" type="button" aria-label="Close" onClick={() => setModal(null)}>×</button>
              <p className="eyebrow"><span className="ready-dot" /> FEYNMAN SESSION NOTES</p>
              <h2 id="notes-modal-title">{modal.session.title}</h2>
              <dl className="notes-list"><div><dt>Track</dt><dd>{modal.session.track}</dd></div><div><dt>AI student</dt><dd>{modal.session.persona}</dd></div><div><dt>Result</dt><dd>{modal.session.status}</dd></div><div><dt>Teaching insight</dt><dd>{modal.session.output}</dd></div></dl>
              <div className="modal-actions"><button className="button quiet" type="button" onClick={() => setModal(null)}>Close</button><button className="button primary" type="button" onClick={() => startSession({ concept: modal.session.title, track: getTrackTitle(modal.session.track), persona: modal.session.persona })}>Re-teach this concept</button></div>
            </section>
          )}
          {modal.type === 'graph' && (
            <section className="demo-modal" role="dialog" aria-modal="true" aria-labelledby="graph-modal-title">
              <button className="modal-close" type="button" aria-label="Close" onClick={() => setModal(null)}>×</button>
              <p className="eyebrow"><span className="ready-dot" /> MASTERY GRAPH</p>
              <h2 id="graph-modal-title">Your concept path</h2>
              <p className="modal-description">Start with pointers, connect stack and heap behavior, then revisit memory leaks before moving on to smart pointers.</p>
              <div className="modal-actions"><button className="button quiet" type="button" onClick={() => setModal(null)}>Close</button><button className="button primary" type="button" onClick={() => startSession({ concept: 'Memory Leaks', track: tracks[0].title })}>Practice Memory Leaks</button></div>
            </section>
          )}
        </div>
      )}
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default App
