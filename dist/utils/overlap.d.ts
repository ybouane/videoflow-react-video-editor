/**
 * Overlap detection on the timeline.
 *
 * The editor enforces one simple invariant: **two layers on the same track
 * may not overlap in time.** This module exposes the helpers used by the
 * timeline drag handlers to clamp moves and resizes so the invariant always
 * holds.
 *
 * Coordinates here are **timeline seconds** (not source-media seconds). Use
 * `layerTimelineBounds` from `utils/time.ts` to derive them for any layer.
 */
import type { LayerJSON } from '@videoflow/core/types';
/**
 * Find the lowest track number where a layer of `duration` seconds can be
 * placed starting at `startTime` without overlapping any existing layer.
 * If the given `preferTrack` has room, use it; otherwise search upward.
 * Returns the chosen track index (possibly a new one beyond the current max).
 */
export declare function findBestTrack(allLayers: LayerJSON[], startTime: number, duration: number, preferTrack?: number): number;
/**
 * Would placing the given layer at `[desiredStart, desiredStart + duration)`
 * on `targetTrack` collide with any other layer?
 *
 * Layers whose ids are in `ignoreIds` are skipped — pass the ids of the
 * layers currently being dragged so they don't collide with themselves.
 */
export declare function wouldOverlap(allLayers: LayerJSON[], targetTrack: number, desiredStart: number, duration: number, ignoreIds: Set<string>): boolean;
/**
 * Clamp a desired start time so that the layer at `(track, duration)` lands
 * in the largest gap on that track that contains `desiredStart`.
 *
 * The algorithm collects all neighbors on the same track (excluding the
 * ignored ids), sorts them by start time, and finds the gap surrounding the
 * *current* layer position. The returned start is then clamped to that gap.
 *
 * Returns a start time that is guaranteed not to produce an overlap — or
 * `null` if there's no room at all (the caller can treat this as "reject").
 */
export declare function clampMoveToTrack(allLayers: LayerJSON[], targetTrack: number, currentStart: number, desiredStart: number, duration: number, ignoreIds: Set<string>): number | null;
//# sourceMappingURL=overlap.d.ts.map