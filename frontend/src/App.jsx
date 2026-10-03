import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import Lenis from 'lenis'
import { Zap, Lock, FolderOpen, Link2, MonitorSmartphone, Film, Download, Image as ImageIcon, FileText } from 'lucide-react'
import { FaAndroid, FaApple } from 'react-icons/fa6'

const features = [
  { icon: Zap, title: 'Lightning fast', text: 'Files stream straight between devices over your Wi-Fi at full speed. No upload, no waiting.' },
  { icon: Lock, title: 'Private by design', text: 'Nothing touches a server. Your files go from phone to Mac and nowhere else.' },
  { icon: FolderOpen, title: 'Browse & send', text: 'Pick photos, videos and documents from your phone and drop them on your Mac in a tap.' },
  { icon: Link2, title: 'Pair once', text: 'Pair a single time and Droply reconnects automatically whenever you are on the same network.' },
  { icon: MonitorSmartphone, title: 'Native on Mac', text: 'A real desktop app, not a browser tab. Lives in your menu bar, ready when you are.' },
  { icon: Film, title: 'Any size, any type', text: 'Send a 4K video or a thousand photos. There is no file size cap.' },
]

const steps = [
  ['Install', 'Get Droply on your Android phone and on your Mac.'],
  ['Pair', 'Join the same Wi-Fi and pair the two devices once.'],
  ['Drop', 'Send anything. It lands on the other side instantly.'],
]

const fade = { hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } } }
const Reveal = ({ children, ...p }) => (
  <motion.div variants={fade} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} {...p}>{children}</motion.div>
)

function download(platform) {
  return `/downloads/${platform}/`
}

export default function App() {
  const [stats, setStats] = useState(null)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  useEffect(() => {
    const lenis = new Lenis()
    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  useEffect(() => {
    fetch('/api/info/').then((r) => r.json()).then(setStats).catch(() => {})
  }, [])

  const size = (k) => (stats?.[k]?.size_mb ? `${stats[k].size_mb} MB` : '')

  return (
    <>
      <motion.div className="progress" style={{ scaleX: progress }} />
      <div className="aurora" aria-hidden><i /><i /><i /></div>

      <header className="nav">
        <a className="brand" href="#top"><img src="/static/icon.png" alt="" /> Droply</a>
        <nav>
          <a href="#features">Features</a>
          <a href="#how">How it works</a>
          <a href="#download" className="pill">Download</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <motion.img className="logo" src="/static/icon.png" alt="Droply"
            initial={{ scale: 0.6, opacity: 0, rotate: -12 }} animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }} />
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.8 }}>
            Drop files between <span className="grad">Android</span> and <span className="grad">Mac</span>.
          </motion.h1>
          <motion.p className="lead" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            Photos, videos, documents. Sent in seconds, with no cables, no accounts and no cloud.
          </motion.p>
          <motion.div className="cta" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.8 }}>
            <a className="btn primary" href={download('android')}><FaAndroid size={18} /> Download for Android</a>
            <a className="btn glass" href={download('mac')}><FaApple size={18} /> Download for Mac</a>
          </motion.div>

          <div className="devices" aria-hidden>
            <motion.div className="phone" animate={{ y: [0, -14, 0] }} transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}>
              <div className="file f1"><ImageIcon size={12} /> IMG_2041.jpg</div>
              <div className="file f2"><Film size={12} /> holiday.mp4</div>
              <div className="file f3"><FileText size={12} /> invoice.pdf</div>
            </motion.div>
            <div className="beam">
              {[0, 1, 2, 3, 4].map((i) => <motion.b key={i} animate={{ x: ['0%', '100%'], opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.4, ease: 'linear' }} />)}
            </div>
            <motion.div className="laptop" animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}>
              <div className="screen"><span>Receiving…</span><div className="bar"><motion.i animate={{ width: ['0%', '100%'] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }} /></div></div>
            </motion.div>
          </div>
        </section>

        <section id="features" className="section">
          <Reveal><h2>Everything you need.<br /><span className="grad">Nothing you don't.</span></h2></Reveal>
          <div className="grid">
            {features.map((f, i) => (
              <motion.article key={f.title} className="card" variants={fade} initial="hidden" whileInView="show"
                viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ y: -8 }}>
                <span className="ico"><f.icon size={26} strokeWidth={2} /></span>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="how" className="section">
          <Reveal><h2>Three steps. <span className="grad">Done.</span></h2></Reveal>
          <div className="steps">
            {steps.map(([t, d], i) => (
              <Reveal key={t}><div className="step"><b>{i + 1}</b><div><h3>{t}</h3><p>{d}</p></div></div></Reveal>
            ))}
          </div>
        </section>

        <section id="download" className="section">
          <Reveal><h2>Get <span className="grad">Droply</span></h2></Reveal>
          <div className="grid two">
            <Reveal><div className="card dl">
              <span className="ico brand-ico"><FaAndroid size={30} /></span><h3>Android</h3>
              <p>APK {size('android')}</p>
              <a className="btn primary" href={download('android')}><Download size={18} /> Download APK</a>
              <small>Allow “Install unknown apps” for your browser if asked.</small>
              {stats && <small className="count">{stats.android.downloads.toLocaleString()} downloads</small>}
            </div></Reveal>
            <Reveal><div className="card dl">
              <span className="ico brand-ico"><FaApple size={30} /></span><h3>macOS</h3>
              <p>DMG {size('mac')}</p>
              <a className="btn primary" href={download('mac')}><Download size={18} /> Download DMG</a>
              <small>First launch: right-click the app and choose Open.</small>
              {stats && <small className="count">{stats.mac.downloads.toLocaleString()} downloads</small>}
            </div></Reveal>
          </div>
        </section>
      </main>

      <footer>© 2026 Droply · Made for people who hate cables.</footer>
    </>
  )
}
