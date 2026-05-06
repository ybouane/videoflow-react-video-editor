/**
 * Snapping / magnetism utilities.
 *
 * When the user drags a layer edge or the playhead, the editor nudges the
 * value towards nearby "magnets" — other layer edges (start / end), the
 * playhead, and keyframe times on non-dragging layers.
 *
 * The pixel threshold is converted into time using the current
 * `timelineScale` (pixels per second). This keeps the feel consistent across
 * zoom levels: 8 px at 50 px/s is 0.16 s; 8 px at 400 px/s is 0.02 s.
 */
import type { LayerJSON } from '@videoflow/core/types';
export type Magnet = {
    /** Time in seconds on the timeline. */
    time: number;
    /** Kind of magnet — lets the UI render them differently if desired. */
    kind: 'layer-start' | 'layer-end' | 'playhead' | 'keyframe' | 'marker';
    /** Id of the layer the magnet came from, when applicable. */
    layerId?: string;
};
/** Default pixel threshold for snapping — ~half a finger width. */
export declare const DEFAULT_SNAP_PIXELS = 8;
/**
 * Build the magnet set for a drag operation.
 *
 * @param layers - All layers in the document.
 * @param excludeIds - Layer ids that are being dragged; their own edges are
 *   excluded so a layer never snaps to itself.
 * @param playheadTime - Current playhead time in seconds. Pass `null` to omit.
 * @param markers - Optional timeline markers in seconds.
 */
export declare function computeMagnets(layers: LayerJSON[], excludeIds: Set<string>, playheadTime: number | null, markers?: number[]): Magnet[];
/**
 * Snap a candidate time to the nearest magnet if it falls within the snap
 * threshold. Returns the snapped time and the magnet that caused the snap, or
 * `null` if nothing was close enough.
 */
export declare function snapTime(candidateSec: number, magnets: Magnet[], timelineScale: number, thresholdPx?: number): {
    time: number;
    magnet: Magnet;
} | null;
//# sourceMappingURL=magnetism.d.ts.map