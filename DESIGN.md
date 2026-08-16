# CivicConnect Design System

This document captures the visual design system, tokens, and structural rules for the CivicConnect application. It serves as the single source of truth for UI decisions to maintain a premium, cohesive aesthetic.

## 1. Brand Identity & Principles

*   **Vibe:** Premium, functional, civic, transparent.
*   **Aesthetic Rules (Anti-Slop):**
    *   **Flat over Floaty:** We do not use drop shadows (`shadow-sm`, `shadow-lg`) for structural cards or form elements. We rely on crisp 1px borders (`border-gray-200`) to define hierarchy.
    *   **Structured Geometry:** We avoid bubbly corners (`rounded-[3rem]`). Structural elements use `rounded-2xl` (cards, dialogs) or `rounded-xl` (inputs, buttons).
    *   **No Decorative Gradients:** Backgrounds and text rely on stark, solid colors. We do not use gradient fades (e.g., `bg-gradient-to-t`) to blend images; we use hard cuts or dark scrims (`mix-blend-overlay`).

## 2. Design Tokens (`globals.css`)

### Typography
*   **Font Family:** `Geist` (sans-serif). Function-first, highly legible.
*   **Display Headers (H1/H2):** High contrast. `text-gray-900`, `font-black`, with tight tracking (`tracking-tighter`) for an editorial density.
*   **Metadata / Kickers:** Extreme precision. `text-[10px]` or `text-[11px]`, `font-bold`, `uppercase`, with wide tracking (`tracking-[0.15em]`). Used for table headers, card categories, and section labels.
*   **Functional Body:** `text-gray-500` or `text-gray-600`, `font-medium` for readability without heavy weight.

### Color Palette
*   **Canvas (Background):** `--color-canvas: #fafaf9` — A warm off-white, preventing the stark sterility of pure `#ffffff` or the coldness of Apple's `#f5f5f7`.
*   **Primary Brand:** Violet.
    *   Base: `--color-primary: #7c3aed`
    *   Dark (Hover/Active): `--color-primary-dark: #6d28d9`
    *   Soft (Backgrounds): `--color-primary-soft: #f5f3ff`
*   **Status Colors:**
    *   **Pending:** Amber (`bg-amber-50 text-amber-700`)
    *   **Ongoing:** Violet (`bg-primary-soft text-primary-dark`)
    *   **Resolved:** Emerald (`bg-emerald-50 text-emerald-700`)
    *   *Note: Status badges use text colors for trend indicators rather than heavy background blocks.*

## 3. Core Components

### Cards & Surfaces
*   **Standard Card:** `rounded-2xl border border-gray-200 bg-white`.
*   **Active/Accent Card:** Solid `--color-primary` background with `text-white`.

### Forms & Inputs
*   **Inputs:** `rounded-xl border border-gray-200 bg-white px-4 py-3.5 text-sm`. Focus states use a primary ring (`focus:border-primary focus:ring-4 focus:ring-primary/10`).
*   **Interactive Pills:** `rounded-full px-5 py-2.5 text-sm font-semibold`. Active state is inverted (`bg-gray-900 text-white` or `bg-primary text-white`).

### Data Tables (Admin)
*   **Headers:** `bg-gray-50/50` with metadata styling (`text-[10px] uppercase tracking-[0.15em] text-gray-500`).
*   **Rows:** Clean `border-b border-gray-100` separation. Avatars are solid primary circles with white text (`h-9 w-9 text-[11px] font-bold ring-1 ring-primary/30`).

## 4. Layouts
*   **Container Widths:** `max-w-6xl` for standard pages, providing a wide, breathable layout.
*   **Grid Systems:** We prefer 2-column asymmetric grids (`lg:grid-cols-3` where main content is `span-2` and contextual cards are `span-1`) for detail views.
*   **Hero Sections:** Images are placed in strict containers (e.g., `h-[40vh] bg-gray-900`) with `opacity-60 mix-blend-overlay` to ensure perfect foreground text contrast.

## 5. Patterns to Avoid (The "Impeccable" Blocklist)
*   ❌ Floating card piles with rotated transforms.
*   ❌ Arbitrary blob shapes or blurred colored orbs (`blur-3xl`).
*   ❌ Generic `text-gray-500` without varied font weights.
*   ❌ Mixing blue default tailwind accents into our Violet brand.
