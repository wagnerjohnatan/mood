import { useEffect, useState } from 'react'
import './App.css'

const moods = ['Para todos', 'Hype', 'Chill', 'Foco', 'Adrenaline', 'Melancólico'] as const

type Mood = (typeof moods)[number]

const posts = [
  { id: 1, author: 'mila', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&auto=format&fit=crop', mood: 'Chill', title: 'A pausa certa', likes: '2.4k' },
  { id: 2, author: 'lucas.flow', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&auto=format&fit=crop', mood: 'Foco', title: 'No ritmo da noite', likes: '8.1k' },
  { id: 3, author: 'nina.wav', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=900&auto=format&fit=crop', mood: 'Hype', title: 'Fim de tarde', likes: '3.7k' },
  { id: 4, author: 'theo.studio', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?w=900&auto=format&fit=crop', mood: 'Adrenaline', title: 'Manhã em movimento', likes: '6.2k' },
  { id: 5, author: 'violet.sun', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=120&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1497250681960-ef046c08a56e?w=900&auto=format&fit=crop', mood: 'Melancólico', title: 'Depois da chuva', likes: '1.9k' },
  { id: 6, author: 'andre', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&auto=format&fit=crop', mood: 'Foco', title: 'Horizonte', likes: '4.5k' },
]

type AuthMode = 'login' | 'signup'

function AuthScreen({ onAuthenticated }: { onAuthenticated: (name: string) => void }) {
  const [mode, setMode] = useState<AuthMode>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [enrolling, setEnrolling] = useState(false)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')

    if (mode === 'signup') {
      if (!name.trim() || !email.trim() || !password.trim()) {
        setError('Preencha todos os campos para criar sua conta.')
        return
      }
      setEnrolling(true)
      await new Promise((resolve) => window.setTimeout(resolve, 900))

      const accounts = JSON.parse(localStorage.getItem('mood-accounts') || '[]') as Array<{ email: string; name: string }>
      if (accounts.some((account) => account.email.toLowerCase() === email.trim().toLowerCase())) {
        setError('Este e-mail já possui uma conta vinculada.')
        setEnrolling(false)
        return
      }
      accounts.push({ email: email.trim(), name: name.trim() })
      localStorage.setItem('mood-accounts', JSON.stringify(accounts))
      localStorage.setItem('mood-session', name.trim())
      setEnrolling(false)
      onAuthenticated(name.trim())
      return
    }

    if (!email.trim() || !password.trim()) {
      setError('Informe seu e-mail e senha.')
      return
    }
    const accounts = JSON.parse(localStorage.getItem('mood-accounts') || '[]') as Array<{ email: string; name: string }>
    const account = accounts.find((item) => item.email.toLowerCase() === email.trim().toLowerCase())
    if (!account) {
      setError('Conta não encontrada. Crie uma conta primeiro.')
      return
    }
    localStorage.setItem('mood-session', account.name)
    onAuthenticated(account.name)
  }

  return (
    <main className="auth-page">
      <section className="auth-visual" aria-label="Mood">
        <div className="auth-brand">mood</div>
        <div className="auth-orbit orbit-one"><img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=700&auto=format&fit=crop" alt="Paisagem mood" /></div>
        <div className="auth-orbit orbit-two"><img src="https://images.unsplash.com/photo-1519681393784-d120267933ba?w=500&auto=format&fit=crop" alt="Paisagem foco" /></div>
        <div className="auth-orbit orbit-three"><img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=500&auto=format&fit=crop" alt="Paisagem hype" /></div>
        <div className="auth-copy"><span>SEU ESPAÇO</span><strong>Momentos que fazem<br />sentido.</strong></div>
      </section>

      <section className="auth-panel">
        <div className="auth-card">
          <div className="auth-heading">
            <p>{mode === 'login' ? 'BEM-VINDO DE VOLTA' : 'COMECE AGORA'}</p>
            <h1>{mode === 'login' ? 'Entre na sua conta' : 'Crie sua conta'}</h1>
          </div>

          <div className="auth-tabs" role="tablist">
            <button className={mode === 'login' ? 'active' : ''} onClick={() => { setMode('login'); setError('') }} role="tab" aria-selected={mode === 'login'}>Entrar</button>
            <button className={mode === 'signup' ? 'active' : ''} onClick={() => { setMode('signup'); setError('') }} role="tab" aria-selected={mode === 'signup'}>Cadastrar</button>
          </div>

          <form className="auth-form" onSubmit={submit}>
            {mode === 'signup' && <label>Nome<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Como você quer ser chamado?" autoComplete="name" /></label>}
            <label>E-mail<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="voce@email.com" autoComplete="email" /></label>
            <label>Senha<div className="password-input"><input type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="••••••••" autoComplete={mode === 'login' ? 'current-password' : 'new-password'} /><button type="button" aria-label="Mostrar senha">◉</button></div></label>

            {mode === 'signup' && <div className="biometric-box"><div className="face-mark" aria-hidden="true"><span></span></div><div><strong>Vínculo biométrico</strong><p>Associa uma biometria a uma única conta.</p></div><i>●</i></div>}
            {error && <div className="auth-error" role="alert">{error}</div>}

            <button className="auth-submit" type="submit" disabled={enrolling}>{enrolling ? <><span className="spinner"></span> Validando biometria...</> : mode === 'login' ? 'Entrar com biometria' : 'Cadastrar e ativar biometria'} </button>
          </form>

          <p className="auth-privacy">Ao continuar, você concorda com os <button>Termos</button> e a <button>Privacidade</button>.</p>
        </div>
      </section>
    </main>
  )
}

function App() {
  const [sessionName, setSessionName] = useState(() => localStorage.getItem('mood-session'))
  const [activeMood, setActiveMood] = useState<Mood>('Para todos')
  const [view, setView] = useState<'feed' | 'board' | 'analytics'>('feed')
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeCapsule, setActiveCapsule] = useState<number | null>(null)
  const [lowKey, setLowKey] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [lightMode, setLightMode] = useState(() => localStorage.getItem('mood-theme') === 'light')
  const [overlayText, setOverlayText] = useState<Record<number, 'light' | 'dark'>>({})

  useEffect(() => {
    posts.forEach((post) => {
      const image = new Image()
      image.crossOrigin = 'anonymous'
      image.onload = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = 80
          canvas.height = 20
          const context = canvas.getContext('2d', { willReadFrequently: true })
          if (!context) return
          context.drawImage(image, 0, 0, canvas.width, canvas.height)
          const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data
          let luminance = 0
          for (let index = 0; index < pixels.length; index += 4) {
            luminance += (pixels[index] * 299 + pixels[index + 1] * 587 + pixels[index + 2] * 114) / 1000
          }
          const average = luminance / (pixels.length / 4)
          setOverlayText((current) => ({ ...current, [post.id]: average < 140 ? 'light' : 'dark' }))
        } catch {
          setOverlayText((current) => ({ ...current, [post.id]: 'light' }))
        }
      }
      image.src = post.image
    })
  }, [])

  useEffect(() => {
    document.documentElement.dataset.theme = lightMode ? 'light' : 'dark'
    localStorage.setItem('mood-theme', lightMode ? 'light' : 'dark')
  }, [lightMode])
  const filteredPosts = activeMood === 'Para todos' ? posts : posts.filter((post) => post.mood === activeMood)

  if (!sessionName) return <AuthScreen onAuthenticated={setSessionName} />

  return (
    <div className={`app-shell ${activeCapsule !== null ? 'capsule-active' : ''} ${lowKey ? 'low-key' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className="sidebar">
        <div className="brand"><span>mood</span></div>
        <button className="sidebar-toggle" onClick={() => setSidebarCollapsed((collapsed) => !collapsed)} aria-label={sidebarCollapsed ? 'Expandir menu' : 'Retrair menu'} title={sidebarCollapsed ? 'Expandir menu' : 'Retrair menu'}>{sidebarCollapsed ? '›' : '‹'}</button>
        <nav className="main-nav" aria-label="Navegação principal">
          <button className={`nav-item ${view === 'feed' ? 'active' : ''}`} onClick={() => setView('feed')}><span>⌂</span> Home</button>
          <button className="nav-item"><span>⌕</span> Explorar</button>
          <button className={`nav-item ${view === 'board' ? 'active' : ''}`} onClick={() => setView('board')}><span>◫</span> Moodboard</button>
          <button className="nav-item"><span>♢</span> Notificações</button>
          <button className={`nav-item ${view === 'analytics' ? 'active' : ''}`} onClick={() => setView('analytics')}><span>◉</span> Analytics</button>
        </nav>
        <button className="create-button">+ Criar</button>
        <div className="sidebar-profile">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" alt="Perfil de Lia" />
          <div><strong>{sessionName}</strong><span>@{sessionName.toLowerCase().replace(/\s+/g, '.')}</span></div>
          <button aria-label="Sair da conta" title="Sair" onClick={() => { localStorage.removeItem('mood-session'); setSessionName(null) }}>↪</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><p className="eyebrow">Descobrir</p></div>
          <div className="top-actions">
            <button className="icon-button theme-toggle" aria-label={lightMode ? 'Ativar modo escuro' : 'Ativar modo claro'} aria-pressed={lightMode} onClick={() => setLightMode((enabled) => !enabled)}>{lightMode ? '☾' : '☀'}</button>
            <button className="icon-button" aria-label="Buscar">⌕</button>
            <button className={`lowkey-toggle ${lowKey ? 'active' : ''}`} onClick={() => setLowKey((enabled) => !enabled)} aria-pressed={lowKey}><span className="toggle-track"><i></i></span><span>Low-Key</span></button>
            <button className={`sound-button ${isPlaying ? 'playing' : ''}`} onClick={() => setIsPlaying((playing) => !playing)} aria-label={isPlaying ? 'Pausar soundscape' : 'Reproduzir soundscape'}><span>♫</span><span className="sound-bars"><i></i><i></i><i></i></span></button>          </div>
        </header>

        <section className="capsules" aria-label="Cápsulas temporárias">
          {[['lia','Melancólico','https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop'],['mila','Chill','https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop'],['theo','Hype','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop'],['nina','Adrenaline','https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=100&auto=format&fit=crop']].map((capsule,index)=>(
            <button key={capsule[0]} className={`capsule capsule-${index + 1} ${activeCapsule === index ? 'viewing' : ''}`} onClick={() => setActiveCapsule(activeCapsule === index ? null : index)}>
              <img src={capsule[2]} alt="" /><strong>{capsule[0]}</strong><span>{capsule[1]}</span>
            </button>
          ))}
        </section>

        <div className="mood-filters" role="tablist" aria-label="Filtros por estado de espírito">
          {moods.map((mood) => (
            <button key={mood} role="tab" aria-selected={activeMood === mood} className={activeMood === mood ? 'mood-chip active' : 'mood-chip'} onClick={() => setActiveMood(mood)}>
              <span className={`mood-dot ${mood.toLowerCase().replace('ó', 'o')}`}></span>{mood}
            </button>
          ))}
        </div>

        {view === 'feed' && <section className="feed-grid" aria-live="polite">
          {filteredPosts.map((post, index) => (
            <article className={`post-card post-${index % 4}`} key={post.id}>
              <img src={post.image} crossOrigin="anonymous" alt={post.title} />
              <div className={`post-overlay overlay-${overlayText[post.id] || 'light'}`}>
                <div className="post-author"><img src={post.avatar} alt="" /><strong>@{post.author}</strong></div>
                <span className="post-mood">{post.mood}</span>
              </div>
              <div className="post-footer"><strong>{post.title}</strong><span>♡ {post.likes}</span></div>
            </article>
          ))}
        </section>}

        {view === 'board' && <section className="moodboard" aria-label="Moodboard dinâmico">
          {posts.slice(0, 5).map((post, index) => (
            <article draggable key={post.id} className={`board-card board-card-${index + 1}`}>
              <img src={post.image} alt={post.title} />
              <div><span>{post.mood}</span><strong>{post.title}</strong></div>
            </article>
          ))}
        </section>}

        {view === 'analytics' && <section className="analytics" aria-label="Analytics de creator">
          <div className="metric-grid">
            <article><span>Engajamento</span><strong>8,4%</strong><small>+12% este mês</small></article>
            <article><span>Alcance</span><strong>124k</strong><small>+18,2% esta semana</small></article>
            <article><span>Retenção</span><strong>68%</strong><small>7% acima da média</small></article>
          </div>
          <article className="chart-card"><div className="chart-head"><div><span>Performance</span><strong>Interações por hora</strong></div><button>Últimos 7 dias⌄</button></div><div className="chart-bars">{[42,58,38,76,52,88,64,92,70,48,82,56].map((height,index)=><i key={index} style={{height:`${height}%`}}></i>)}</div></article>
          <article className="retention-card"><span>Retenção por público</span><div><strong>Seguidores</strong><b>72%</b></div><div className="progress"><i style={{width:'72%'}}></i></div><div><strong>Não seguidores</strong><b>46%</b></div><div className="progress"><i style={{width:'46%'}}></i></div></article>
        </section>}
      </main>
    </div>
  )
}

export default App
