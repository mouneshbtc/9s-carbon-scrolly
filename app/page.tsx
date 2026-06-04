import Nav from './components/Nav'
import ScrollVideoSection from './components/ScrollVideoSection'

export default function Home() {
  return (
    <main style={{ background: 'var(--bg, #0d0c0a)', minHeight: '100vh' }}>
      <Nav />
      <ScrollVideoSection />

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid var(--border, #2a2926)',
        padding: '32px 5%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        <span style={{
          fontFamily: 'var(--font-barlow-condensed, sans-serif)',
          fontSize: '16px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink, #f0ece5)',
        }}>
          9S <span style={{ fontWeight: 300, color: 'var(--ink2, #9a978f)' }}>CARBON</span>
        </span>
        <span style={{
          fontFamily: 'var(--font-barlow, sans-serif)',
          fontSize: '11px',
          color: 'var(--muted, #5a5854)',
          letterSpacing: '0.04em',
        }}>
          © 2025 9S Carbon. Crafted for cars that are not supposed to be stock.
        </span>
      </footer>
    </main>
  )
}
