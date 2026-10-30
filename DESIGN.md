---
name: BringBackBleach Image Journal
description: An evidence-led daily visual journal of image restoration.
colors:
  paper: "#11111a"
  surface: "#181823"
  surface-raised: "#20202d"
  ink: "#f1efe9"
  soft-ink: "#d4d2d8"
  muted: "#aaa8b5"
  quiet: "#858391"
  line: "#383746"
  line-strong: "#555367"
  indigo: "#a4a8dc"
  indigo-deep: "#7176b5"
  red: "#e25355"
  red-dark: "#b63845"
  paper-light: "#f4f5f8"
  white: "#fff"
  control-border: "#555367"
  metric-track: "#30303f"
  metric-mid: "#a4a8dc"
typography:
  display:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "clamp(46px, 5.2vw, 74px)"
    fontWeight: 500
    lineHeight: 0.99
    letterSpacing: "-0.035em"
  headline:
    fontFamily: 'Georgia, "Times New Roman", serif'
    fontSize: "clamp(30px, 4vw, 44px)"
    fontWeight: 500
    lineHeight: 1.04
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Segoe UI, Arial, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Segoe UI, Arial, sans-serif"
    fontSize: "12px"
    fontWeight: 750
    letterSpacing: "0.12em"
rounded:
  circle: "50%"
components:
  theme-toggle:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    padding: "8px 11px"
  modal-close:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    width: "40px"
    height: "40px"
  comparison-grip:
    backgroundColor: "{colors.red}"
    textColor: "{colors.white}"
    rounded: "{rounded.circle}"
    size: "38px"
  scene-tab:
    backgroundColor: "transparent"
    textColor: "{colors.muted}"
    padding: "8px 0"
---

# Design System: BringBackBleach Image Journal

## Overview

**Creative North Star: "The Frame Inspection Field Report."**

The site is an independent image-review desk: a current dated report leads with the decision, then places image notes and their limits beside the visual evidence. The interface borrows from original anime frame annotations and monochrome reproduction marks, using cold ink-and-paper contrast, spiritual indigo, and one restrained red review signal. The interface design is original and uses no official logos or promotional art. Small, clearly labelled crops of series frames appear only as research comparisons.

The movable divider is the signature. A compact field register and numbered review cycle carry the same inspection language through the rest of the journal, while the short English dispatches keep the work legible to general readers.

**Key Characteristics:**
- Daily news-style reports lead with the result and its limits.
- Cold ink, paper, indigo, and a restrained red review mark define the palette.
- Straight rules, frame labels, and numbered stages make evidence provenance easy to scan.
- The image curtain and enlarged comparison keep the reviewed frame at the centre.

## Colors

The dark theme is the base palette; CSS custom properties remap the same roles for the light theme. Indigo carries section and completed-stage emphasis, while red is reserved for the active review mark, selection, focus, and curtain grip.

### Primary
- **Frame Indigo**: The dark-theme indigo marks section indices, completed review stages, and links.
- **Deep Indigo**: The darker companion is used for the register's vertical rule and deeper indigo emphasis.

### Secondary
- **Inspection Red**: The dark-theme red marks the active review stage, key decision marks, archive labels, focus, and the curtain grip.
- **Deep Inspection Red**: The darker red is available for subdued red treatments.

### Neutral
- **Cold Ink**: The page background and primary text use contrasting ink roles in the dark theme.
- **Raised Ink**: Modal and raised surfaces use a slightly lifted ink surface.
- **Soft Ink, Muted, and Quiet**: These separate body emphasis, supporting copy, and low-priority annotations.
- **Register Rules**: Thin dividers and stronger rules create structure without filled cards.
- **Cool Paper and White**: Light mode uses cool near-white surfaces; white remains the curtain line and text on dark labels.
- **Metric Track**: A quiet neutral rail keeps measured values distinct from result copy.

Light mode remaps the active CSS variables to paper #f4f5f8, surface #fbfbfd, raised surface #e8e9ef, ink #171722, soft ink #363541, muted #5a5966, quiet #686571, line #c9cbd4, strong line #9e9fac, indigo #424878, deep indigo #363d70, red #b73143, deep red #9c2637, control border #999aa6, metric track #d0d2da, and metric mid #565c93. The unchanged paper-light value is #f4f5f8 and white remains #fff.

### Named Rules
**The One Active Mark Rule.** Red marks current review, selection, focus, and the curtain grip; keep it out of broad decorative fills.

**The Evidence Label Rule.** Keep source/output labels and archive status attached to the comparison they describe.

## Typography

**Display Font:** Georgia (with Times New Roman, serif)  
**Body Font:** Segoe UI (with Arial, sans-serif)  
**Label Font:** Segoe UI (same sans-serif stack)

**Character:** The serif headline gives each dispatch a distinct editorial voice. The sans-serif keeps dates, labels, measurements, and explanatory copy compact and direct.

