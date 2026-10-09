export type Locale = 'en' | 'es'

/** English is served at the root; Spanish has a stable /es prefix. */
export function basePath(path: string) {
  const unprefixed = path.replace(/^\/es(?=\/|$|[?#])/, '') || '/'
  return unprefixed.replace(/^\/clients(?=\/|$|[?#])/, '/regions')
}

export function localePath(path: string, locale: Locale) {
  if (!path.startsWith('/') || path.startsWith('//')) return path
  const base = basePath(path)
  return locale === 'es' ? `/es${base === '/' ? '' : base}` : base
}
