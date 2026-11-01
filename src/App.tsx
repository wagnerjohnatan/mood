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
  const filteredPosts = activeMood === 'Para todos' ? posts : posts.filter((post) => post.mood === activeMood)

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand"><span className="brand-mark">m</span><span>mood</span></div>
        <nav className="main-nav" aria-label="Navegação principal">
          <button className="nav-item active"><span>⌂</span> Home</button>
          <button className="nav-item"><span>⌕</span> Explorar</button>
          <button className="nav-item"><span>◫</span> Moodboard</button>
          <button className="nav-item"><span>♢</span> Notificações</button>
          <button className="nav-item"><span>◉</span> Meu perfil</button>
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
            <button className="sound-button"><span>♫</span><span className="sound-bars"><i></i><i></i><i></i></span></button>
          </div>
        </header>

        <div className="mood-filters" role="tablist" aria-label="Filtros por estado de espírito">
          {moods.map((mood) => (
            <button key={mood} role="tab" aria-selected={activeMood === mood} className={activeMood === mood ? 'mood-chip active' : 'mood-chip'} onClick={() => setActiveMood(mood)}>
              <span className={`mood-dot ${mood.toLowerCase().replace('ó', 'o')}`}></span>{mood}
            </button>
          ))}
        </div>

        <section className="feed-grid" aria-live="polite">
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
        </section>
      </main>
    </div>
  )
}

export default App
