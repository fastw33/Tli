'use client'

import { useRef, useState } from 'react'
import ui from './Interface.module.css'

export function EmailCopy({
  email,
  copyLabel,
  copiedLabel,
  failedLabel,
}: {
  email: string
  copyLabel: string
  copiedLabel: string
  failedLabel: string
}) {
  const [status, setStatus] = useState('idle')
  const inputRef = useRef<HTMLInputElement>(null)
  async function copy() {
    try {
      await navigator.clipboard.writeText(email)
      setStatus('copied')
    } catch {
      inputRef.current?.select()
      setStatus('failed')
    }
  }
  return (
    <div>
      <div className='flex flex-wrap gap-2'>
        <input
          ref={inputRef}
          readOnly
          value={email}
          aria-label={email}
          className='min-w-0 flex-1 !text-sm'
          onFocus={(event) => event.currentTarget.select()}
        />
        <button type='button' className={ui.secondary} onClick={copy}>
          {status === 'copied' ? '✓ ' + copiedLabel : copyLabel}
        </button>
      </div>
      <p
        role='status'
        className={`!mt-2 !text-sm ${status === 'failed' ? '!text-[#b42318]' : '!text-[#17663a]'}`}
      >
        {status === 'copied'
          ? copiedLabel
          : status === 'failed'
            ? failedLabel
            : ''}
      </p>
    </div>
  )
}
