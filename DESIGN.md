# Design System — Mediterranean Precision

## Direction

The visual world combines the four supplied systems into a single idea: a night-time Antalya consultation rendered with the precision of a treatment plan. Vanta contributes cinematic scale and editorial pacing; Noema contributes measured annotations; AER//FORM contributes sharp contrast, technical metadata and layered motion. The clinic category's generic blue-and-white card grid is deliberately avoided.

## Palette

- Obsidian `#080B0F`: primary night surface.
- Chalk `#F3F0E8`: primary text and light sections.
- Limestone `#C8C2B5`: secondary text.
- Copper `#F0703A`: primary action and warmth.
- Mediterranean blue `#4F7CFF`: technical/state accent only.
- WhatsApp green `#25D366`: reserved exclusively for WhatsApp actions.

## Typography

- Display: Manrope, tightly tracked but never below `-0.04em`; geometric and clear enough for medical trust.
- Body/UI: Manrope.
- Data and measurements: IBM Plex Mono, used only for genuine procedural metadata and labels.

## Shape and Layout

Structural sections are rectilinear with hairline rules. Cards are used only where the content is genuinely discrete. Small controls may be pill-shaped; major containers use 12–16px radii at most. Page gutters use `clamp(20px, 4vw, 64px)` and sections use generous vertical spacing.

## Motion

The authored sequence opens with a one-session 00–100 planning loader, then releases into a 180svh sticky hero. A lazily loaded Three.js point cloud responds to pointer position and hero scroll while the personal-plan sheet, image and headline move through distinct depth planes. The copper headline carries an eight-layer echo trail. Fine-pointer devices use a dual-layer inertial cursor and bounded magnetic movement on primary actions. A visible motion control lets visitors explicitly override the system preference; reduced mode keeps a quiet static 3D frame. The 3D loop pauses when the hero or page is not visible. Interactive controls use 160–220ms transitions with `cubic-bezier(0.23, 1, 0.32, 1)`.

## Conversion Pattern

The page path is: clear offer → low-friction WhatsApp action → planning proof → technique education → travel/process clarity → objection handling → guided WhatsApp form. Every primary action uses the same phone number and prefilled intent.

## Navigation Architecture

The primary navigation is route-based rather than section-based: `/results`, `/techniques`, `/journey` and `/contact` are independent editorial pages. Desktop navigation marks the current route. Below 1080px, a full-screen numbered menu becomes the main navigation surface, locks background scroll while open, closes on Escape or route change, and preserves a direct WhatsApp action.
