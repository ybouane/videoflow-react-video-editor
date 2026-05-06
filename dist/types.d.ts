/**
 * Public types for @videoflow/react-video-editor.
 *
 * The editor operates on VideoFlow's `VideoJSON` format from `@videoflow/core`.
 * Everything the host app cares about — the video document, editor state,
 * commands, selection — is re-exported or defined here.
 */
import type { VideoJSON, LayerJSON, TrackJSON } from '@videoflow/core/types';
export type { VideoJSON, LayerJSON, TrackJSON };
/** A single entry on the undo / redo stack. */
export type HistoryEntry = {
    /** Human-readable label, surfaced in undo menus and DevTools. */
    label: string;
    /**
     * Identifier that lets consecutive edits merge. Two commits with the same
     * `mergeKey`, landing within the merge window, collapse into one history
     * entry — the canonical example being a drag that emits dozens of move
     * commits but should be one undo step.
     */
    mergeKey?: string;
    /** Immer forward patches to redo the change. */
    forward: unknown[];
    /** Immer inverse patches to undo the change. */
    inverse: unknown[];
    /** Timestamp used to bound the merge window. */
    timestamp: number;
};
/**
 * Editor-side selection state. Layer ids only — resolve to `LayerJSON`
 * objects via `video.layers.find(...)` at the call site.
 */
export type Selection = {
    layerIds: string[];
};
/**
 * Viewport state for the preview / timeline. Zoom and pan are editor-local
 * (never persisted back into the VideoJSON).
 */
export type Viewport = {
    /** Pixels per second on the timeline. */
    timelineScale: number;
    /** Horizontal scroll offset on the timeline, in pixels. */
    timelineScroll: number;
    /** Preview zoom multiplier (1 = fit). */
    previewZoom: number;
    /** Preview horizontal pan offset, in screen pixels at the current zoom. */
    previewPanX: number;
    /** Preview vertical pan offset, in screen pixels at the current zoom. */
    previewPanY: number;
};
/**
 * Signature for the user-supplied asset upload callback.
 *
 * The editor calls this whenever a user drops a file into the preview or
 * timeline (or picks one via the inspector). The default implementation just
 * wraps the file in `URL.createObjectURL` so imports work locally out of the
 * box; host apps that want persistent storage should override it.
 */
export type OnUploadCallback = (file: File) => Promise<string>;
//# sourceMappingURL=types.d.ts.map