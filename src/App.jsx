import { useState, useEffect, useRef } from 'react'

/* ---------- scroll reveal ---------- */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in-view')
            io.unobserve(e.target)
          }
        })
      },
      { threshold: 0.15 }
    )
    document
      .querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-pop')
      .forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ---------- typing effect ---------- */
function useTyped(words, speed = 110, pause = 1400) {
  const [txt, setTxt] = useState('')
  const [i, setI] = useState(0)
  const [del, setDel] = useState(false)
  useEffect(() => {
    const cur = words[i % words.length]
    let t
    if (!del && txt.length < cur.length) {
      t = setTimeout(() => setTxt(cur.slice(0, txt.length + 1)), speed)
    } else if (!del && txt.length === cur.length) {
      t = setTimeout(() => setDel(true), pause)
    } else if (del && txt.length > 0) {
      t = setTimeout(() => setTxt(cur.slice(0, txt.length - 1)), speed / 2)
    } else {
      setDel(false)
      setI(i + 1)
    }
    return () => clearTimeout(t)
  }, [txt, del, i, words, speed, pause])
  return txt
}

/* ---------- falling hearts ---------- */
function Hearts() {
  const hearts = Array.from({ length: 12 }, (_, k) => ({
    left: Math.random() * 100,
    dur: 9 + Math.random() * 10,
    delay: Math.random() * 12,
    size: 12 + Math.random() * 16,
    sym: ['♡', '❀', '✿', '✦'][k % 4],
  }))
  return (
    <div className="hearts">
      {hearts.map((h, k) => (
        <span
          key={k}
          className="heart-fall"
          style={{
            left: h.left + '%',
            fontSize: h.size + 'px',
            color: k % 2 ? '#e3997e' : '#eeb59c',
            animationDuration: h.dur + 's',
            animationDelay: h.delay + 's',
          }}
        >
          {h.sym}
        </span>
      ))}
    </div>
  )
}

/* ---------- nav ---------- */
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  const links = ['About', 'Project', 'Experience', 'Skills', 'Contact']
  return (
    <nav className={'nav' + (scrolled ? ' scrolled' : '')}>
      <div
        className="nav-logo"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Noor <span className="dot">♡</span>
      </div>
      <div className="nav-burger" onClick={() => setOpen(!open)}>
        ☰
      </div>
      <div className={'nav-links' + (open ? ' open' : '')}>
        {links.map((l) => (
          <a key={l} href={'#' + l.toLowerCase()} onClick={() => setOpen(false)}>
            {l}
          </a>
        ))}
      </div>
    </nav>
  )
}

/* ---------- progress bar ---------- */
function Progress() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const h = () => {
      const sc = document.documentElement.scrollHeight - window.innerHeight
      setW(sc > 0 ? (window.scrollY / sc) * 100 : 0)
    }
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <div className="progress-bar" style={{ width: w + '%' }} />
}

/* ---------- decorations ---------- */
function Decor() {
  const items = [
    { e: '✿', top: '12%', left: '6%', size: 34, anim: 'floaty 7s ease-in-out infinite' },
    { e: '❀', top: '70%', left: '4%', size: 28, anim: 'floatyRev 9s ease-in-out infinite' },
    { e: '✦', top: '25%', left: '92%', size: 24, anim: 'twinkle 4s ease-in-out infinite' },
    { e: '♡', top: '80%', left: '90%', size: 30, anim: 'pulseHeart 3s ease-in-out infinite' },
    { e: '❁', top: '45%', left: '95%', size: 26, anim: 'sway 6s ease-in-out infinite' },
  ]
  return (
    <>
      {items.map((it, k) => (
        <div
          key={k}
          className="bg-decor"
          style={{
            top: it.top,
            left: it.left,
            fontSize: it.size,
            color: k % 2 ? '#e3997e' : '#eeb59c',
            animation: it.anim,
          }}
        >
          {it.e}
        </div>
      ))}
    </>
  )
}

