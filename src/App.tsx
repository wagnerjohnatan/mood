import { useState } from 'react'
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

function App() {
  const [activeMood, setActiveMood] = useState<Mood>('Para todos')
  const [view, setView] = useState<'feed' | 'board' | 'analytics'>('feed')
  const [isPlaying, setIsPlaying] = useState(false)
  const [activeCapsule, setActiveCapsule] = useState<number | null>(null)
  const [lowKey, setLowKey] = useState(false)
  const filteredPosts = activeMood === 'Para todos' ? posts : posts.filter((post) => post.mood === activeMood)

  return (
    <div className={`app-shell ${activeCapsule !== null ? 'capsule-active' : ''} ${lowKey ? 'low-key' : ''}`}>
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">m</span><span>mood</span></div>
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
          <div><strong>lia</strong><span>@lia.mood</span></div>
          <button aria-label="Mais opções">•••</button>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div><p className="eyebrow">Descobrir</p><h1>Qual é o seu mood?</h1></div>
          <div className="top-actions">
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
              <img src={post.image} alt={post.title} />
              <div className="post-overlay">
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
