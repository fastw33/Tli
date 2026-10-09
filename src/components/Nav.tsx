'use client'

import Image from 'next/image'
import { SiteLink as Link } from '@/components/SiteLink'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useLocale } from './LocaleProvider'
import { LanguageSwitcher } from './LanguageSwitcher'
import { basePath } from '@/lib/locale'

export function Nav() {
  const pathname = basePath(usePathname())
  const { t, localizePath } = useLocale()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!isMenuOpen) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        setIsMenuOpen(false)
    }
    const onFocusIn = (event: FocusEvent) => {
      if (
        event.target instanceof Node &&
        !navRef.current?.contains(event.target)
      )
        setIsMenuOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('focusin', onFocusIn)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('focusin', onFocusIn)
    }
  }, [isMenuOpen])
  const isHome = pathname === '/'
  const links = [
    { href: '/', label: 'TLI' },
    { href: '/regions', label: 'Regions' },
    { href: '/regions#industries', label: 'Industries' },
    { href: '/logistics-solutions', label: 'Logistics Solutions' },
    { href: '/air', label: 'Air' },
    { href: '/ocean', label: 'Ocean' },
    { href: '/ftl-lcl', label: 'FTL / LCL' },
  ]
  function active(href: string) {
    return (
      !href.includes('#') && (href === '/' ? isHome : pathname.startsWith(href))
    )
  }
  return (
    <nav
      ref={navRef}
      aria-label={t('Main navigation')}
      className={`z-50 w-full border-b border-[#042c51]/10 bg-white/90 backdrop-blur-md ${isHome ? 'fixed left-0 right-0 top-0' : 'sticky top-0'}`}
    >
      <div className='mx-auto flex h-24 max-w-[1440px] items-center justify-between gap-3 px-4 sm:px-6'>
        <Link
          href={localizePath('/')}
          aria-label={t('TLI home')}
          onClick={() => setIsMenuOpen(false)}
          className='shrink-0'
        >
          <Image
            src='/transport.webp'
            alt={t('Transport Logistic International logo')}
            width={180}
            height={60}
            priority
            className='h-auto w-[125px] object-contain sm:w-[155px]'
          />
        </Link>
        <div className='hidden items-center gap-1 xl:flex'>
          {links.map((link) => (
            <Link
              key={link.href}
              href={localizePath(link.href)}
              aria-current={active(link.href) ? 'page' : undefined}
              className={`rounded-full px-3 py-2 text-xs font-bold uppercase tracking-wide transition hover:bg-[#0a4eb6]/5 hover:no-underline ${active(link.href) ? '!text-[#0a4eb6] bg-[#0a4eb6]/10' : '!text-[#042c51]'}`}
            >
              {t(link.label)}
            </Link>
          ))}
        </div>
        <div className='flex items-center gap-2 sm:gap-3'>
          <Link
            href={localizePath('/quote-now')}
            className='hidden rounded-full bg-[#0a4eb6] px-4 py-3 text-xs font-bold uppercase !text-white transition hover:bg-[#042c51] hover:no-underline xl:inline-flex'
          >
            {t('Quote Now')}
          </Link>
          <Link
            href={localizePath('/login')}
            aria-label={t('Sign In')}
            className='hidden h-10 w-10 items-center justify-center rounded-full border border-[#042c51]/20 !text-[#042c51] xl:flex'
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 24 24'
              fill='none'
              aria-hidden='true'
            >
              <circle
                cx='12'
                cy='8'
                r='4'
                stroke='currentColor'
                strokeWidth='1.8'
              />
              <path
                d='M4 21v-2a8 8 0 0 1 16 0v2'
                stroke='currentColor'
                strokeWidth='1.8'
              />
            </svg>
          </Link>
          <LanguageSwitcher />
          <button
            ref={menuButtonRef}
            type='button'
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={t(isMenuOpen ? 'Close menu' : 'Open menu')}
            aria-expanded={isMenuOpen}
            aria-controls='mobile-navigation'
            className='flex h-11 w-11 items-center justify-center rounded-full border border-[#042c51]/15 text-[#042c51] xl:hidden'
          >
            <svg
              width='22'
              height='22'
              viewBox='0 0 24 24'
              fill='none'
              aria-hidden='true'
            >
              <path
                d={
                  isMenuOpen
                    ? 'M6 6l12 12M6 18 18 6'
                    : 'M3 6h18M3 12h18M3 18h18'
                }
                stroke='currentColor'
                strokeWidth='1.8'
                strokeLinecap='round'
              />
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div
          id='mobile-navigation'
          className='absolute left-0 right-0 top-full max-h-[calc(100dvh-6rem)] overflow-y-auto overscroll-contain border-t border-[#042c51]/10 bg-white p-4 shadow-xl xl:hidden'
        >
          <div className='mx-auto grid max-w-7xl gap-1'>
            {links.map((link) => (
              <Link
                key={link.href}
                href={localizePath(link.href)}
                onClick={() => setIsMenuOpen(false)}
                aria-current={active(link.href) ? 'page' : undefined}
                className={`rounded-lg px-4 py-3 text-sm font-bold !text-[#042c51] hover:bg-slate-50 ${active(link.href) ? 'bg-[#0a4eb6]/10' : ''}`}
              >
                {t(link.label)}
              </Link>
            ))}
            <Link
              href={localizePath('/quote-now')}
              onClick={() => setIsMenuOpen(false)}
              className='mt-2 rounded-lg bg-[#0a4eb6] px-4 py-3 text-center text-sm font-bold !text-white'
            >
              {t('Quote Now')}
            </Link>
            <Link
              href={localizePath('/login')}
              onClick={() => setIsMenuOpen(false)}
              className='rounded-lg px-4 py-3 text-center text-sm font-bold !text-[#042c51]'
            >
              {t('Sign In')}
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Nav