/* ---------- hero ---------- */
function Hero() {
  const typed = useTyped([
    'Humanities Graduate',
    'Creative Thinker',
    'Researcher',
    'Storyteller',
  ])
  return (
    <section className="hero" id="home">
      <Decor />
      <div className="hero-grid">
        <div>
          <span className="hero-eyebrow">
            <span className="star">✦</span> Welcome to my little corner
          </span>
          <h1>
            Hi, I'm <span className="name">Noor ul Ain</span>
          </h1>
          <div className="role">
            A passionate <span className="typed">{typed}</span>
          </div>
          <p className="intro">
            A Humanities graduate from COMSATS University with a love for ideas,
            words, and meaningful work. Curious by nature, creative at heart, and
            always ready to learn something new.
          </p>
          <div className="hero-btns">
            <a className="btn btn-primary" href="#contact">
              Let's Connect ♡
            </a>
            <a className="btn btn-ghost" href="#project">
              See My Work ✦
            </a>
          </div>
        </div>
        <div className="hero-art">
          <div className="blob-wrap">
            <div className="ring" />
            <div className="blob">
              <img src="/photo.jpg" alt="Noor ul Ain" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} />
            </div>
            <div className="float-chip chip-1">✿ Humanities</div>
            <div className="float-chip chip-2">🎓 COMSATS '26</div>
            <div className="float-chip chip-3">♡ Creative</div>
          </div>
        </div>
      </div>
      <div className="scroll-cue">
        scroll down ❀<br />▾
      </div>
    </section>
  )
}

