/**
 * Track packing.
 *
 * The editor groups layers into **tracks** — rows on the timeline — for
 * display and interaction. `LayerJSON.track` is the assignment that the
 * renderer also reads (its z-order = `track + 1`).
 *
 * Stack order is determined by a single priority tuple, applied uniformly to
 * every layer in a layer list:
 *
 *     (track ?? 0, zIndex ?? 0, originalArrayIndex)
 *
 * Higher tuple = higher in the visual stack. The packer sorts ascending
 * (= bottom-to-top), then assigns rows by walking each layer **down** from
 * the top of the current stack one track at a time. The descent stops the
 * moment the track immediately below contains a layer whose time interval
 * overlaps the current layer — even if some lower track happens to be
 * empty. That guarantees a higher-priority layer is never placed *under* a
 * lower-priority one when their time windows overlap (which would invert
 * the visual stacking the inputs ask for).
 *
 * Output rows are **0-indexed** — the lowest assigned row is `0`, matching
 * the timeline UI's row indexing and the renderer's `track + 1` z-index
 * convention. `track === 0` is a valid stack position, not a sentinel.
 *
 * Single mode
 * -----------
 * `packLayersIntoTracks` is the only entry point. There is no separate
 * "fill missing slots" fallback — the algorithm always runs end to end,
 * treating any existing `track` / `zIndex` purely as priority hints. The
 * output replaces them: callers should write the returned values back onto
 * the layers and {@link stripZIndexHints} the consumed `zIndex` field.
 */
import type { LayerJSON } from '@videoflow/core/types';
/**
 * Compute the output track index for every layer in `layers`. The returned
 * array is parallel to `layers` — index `i` holds the assigned track for
 * `layers[i]`. Output values are always `>= 0`.
 *
 * Algorithm:
 *   1. Compute each layer's stack key `(track, zIndex, arrayIndex)`.
 *   2. Sort layers ascending by that key (stable on the secondary keys).
 *   3. For each layer in sort order, place it on the row immediately above
 *      the current top of the stack, then walk it down one row at a time.
 *      The descent stops as soon as the row directly below has any time-
 *      overlapping interval; the layer settles on the row above that
 *      blocker. The very first layer (empty stack) sinks all the way to
 *      row 0.
 *
 * The descent is "stop at the first overlap going down" — even if a lower
 * row happens to be empty, the layer doesn't skip past a blocker to reach
 * it. That's deliberate: skipping would let a high-priority layer end up
 * *underneath* a lower-priority one whose time window overlaps in part,
 * inverting the visual stack the priority tuple was meant to encode.
 *
 * Because the sort is stable and the inputs determine the output deterministically,
 * running the packer twice in succession is a fixed point — the second run
 * sees its own output `track` values and produces the same assignment.
 */
export declare function packLayersIntoTracks(layers: LayerJSON[]): number[];
/**
 * Strip the `zIndex` hint from every layer (and recursively from group
 * children). Called by `store.normalizeDraft` after each pack so the field —
 * which is consumed once into the resulting `track` — doesn't linger and
 * conflict with the now-authoritative track on the next round-trip.
 */
export declare function stripZIndexHints(layers: LayerJSON[]): void;
/**
 * Read the (already-assigned) `layer.track` value off each layer, producing
 * the same parallel array shape as {@link packLayersIntoTracks}. Layers
 * without a track fall to 0 (the bottom row).
 *
 * This is the normal runtime read: the store's `normalizeDraft` pass
 * commits packed values back onto the layers, so every subsequent render
 * can just ask the layers what track they're on.
 */
export declare function readLayerTracks(layers: LayerJSON[]): number[];
/**
 * Convenience: return the layers grouped by their packed track, sorted by
 * start time within each track. Useful for timeline rendering.
 */
export declare function groupLayersByTrack(layers: LayerJSON[], tracks: number[]): LayerJSON[][];
//# sourceMappingURL=trackPacking.d.ts.map