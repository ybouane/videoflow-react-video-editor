/**
 * Command factories.
 *
 * Thin wrappers over `store.commit(recipe, { label, mergeKey })` for every
 * interaction that produces an undo entry. Keeping them in one place gives
 * the editor a consistent vocabulary and makes merge-key policy visible.
 *
 * Merge-key conventions
 * ---------------------
 * Coalescible (drag / scrub) operations:
 * - `move:<sorted-ids>` — drag-moving layers on the timeline or preview.
 * - `resize:<id>:end` — resizing a layer from the right edge (`sourceDuration`).
 * - `trim:<id>:start` — trimming the left edge (`sourceStart` + `startTime`).
 * - `property:<id>:<prop>` — scrubbing a static property value.
 * - `setting:<id>:<name>` — scrubbing a settings field (e.g. `speed`).
 * - `keyframe:<id>:<prop>:<time>` — upserting / dragging a single keyframe.
 * - `keyframe-remove:<id>:<prop>:<time>` — removing a keyframe (mergeable so a
 *   click on the diamond button at the playhead is one undo step).
 * - `transition-dur:<id>:<edge>` — drag-resizing a transition window.
 * - `transition-param:<id>:<edge>:<param>` — scrubbing a transition param.
 * - `effect-param:<id>:<index>:<param>` — scrubbing an effect param.
 * - `project:<sorted-fields>` — typing into project-wide fields (name, fps, …).
 *
 * Discrete operations (no merge key — each is its own history entry):
 * - Layer add / remove / reorder / group, transition set/clear, effect
 *   add / remove / reorder / enable, layer enable, 3D-toggle, track-meta
 *   patches, property reset.
 *
 * The merge window (see `store.ts`) means same-key commits within 800 ms
 * collapse into one history entry — so a 200-frame drag becomes one undo.
 */
import type { Animation, TrackJSON } from '@videoflow/core/types';
import type { EditorState } from '../store.js';
import { type NewLayerOptions } from '../utils/layerFactory.js';
type CommitFn = EditorState['commit'];
/**
 * Add a new layer at the given index (defaults to the end of the layer list).
 * Optionally assigns the layer to a specific track. The layer lands in the
 * `groupPath` sub-tree — empty path inserts at the project root, otherwise
 * the layer becomes a child of the deepest group on the path.
 *
 * No merge key — each add is a discrete history step.
 */
export declare function addLayerCommand(commit: CommitFn, opts: NewLayerOptions, index?: number, track?: number, groupPath?: string[]): Promise<string>;
/**
 * Remove layers by id. Batches multiple ids into a single history entry. Each
 * id is resolved anywhere in the layer tree, so the same call handles a mix
 * of root-level and nested-group selections.
 */
export declare function removeLayersCommand(commit: CommitFn, ids: string[]): Promise<void>;
/**
 * Wrap the selected layers in a new group layer. Returns the new group's id,
 * or `null` when the selection can't be grouped (less than two layers, or the
 * layers don't share the same parent host array).
 *
 * The new group's `startTime` is set to the earliest child `startTime` and its
 * `sourceDuration` to the children's footprint. Children are then **rebased**
 * so their `settings.startTime` is relative to the group (the earliest child
 * lands at 0 within the group). The bridge re-absolutises children before
 * passing the project to the renderer; storing children relative makes "move
 * group" semantics trivial — only `group.settings.startTime` changes and the
 * children visually follow.
 *
 * Empty tracks within the new group are compacted: the children's track
 * indices are remapped to a contiguous 0..N range while preserving the
 * relative ordering of the original tracks.
 *
 * Track placement (in the parent host): starts from the lowest track that any
 * selected layer occupies and walks upward until it finds a track whose
 * remaining (non-selected) layers don't overlap the group's time span — or
 * creates a new track at the top if none has room. The selected layers are
 * excluded from the overlap check because they're moving out of the host
 * array as part of the same commit.
 */
export declare function groupLayersCommand(commit: CommitFn, ids: string[]): Promise<string | null>;
/**
 * Reorder layers to match the supplied id sequence within a single group
 * (or the root layer list when `groupPath` is empty). The id sequence must be
 * confined to one host array — cross-group reordering isn't supported.
 */
export declare function reorderLayersCommand(commit: CommitFn, orderedIds: string[], groupPath?: string[]): Promise<void>;
/**
 * Set `startTime` (and optionally `track`) for one or more layers. Driven by
 * the timeline drag handler; each pointer-move fires a commit that merges
 * with the previous one into a single history entry.
 *
 * The caller is responsible for overlap-clamping the `startTime` values —
 * see {@link clampMoveToTrack}. This command just writes whatever it's given.
 */
export declare function moveLayersCommand(commit: CommitFn, updates: Array<{
    id: string;
    startTime: number;
    track?: number;
}>): Promise<void>;
/**
 * Resize a layer by setting its `sourceDuration` directly. Used when the user
 * drags the right edge of a layer block. Left-edge drags use
 * {@link trimStartCommand} because they shift both `startTime` and
 * `sourceStart` together.
 */
export declare function resizeLayerCommand(commit: CommitFn, id: string, sourceDuration: number): Promise<void>;
/**
 * Trim a layer from its left edge. This simultaneously shifts `sourceStart`
 * forward (revealing a later portion of the source media) and increases
 * `startTime` (so the layer stays pinned to the same timeline position its
 * right edge is on), which mirrors how most editors treat an "in-point" drag.
 */
