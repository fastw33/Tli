# Global scroll motion and freight imagery

`ScrollAnimations.tsx` is the sole AOS owner, mounted in the shared English/Spanish `SiteLayout`. It initializes the existing AOS 2.3.4 package once and refreshes its registry on route changes, element insertion/removal, glossary visibility changes, image loads and details expansion. Navigation, dialogs, sticky elements and form contents are excluded from automatic animation assignment. The global CSS keeps focused content usable and provides no-JavaScript, initialization-failure and reduced-motion fallbacks.

Entry animations use 600 ms easing, a 24 px offset, delays capped at 150 ms, and `once: false`. Installed AOS 2 does not implement the `mirror` option advertised by newer type declarations, so an IntersectionObserver adds `data-aos-exited` after a block completely leaves the top of the viewport; the stylesheet supplies the exit state. Re-entering the viewport clears it. This provides repeatable entry and exit without swapping libraries or repeatedly adding AOS event listeners. See the [AOS project](https://github.com/michalsnik/aos/tree/v2).

The new home previews are server-rendered. Air and ocean freight use matching generated illustrative photographs, not photographs of TLI's own equipment or facilities. Both have the same 1200 × 500 framing, navy blue-hour grading, warm operational lighting and HTML overlay. Their card content and action rows align through the shared flex layout. English and Spanish alternative text identify the scenes as illustrative.

- Mode: built-in `image_gen` tool; new image generation, not a CLI/API fallback.
- Preserved generated source: `assets/home/air-freight-source.png` (1942 × 809).
- Website asset: `public/images/home/air-freight.webp` (1200 × 500, 79,610 bytes). Encoded using Sharp, WebP quality 78 and effort 6, metadata removed.
- Intrinsic dimensions and lazy loading preserve layout and avoid adding this image to the hero's initial request.

## Air freight generation prompt

Use case: ads-marketing. Asset type: professional freight-forwarding website service-card banner, a NEW image. Create a photorealistic editorial scene of commercial AIR CARGO loading at an airport cargo apron at blue hour. A large unbranded white wide-body cargo aircraft in convincing side/three-quarter profile, its cargo door visibly open, an airport high-loader aligned correctly with the door and palletized freight on the loader; a few neatly staged wrapped cargo pallets in the foreground. Clear accurate aircraft geometry, realistic wings, engines and landing gear. Quiet, orderly professional scene, navy and cool blue palette with subtle warm apron lights. Aircraft and loading operation must be readily recognizable at small website-card size. Wide panoramic 2.4:1 composition, keep all key plane and loading details inside the central 80% horizontally and central 70% vertically for responsive cropping. Upper left should be visually calm/dark to allow a small HTML service label. Sharp, premium commercial photography style, realistic materials and natural perspective. No text, no logos, no company marks, no watermarks, no infographic graphics, no drawn airplane silhouette. This is an illustrative marketing image and must not depict a specific named airline or company.

## Ocean freight generation

- Mode: built-in `image_gen` tool, new image with the air freight WebP supplied only as a style reference.
- Preserved generated source: `assets/home/ocean-freight-source.png`.
- Website asset: `public/images/home/ocean-freight.webp` (1200 × 500, 97,804 bytes), Sharp WebP quality 78, effort 6, metadata removed.

Final prompt:

Create a NEW OCEAN FREIGHT marketing photograph for the service card beside the provided AIR FREIGHT photograph. The provided image is a STYLE reference only: match its premium photographic realism, blue-hour navy/cool blue palette, subtle warm cargo lights, horizontal subject scale and balanced visual density. Do not edit or reproduce the airplane image. New subject: a large unbranded modern container ship docked at a commercial cargo terminal, convincing three-quarter side perspective with its bow on the right, shipping containers on the deck and a few gantry cranes behind it, orderly port operations, some warm terminal lights reflecting on calm dark water. Realistic coherent ship geometry, containers, cranes and water. Ship should fill the center and lower middle of the composition, leave calm dark navy sky at upper left for the matching HTML service label. Panoramic 2.4:1 framing matching the reference exactly, primary subject takes approximately the same proportion of the frame as the aircraft, keep crucial ship details within central 80% horizontally and 70% vertically for responsive crops. This must look like another photograph from the SAME commercial editorial collection and same time of day, not an illustration, drawing, diagram or 3D icon. No text, no logos, no brand marks, no watermarks. Image is an illustrative marketing scene, not an actual named company's facility.