/* ---------- about ---------- */
function About() {
  const pills = [
    { i: '🎓', t: 'COMSATS University' },
    { i: '📚', t: 'Humanities Department' },
    { i: '📅', t: '2022 – 2026' },
    { i: '🌸', t: 'Graduate' },
    { i: '✨', t: 'Lifelong Learner' },
  ]
  return (
    <section id="about">
      <h2 className="sec-title reveal">
        A Little <span className="accent">About Me</span>
      </h2>
      <p className="sec-sub reveal">get to know me</p>
      <div className="about-grid">
        <div className="about-card reveal-left">
          <span className="sticker">🌷</span>
          <div className="about-photo"><img src="/photo.jpg" alt="Noor ul Ain" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 'inherit' }} /></div>
        </div>
        <div className="about-text reveal-right">
          <h3>Nice to meet you! 👋</h3>
          <p>
            I'm Noor ul Ain, a Humanities graduate from COMSATS University, where
            I studied from 2022 to 2026. My time in the Humanities department
            shaped the way I think critically, empathetically, and always with
            curiosity.
          </p>
          <p>
            I love exploring ideas, understanding people, and turning thoughts
            into clear, meaningful work. Whether it's research, writing, or
            creative problem-solving, I bring care and a fresh perspective to
            everything I do.
          </p>
          <p>
            Right now, I'm excited to start a new chapter, taking everything
            I've learned and building a career I'm proud of. 🌸
          </p>
          <div className="info-pills">
            {pills.map((p, k) => (
              <span key={k} className="info-pill">
                {p.i} {p.t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- final year project (placeholder) ---------- */
function Project() {
  return (
    <section id="project">
      <h2 className="sec-title reveal">
        Final Year <span className="accent">Project</span>
      </h2>
      <p className="sec-sub reveal">my capstone work</p>
      <div className="fyp-card reveal-pop">
        <span className="corner tl">✦</span>
        <span className="corner tr">✧</span>
        <span className="corner bl">✧</span>
        <span className="corner br">✦</span>
        <span className="fyp-badge">CAPSTONE PROJECT</span>
        <h3>Project Title Coming Soon ✨</h3>
        <div className="fyp-placeholder">
          <div className="icon">🎀</div>
          <p>
            This space is reserved for your Final Year Project.
            <br />
            The project title, description, highlights, and outcomes will be
            added here, so please share xd 💕
          </p>
        </div>
        <div className="fyp-slots">
          <div className="fyp-slot">
            <div className="num">01</div>
            <div className="lbl">Project Overview</div>
          </div>
          <div className="fyp-slot">
            <div className="num">02</div>
            <div className="lbl">Key Highlights</div>
          </div>
          <div className="fyp-slot">
            <div className="num">03</div>
            <div className="lbl">Results &amp; Impact</div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------- experience ---------- */
function Experience() {
  const items = [
    {
      date: 'Jan 2025 – Mar 2025',
      role: 'Content Writing Intern',
      org: 'Sample Company Pvt. Ltd.',
      desc: 'Researched and wrote engaging articles and social media content. Collaborated with the marketing team to develop a consistent brand voice across platforms.',
      tags: ['Content Writing', 'Research', 'Social Media'],
    },
    {
      date: 'Apr 2025 – Jun 2025',
      role: 'Research Assistant (Part-time)',
      org: 'Sample Research Group',
      desc: 'Assisted in collecting and organizing qualitative data for ongoing humanities studies. Prepared summaries, literature reviews, and supported report writing.',
      tags: ['Qualitative Research', 'Data Analysis', 'Report Writing'],
    },
  ]
  return (
    <section id="experience">
      <h2 className="sec-title reveal">
        My <span className="accent">Experience</span>
      </h2>
      <p className="sec-sub reveal">where I've grown</p>
      <p className="sample-note reveal">
        ✎ Sample data, I will replace it with real experience
      </p>
      <div className="timeline" style={{ marginTop: '30px' }}>
        {items.map((it, k) => (
          <div
            key={k}
            className={'tl-item ' + (k % 2 ? 'reveal-right' : 'reveal-left')}
          >
            <div className="tl-card">
              <span className="tl-date">{it.date}</span>
              <h4>{it.role}</h4>
              <div className="org">{it.org}</div>
              <p>{it.desc}</p>
              <div className="tl-tags">
                {it.tags.map((t) => (
                  <span key={t} className="tl-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ---------- skills ---------- */
function SkillBar({ name, pct, icon }) {
  const ref = useRef(null)
  const [w, setW] = useState(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setW(pct)
          io.disconnect()
        }
      },
      { threshold: 0.4 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [pct])
  return (
    <div className="skill-row" ref={ref}>
      <div className="skill-head">
        <span className="name">
          {icon} {name}
        </span>
        <span className="pct">{pct}%</span>
      </div>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: w + '%' }} />
      </div>
    </div>
  )
}

function Skills() {
  const hard = [
    { name: 'Academic Writing', pct: 92, icon: '✍️' },
    { name: 'Research & Analysis', pct: 88, icon: '🔍' },
    { name: 'Critical Thinking', pct: 90, icon: '💭' },
    { name: 'Communication', pct: 94, icon: '💬' },
    { name: 'MS Office', pct: 85, icon: '💻' },
    { name: 'Content Creation', pct: 87, icon: '🎨' },
  ]
  const soft = [
    'Creativity ✨',
    'Teamwork 🤝',
    'Empathy 💕',
    'Adaptability 🌱',
    'Time Management ⏰',
    'Problem Solving 🧩',
    'Curiosity 🔭',
    'Presentation 🎤',
  ]
  return (
    <section id="skills">
      <h2 className="sec-title reveal">
        My <span className="accent">Skills</span>
      </h2>
      <p className="sec-sub reveal">things I'm good at</p>
      <div className="skills-wrap">
        <div className="skills-grid reveal">
          {hard.map((s) => (
            <SkillBar key={s.name} {...s} />
          ))}
        </div>
        <div className="soft-skills reveal">
          {soft.map((s) => (
            <span key={s} className="soft-chip">
              {s}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------- contact ---------- */
function Contact() {
  // Add your real URLs here later
  const socials = [
    { cls: 'sb-linkedin', icon: 'in', url: '#', label: 'LinkedIn' },
    { cls: 'sb-email', icon: '✉', url: 'mailto:#', label: 'Email' },
    { cls: 'sb-insta', icon: '◎', url: '#', label: 'Instagram' },
    { cls: 'sb-behance', icon: 'Bē', url: '#', label: 'Behance' },
  ]
  return (
    <section id="contact" className="contact">
      <h2 className="sec-title reveal">
        Let's <span className="accent">Connect</span>
      </h2>
      <p className="sec-sub reveal">say hello</p>
      <div className="contact-card reveal-pop">
        <span className="heart">💌</span>
        <h3>I'd love to hear from you!</h3>
        <p>
          Whether it's an opportunity, a collaboration, or just a friendly
          Hello, my inbox is always open. Let's create something wonderful
          together. 🌷
        </p>
        <div className="socials">
          {socials.map((s, k) => (
            <a
              key={k}
              className={'social-btn ' + s.cls}
              href={s.url}
              title={s.label}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
            >
              {s.icon}
            </a>
          ))}
        </div>
        <a className="contact-mail" href="mailto:#">
          Hunain ko apna email btain takay woh yahan daal sakay ♡
        </a>
      </div>
    </section>
  )
}

/* ---------- footer ---------- */
function Footer() {
  return (
    <footer>
      <div className="made">
        Designed with <span className="heartbeat">♡</span> for Noor ul Ain
      </div>
      <div style={{ marginTop: '6px', fontSize: '13px', opacity: 0.9 }}>
        © {new Date().getFullYear()} Noor ul Ain · Humanities Portfolio
      </div>
    </footer>
  )
}

/* ---------- app ---------- */
export default function App() {
  useReveal()
  return (
    <>
      <Hearts />
      <Progress />
      <Nav />
      <Hero />
      <About />
      <Project />
      <Experience />
      <Skills />
      <Contact />
      <Footer />
    </>
  )
}
