'use client'

import { useEffect, useRef, useState } from 'react'
import { contacts } from '@/lib/contacts'
import styles from './ContactDirectory.module.css'

function WhatsAppIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <path
        d='M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9h.5a8.5 8.5 0 0 1 8 8v.5Z'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='m9 7 1.5 3-1.2 1.2a9 9 0 0 0 3.5 3.5l1.2-1.2 3 1.5-.5 2c-4.8.6-10.1-4.7-9.5-9.5L9 7Z'
        fill='currentColor'
      />
    </svg>
  )
}

function MailIcon() {
  return (
    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
      <rect x='3' y='5' width='18' height='14' rx='2' stroke='currentColor' strokeWidth='1.7' />
      <path d='m3 7 9 6 9-6' stroke='currentColor' strokeWidth='1.7' strokeLinejoin='round' />
    </svg>
  )
}

export function ContactDirectory() {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const launcherRef = useRef<HTMLButtonElement>(null)
  const backButtonRef = useRef<HTMLButtonElement>(null)
  const emailAddressRef = useRef<HTMLInputElement>(null)
  const emailButtonsRef = useRef(new Map<string, HTMLButtonElement>())
  const lastEmailContactRef = useRef<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const [emailContact, setEmailContact] = useState<(typeof contacts)[number] | null>(null)
  const [selectedEmail, setSelectedEmail] = useState('')
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (!isOpen) return
    if (emailContact) {
      backButtonRef.current?.focus()
    } else if (lastEmailContactRef.current) {
      emailButtonsRef.current.get(lastEmailContactRef.current)?.focus()
    }
  }, [emailContact, isOpen])

  function openDirectory() {
    dialogRef.current?.showModal()
    dialogRef.current?.scrollTo({ top: 0, behavior: 'instant' })
    lastEmailContactRef.current = null
    setEmailContact(null)
    setIsOpen(true)
  }

  function closeDirectory() {
    dialogRef.current?.close()
  }

  function openEmail(contact: (typeof contacts)[number]) {
    lastEmailContactRef.current = contact.name
    setEmailContact(contact)
    setSelectedEmail(contact.emails[0])
    setCopyStatus('idle')
    dialogRef.current?.scrollTo({ top: 0, behavior: 'instant' })
  }

  async function copyEmail() {
    setCopyStatus('copying')
    try {
      await navigator.clipboard.writeText(selectedEmail)
      setCopyStatus('copied')
    } catch {
      emailAddressRef.current?.focus()
      emailAddressRef.current?.select()
      setCopyStatus('failed')
    }
  }

  return (
    <>
      <button
        ref={launcherRef}
        type='button'
        className={styles.launcher}
        aria-label='Open WhatsApp and email contact directory'
        aria-haspopup='dialog'
        aria-expanded={isOpen}
        aria-controls='contact-directory'
        onClick={openDirectory}
      >
        <WhatsAppIcon />
        <span>Contact us</span>
      </button>

      <dialog
        ref={dialogRef}
        id='contact-directory'
        className={styles.panel}
        aria-labelledby='contact-directory-title'
        aria-describedby='contact-directory-description'
        onClose={() => {
          setIsOpen(false)
          setEmailContact(null)
          launcherRef.current?.focus()
        }}
        onClick={event => {
          if (event.target === event.currentTarget) {
            const bounds = event.currentTarget.getBoundingClientRect()
            if (
              event.clientX < bounds.left || event.clientX > bounds.right ||
              event.clientY < bounds.top || event.clientY > bounds.bottom
            ) {
              closeDirectory()
            }
          }
        }}
      >
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>TLI MIAMI · OUR TEAM</span>
            <h2 id='contact-directory-title'>{emailContact ? emailContact.name : 'Let’s connect'}</h2>
            <p id='contact-directory-description'>{emailContact ? 'Send an email or copy the address.' : 'Choose your contact.'}</p>
          </div>
          <button
            type='button'
            className={styles.close}
            aria-label='Close contact directory'
            onClick={closeDirectory}
          >
            <svg width='20' height='20' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
              <path d='m6 6 12 12M6 18 18 6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' />
            </svg>
          </button>
        </header>

        {emailContact ? (
          <div className={styles.emailView}>
            <button ref={backButtonRef} type='button' className={styles.back} onClick={() => setEmailContact(null)}>
              <span aria-hidden='true'>←</span> Back to contacts
            </button>
            <label className={styles.addressLabel} htmlFor='contact-email-address'>Email address</label>
            {emailContact.emails.length > 1 && (
              <select
                className={styles.addressSelect}
                aria-label={`Choose an email for ${emailContact.name}`}
                value={selectedEmail}
                onChange={event => {
                  setSelectedEmail(event.target.value)
                  setCopyStatus('idle')
                }}
              >
                {emailContact.emails.map(email => <option key={email} value={email}>{email}</option>)}
              </select>
            )}
            <div className={styles.addressRow} data-copy-status={copyStatus}>
              <input
                ref={emailAddressRef}
                id='contact-email-address'
                className={styles.addressInput}
                value={selectedEmail}
                readOnly
                onFocus={event => event.currentTarget.select()}
              />
              <button
                type='button'
                className={styles.copy}
                disabled={copyStatus === 'copying'}
                aria-busy={copyStatus === 'copying'}
                onClick={copyEmail}
              >
                {copyStatus === 'copied' && (
                  <svg width='14' height='14' viewBox='0 0 24 24' fill='none' aria-hidden='true'>
                    <path d='m5 12 4 4L19 6' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
                  </svg>
                )}
                {copyStatus === 'copied' ? 'Copied' : copyStatus === 'copying' ? 'Copying…' : 'Copy'}
              </button>
            </div>
            <p className={styles.copyFeedback} data-copy-status={copyStatus} role='status' aria-atomic='true'>
              {copyStatus === 'copied' ? '✓ Email address copied.' : copyStatus === 'copying' ? 'Copying email address…' : copyStatus === 'failed' ? 'Couldn’t copy automatically. Select the address and copy it manually.' : ''}
            </p>
            <a href={`mailto:${selectedEmail}`} className={styles.openEmail}>
              <MailIcon /><span>Open email<small>Your default email app</small></span><span aria-hidden='true'>↗</span>
            </a>
          </div>
        ) : (
        <ul className={styles.contacts}>
          {contacts.map(contact => (
            <li key={contact.name} className={styles.contact}>
              <div className={styles.cardTop}>
                <span className={styles.avatar} aria-hidden='true'>{contact.initials}</span>
                <span className={styles.role}>{contact.role}</span>
              </div>
              <div className={styles.details}>
                <h3>{contact.name}</h3>
                <p className={styles.phone}>{contact.whatsapp?.label}</p>
              </div>
              <div className={styles.actions}>
                {contact.whatsapp && (
                  <a
                    href={`https://wa.me/${contact.whatsapp.number}?text=${encodeURIComponent(`Hello ${contact.name}, I would like assistance with a shipment.`)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className={styles.whatsapp}
                    aria-label={`WhatsApp ${contact.name} at ${contact.whatsapp.label} (opens in a new tab)`}
                  >
                    <WhatsAppIcon size={16} />
                    <span>Chat</span>
                  </a>
                )}
                <button
                  ref={node => {
                    if (node) emailButtonsRef.current.set(contact.name, node)
                    else emailButtonsRef.current.delete(contact.name)
                  }}
                  type='button'
                  className={styles.email}
                  aria-label={`Email ${contact.name}`}
                  onClick={() => openEmail(contact)}
                >
                  <MailIcon />
                  <span>Email</span>
                </button>
              </div>
            </li>
          ))}
        </ul>
        )}

      </dialog>
    </>
  )
}
