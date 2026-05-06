/**
 * Timeline — the heart of the editor.
 *
 * Layout
 * ------
 * The timeline is a 2×2 CSS grid:
 *
 *     ┌──────────────┬──────────────────────────────┐
 *     │ corner       │ ruler                        │
 *     ├──────────────┼──────────────────────────────┤
 *     │ track headers│ tracks area (scrollable)     │
 *     └──────────────┴──────────────────────────────┘
 *
 * Both the ruler and the tracks share a horizontal scroll. When the user
 * wheels the tracks area horizontally (or zooms), we sync the ruler's
 * `translateX` to match.
 *
 * Interaction
 * -----------
 * - Click a layer block → single-select.
 * - Shift/Cmd click → toggle multi-selection.
 * - Drag a layer → `moveLayersCommand` with magnetism against other edges,
 *   playhead, keyframes.
 * - Drag the left edge handle → `trimStartCommand` (shifts `sourceStart` and
 *   `startTime` together).
 * - Drag the right edge handle → `resizeLayerCommand` (adjusts
 *   `sourceDuration` only).
 * - Drag on the ruler → scrub the playhead, with seek forwarded to the
 *   renderer bridge.
 * - Cmd/Ctrl + wheel → zoom around the cursor.
 * - Drag the invisible 6px bar at the very top of `<vf-timeline>` to resize
 *   the panel vertically (writes `--vf-timeline-height` on the editor root;
 *   CSS `clamp()` enforces the 120px / `100% - 260px` bounds).
 *
 * Group navigation
 * ----------------
 * Double-clicking a group layer enters it via `enterGroup`, swapping the
 * active layer list to the group's children. The ruler then runs from `0` to
 * the group's `sourceDuration` (group-local), and the playhead is constrained
 * to the project-absolute `[origin, origin + sourceDuration]` window — see
 * {@link getEffectivePlayheadWindow}.
 */
import type { LayerJSON } from '@videoflow/core/types';
export declare function Timeline(): import("react/jsx-runtime").JSX.Element;
export declare function layerDisplayName(layer: LayerJSON): string;
//# sourceMappingURL=Timeline.d.ts.map