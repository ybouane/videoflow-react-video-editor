/**
 * Build fresh `LayerJSON` skeletons for new layers added by the editor.
 *
 * VideoFlow layer JSON is the same format the renderer consumes, but editors
 * need starting values that make sense for a new item (enabled, sourceDuration,
 * a unique id). We keep these factories tiny and conservative — the inspector
 * will fill in type-specific defaults from `PropertyDefinition.default`.
 */
import type { LayerJSON } from '@videoflow/core/types';
/** Minimal UUID v4 — good enough for in-memory layer ids. */
export declare function newLayerId(): string;
export type NewLayerOptions = {
    type: string;
    startTime?: number;
    sourceDuration?: number;
    mediaDuration?: number;
    source?: string;
    properties?: Record<string, any>;
    /** Extra settings fields to merge in (text content, captions, fit, …). */
    extraSettings?: Record<string, any>;
};
/**
 * Build a fresh `LayerJSON` for the given layer type with sensible defaults.
 *
 * The returned object is safe to hand to `DomRenderer.addLayer` and to insert
 * into the store.
 *
 * Special case: `type === 'group'` returns a layer with an empty `children`
 * array; the editor's `normalizeDraft` re-derives `sourceDuration` from the
 * group's children every commit, so the placeholder duration here is just a
 * starting point for the timeline block.
 */
export declare function createLayerJSON(opts: NewLayerOptions): LayerJSON;
/**
 * Guess a layer type from a MIME type or filename extension. Used by
 * drag-drop import to decide whether a file becomes an image, video, or
 * audio layer.
 */
export declare function layerTypeFromFile(file: File): 'image' | 'video' | 'audio' | null;
//# sourceMappingURL=layerFactory.d.ts.map