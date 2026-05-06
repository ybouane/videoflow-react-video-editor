/**
 * Helpers for navigating the (potentially nested) group tree.
 *
 * The editor exposes a single "active layer list" — either the project's
 * top-level `video.layers` or, when the user has double-clicked into a group,
 * the deepest group's `children`. The path is a stack of group ids from the
 * root inward: `['groupA', 'groupB']` means we're inside groupA → groupB.
 *
 * Commands operate by id, so we recursively search the whole tree. This keeps
 * commands path-agnostic — they don't have to know whether the user is at the
 * top level or several groups deep.
 */
import type { LayerJSON, VideoJSON } from '@videoflow/core/types';
/**
 * Walk `path` through `video.layers` and return the layers array at the
 * corresponding depth. Empty path returns `video.layers` itself.
 *
 * Returns `null` if any segment of the path doesn't resolve to a group.
 */
export declare function getLayersAtPath(video: VideoJSON, path: string[]): LayerJSON[] | null;
/**
 * Resolve every group id along `path` to its `LayerJSON`. Used by the
 * breadcrumb / exit-group UI to label each level.
 *
 * Returns `null` if any segment fails to resolve — callers should treat this
 * as "the path is stale, exit group mode."
 */
export declare function getGroupChain(video: VideoJSON, path: string[]): LayerJSON[] | null;
/** Recursively find a layer by id anywhere in the tree. */
export declare function findLayerById(layers: LayerJSON[], id: string): LayerJSON | undefined;
/**
 * Recursively find the parent layers array containing `id`, plus the index of
 * the matching layer inside it. Useful for reorder / remove commands that
 * need to splice the host array.
 */
export declare function findLayerHost(layers: LayerJSON[], id: string): {
    host: LayerJSON[];
    index: number;
} | undefined;
/**
 * Accumulated time offset (in seconds) that converts the given layer's
 * group-relative timeline time into project-absolute time. Returns 0 for
 * top-level layers.
 *
 * Children of groups store `settings.startTime` relative to their parent
 * group, so any code that mixes a project-absolute playhead with a child
 * layer's source-time conversion has to first subtract this offset from the
 * absolute time. The offset accumulates `startTime - sourceStart` along every
 * ancestor group on the path, mirroring `buildBridgeVideo`.
 */
export declare function getLayerGroupOffsetSec(video: VideoJSON, layerId: string): number;
/**
 * Return the path of group ids leading to (but not including) the given layer
 * id. Empty array if the layer is at the top level. `null` if the id isn't in
 * the tree at all.
 */
export declare function getPathToLayer(layers: LayerJSON[], id: string, prefix?: string[]): string[] | null;
/** Apply `path` from `video.layers` and verify every step still resolves. */
export declare function isPathValid(video: VideoJSON, path: string[]): boolean;
/**
 * Normalise a `groupPath` against the current video — drops trailing ids that
 * no longer resolve to a group (e.g. the user undid the create or removed the
 * group while inside it). Returns the longest valid prefix.
 */
export declare function normalizeGroupPath(video: VideoJSON, path: string[]): string[];
/**
 * Build the `VideoJSON` the bridge should render given the active group path.
 *
 * - At the root (empty path) → returns the project video unchanged.
 * - Inside a group → returns a synthetic video that:
 *     - Uses the project's width / height / fps so playhead and timeline
 *       alignment remain consistent with the rest of the editor.
 *     - Stretches `duration` to `max(video.duration, origin + sourceDuration)`
 *       so playback / seek can reach the end of the group even when the
 *       group's footprint extends past (or sits past) the project's own end.
 *     - Replaces the layer list with shallow-cloned copies of the active
 *       group's children, each shifted from group-relative time into absolute
 *       project time. The editor stores children as group-relative so that
 *       moving / trimming the group is local — but the renderer and the
 *       project-wide playhead both work in absolute frames, so the synthetic
 *       video has to expose absolute positions to stay in sync.
 *     - Replaces tracks with the group's own tracks array.
 *     - Sets `backgroundColor: 'transparent'` so the preview's checker-pattern
 *       background shines through.
 */
export declare function buildBridgeVideo(video: VideoJSON, activeGroupPath: string[]): VideoJSON;
/**
 * Project-absolute time window the playhead should be allowed to roam over,
 * given the active group path. At the root → `[0, video.duration]`. Inside a
 * group → `[max(0, origin), origin + sourceDuration]`, where `origin` is the
 * project-absolute time at which the group's content (group-local t=0) sits.
 *
 * Falsy / unresolvable paths fall back to the project bounds, so callers can
 * use this unconditionally without first checking whether the path resolves.
 */
export declare function getEffectivePlayheadWindow(video: VideoJSON, activeGroupPath: string[]): {
    minSec: number;
    maxSec: number;
};
//# sourceMappingURL=groupPath.d.ts.map