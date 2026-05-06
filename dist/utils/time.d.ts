/**
 * Time-context conversion helpers.
 *
 * VideoFlow distinguishes three time contexts (see `@videoflow/core/types`):
 *
 * 1. **Timeline time** — seconds on the project timeline. The editor UI
 *    works in this frame of reference almost exclusively.
 * 2. **Source-segment time** — seconds within the playable segment of a
 *    single layer, ignoring the layer's `sourceStart` offset.
 * 3. **Source-media time** — seconds inside the original source clip.
 *    Keyframe `time` values live here; so does an `HTMLVideoElement`'s
 *    `currentTime`.
 *
 * Whenever the editor reads or writes a keyframe time, it has to convert
 * between timeline time and source-media time using the layer's `startTime`,
 * `sourceStart`, and `speed`.
 */
import type { LayerJSON } from '@videoflow/core/types';
/** Convert a timeline second to the corresponding frame, rounding to nearest. */
export declare function timeToFrame(timeSec: number, fps: number): number;
/** Convert a frame to its timeline-time position in seconds. */
export declare function frameToTime(frame: number, fps: number): number;
/**
 * Convert a timeline-time value (seconds) to the layer's source-media time
 * (seconds), taking `startTime`, `sourceStart`, and `speed` into account.
 *
 * This mirrors `RuntimeBaseLayer.sourceTimeAtFrame` from the renderer so the
 * editor and renderer agree on keyframe lookup semantics.
 */
export declare function timelineTimeToSourceTime(layer: LayerJSON, timelineSec: number): number;
/**
 * Inverse of {@link timelineTimeToSourceTime}.
 * Converts a source-media time back to a timeline time for the given layer.
 */
export declare function sourceTimeToTimelineTime(layer: LayerJSON, sourceSec: number): number;
/**
 * Compute the layer's timeline-time start/end boundaries. `startTime` is the
 * configured start; `endTime` is derived from `sourceDuration` and `speed`.
 */
export declare function layerTimelineBounds(layer: LayerJSON): {
    start: number;
    end: number;
};
/** Format a timeline time (seconds) as `MM:SS.ff` (frames) for UI display. */
export declare function formatTime(timeSec: number, fps: number): string;
/**
 * Compute the timeline duration of a video as the end of its last-finishing
 * layer. Empty projects fall back to `minDuration` so the ruler still has
 * something to show. Non-empty projects honour their actual content length —
 * we don't pad a 2-second video to 5 seconds.
 */
export declare function computeVideoDuration(layers: LayerJSON[], minDuration?: number): number;
/**
 * Compute the maximum end time among a list of children. Children of a group
 * store their `startTime` relative to the group's own startTime, so the
 * returned value is the group's required interior footprint (in the group's
 * local frame). Returns 0 when the list is empty.
 */
export declare function maxChildEndTime(children: LayerJSON[]): number;
//# sourceMappingURL=time.d.ts.map