### Hierarchy
- **Display** (500, clamp 46–74px with 5.2vw scaling; mobile clamp 43–63px with 12vw scaling, 0.99 line-height, −0.035em tracking): The lead report headline.
- **Headline** (500, clamp 30–44px, 1.04 line-height, −0.025em tracking): Section headings and archive chapters.
- **Register title** (500, 24px, 1.15 line-height): The current-cycle action in the field register.
- **Lead** (400, clamp 18–22px on desktop and 17px on mobile, 1.52 line-height): The dispatch summary below the headline.
- **Body** (400, 14px, 1.7 line-height): Report explanation, held to 68ch where specified.
- **Label** (650–800, usually 12px with 0.02–0.13em tracking): Dates, cycle states, navigation, image labels, and evidence metadata.

## Layout

The header, main content, and footer share a centered page measure of min(1220px, viewport width minus 72px). The opening dispatch uses a wider story column beside a register column, with a flexible 34–64px gap. The base columns are minmax(0, 1.15fr) and minmax(320px, 0.85fr). The register's top rule and one-pixel indigo edge make it read like a separate field note without turning it into a card.

The optional current-image detail is a single-column, ruled insert between the dispatch and review cycle. The four review stages run as equal columns with vertical separators. Archive comparisons place the image beside scene context, and the earlier-results section pairs explanatory copy with a compact metric rail. The comparison frame keeps a 774:576 aspect ratio.

At 880px and below, page width becomes min(viewport width minus 48px, 720px); dispatch columns adjust to minmax(0, 1fr) and minmax(280px, 0.7fr) with a 30px gap. At 640px and below, the page uses 16px gutters, the header may wrap, the dispatch and archive stack, cycle steps become two columns, the footer becomes two columns, the wordmark caption disappears, and the Frame Archive link is hidden. The Latest Dispatch link remains until the 400px breakpoint, where it is also hidden and the navigation tightens. The comparison modal also narrows for mobile height. The page supports a 320px minimum viewport width.

## Elevation & Depth

The reading surface is mostly flat: thin rules, spacing, and small tonal shifts establish hierarchy instead of card shadows. The curtain edge has only a one-pixel contrast shadow. The enlarged comparison uses a restrained but clear shadow (0 20px 55px, black at 50%) with a dark backdrop (84%) to separate the native modal from the page.

## Shapes

The interface uses square-edged rules, tabs, buttons, and frames. No broad rounded-card system is present. The curtain's visible 38px grip is circular (50% radius) inside a full-height 56px hit target. The small red BB review stamp is square and rotates slightly; its border and the archive mark keep the registration language restrained.

## Components

### Buttons
The controls are compact text actions with a visible focus state.
- **Theme switch:** Transparent background, one-pixel control border, 8px 11px desktop padding, 8px mobile padding, 12px text, and a 7px red indicator. Its label toggles between “Light” and “Dark”; hover changes the border to red. Focus uses a 2px red outline with a 4px offset.
- **Modal close:** A transparent 40px square with a one-pixel control border and an 18px inline SVG. Hover turns its border and icon red; focus uses the same red outline.

### Navigation
A 27px bold Georgia BB monogram uses a red second B and a slim indigo registration stroke. Beside it, a 12px uppercase “Image journal” caption is separated by a rule. Links use 12px text with a flexible 14–31px gap, shifting to indigo on hover; GitHub is bold. At 880px the navigation keeps 12px text and uses 14px gaps. At 640px the header can wrap, the navigation aligns right with 10px gaps, and the Frame Archive link and wordmark caption are hidden. At 400px Latest Dispatch is hidden too, with an 8px gap.

### Progress register
The opening register has a one-pixel top rule and one-pixel deep-indigo vertical rule, a padded 66px rotated red review stamp, a 34px serif stage number, and a four-part 4px progress track. The status feed updates the stage number and total, note, accessible progress value, and complete/current segments; segments beyond the cycle total are hidden. Completed segments are indigo, the current segment is red, and remaining segments use the stronger rule color. At 880px the stamp margins tighten; on mobile it becomes a 48px static stamp with compact margins.

### Scene selectors
Archive scene selectors are unfilled text tabs with a transparent bottom rule. The active tab uses the red underline; hover strengthens the text color. Focus has a 2px red outline with a 4px offset.

### Frame comparison
The before image fills the frame. The after image is clipped from the current split position, with a one-pixel white divider and a circular red grip centred over it. Dark translucent 12px labels identify before and after at the top corners; they move closer to the frame edge on mobile. Dragging updates the split; the slider responds to arrow keys, Page Up and Page Down, Home, and End. Enter or Space opens the focused archive comparison in the modal. The modal uses the same curtain, a close button, a native dialog, and Escape/backdrop closing. Its frame width is limited by 74dvh on desktop and 70dvh on mobile.

The theme preference follows an explicit saved choice when present, otherwise the operating-system preference. The switch updates and stores the choice; reduced-motion preferences disable smooth scrolling and shorten transitions.

## Do's and Don'ts

### Do:
- **Do** lead with a dated result and keep its measurement limits near the image evidence.
- **Do** label source, output, and archive status directly on each comparison.
- **Do** use indigo for completed stages and red for the current stage or interaction.
- **Do** preserve the dark and light themes and the existing keyboard and reduced-motion behavior.

### Don't:
- **Don't** use official Bleach logos or promotional art as interface branding; keep series frames to small, clearly labelled research crops.
- **Don't** let the red review signal become a broad decorative fill.
- **Don't** treat a measured score as a visual grade or separate a before/after image from its provenance.


