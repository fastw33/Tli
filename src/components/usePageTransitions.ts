'use client'

import { useCallback, useEffect, useRef } from 'react'

function contentTargets() {
  const main = document.querySelector<HTMLElement>('main')
  if (!main) return []
  // Home embeds its fixed menu in the hero. Move only the hero copy there.
  return main.querySelector('[data-site-navigation]')
    ? [...main.querySelectorAll<HTMLElement>('[data-page-motion]')]
    : [main]
}

/** Animate live content without delaying navigation or retaining a snapshot. */
export function usePageTransitions() {
  const animations = useRef<Animation[]>([])

  const cancel = useCallback(() => {
    animations.current.forEach((animation) => animation.cancel())
    animations.current = []
  }, [])

  const start = useCallback(() => {
    cancel()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    for (const target of contentTargets()) {
      if (!target.animate) continue
      // Routing proceeds immediately. No persistent fill on slow requests.
      animations.current.push(target.animate([{ opacity: 1 }, { opacity: .75 }], {
        duration: 120, easing: 'ease-out',
      }))
    }
  }, [cancel])

  const finish = useCallback(() => {
    cancel()
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const mobile = window.matchMedia('(max-width: 760px)').matches
    for (const target of contentTargets()) {
      if (!target.animate) continue
      animations.current.push(target.animate([
        { opacity: 0, translate: `0 ${mobile ? 20 : 32}px` },
        { opacity: 1, translate: '0 0' },
      ], {
        duration: mobile ? 420 : 480, easing: 'cubic-bezier(.22,1,.36,1)',
      }))
    }
  }, [cancel])

  useEffect(() => cancel, [cancel])
  return { start, finish, cancel }
}
