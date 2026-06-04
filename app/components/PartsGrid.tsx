'use client'

import Image from 'next/image'

const PARTS = [
  {
    name: 'Front Lip',
    spec: 'Dry Carbon — 2×2 Weave',
    badge: 'DRY CARBON',
    price: '$1,290',
    img: '/frontlip-product.png',
  },
  {
    name: 'Side Skirts',
    spec: 'Pre-preg Carbon — OEM Fit',
    badge: 'PRE-PREG',
    price: '$1,890',
    img: '/sidesk-product.png',
  },
  {
    name: 'Rear Diffuser',
    spec: 'Gloss Carbon Fiber',
    badge: 'GLOSS CF',
    price: '$2,100',
    img: '/diffuser-product.png',
  },
  {
    name: 'Rear Wing',
    spec: 'Forged Carbon — Adjustable',
    badge: 'FORGED',
    price: '$3,400',
    img: '/wing-product.png',
  },
]

export default function PartsGrid() {
  return (
    <>
      <style>{`
        .part-card { background: var(--panel, #131210); transition: background 0.2s ease; }
        .part-card:hover { background: var(--panel2, #1c1b18); }
        .part-btn { border: 1px solid var(--border2, #3a3935); color: var(--ink, #f0ece5); transition: border-color 0.15s, color 0.15s; }
        .part-btn:hover { border-color: var(--gold, #c8a84b); color: var(--gold, #c8a84b); }
      `}</style>

      <section id="parts" style={{
        background: 'var(--bg, #0d0c0a)',
        padding: '100px 5% 120px',
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '64px',
          textAlign: 'center',
        }}>
          <span style={{
            fontFamily: 'var(--font-barlow-condensed, sans-serif)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'var(--gold, #c8a84b)',
          }}>
            McLaren 720S — Aero Collection
          </span>
          <h2 style={{
            fontFamily: 'var(--font-barlow-condensed, sans-serif)',
            fontSize: 'clamp(28px, 5vw, 52px)',
            fontWeight: 300,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--ink, #f0ece5)',
            margin: 0,
          }}>
            Carbon Aero Kit
          </h2>
          <div style={{ width: '40px', height: '1px', background: 'var(--border2, #3a3935)' }} />
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1px',
          background: 'var(--border, #2a2926)',
          border: '1px solid var(--border, #2a2926)',
        }}>
          {PARTS.map((part) => (
            <PartCard key={part.name} {...part} />
          ))}
        </div>
      </section>
    </>
  )
}

function PartCard({ name, spec, badge, price, img }: {
  name: string; spec: string; badge: string; price: string; img: string;
}) {
  return (
    <div className="part-card cf-surface" style={{
      display: 'flex',
      flexDirection: 'column',
      padding: '40px 32px 32px',
      cursor: 'pointer',
    }}>
      <span style={{
        fontFamily: 'var(--font-barlow-condensed, sans-serif)',
        fontSize: '9px',
        fontWeight: 600,
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'var(--gold, #c8a84b)',
        marginBottom: '24px',
        display: 'block',
      }}>
        {badge}
      </span>

      <div style={{
        position: 'relative',
        width: '100%',
        aspectRatio: '4/3',
        marginBottom: '32px',
      }}>
        <Image
          src={img}
          alt={name}
          fill
          style={{
            objectFit: 'contain',
            filter: 'drop-shadow(0 0 40px rgba(255,255,255,0.04))',
          }}
          sizes="(max-width: 768px) 100vw, 25vw"
        />
      </div>

      <div style={{ height: '1px', background: 'var(--border, #2a2926)', marginBottom: '20px' }} />

      <h3 style={{
        fontFamily: 'var(--font-barlow-condensed, sans-serif)',
        fontSize: '20px',
        fontWeight: 600,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: 'var(--ink, #f0ece5)',
        margin: '0 0 6px',
      }}>
        {name}
      </h3>
      <p style={{
        fontFamily: 'var(--font-barlow, sans-serif)',
        fontSize: '12px',
        fontWeight: 300,
        color: 'var(--ink2, #9a978f)',
        margin: '0 0 24px',
        letterSpacing: '0.04em',
      }}>
        {spec}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 'auto',
      }}>
        <span style={{
          fontFamily: 'var(--font-barlow-condensed, sans-serif)',
          fontSize: '18px',
          fontWeight: 500,
          color: 'var(--ink, #f0ece5)',
          letterSpacing: '0.06em',
        }}>
          {price}
        </span>
        <button className="part-btn" style={{
          fontFamily: 'var(--font-barlow-condensed, sans-serif)',
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          background: 'transparent',
          padding: '8px 16px',
          cursor: 'pointer',
        }}>
          View Details
        </button>
      </div>
    </div>
  )
}
