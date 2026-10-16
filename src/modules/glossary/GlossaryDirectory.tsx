'use client'

import { useState } from 'react'
import type { Locale } from '@/lib/locale'
import { localePath } from '@/lib/locale'
import { SiteLink } from '@/components/SiteLink'
import {
  categories, glossaryLetter, glossaryTermPath, matchesGlossaryTerm,
  type GlossaryCategory, type LocalizedTerm,
} from './shared'
import { glossaryCopy } from './copy'
import styles from './Glossary.module.css'

export function GlossaryDirectory({ terms, locale }: { terms: LocalizedTerm[]; locale: Locale }) {
  const copy = glossaryCopy[locale]
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState<GlossaryCategory | ''>('')
  const [letter, setLetter] = useState('')
  const matchingTerms = terms.filter((item) => matchesGlossaryTerm(item, query, category))
  const availableLetters = new Set(matchingTerms.map((item) => glossaryLetter(item.name)))
  const visibleTerms = matchingTerms.filter((item) => !letter || glossaryLetter(item.name) === letter)
  const visibleIds = new Set(visibleTerms.map((item) => item.id))
  const filtered = Boolean(query || category || letter)

  function reset() {
    setQuery('')
    setCategory('')
    setLetter('')
  }

  return (
    <section className={styles.directory} aria-labelledby='directory-title'>
      <div className={styles.directoryIntro}>
        <div>
          <p className={styles.eyebrow}>{copy.languages}</p>
          <h2 id='directory-title'>{copy.indexLabel}</h2>
          <p>{copy.indexText}</p>
        </div>
        <SiteLink href={localePath('/quote-now', locale)} className={styles.textLink}>{copy.requestQuote} <span aria-hidden='true'>↗</span></SiteLink>
      </div>
      <div className={styles.controls}>
        <div>
          <label htmlFor='glossary-search'>{copy.search}</label>
          <input id='glossary-search' type='search' value={query} onChange={(event) => { setQuery(event.target.value); setLetter('') }} placeholder={copy.placeholder} aria-controls='glossary-definitions' />
        </div>
        <div>
          <label htmlFor='glossary-topic'>{copy.topics}</label>
          <select id='glossary-topic' value={category} onChange={(event) => { setCategory(event.target.value as GlossaryCategory | ''); setLetter('') }} aria-controls='glossary-definitions'>
            <option value=''>{copy.all}</option>
            {Object.entries(categories).map(([key, item]) => <option key={key} value={key}>{item[locale]}</option>)}
          </select>
        </div>
      </div>
      <div className={styles.alphabet} role='group' aria-label={copy.alphabet}>
        <button type='button' aria-pressed={!letter} onClick={() => setLetter('')} aria-controls='glossary-definitions'>{copy.allLetters}</button>
        {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map((item) => (
          <button key={item} type='button' disabled={!availableLetters.has(item)} aria-pressed={letter === item} aria-controls='glossary-definitions' onClick={() => setLetter(item)}>{item}</button>
        ))}
      </div>
      <div className={styles.resultBar}>
        <p role='status' aria-live='polite' aria-atomic='true'>
          {visibleTerms.length} {visibleTerms.length === 1 ? copy.resultSingular : copy.results}
          {letter ? ` · ${copy.selectedLetter} ${letter}` : ''}
        </p>
        {filtered && <button type='button' onClick={reset}>{copy.clear}</button>}
      </div>
      <div id='glossary-definitions' className={styles.termGrid}>
        {visibleTerms.length === 0 && <div className={styles.empty}><h3>{copy.empty}</h3><p>{copy.emptyHelp}</p></div>}
        {terms.map((item) => (
          <article key={item.id} id={item.id} hidden={!visibleIds.has(item.id)} className={styles.termCard} aria-labelledby={`term-${item.id}`}>
            <span className={styles.category}>{categories[item.category][locale]}</span>
            <h3 id={`term-${item.id}`}>
              <SiteLink href={localePath(glossaryTermPath(item.id), locale)}>{item.name}<span aria-hidden='true'>↗</span></SiteLink>
            </h3>
            <p className={styles.translation} lang={locale === 'es' ? 'en' : 'es'}>{item.translation}</p>
            <p className={styles.cardDefinition}>{item.definition}</p>
            <SiteLink className={styles.readTerm} href={localePath(glossaryTermPath(item.id), locale)} aria-label={`${copy.readTerm}: ${item.name}`}>{copy.readTerm} <span aria-hidden='true'>→</span></SiteLink>
          </article>
        ))}
      </div>
    </section>
  )
}
