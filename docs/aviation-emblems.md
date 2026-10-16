# Aviation institution emblems

Placement: a compact reference strip after the homepage statistics and before its quote banner, plus an explanatory section before the air freight CTA. Both placements use `AviationInstitutions.tsx` and the normal English/Spanish dictionary.

The section identifies industry institutions and their roles. It does not assert that TLI is IATA-accredited, TSA-certified, endorsed by DHS or a government partner. Do not relabel these references as credentials without evidence of the actual status.

## Sources and optimization

Original downloaded files are preserved in `assets/aviation-emblems/`. The requested TSA PNG is retained alongside a higher quality SVG version of the same mark used for final encoding. The official IATA header asset was inspected; the Commons vector provides a cleaner aspect ratio for this layout. CleanPNG links were reviewed as visual references; source vectors avoid their thumbnail quality limits.

- IATA: [original logo](https://commons.wikimedia.org/wiki/File:IATAlogo.svg), [organization](https://www.iata.org/en/about/).
- TSA: [requested PNG](https://commons.wikimedia.org/wiki/File:Transportation_Security_Administration_Logo.png), [vector source](https://commons.wikimedia.org/wiki/File:Transportation_Security_Administration_Logo.svg), [air cargo security](https://www.tsa.gov/for-industry/cargo-screening).
- DHS: [vector source](https://commons.wikimedia.org/wiki/File:Seal_of_the_United_States_Department_of_Homeland_Security.svg), [department](https://www.dhs.gov/about-dhs).

Run `npm run images:aviation` to regenerate WebP assets with Sharp. The generated `assets/aviation-emblems/optimized.json` records each source URL, output dimensions and exact byte size. Output files are below 30 KiB each, preserve transparency and proportions, and contain no image metadata. The frontend sets intrinsic dimensions and uses lazy loading to prevent layout shifts and avoid adding logo downloads to the initial hero request.

## Publication and emblem permissions

Copyright status does not establish permission to use official seals or trademarks. [IATA's logo guidance](https://portal.iata.org/faq/articles/en_US/FAQ/Where-can-I-find-the-IATA-logo-and-how-can-I-use-it-1415811051031) restricts logo use to accredited travel/cargo agents. [DHS Management Directive 0030](https://www.dhs.gov/xlibrary/assets/foia/mgmt_directive_0030_use_of_the_department_of_homeland_security_seal.pdf) requires prior written approval for outside use of the DHS seal and prohibits implying commercial endorsement. Verify the company's applicable permissions before public deployment. The user supplied the emblems for preparation in this local website; no accreditation or seal authorization document has been provided in this chat.
