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
    let entranceFrame = 0
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
        node.setAttribute('data-aos', node.tagName === 'ARTICLE' ? 'zoom-in-up' : 'fade-up')
      }
      const grids = new Map<HTMLElement, { nodes: Element[]; columns: number }>()
      const newNodes: HTMLElement[] = []
      for (const node of document.querySelectorAll<HTMLElement>('[data-aos]')) {
        const authoredDelay = node.getAttribute('data-aos-delay')
        let delay = Number(authoredDelay ?? 0)
        if (authoredDelay === null || node.dataset.aosStagger === 'auto') {
          const parent = node.parentElement
          if (parent && !grids.has(parent)) {
            const layout = getComputedStyle(parent)
            grids.set(parent, {
              nodes: [...parent.children].filter((child) => child.hasAttribute('data-aos') && !child.hasAttribute('hidden')),
              columns: layout.display === 'grid' ? layout.gridTemplateColumns.split(' ').length : 1,
            })
          }
          const grid = parent ? grids.get(parent) : undefined
          const index = grid ? Math.max(0, grid.nodes.indexOf(node)) : 0
          // Cascade across each visible grid row; mobile rows start immediately.
          delay = grid ? (index % grid.columns) * 150 : 0
          node.dataset.aosStagger = 'auto'
        }
        node.setAttribute('data-aos-delay', String(Math.min(300, Math.max(0, Math.round(delay / 50) * 50))))
        node.setAttribute('data-aos-once', 'false')
        if (!observed.has(node)) {
          observed.add(node)
          exits.observe(node)
          newNodes.push(node)
        }
      }
      if (!initialized) {
        AOS.init({ duration: 950, easing: 'ease-out-cubic', once: false, offset: 80,
          delay: 0, disableMutationObserver: true, throttleDelay: 50, debounceDelay: 100 })
        initialized = true
      } else {
        AOS.refreshHard()
      }
      root.dataset.scrollAnimations = 'ready'
      // AOS marks initially visible blocks as animated synchronously. Give new
      // visible blocks a real starting style so route entry is visible as well.
      const entering = newNodes.filter((node) => {
        const bounds = node.getBoundingClientRect()
        return !node.hidden && !node.matches(':focus-within') && bounds.bottom > 0 && bounds.top < innerHeight && node.classList.contains('aos-animate')
      })
      if (entering.length) {
        entering.forEach((node) => node.classList.remove('aos-animate'))
        void root.offsetHeight
        cancelAnimationFrame(entranceFrame)
        entranceFrame = requestAnimationFrame(() => { if (!disposed) AOS.refresh() })
      }
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
    window.addEventListener('resize', schedule, { passive: true })
    document.fonts.ready.then(() => { if (!disposed) schedule() })
    schedule()

    return () => {
      disposed = true
      cancelAnimationFrame(frame)
      cancelAnimationFrame(entranceFrame)
      changes.disconnect()
      exits.disconnect()
      reducedMotion.removeEventListener('change', schedule)
      document.removeEventListener('load', schedule, true)
      document.removeEventListener('toggle', schedule, true)
      window.removeEventListener('resize', schedule)
    }
  }, [pathname])

  return null
}
