'use client'

import { useEffect, useState } from 'react'

export default function Nav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 400)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      <style>{`
        .nav-link { color: var(--ink2, #9a978f); transition: color 0.15s; }
        .nav-link:hover { color: var(--ink, #f0ece5); }
        .nav-cta-btn { background: #e03030; transition: background 0.15s; }
        .nav-cta-btn:hover { background: #c82020; }

        /* Hide center links on small screens */
        @media (max-width: 600px) {
          .nav-links-center { display: none !important; }
        }
      `}</style>

      <nav style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        gap: '8px',
        background: 'rgba(15,14,12,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border, #2a2926)',
        zIndex: 100,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'opacity 0.6s ease, transform 0.6s ease',
      }}>
        {/* Brand */}
        <a href="#" style={{
          fontFamily: 'var(--font-barlow-condensed, sans-serif)',
          fontSize: '20px',
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'var(--ink, #f0ece5)',
          textDecoration: 'none',
          flexShrink: 0,
          whiteSpace: 'nowrap',
        }}>
          9S <span style={{ fontWeight: 300, color: 'var(--ink2, #9a978f)' }}>CARBON</span>
        </a>

        {/* Center links — hidden on mobile */}
        <div className="nav-links-center" style={{
          display: 'flex',
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
          gap: '4px',
        }}>
          {['Parts', 'Gallery', 'Fitment', 'Contact'].map((link) => (
            <a key={link} href="#" className="nav-link" style={{
              fontFamily: 'var(--font-barlow-condensed, sans-serif)',
              fontSize: '11.5px',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              padding: '7px 14px',
              whiteSpace: 'nowrap',
            }}>
              {link}
            </a>
          ))}
        </div>

        {/* Spacer on mobile so CTA pushes right */}
        <div style={{ flex: 1 }} className="nav-links-center" aria-hidden />

        {/* CTA — always visible */}
        <a href="/visualizer.html" className="nav-cta-btn" style={{
          fontFamily: 'var(--font-barlow-condensed, sans-serif)',
          fontSize: '11px',
          fontWeight: 600,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: 'var(--ink, #f0ece5)',
          padding: '8px 16px',
          borderRadius: '3px',
          textDecoration: 'none',
          flexShrink: 0,
          whiteSpace: 'nowrap',
          marginLeft: 'auto',
        }}>
          Configure
        </a>
      </nav>
    </>
  )
}
