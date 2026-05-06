/**
 * Preview — hosts the `DomRenderer` shadow DOM and renders selection
 * overlays on top.
 *
 * Architecture
 * ------------
 * 1. A single `<vf-preview-stage>` host element is mounted once on first
 *    render. The `RendererBridge` attaches a ShadowRoot to it for the actual
 *    video composition.
 * 2. A sibling `<vf-preview-overlay>` (light-DOM) sits on top of the stage
 *    and owns the selection bounding box and corner resize handles. Because
 *    it's a sibling of the stage — not a child — it doesn't collide with
 *    anything inside the shadow root.
 * 3. Pointer-down on the stage walks `event.composedPath()` to find the
 *    deepest `[data-id]` element, identifying which layer was clicked. This
 *    is the only way to cross the shadow boundary from React.
 * 4. Drag-to-move adjusts `properties.position` as a normalized `[0..1]`
 *    vector using the host's bounding rect, applies magnets at `0`, `0.5`,
 *    `1` (same as scrptly's canvas drag), and commits via `setPropertyCommand`.
 * 5. Drag a corner handle to resize: we scale the layer's current `scale`
 *    property by the ratio between cursor distance from the element center
 *    (before vs during drag), mirroring scrptly's resize handler.
 *
 * Pan / zoom
 * ----------
 * Pan and zoom are applied as a CSS `transform` on `<vf-preview-stage-wrap>`.
 * Because the selection overlay is a child of the same wrap, it's transformed
 * alongside the stage — so selection boxes stay glued to their layers without
 * any extra math. The transform state lives in the store as
 * `viewport.previewZoom` and `viewport.previewPanX/Y` so the shortcut system
 * can reset it (the "z" key → fit) from outside this component.
 *
 * Inputs:
 *   - ctrl/cmd + wheel → zoom anchored at the cursor.
 *   - wheel (no modifier) → pan vertically, shift + wheel → pan horizontally.
 *   - middle-mouse drag → pan.
 *
 * Rendering notes
 * ---------------
 * - The selection overlay reads the selected layer's `getBoundingClientRect`
 *   on every render tick via `onFrame` so it stays synced during scrub and
 *   playback.
 * - Selection box positions are expressed relative to the `vf-preview` panel
 *   (not the viewport) so CSS transforms on ancestors can't offset them.
 */
export declare function Preview(): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Preview.d.ts.map