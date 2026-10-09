'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react'

type Navigation = {
  navigate: (href: string) => void
  ready: (path: string) => void
}

const NavigationContext = createContext<Navigation | null>(null)

type SavedPosition = { path: string; x: number; y: number }

function savePosition() {
  window.history.replaceState(
    {
      ...window.history.state,
      tliScroll: {
        path: window.location.pathname,
        x: window.scrollX,
        y: window.scrollY,
      },
    },
    '',
    window.location.href,
  )
}

function positionPage(destination: URL) {
  let target: HTMLElement | null = null
  if (destination.hash) {
    try {
      target = document.getElementById(
        decodeURIComponent(destination.hash.slice(1)),
      )
    } catch {
      // An invalid fragment should still leave the page usable.
    }
  }
  if (target) {
    target.scrollIntoView({ block: 'start', behavior: 'instant' })
  } else {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    target = document.querySelector<HTMLElement>('main h1, h1')
  }
  if (target) {
    if (!target.hasAttribute('tabindex')) target.tabIndex = -1
    target.focus({ preventScroll: true })
  }
}

export function NavigationProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const pending = useRef<URL | null>(null)
  const initialPage = useRef(true)
  const renderedPath = useRef<string | null>(null)
  const restore = useRef<SavedPosition | null>(null)
  const frame = useRef<number | null>(null)
  const cancelFrame = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    frame.current = null
  }, [])

  const navigate = useCallback(
    (href: string) => {
      cancelFrame()
      savePosition()
      restore.current = null
      const destination = new URL(href, window.location.href)
      pending.current = destination
      if (destination.pathname === window.location.pathname) {
        // The overlay menu does not alter page geometry. Repeated logo clicks
        // can therefore reset the viewport immediately without a route commit.
        positionPage(destination)
        pending.current = null
      }
    },
    [cancelFrame],
  )

  const ready = useCallback(
    (path: string) => {
      renderedPath.current = path
      if (restore.current?.path === path) {
        const position = restore.current
        window.scrollTo({
          left: position.x,
          top: position.y,
          behavior: 'instant',
        })
        restore.current = null
        initialPage.current = false
        return
      }
      const destination = pending.current
      if (destination?.pathname === path) {
        cancelFrame()
        positionPage(destination)
        pending.current = null
      } else if (initialPage.current) {
        const entry = performance.getEntriesByType('navigation')[0] as
          PerformanceNavigationTiming | undefined
        const saved = window.history.state?.tliScroll as
          SavedPosition | undefined
        if (entry?.type === 'back_forward' && saved?.path === path) {
          window.scrollTo({ left: saved.x, top: saved.y, behavior: 'instant' })
        } else if (entry?.type !== 'back_forward')
          positionPage(new URL(window.location.href))
      }
      initialPage.current = false
    },
    [cancelFrame],
  )

  useEffect(() => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = 'manual'
    let scrollTimer: ReturnType<typeof setTimeout> | null = null
    const recordScroll = () => {
      if (scrollTimer !== null || pending.current || restore.current) return
      scrollTimer = setTimeout(() => {
        scrollTimer = null
        if (!pending.current && !restore.current) savePosition()
      }, 500)
    }
    const recordScrollEnd = () => {
      if (scrollTimer !== null) clearTimeout(scrollTimer)
      scrollTimer = null
      if (!pending.current && !restore.current) savePosition()
    }
    const restoreHistory = (event: PopStateEvent) => {
      pending.current = null
      cancelFrame()
      const saved = event.state?.tliScroll as SavedPosition | undefined
      restore.current = saved ?? { path: window.location.pathname, x: 0, y: 0 }
      if (renderedPath.current === window.location.pathname) {
        frame.current = requestAnimationFrame(() => {
          if (restore.current) {
            window.scrollTo({
              left: restore.current.x,
              top: restore.current.y,
              behavior: 'instant',
            })
            restore.current = null
          }
          frame.current = null
        })
      }
    }
    window.addEventListener('popstate', restoreHistory)
    window.addEventListener('scroll', recordScroll, { passive: true })
    window.addEventListener('scrollend', recordScrollEnd)
    window.addEventListener('pagehide', savePosition)
    return () => {
      window.removeEventListener('popstate', restoreHistory)
      window.removeEventListener('scroll', recordScroll)
      window.removeEventListener('scrollend', recordScrollEnd)
      window.removeEventListener('pagehide', savePosition)
      window.history.scrollRestoration = previousRestoration
      if (scrollTimer !== null) clearTimeout(scrollTimer)
      cancelFrame()
    }
  }, [cancelFrame])

  const value = useMemo(() => ({ navigate, ready }), [navigate, ready])
  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useSiteNavigation() {
  return useContext(NavigationContext)
}

export function RouteReady({ path }: { path: string }) {
  const navigation = useSiteNavigation()
  useLayoutEffect(() => {
    navigation?.ready(path)
  }, [navigation, path])
  return null
}
