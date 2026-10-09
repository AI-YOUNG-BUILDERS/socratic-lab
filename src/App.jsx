import { useRef, useState } from 'react'
import './App.css'

function Icon({ name, size = 16 }) {
  const paths = {
    spark: <><path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-2-5.8L4 11l6-2.2L12 3Z" /><path d="m19 14 .9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14Z" /></>,
    upload: <><path d="M12 16V4m0 0L7 9m5-5 5 5" /><path d="M20 16v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8m-8 4h8" /></>,
    send: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
    chevron: <path d="m9 18 6-6-6-6" />,
    bulb: <><path d="M9 18h6m-5 4h4m-2-20a7 7 0 0 0-4 12.7c.6.4 1 1.1 1 1.8h6c0-.7.4-1.4 1-1.8A7 7 0 0 0 12 2Z" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
    pause: <><path d="M8 5v14m8-14v14" /></>,
  }

  return (
    <svg
      aria-hidden="true"
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

const startingMessages = [
  {
    id: 1,
    role: 'student',
    time: '10:42 AM',
    text: "I was implementing Dijkstra's algorithm for my assignment and noticed it computes the wrong shortest path when we insert a negative edge from vertex B to C. Why can't Dijkstra simply relax vertex C again once its distance gets updated?",
  },
  {
    id: 2,
    role: 'assistant',
    time: '10:43 AM',
    text: "Consider Dijkstra's fundamental assumption: once a node is extracted from the Priority Queue and added to Visited, what does the algorithm permanently assume about d[u]?",
  },
]

function App() {
  const [messages, setMessages] = useState(startingMessages)
  const [prompt, setPrompt] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [selectedChoice, setSelectedChoice] = useState(1)
  const [weight, setWeight] = useState(-5)
  const [allowRevisit, setAllowRevisit] = useState(false)
  const [activeTab, setActiveTab] = useState('Force-directed')
  const [fileName, setFileName] = useState('CS171_GraphAlgorithms.pdf')
  const fileInput = useRef(null)

  const submitPrompt = (event) => {
    event.preventDefault()
    const text = prompt.trim()
    if (!text) return
    setMessages((current) => [
      ...current,
      { id: Date.now(), role: 'student', time: 'Now', text },
    ])
    setPrompt('')
  }

  const chooseFile = (event) => {
    const file = event.target.files?.[0]
    if (file) setFileName(file.name)
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#workspace" aria-label="SocraticLab home">
          <span className="brand-mark"><Icon name="spark" size={21} /></span>
          <span className="brand-name">Socratic<span>Lab</span></span>
        </a>
        <span className="track-badge"><span className="status-dot" /> AI + EDUCATION TRACK</span>
        <div className="topbar-actions">
          <button className="attached-file" type="button" onClick={() => fileInput.current?.click()}>
            <Icon name="file" size={14} />
            <span>{fileName}</span>
            <span className="file-status"><Icon name="check" size={11} /></span>
          </button>
          <button className="upload-button" type="button" onClick={() => fileInput.current?.click()}>
            <Icon name="upload" size={15} />
            <span>Upload materials</span>
            <small>PDF / PPTX / DOCX</small>
          </button>
          <input
            ref={fileInput}
            className="visually-hidden"
            type="file"
            accept=".pdf,.pptx,.docx"
            onChange={chooseFile}
            aria-label="Upload learning materials"
          />
          <button className="icon-button settings-button" type="button" aria-label="Workspace settings">
            <span className="settings-glyph">☷</span>
          </button>
          <button className="avatar" type="button" aria-label="Account menu">A</button>
        </div>
      </header>

      <div className="workspace-layout" id="workspace">
        <aside className="sidebar">
          <div>
            <p className="sidebar-label">WORKSPACE NAV</p>
            <nav className="nav-list" aria-label="Workspace navigation">
              <a className="nav-item active" href="#chat">Socratic Workspace</a>
              <a className="nav-item" href="#concept-map">Knowledge Graph</a>
              <a className="nav-item" href="#materials">Curated Materials</a>
              <a className="nav-item" href="#sandbox">Algorithmic Drills</a>
            </nav>
          </div>
          <div className="engine-status">
            <span className="status-dot" />
            <div><strong>FEATHERLESS NODE</strong><small>Latency: 14ms · 70B</small></div>
          </div>
        </aside>

        <main className="work-area">
          <section className="chat-column" id="chat" aria-label="Socratic chat workspace">
            <div className="learning-card">
              <div className="breadcrumbs">Computer Science <span>/</span> CS171 <span>/</span> Graph Algorithms <span>/</span></div>
              <div className="learning-heading">
                <div>
                  <p className="eyebrow"><Icon name="spark" size={13} /> DIALECTIC MODE: ACTIVE PROBING</p>
                  <span className="objective-label">LEARNING OBJECTIVE</span>
                </div>
                <strong>Proving greedy invariant correctness under negative weights</strong>
              </div>
            </div>

            <div className="conversation">
              <div className="message-meta">
                <span className="student-avatar">AM</span>
                <span><b>Alex M.</b> (Student)</span>
                <time>10:42 AM</time>
              </div>
              {messages.map((message) => message.role === 'student' ? (
                <div className="student-message" key={message.id}>
                  {message.text}
                </div>
              ) : (
                <article className="ai-message" key={message.id}>
                  <div className="ai-message-head">
                    <span className="ai-avatar"><Icon name="spark" size={14} /></span>
                    <strong>Socratic Engine</strong>
                    <span className="model-badge">FEATHERLESS-LLM-INFERENCE</span>
                    <time>{message.time}</time>
                  </div>
                  <div className="ai-card">
                    <p className="diagnostic-label">DIAGNOSTIC INVARIANT PROBE</p>
                    <p className="probe-question">{message.text}</p>
                    <div className="source-card" id="materials">
                      <div className="source-heading"><Icon name="file" size={14} /> <strong>{fileName}</strong><span>· Slide 18, Page 42</span></div>
                      <span className="rag-label">RAG Grounded</span>
                      <p>“Lemma 24: If all edge weights <code>w(u, v) ≥ 0</code>, then for each vertex <code>v ∈ S</code>, <code>d(v) = δ(s, v)</code>, at the moment it is marked settled.”</p>
                    </div>
                    <p className="choice-prompt">SELECT THE INVARIANT THAT BREAKS WHEN W(U, V) &lt; 0:</p>
                    <div className="choice-list" role="group" aria-label="Choose an invariant">
                      <button
                        className={`choice-option ${selectedChoice === 0 ? 'selected' : ''}`}
                        type="button"
                        onClick={() => setSelectedChoice(0)}
                      >
                        <span className="choice-radio">{selectedChoice === 0 && <Icon name="check" size={12} />}</span>
                        <span>A. The priority queue underflows on negative keys</span>
                        {selectedChoice === 0 && <span className="selected-tag">Selected</span>}
                      </button>
                      <button
                        className={`choice-option ${selectedChoice === 1 ? 'selected' : ''}`}
                        type="button"
                        onClick={() => setSelectedChoice(1)}
                      >
                        <span className="choice-radio">{selectedChoice === 1 && <Icon name="check" size={12} />}</span>
                        <span>B. The greedy choice guarantee: <code>d[u]</code> is no longer guaranteed to be minimal when extracted</span>
                        {selectedChoice === 1 && <span className="selected-tag">Selected</span>}
                      </button>
                      <button
                        className={`choice-option ${selectedChoice === 2 ? 'selected' : ''}`}
                        type="button"
                        onClick={() => setSelectedChoice(2)}
                      >
                        <span className="choice-radio">{selectedChoice === 2 && <Icon name="check" size={12} />}</span>
                        <span>C. The graph becomes disconnected</span>
                        {selectedChoice === 2 && <span className="selected-tag">Selected</span>}
                      </button>
                    </div>
                    <button className="hint-button" type="button" onClick={() => setShowHint((value) => !value)}>
                      <Icon name="bulb" size={14} />
                      {showHint ? 'Hide conceptual hint' : 'Reveal a conceptual hint'}
                      <Icon name="chevron" size={13} />
                    </button>
                    {showHint && (
                      <div className="hint-content">
                        Think about the order in which vertices become settled. Could a path discovered later still offer a cheaper route back to a vertex you already finalized?
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </div>

            <form className="prompt-composer" onSubmit={submitPrompt}>
              <div className="composer-tools">
                <span><span className="terminal-prompt">&gt;_</span> INTERACTIVE SOCRATIC TERMINAL</span>
                <div><button type="button">＋ Math/LaTeX</button><button type="button">＋ Code Snippet</button></div>
              </div>
              <div className="composer-input-wrap">
                <input
                  value={prompt}
                  onChange={(event) => setPrompt(event.target.value)}
                  placeholder="Because the priority queue permanently pops the minimum…"
                  aria-label="Ask SocraticLab a question"
                />
                <button className="send-button" type="submit">Submit reasoning <Icon name="send" size={14} /></button>
              </div>
              <p className="composer-note"><span>ⓘ</span> SocraticLab guides via questions and mental models; it does not hand you your homework solutions.</p>
            </form>
          </section>

          <aside className="right-column">
            <section className="concept-section" id="concept-map">
              <div className="section-title-row">
                <div className="section-title"><Icon name="spark" size={16} /><span>KNOWLEDGE GRAPH<br />REASONING PATH</span></div>
                <span className="focus-badge"><span className="status-dot" /> DIAGNOSTIC FOCUS: ACTIVE</span>
              </div>
              <div className="graph-toolbar">
                {['Force-directed', 'Tree Hierarchy', 'Edge Weights'].map((tab) => (
                  <button
                    className={activeTab === tab ? 'active' : ''}
                    type="button"
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
                <button className="graph-icon-button" type="button" aria-label="Expand concept graph">⛶</button>
                <button className="graph-icon-button" type="button" aria-label="Search concept graph">⌕</button>
              </div>
              <div className="graph-canvas">
                <svg className="graph-lines" viewBox="0 0 420 280" preserveAspectRatio="none" aria-hidden="true">
                  <path d="M90 70 C110 105 130 120 165 145" />
                  <path d="M165 145 C185 115 220 105 250 95" />
                  <path d="M165 145 C220 145 265 135 310 120" />
                  <path d="M165 145 C150 180 105 200 75 220" />
                  <path d="M250 95 C275 95 295 100 310 120" className="dashed-edge" />
                  <circle cx="165" cy="145" r="42" className="node-halo" />
                </svg>
                <div className="graph-node node-theory"><span className="node-check">✓</span> Graph Theory</div>
                <div className="graph-node node-greedy"><span className="node-pulse" /> Greedy Choice Property</div>
                <div className="graph-node node-queue">Min-Heap Queue</div>
                <div className="graph-node node-bellman">Bellman-Ford</div>
                <div className="graph-node node-relax">D(V) Relaxation</div>
                <div className="graph-count">5 Nodes <span>·</span> 4 Dependencies</div>
              </div>
              <p className="graph-caption">{activeTab === 'Force-directed' ? 'Explore how these ideas connect.' : `Viewing ${activeTab.toLowerCase()} layout.`}</p>
            </section>

            <section className="simulation-card" id="sandbox">
              <div className="simulation-heading">
                <span className="bolt-icon">ϟ</span>
                <div><h2>EDGE CASE SIMULATION</h2><p>DIJKSTRA VS. NEGATIVE WEIGHT ANOMALY</p></div>
              </div>
              <p className="hypothesis"><strong>Hypothesis:</strong> What if edge <code>A → B</code> has an edge weight of <b>{weight}</b>? Observe how early visitation settlement creates algorithmic blindness.</p>
              <div className="slider-heading">
                <label htmlFor="edge-weight">Weight w(A, B)</label>
                <span className="weight-value">{weight}</span>
              </div>
              <input
                id="edge-weight"
                className="weight-slider"
                type="range"
                min="-10"
                max="10"
                value={weight}
                onChange={(event) => setWeight(Number(event.target.value))}
              />
              <div className="slider-ticks"><span>-10 (Extreme Negative)</span><span>0</span><span>+10 (Positive)</span></div>
              <button
                className="revisit-toggle-row"
                type="button"
                role="switch"
                aria-checked={allowRevisit}
                onClick={() => setAllowRevisit((value) => !value)}
              >
                <span><strong>Allow Re-visitation (SPFA Mode)</strong><small>Re-enqueue settled vertices if a shorter path is found</small></span>
                <span className={`toggle ${allowRevisit ? 'on' : ''}`}><span /></span>
              </button>
              <div className="memory-heading">LIVE MEMORY: VISITED ARRAY STATE</div>
              <div className="memory-grid">
                <div><strong>Node S</strong><span>settled</span><b>(0)</b></div>
                <div className="invalid"><strong>Node A</strong><span>settled</span><b>{weight - 2}</b></div>
                <div><strong>Node C</strong><span>{allowRevisit ? 're-queued' : 'unvisited'}</span><b>{allowRevisit ? 'updating' : '∞'}</b></div>
              </div>
              <div className={`alert-card ${allowRevisit ? 'resolved' : ''}`}>
                <span className="alert-symbol">{allowRevisit ? '✓' : '△'}</span>
                <div>
                  <strong>{allowRevisit ? 'RE-VISITATION ENABLED' : 'INVARIANT VIOLATION TRIGGERED'}</strong>
                  <p>{allowRevisit ? 'Settled vertices can be re-enqueued when a shorter path is discovered.' : `Suboptimal path S → A → B (Cost = ${weight - 2}) discovered after Node B was already permanently marked as settled.`}</p>
                </div>
              </div>
              <button className="run-button" type="button" onClick={() => setWeight((current) => (current < 0 ? current + 1 : -5))}>
                <span>▷</span> Run Step-by-Step Relaxation <Icon name="arrow" size={13} />
              </button>
            </section>
          </aside>
        </main>
      </div>
    </div>
  )
}

export default App
