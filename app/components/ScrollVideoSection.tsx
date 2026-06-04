'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [ready, setReady] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const [showScroll, setShowScroll] = useState(true)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const mark = () => setReady(true)
    video.addEventListener('loadedmetadata', mark)
    video.addEventListener('canplay', mark)
    // already loaded
    if (video.readyState >= 1) { setReady(true); return }
    return () => {
      video.removeEventListener('loadedmetadata', mark)
      video.removeEventListener('canplay', mark)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const onScroll = () => {
      const { top, height } = section.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -top / (height - window.innerHeight)))
      if (video.duration) video.currentTime = progress * video.duration
      setShowEnd(progress >= 0.88)
      setShowScroll(progress < 0.04)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [ready])

  return (
    <section ref={sectionRef} style={{ height: '500vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#0d0c0a',
      }}>
        {/* Video */}
        <video
          ref={videoRef}
          src="/hero-animation.mp4"
          playsInline
          muted
          preload="auto"
          poster="/hero-poster.jpg"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
          }}
        />

        {/* Vignette — stronger at end to frame the tagline */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: showEnd
            ? 'linear-gradient(to bottom, transparent 30%, rgba(13,12,10,0.97) 100%)'
            : 'linear-gradient(to bottom, transparent 55%, rgba(13,12,10,0.88) 100%)',
          transition: 'background 0.6s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* END STATE — tagline + CTA */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: 0, right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          zIndex: 2,
          opacity: showEnd ? 1 : 0,
          transform: showEnd ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          pointerEvents: showEnd ? 'auto' : 'none',
          padding: '0 24px',
          textAlign: 'center',
        }}>
          {/* Gold divider */}
          <div style={{
            width: '48px',
            height: '1px',
            background: 'var(--gold, #c8a84b)',
          }} />

          <h1 style={{
            fontFamily: 'var(--font-barlow-condensed, sans-serif)',
            fontSize: 'clamp(26px, 6vw, 52px)',
            fontWeight: 700,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--ink, #f0ece5)',
            margin: 0,
            lineHeight: 1.15,
          }}>
            Crafted for cars<br />
            <span style={{ color: 'var(--gold, #c8a84b)' }}>that are not supposed</span><br />
            to be stock.
          </h1>

          <a href="/visualizer.html" className="cta-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            fontFamily: 'var(--font-barlow-condensed, sans-serif)',
            fontSize: '12px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--ink, #f0ece5)',
            background: 'transparent',
            border: '1px solid var(--border2, #3a3935)',
            padding: '14px 32px',
            textDecoration: 'none',
            marginTop: '4px',
          }}>
            Configure your car
            <span style={{ color: 'var(--gold, #c8a84b)', fontSize: '18px' }}>→</span>
          </a>
        </div>

        {/* Scroll cue — only at the very start */}
        <div style={{
          position: 'absolute',
          bottom: '28px',
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: 'var(--font-barlow-condensed, sans-serif)',
          fontSize: '9px',
          fontWeight: 600,
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'var(--muted, #5a5854)',
          zIndex: 2,
          opacity: showScroll ? 1 : 0,
          transition: 'opacity 0.4s ease',
          animation: 'pulse 2.4s ease-in-out infinite',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}>
          Scroll
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '2px',
          background: 'var(--border, #2a2926)',
          zIndex: 3,
        }}>
          <div style={{
            height: '100%',
            background: 'var(--gold, #c8a84b)',
            width: showEnd ? '100%' : '0%',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        .cta-btn:hover {
          border-color: var(--gold, #c8a84b) !important;
          color: var(--gold, #c8a84b) !important;
        }
      `}</style>
    </section>
  )
}
