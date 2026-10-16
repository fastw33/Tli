// Decorative vector illustrations keep the previews sharp without image downloads.
export function FreightArtwork({ kind }: { kind: 'ocean' | 'warehouse' }) {
  return <svg viewBox='0 0 600 250' fill='none' aria-hidden='true' focusable='false'>
    <g stroke='currentColor' opacity='.12'>
      {[40, 100, 160, 220].map((y) => <path key={y} d={`M0 ${y}H600`} />)}
      {[60, 120, 180, 240, 300, 360, 420, 480, 540].map((x) => <path key={x} d={`M${x} 0V250`} />)}
    </g>
    {kind === 'ocean' ? <>
      <path d='M73 176H534L509 203H113Z' fill='currentColor' />
      <path d='M99 168V121H158V168M111 121V99H140V121' stroke='currentColor' strokeWidth='4' />
      <path d='M140 99V72M130 83H150' stroke='currentColor' strokeWidth='3' />
      {[0, 1, 2, 3].map((i) => <g key={i} transform={`translate(${176 + i * 75} 127)`}><rect width='67' height='41' rx='2' fill='currentColor' opacity={i % 2 ? '.45' : '.8'} /><path d='M12 6V35M25 6V35M38 6V35M51 6V35' stroke='#d8eaf2' strokeWidth='1.5' /></g>)}
      {[0, 1, 2].map((i) => <g key={i} transform={`translate(${211 + i * 75} 81)`}><rect width='67' height='40' rx='2' fill='#0a4eb6' opacity='.8' /><path d='M12 6V34M25 6V34M38 6V34M51 6V34' stroke='#d8eaf2' strokeWidth='1.5' /></g>)}
      <path d='M27 215Q52 203 77 215T127 215T177 215T227 215T277 215T327 215T377 215T427 215T477 215T527 215T577 215' stroke='currentColor' strokeWidth='2' opacity='.35' />
    </> : <>
      <path d='M74 212V85L275 24 477 85V212M74 85H477' stroke='currentColor' strokeWidth='3' />
      <path d='M110 212V111H258V212M281 212V111H429V212' stroke='currentColor' strokeWidth='3' />
      <path d='M110 130H258M110 150H258M110 170H258M110 190H258M281 130H429M281 150H429M281 170H429M281 190H429' stroke='currentColor' opacity='.25' />
      <path d='M42 213H557' stroke='currentColor' strokeWidth='3' />
      <path d='M462 211V164H516V211M489 164V187M470 176H481M497 176H508M456 159V117H500V159M478 117V135' stroke='#0a4eb6' strokeWidth='3' />
      <rect x='235' y='49' width='81' height='18' rx='3' fill='currentColor' opacity='.18' />
    </>}
  </svg>
}

export function FreightIcon({ kind }: { kind: 'truck' | 'boxes' | 'project' | 'warehouse' }) {
  return <svg viewBox='0 0 64 64' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' aria-hidden='true' focusable='false'>
    {kind === 'truck' ? <><path d='M5 16H39V43H5ZM39 26H50L59 36V43H39M44 27V36H58' /><circle cx='16' cy='46' r='6' /><circle cx='48' cy='46' r='6' /><path d='M25 46H39' /></>
      : kind === 'project' ? <><path d='M8 55H56M17 55V10L45 10M17 16L9 25H48M17 16H48L45 10M43 25V36M40 36V40H46V36M25 55V39H48V55M36 39V48' /><path d='M17 27L25 35M17 39L25 47' /></>
      : kind === 'warehouse' ? <><path d='M6 55V22L32 8 58 22V55ZM6 24H58M17 55V33H47V55M17 40H47M17 47H47' /></>
      : <><path d='M7 28L22 20 37 28 22 36ZM7 28V46L22 54 37 46V28M22 36V54M27 14L42 6 57 14 42 22ZM42 22V40L57 32V14' /></>}
  </svg>
}
