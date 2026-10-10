import { useState } from 'react'
import './App.css'

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

const sessions = [
  { title: 'Stacks vs Heap Memory Allocation', track: 'Data Structures', persona: 'Theo (Peer, Lv. 2)', status: 'Mastered (94%)', state: 'good', duration: '18m 42s', output: '3 intuitive analogies verified' },
  { title: 'Binary Search Tree Inversions', track: 'Algorithms', persona: 'Maya (Skeptic, Lv. 3)', status: 'Needs Review (1 Gap)', state: 'needs-review', duration: '24m 10s', output: 'Induction gap detected on edge cases' },
  { title: 'Virtual Memory & Paging Tables', track: 'Operating Systems', persona: 'Theo (Peer, Lv. 2)', status: 'Mastered (91%)', state: 'good', duration: '32m 05s', output: 'Zero argument fallacies awarded' },
]

function App() {
  const [activeNav, setActiveNav] = useState('Learning Hub')
  const [notice, setNotice] = useState('')

  const showNotice = (message) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 3000)
  }

  const exportLogs = () => {
    const rows = [['Concept taught', 'Track', 'AI persona', 'Diagnostic state', 'Duration', 'Pedagogical output']]
    sessions.forEach((session) => rows.push([session.title, session.track, session.persona, session.status, session.duration, session.output]))
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"', '""')}"`).join(',')).join('\n')
    const link = document.createElement('a')
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
    link.download = 'socraticlab-teaching-sessions.csv'
    link.click()
    window.setTimeout(() => URL.revokeObjectURL(link.href), 1000)
    showNotice('Teaching session log exported.')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#home" aria-label="SocraticLab home">
          <span className="brand-mark"><Icon name="spark" size={19} /></span>
          <span><strong>SocraticLab</strong><small>REVERSE STUDIO</small></span>
        </a>
        <nav aria-label="Study perspectives" className="sidebar-nav">
          <p className="nav-heading">STUDY PERSPECTIVES</p>
          {[
            ['Learning Hub', 'book'],
            ['Socratic Studio', 'spark'],
            ['Concept Trees & Mastery', 'network'],
            ['Pedagogical Jargon Insights', 'brain'],
          ].map(([item, icon]) => (
            <a
              key={item}
              className={`nav-link ${activeNav === item ? 'selected' : ''}`}
              href={item === 'Concept Trees & Mastery' ? '#concept-graph' : '#home'}
              onClick={() => setActiveNav(item)}
            >
              <Icon name={icon} size={14} /><span>{item}</span>
            </a>
          ))}
        </nav>
        <div className="persona">
          <p className="nav-heading">TARGET AI PERSONA</p>
          <button type="button" className="persona-button" onClick={() => showNotice('Persona set to Curious Peer (Lv. 2).')}>
            <span>Curious Peer (Lv. 2)</span><b>Adaptive</b>
          </button>
        </div>
        <div className="health-card">
          <div><strong>Socratic Health</strong><b>92%</b></div>
          <div className="health-bar"><span /></div>
          <small>Cognitive flow stable</small>
        </div>
      </aside>

      <main className="main-area" id="home">
        <header className="topbar">
          <div className="topic-pill"><small>ACTIVE TOPIC</small><span>Pointers &amp; Dynamic Memory in C++</span></div>
          <div className="topbar-pill streak"><Icon name="flame" size={13} /><span><b>4-Day Streak</b></span></div>
          <div className="topbar-pill saved"><span className="save-dot" /><b>Draft Saved</b></div>
          <div className="topic-pill secondary-topic"><small>ACTIVE TOPIC</small><span>Pointers &amp; Dynamic Memory in C++</span></div>
          <div className="topbar-pill streak secondary-streak"><Icon name="flame" size={13} /><span><b>4-Day Streak</b></span></div>
          <div className="topbar-pill saved"><span className="save-dot" /><b>Draft Saved</b></div>
        </header>

        <div className="dashboard">
          <section className="welcome-card">
            <div className="welcome-copy">
              <p className="eyebrow"><span className="ready-dot" /> SOCRATIC ENGINE READY <i>Semester 2 · Fall Track</i></p>
              <h1>Welcome back, Alex!</h1>
              <p>Your AI agents are ready for today’s sessions. Try to master a concept, teach it from first principles.</p>
              <div className="welcome-actions">
                <button className="button primary" type="button" onClick={() => showNotice('New teaching session ready. Choose a subject track to begin.')}>＋ Start New Teaching Session</button>
                <button className="button quiet" type="button" onClick={() => showNotice('Resuming: Pointers & Heap Memory (Theo).') }><Icon name="play" size={12} /> Resume: Pointers &amp; Heap Memory (Theo)</button>
              </div>
            </div>
            <div className="welcome-metrics">
              <div className="metric-card streak-metric"><span className="metric-icon flame"><Icon name="flame" size={17} /></span><div><strong>7-Day Streak</strong><small><b>840 XP</b> · 14 Concepts Verified</small></div></div>
              <div className="metric-card level-metric"><span className="metric-icon rocket"><Icon name="rocket" size={17} /></span><div><strong>BANKaiTive Engine (Lv. 4)</strong><div className="xp-bar"><span /></div><small>320 XP to Lv. 5</small></div></div>
            </div>
            <span className="online-status"><i /> Cognitive Synthesis Engine Online</span>
          </section>

          <section className="inquiries-section">
            <div className="section-heading">
              <h2><Icon name="person" size={16} /> Pending AI Peer Inquiries <span className="count-pill">2 Awaiting Socratic Answers</span></h2>
              <p>Responses calibrate AI student mastery models</p>
            </div>
            <div className="inquiry-grid">
              <article className="inquiry-card theo-card">
                <div className="peer-icon"><Icon name="person" size={19} /><i>!</i></div>
                <div className="inquiry-content">
                  <div className="inquiry-top"><strong>Theo (Curious Peer • Lv. 2)</strong><time>12m ago</time></div>
                  <small className="topic-label">C++ POINTERS &amp; MEMORY</small>
                  <p>“Alex, what actually happens to the stack pointer when a function returns without calling delete on raw allocated memory?”</p>
                  <div className="inquiry-bottom"><span className="warning-text">◉ Clarification Needed: Memory Leaks</span><button type="button" className="button tiny-primary" onClick={() => showNotice('Opening Socratic reply studio for Theo.')}>Reply in Studio <Icon name="chevron" size={12} /></button></div>
                </div>
              </article>
              <article className="inquiry-card maya-card">
                <div className="peer-icon"><Icon name="person" size={19} /><i>✓</i></div>
                <div className="inquiry-content">
                  <div className="inquiry-top"><strong>Maya (Skeptical Interlocutor • Lv. 3)</strong><time>1h ago</time></div>
                  <small className="topic-label">OPERATING SYSTEMS CONCURRENCY</small>
                  <p>“Can a deadlock occur if both threads acquire their nested mutexes in the exact same strict hierarchical order? Prove it.”</p>
                  <div className="inquiry-bottom"><span className="success-text">✓ Ready for Proof by Analogy</span><button type="button" className="button quiet tiny" onClick={() => showNotice('Starting a session with Maya.')}>Start Session <Icon name="chevron" size={12} /></button></div>
                </div>
              </article>
            </div>
          </section>

          <section className="tracks-section" id="tracks">
            <div className="section-heading">
              <h2><Icon name="flask" size={16} /> Active Teaching Tracks</h2>
              <a className="view-all" href="#tracks">VIEW ALL SUBJECTS <Icon name="arrow" size={12} /></a>
            </div>
            <div className="track-grid">
              {tracks.map((track) => (
                <article className="track-card" key={track.title}>
                  <div className="track-card-top"><span className={`track-icon ${track.icon}`}><Icon name={track.icon} size={18} /></span><span className={`track-flag ${track.flagType}`}>{track.flag}</span></div>
                  <small className="track-type">{track.type}</small>
                  <h3>{track.title}</h3>
                  <p className="track-description">{track.desc}</p>
                  <div className="mastery-label"><span>Mastery Score</span><b>{track.progress}% Verified</b></div>
                  <div className="mastery-bar"><span style={{ width: `${track.progress}%` }} /></div>
                  <p className="verified-count">{track.verified}<span> AI Student: {track.student}</span></p>
                  <div className="track-next"><span><small>Next In Line</small><b>{track.next}</b></span><button type="button" className="button quiet tiny" onClick={() => showNotice(`Entering ${track.title} studio.`)}>Enter Studio</button></div>
                </article>
              ))}
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
            <div className="graph-footer"><span>Path: Foundations of Systems Architecture &gt; Memory Management</span><button className="button quiet tiny" type="button" onClick={() => showNotice('Interactive concept graph opened.')}>Open Full Interactive Concept Graph <Icon name="arrow" size={12} /></button></div>
          </section>

          <section className="sessions-section">
            <div className="section-heading">
              <h2><Icon name="calendar" size={15} /> Recent Teaching Sessions (Feynman Log)</h2>
              <button type="button" className="export-button" onClick={exportLogs}>EXPORT LOGS <Icon name="download" size={12} /></button>
            </div>
            <div className="sessions-table-wrap">
              <table>
                <thead><tr><th>CONCEPT TAUGHT</th><th>AI PERSONA</th><th>DIAGNOSTIC STATE</th><th>DURATION</th><th>PEDAGOGICAL OUTPUT</th><th>ACTIONS</th></tr></thead>
                <tbody>{sessions.map((session, index) => (
                  <tr key={session.title}>
                    <td><strong>{session.title}</strong><small>Track: {session.track}</small></td>
                    <td><span className={`persona-dot persona-${index}`} />{session.persona}</td>
                    <td><span className={`state-pill ${session.state}`}>{session.state === 'good' ? '✓' : '●'} {session.status}</span></td>
                    <td>{session.duration}</td>
                    <td className={session.state === 'needs-review' ? 'output-warning' : ''}>{session.output}</td>
                    <td className="row-actions"><button type="button" onClick={() => showNotice(`Reviewing notes for ${session.title}.`)}>Review<br />Notes</button><button type="button" className={index === 1 ? 'emphasis' : ''} onClick={() => showNotice(index === 1 ? `Addressing the mastery gap in ${session.title}.` : `Re-teaching ${session.title}.`)}>{index === 1 ? <>Address<br />Gap</> : <>Re-<br />teach</>}</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          </section>

          <section className="summary-stats" aria-label="Learning summary">
            <article><span className="stat-icon pencil">✎</span><div><strong>89.2%</strong><small>Jargon-Free Simplicity Index</small></div></article>
            <article><span className="stat-icon pulse"><Icon name="pulse" size={19} /></span><div><strong>3.4x Faster</strong><small>Retention vs. Passive Reading</small></div></article>
            <article><span className="stat-icon target"><Icon name="target" size={19} /></span><div><strong>38 Queries Solved</strong><small>AI Student Misconceptions Cleared</small></div></article>
          </section>
        </div>
      </main>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default App
