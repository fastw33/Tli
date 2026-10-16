'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import AOS from 'aos'

let initialized = false

/** A single AOS owner for every locale, route and dynamically filtered list. */
export function ScrollAnimations() {
  const pathname = usePathname()

  useEffect(() => {
    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let disposed = false
    const observed = new WeakSet<Element>()

    // AOS 2 repeats entry animations but does not implement the newer mirror
    // option. Observe the top edge separately to animate fully departed blocks.
    const exits = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        const node = entry.target as HTMLElement
        if (!entry.isIntersecting && entry.boundingClientRect.bottom < 0 && !node.hidden) {
          node.setAttribute('data-aos-exited', '')
        } else {
          node.removeAttribute('data-aos-exited')
        }
      }
    })

    function prepare() {
      if (disposed) return
      if (reducedMotion.matches) {
        root.dataset.scrollAnimations = 'reduced'
        return
      }
      const candidates = document.querySelectorAll<HTMLElement>(
        'main h1, main section h2, main article, main [data-motion], footer > div > div, footer > div > address',
      )
      for (const node of candidates) {
        if (node.closest('form, nav, [role="dialog"], [data-motion="off"]') || node.classList.contains('sr-only')) continue
        if (node.hasAttribute('data-aos') || node.parentElement?.closest('[data-aos]')) continue
        const position = getComputedStyle(node).position
        if (position === 'fixed' || position === 'sticky') continue
        node.setAttribute('data-aos', 'fade-up')
      }
      for (const node of document.querySelectorAll<HTMLElement>('[data-aos]')) {
        // Short, bounded staggering avoids making a visible card wait to appear.
        const delay = Number(node.getAttribute('data-aos-delay') ?? 0)
        node.setAttribute('data-aos-delay', String(Math.min(150, Math.max(0, Math.round(delay / 50) * 50))))
        node.setAttribute('data-aos-once', 'false')
        if (!observed.has(node)) {
          observed.add(node)
          exits.observe(node)
        }
      }
      if (!initialized) {
        AOS.init({ duration: 600, easing: 'ease-out-cubic', once: false, offset: 24,
          delay: 0, disableMutationObserver: true, throttleDelay: 50, debounceDelay: 100 })
        initialized = true
      } else {
        AOS.refreshHard()
      }
      root.dataset.scrollAnimations = 'ready'
    }

    function schedule() {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(prepare)
    }

    // Ignore text-only counter updates and AOS's own class mutations.
    const changes = new MutationObserver((records) => {
      if (records.some((record) => record.type === 'attributes' ||
        [...record.addedNodes, ...record.removedNodes].some((node) => node.nodeType === Node.ELEMENT_NODE))) schedule()
    })
    changes.observe(document.body, { childList: true, subtree: true, attributes: true, attributeFilter: ['hidden'] })
    reducedMotion.addEventListener('change', schedule)
    document.addEventListener('load', schedule, true)
    document.addEventListener('toggle', schedule, true)
    document.fonts.ready.then(() => { if (!disposed) schedule() })
    schedule()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      changes.disconnect()
      exits.disconnect()
      reducedMotion.removeEventListener('change', schedule)
      document.removeEventListener('load', schedule, true)
      document.removeEventListener('toggle', schedule, true)
    }
  }, [pathname])

  return null
}