export declare function trimStartCommand(commit: CommitFn, id: string, newSourceStart: number, newStartTime: number, newSourceDuration: number): Promise<void>;
/** Toggle a layer's `enabled` flag. Not mergeable. */
export declare function setLayerEnabledCommand(commit: CommitFn, id: string, enabled: boolean): Promise<void>;
/**
 * Set a static property on a layer. Mergeable per-(layer, property) so
 * dragging a number input produces one history entry rather than one per
 * pixel.
 */
export declare function setPropertyCommand(commit: CommitFn, id: string, propertyName: string, value: unknown): Promise<void>;
/**
 * Clear an overridden property on a layer, reverting to the renderer's
 * schema default. Deletes the entry from `layer.properties` outright so the
 * renderer falls through to `PropertyDefinition.default`. Also drops any
 * animation track for the same property so a double-click reset wipes both
 * static and animated overrides in one step.
 */
export declare function unsetPropertyCommand(commit: CommitFn, id: string, propertyName: string): Promise<void>;
/**
 * Convert a layer's transform properties between 2D and 3D forms.
 *
 * 3D is expressed via the *shape* of position/scale/rotation: when any is a
 * 3-tuple the layer is in 3D mode. This command flips all three together in
 * a single history entry so the inspector's 3D toggle is atomic.
 *
 * - Enable: `[x, y]` → `[x, y, 0]`; scalar/tuple scale → `[sx, sy, 1]`; scalar
 *   rotation → `[0, 0, rz]`; default `perspective` to `100` if unset.
 * - Disable: `[x, y, z]` → `[x, y]`; uniform `[s, s, s]` → scalar, else drop
 *   the Z; `[rx, ry, rz]` → `rz`; delete perspective override.
 */
export declare function set3DTransformCommand(commit: CommitFn, id: string, enabled: boolean): Promise<void>;
/**
 * Set a setting on a layer (e.g. speed, source, startTime, fontFamily stored
 * in settings). Uses a mergeable key so scrubbed settings don't blow up
 * history.
 */
export declare function setSettingCommand(commit: CommitFn, id: string, settingName: string, value: unknown): Promise<void>;
/**
 * Upsert a keyframe at the given source-media time for a property.
 *
 * If an animation entry for the property doesn't exist, it's created. If a
 * keyframe at exactly the same time exists, its value is updated; otherwise
 * a new keyframe is inserted in sorted order.
 *
 * `value` is optional only when activating animation for the first time via
 * the diamond button (no explicit value from the user). In that case the
 * command seeds the keyframe from the layer's existing static `properties`
 * entry and then deletes it, since animation now owns the property.
 * When `value` is provided and it's the first keyframe, the static property
 * is still deleted (no dead data).
 */
export declare function setKeyframeCommand(commit: CommitFn, id: string, propertyName: string, sourceTimeSec: number, value?: unknown, easing?: string): Promise<void>;
/** Remove a keyframe at the given source-media time for a property. */
export declare function removeKeyframeCommand(commit: CommitFn, id: string, propertyName: string, sourceTimeSec: number): Promise<void>;
export type TransitionSpec = {
    transition: string;
    duration: number;
    easing?: Animation['easing'];
    params?: Record<string, unknown>;
};
/** Set or clear a transitionIn / transitionOut on a layer. */
export declare function setTransitionCommand(commit: CommitFn, id: string, edge: 'in' | 'out', spec: TransitionSpec | null): Promise<void>;
/** Update only the duration of an existing transition. Mergeable for drag-resize. */
export declare function setTransitionDurationCommand(commit: CommitFn, id: string, edge: 'in' | 'out', duration: number): Promise<void>;
/** Update a single param on an existing transition. Mergeable for scrubbing. */
export declare function setTransitionParamCommand(commit: CommitFn, id: string, edge: 'in' | 'out', param: string, value: unknown): Promise<void>;
/** Append a new effect entry to the layer's effects array. */
export declare function addEffectCommand(commit: CommitFn, id: string, effectName: string): Promise<void>;
/** Remove an effect by index. Also clears any animation tracks for its params. */
export declare function removeEffectCommand(commit: CommitFn, id: string, index: number): Promise<void>;
/** Move an effect up or down in the stack. */
export declare function moveEffectCommand(commit: CommitFn, id: string, fromIdx: number, toIdx: number): Promise<void>;
/** Toggle an effect's `enabled` flag without removing it from the stack. */
export declare function setEffectEnabledCommand(commit: CommitFn, id: string, index: number, enabled: boolean): Promise<void>;
/** Set a static param value on an effect. Mergeable for scrubbing. */
export declare function setEffectParamCommand(commit: CommitFn, id: string, index: number, param: string, value: unknown): Promise<void>;
export declare function setProjectSettingsCommand(commit: CommitFn, patch: {
    name?: string;
    width?: number;
    height?: number;
    fps?: number;
    backgroundColor?: string;
}): Promise<void>;
/**
 * Patch a single track's metadata (name / enabled). Index must be a valid
 * track row — `normalizeDraft` ensures `tracks[]` always has an entry per used
 * track number, so the lookup should never miss.
 */
export declare function setTrackSettingsCommand(commit: CommitFn, index: number, patch: Partial<TrackJSON>): Promise<void>;
export {};
//# sourceMappingURL=index.d.ts.map