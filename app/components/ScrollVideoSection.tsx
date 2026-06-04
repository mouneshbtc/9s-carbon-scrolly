'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollVideoSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const rafRef = useRef<number>(0)
  const progressRef = useRef(0)
  const [ready, setReady] = useState(false)
  const [videoFailed, setVideoFailed] = useState(false)
  const [showEnd, setShowEnd] = useState(false)
  const [showScroll, setShowScroll] = useState(true)

  // Reset scroll to top on mount — handles browser back-navigation restoring scroll position
  useEffect(() => {
    if (typeof window !== 'undefined') {
      history.scrollRestoration = 'manual'
      window.scrollTo(0, 0)
    }
  }, [])

  // Force-load video — iOS Safari ignores preload="auto" without this
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const onReady = () => setReady(true)
    const onError = () => setVideoFailed(true)

    video.addEventListener('loadedmetadata', onReady)
    video.addEventListener('canplay', onReady)
    video.addEventListener('error', onError)

    video.load()

    if (video.readyState >= 1) setReady(true)

    return () => {
      video.removeEventListener('loadedmetadata', onReady)
      video.removeEventListener('canplay', onReady)
      video.removeEventListener('error', onError)
    }
  }, [])

  // Fallback: if video hasn't loaded after 4s, skip to end state
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!ready) {
        setVideoFailed(true)
        setShowEnd(true)
        setShowScroll(false)
      }
    }, 4000)
    return () => clearTimeout(timer)
  }, [ready])

  // Scroll scrubbing with rAF
  useEffect(() => {
    if (!ready) return
    const section = sectionRef.current
    const video = videoRef.current
    if (!section || !video) return

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const { top, height } = section.getBoundingClientRect()
        const progress = Math.max(0, Math.min(1, -top / (height - window.innerHeight)))
        progressRef.current = progress

        if (video.duration && isFinite(video.duration)) {
          video.currentTime = progress * video.duration
        }

        setShowEnd(progress >= 0.88)
        setShowScroll(progress < 0.04)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [ready])

  const sectionHeight = videoFailed ? '100vh' : '500vh'

  return (
    <section ref={sectionRef} style={{ height: sectionHeight, position: 'relative' }}>
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
            opacity: videoFailed ? 0 : 1,
          }}
        />

        {/* Poster fallback */}
        {videoFailed && (
          <img
            src="/hero-poster.jpg"
            alt=""
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        )}

        {/* Vignette */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: showEnd || videoFailed
            ? 'linear-gradient(to bottom, transparent 30%, rgba(13,12,10,0.97) 100%)'
            : 'linear-gradient(to bottom, transparent 55%, rgba(13,12,10,0.88) 100%)',
          transition: 'background 0.6s ease',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* End state — tagline + CTA */}
        <div style={{
          position: 'absolute',
          bottom: '80px',
          left: 0, right: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          zIndex: 2,
          opacity: showEnd || videoFailed ? 1 : 0,
          transform: showEnd || videoFailed ? 'translateY(0)' : 'translateY(16px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
          pointerEvents: showEnd || videoFailed ? 'auto' : 'none',
          padding: '0 24px',
          textAlign: 'center',
        }}>
          <div style={{ width: '48px', height: '1px', background: 'var(--gold, #c8a84b)' }} />
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

        {/* Scroll indicator — prominent, animated */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          zIndex: 2,
          opacity: showScroll && !videoFailed ? 1 : 0,
          transition: 'opacity 0.5s ease',
          pointerEvents: 'none',
        }}>
          {/* Label */}
          <span style={{
            fontFamily: 'var(--font-barlow-condensed, sans-serif)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'var(--ink2, #9a978f)',
            whiteSpace: 'nowrap',
          }}>
            Scroll to reveal
          </span>

          {/* Bouncing chevron */}
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ animation: 'bounce 1.6s ease-in-out infinite' }}
          >
            <polyline
              points="4,7 10,13 16,7"
              stroke="var(--gold, #c8a84b)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>

          {/* Second chevron, delayed — gives a cascading feel */}
          <svg
            width="20" height="20" viewBox="0 0 20 20" fill="none"
            style={{ animation: 'bounce 1.6s ease-in-out 0.2s infinite', marginTop: '-10px', opacity: 0.4 }}
          >
            <polyline
              points="4,7 10,13 16,7"
              stroke="var(--gold, #c8a84b)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </svg>
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
            width: showEnd || videoFailed ? '100%' : '0%',
            transition: 'width 0.4s ease',
          }} />
        </div>
      </div>

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(6px); opacity: 0.5; }
        }
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
