'use client'

import { useLocale } from '@/components/LocaleProvider'
import React, { useState } from 'react'

export function LoginForm() {
  const { t } = useLocale()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const animatedBorderStyle = `
    @keyframes gradientBorder {
      0% {
        background: conic-gradient(from 0deg, #0a4eb6, #18aeea, #2cad3f, #0a4eb6);
      }
      50% {
        background: conic-gradient(from 180deg, #18aeea, #2cad3f, #0a4eb6, #18aeea);
      }
      100% {
        background: conic-gradient(from 360deg, #0a4eb6, #18aeea, #2cad3f, #0a4eb6);
      }
    }
    
    .animated-form-border {
      background: conic-gradient(from 0deg, #0a4eb6, #18aeea, #2cad3f, #0a4eb6);
      animation: gradientBorder 4s linear infinite;
    }
    
    .animated-form-border::before {
      content: '';
      position: absolute;
      inset: 2px;
      border-radius: calc(1.5rem - 2px);
      /* Opaque inner panel to mask the animated gradient so only the border shows */
      background: rgba(2, 6, 23, 0.85);
    }
  `

  return (
    <>
      <style>{animatedBorderStyle}</style>
      <div className='relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-[#042c51] to-slate-900 px-6 py-20'>
        {/* Animated background elements */}
        <div className='absolute left-[-200px] top-[-100px] h-96 w-96 rounded-full bg-[#0a4eb6]/20 blur-3xl animate-pulse' />
        <div className='absolute right-[-150px] bottom-[-150px] h-96 w-96 rounded-full bg-[#2cad3f]/15 blur-3xl animate-pulse' />
        <div className='absolute top-1/2 left-1/3 h-72 w-72 rounded-full bg-[#18aeea]/10 blur-3xl' />

        {/* Grid overlay */}
        <div className='absolute inset-0 overflow-hidden'>
          <div className='absolute inset-0 bg-[linear-gradient(0deg,transparent_24%,rgba(10,78,182,.1)_25%,rgba(10,78,182,.1)_26%,transparent_27%,transparent_74%,rgba(10,78,182,.1)_75%,rgba(10,78,182,.1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(10,78,182,.1)_25%,rgba(10,78,182,.1)_26%,transparent_27%,transparent_74%,rgba(10,78,182,.1)_75%,rgba(10,78,182,.1)_76%,transparent_77%,transparent)] bg-[length:50px_50px]' />
        </div>

        <div className='relative z-10 mx-auto flex h-full max-w-6xl flex-col items-center justify-center gap-8 md:gap-12 md:flex-row md:justify-between'>
          {/* Left side - Branding */}
          <div
            className='w-full max-w-md text-white md:max-w-lg'
            data-aos='fade-right'
          >
            <div className='mb-4 md:mb-6 inline-block rounded-2xl border-2 border-white/40 bg-gradient-to-r from-[#0a4eb6]/20 to-[#18aeea]/20 px-6 py-3 backdrop-blur-sm'>
              <p className='text-xs md:text-sm font-bold uppercase tracking-[0.2em] text-[#18aeea]'>
                {t('Welcome Back')}
              </p>
            </div>

            <h1 className='text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight'>
              {t('Access Your')}
              <br />
              <span className='bg-gradient-to-r from-[#18aeea] via-[#0a4eb6] to-[#2cad3f] bg-clip-text text-transparent'>
                {t('Shipping Hub')}
              </span>
            </h1>

            <p
              className='mt-4 md:mt-6 text-base md:text-lg font-semibold text-white'
              style={{ color: '#ffffff' }}
            >
              {t(
                'Manage your shipments, track cargo, and get real-time updates on your logistics operations.',
              )}
            </p>

            <div className='mt-6 md:mt-8 space-y-3 md:space-y-4'>
              {[
                { icon: '📍', label: 'Real-time tracking' },
                { icon: '📊', label: 'Analytics dashboard' },
                { icon: '🔐', label: 'Secure transactions' },
              ].map((feature, idx) => (
                <div
                  key={feature.label}
                  className='flex items-center gap-3 text-white/80 transition hover:text-white'
                  data-aos='fade-right'
                  data-aos-delay={idx * 100}
                >
                  <span className='text-2xl'>{feature.icon}</span>
                  <span className='font-semibold'>{t(feature.label)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Login Form */}
          <div className='w-full max-w-md px-2 md:px-0' data-aos='fade-left'>
            <form
              onSubmit={handleSubmit}
              className='animated-form-border relative rounded-2xl md:rounded-3xl p-0.5'
            >
              <div className='relative rounded-2xl md:rounded-3xl bg-slate-900/80 p-6 md:p-8 backdrop-blur-xl shadow-2xl'>
                <div className='space-y-4 md:space-y-6'>
                  {/* Email Field */}
                  <div
                    className='group'
                    data-aos='fade-up'
                    data-aos-delay='100'
                  >
                    <label
                      htmlFor='login-email'
                      className='mb-2 md:mb-3 block text-xs md:text-sm font-bold uppercase tracking-wide text-white/80'
                    >
                      {t('Email Address')}
                    </label>
                    <div className='relative'>
                      <input
                        id='login-email'
                        type='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('you@company.com')}
                        required
                        className='w-full rounded-xl border-2 border-white/40 bg-white/5 px-5 py-3 text-white placeholder:text-white/40 transition focus:border-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20'
                      />
                      <span className='absolute right-5 top-1/2 -translate-y-1/2 text-xl'>
                        ✉️
                      </span>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div
                    className='group'
                    data-aos='fade-up'
                    data-aos-delay='150'
                  >
                    <label
                      htmlFor='login-password'
                      className='mb-2 md:mb-3 flex items-center justify-between'
                    >
                      <span className='block text-xs md:text-sm font-bold uppercase tracking-wide text-white/80'>
                        {t('Password')}
                      </span>
                      <a
                        href='#'
                        className='text-xs font-semibold text-[#18aeea] transition hover:text-[#2cad3f]'
                      >
                        {t('Forgot?')}
                      </a>
                    </label>
                    <div className='relative'>
                      <input
                        id='login-password'
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder='••••••••'
                        required
                        className='w-full rounded-xl border-2 border-white/40 bg-white/5 px-5 py-3 text-white placeholder:text-white/40 transition focus:border-white focus:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/20'
                      />
                      <span className='absolute right-5 top-1/2 -translate-y-1/2 text-xl'>
                        🔒
                      </span>
                    </div>
                  </div>

                  {/* Remember Me */}
                  <div
                    className='flex items-center gap-3'
                    data-aos='fade-up'
                    data-aos-delay='200'
                  >
                    <input
                      type='checkbox'
                      id='remember'
                      className='h-4 w-4 rounded border-2 border-white/50 bg-white/5 accent-white'
                    />
                    <label
                      htmlFor='remember'
                      className='text-xs md:text-sm text-white/70'
                    >
                      {t('Keep me signed in')}
                    </label>
                  </div>

                  {/* Sign In Button */}
                  <button
                    type='submit'
                    disabled={isLoading}
                    className='group relative mt-6 md:mt-8 w-full overflow-hidden rounded-lg md:rounded-xl bg-gradient-to-r from-[#0a4eb6] via-[#18aeea] to-[#2cad3f] px-6 py-2.5 md:py-3 font-bold uppercase tracking-wide text-xs md:text-sm text-white shadow-lg transition disabled:opacity-70'
                    data-aos='zoom-in'
                    data-aos-delay='250'
                  >
                    <span className='relative flex items-center justify-center gap-2'>
                      {isLoading ? (
                        <>
                          <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-r-transparent' />
                          {t('Signing in...')}
                        </>
                      ) : (
                        <>
                          {t('Sign In')}
                          <span className='transition group-hover:translate-x-1'>
                            →
                          </span>
                        </>
                      )}
                    </span>
                  </button>

                  {/* Divider */}
                  <div
                    className='relative my-6 md:my-8'
                    data-aos='fade-up'
                    data-aos-delay='300'
                  >
                    <div className='absolute inset-0 flex items-center'>
                      <div className='w-full border-t border-white/10' />
                    </div>
                    <div className='relative flex justify-center text-xs md:text-sm'>
                      <span className='bg-gradient-to-br from-white/10 via-white/5 to-white/10 px-3 text-white/50'>
                        {t('or')}
                      </span>
                    </div>
                  </div>

                  {/* Social Login */}
                  <div
                    className='grid grid-cols-3 gap-3'
                    data-aos='fade-up'
                    data-aos-delay='350'
                  >
                    {['Google', 'LinkedIn', 'GitHub'].map((provider) => (
                      <button
                        key={provider}
                        type='button'
                        aria-label={t('Sign in with {provider}', { provider })}
                        className='rounded-lg border-2 border-white/30 bg-white/5 px-2 md:px-3 py-2 text-xs md:text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/10'
                      >
                        {provider === 'Google' && '🔵'}
                        {provider === 'LinkedIn' && '💼'}
                        {provider === 'GitHub' && '⚫'}
                      </button>
                    ))}
                  </div>

                  {/* Sign Up Link */}
                  <p
                    className='text-center text-xs md:text-sm text-white/60'
                    data-aos='fade-up'
                    data-aos-delay='400'
                  >
                    {t("Don't have an account?")}{' '}
                    <a
                      href='#'
                      className='font-semibold text-[#18aeea] transition hover:text-[#2cad3f]'
                    >
                      {t('Sign up here')}
                    </a>
                  </p>
                </div>
              </div>
            </form>

            {/* Bottom accent */}
            <div className='mt-6 text-center text-xs text-white/50'>
              <p>{t('Your data is encrypted and secure')}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
