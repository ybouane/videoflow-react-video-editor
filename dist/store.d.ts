/**
 * Central editor store — Zustand holds the document and editor state;
 * Immer's `produceWithPatches` drives the command / undo system.
 *
 * The store's only "special" entry point is `commit(recipe, options)`. It
 * runs the recipe on the current `VideoJSON`, captures forward / inverse
 * Immer patches, optionally merges them into the previous history entry,
 * and hands the resulting patch set to the `RendererBridge` so the live
 * preview updates incrementally.
 *
 * Everything else — `selectLayers`, `setCurrentFrame`, `setViewport`,
 * `enterGroup` — mutates editor state only and doesn't produce history
 * entries. Group navigation also clamps `currentFrame` into the new
 * effective playhead window (see {@link getEffectivePlayheadWindow}) and
 * re-seeks the bridge if the frame moved.
 */
import type { VideoJSON } from '@videoflow/core/types';
import type { HistoryEntry, Selection, Viewport } from './types.js';
import type { RendererBridge } from './renderer/rendererBridge.js';
export type EditorState = {
    video: VideoJSON;
    selection: Selection;
    currentFrame: number;
    isPlaying: boolean;
    viewport: Viewport;
    /**
     * Active group navigation stack. Empty when editing the root timeline;
     * a non-empty array means the user has double-clicked into one or more
     * nested groups, with the deepest id at the end. Commands and panels
     * use {@link getLayersAtPath} to resolve which layer list to display
     * and edit. Trimmed automatically by {@link normalizeDraft} if any
     * referenced group disappears (undo of a create, removal, etc.).
     */
    activeGroupPath: string[];
    /** Whether the document matches the last saved snapshot. Reset by `loadVideo` / `markSaved`; cleared on any non-empty commit. */
    isSaved: boolean;
    undoStack: HistoryEntry[];
    redoStack: HistoryEntry[];
    bridge: RendererBridge | null;
    /**
     * Callback that ingests dropped / picked files into the document at a
     * specific position. Set by `VideoEditor`; read by panels (e.g. the
     * timeline's "Add layer" placeholder) that need to create media layers
     * without going through the root-level drag-drop handler. `null` until
     * the editor mounts.
     */
    mediaImporter: ((files: File[], opts: {
        startTime: number;
        track: number;
        groupPath?: string[];
    }) => Promise<void>) | null;
    /** Attach / detach the renderer bridge. Called by the editor shell. */
    setBridge(bridge: RendererBridge | null): void;
    /** Register / clear the media importer. Called by the editor shell. */
    setMediaImporter(fn: EditorState['mediaImporter']): void;
    /** Replace the loaded video. Clears history and pushes to the bridge. */
    loadVideo(video: VideoJSON): Promise<void>;
    /**
     * Commit a recipe that mutates the video. The recipe receives a draft
     * of `video` (Immer style) and should mutate it directly. Returns the
     * resulting patch count so callers can detect no-op commits.
     */
    commit(recipe: (draft: VideoJSON) => void, options?: {
        label?: string;
        mergeKey?: string;
    }): Promise<number>;
    undo(): Promise<void>;
    redo(): Promise<void>;
    selectLayers(ids: string[]): void;
    toggleLayerSelection(id: string, additive: boolean): void;
    clearSelection(): void;
    setCurrentFrame(frame: number): void;
    setPlaying(playing: boolean): void;
    setViewport(patch: Partial<Viewport>): void;
    /** Push a group id onto the active path (open the group's sub-timeline). */
    enterGroup(groupId: string): void;
    /** Pop the deepest group id off the active path (one level up). */
    exitGroup(): void;
    /** Clear the active path entirely (return to the root timeline). */
    exitToRoot(): void;
    /** Mark the document as saved (called after a successful onSave). */
    markSaved(): void;
};
export declare const useEditorStore: import("zustand").UseBoundStore<import("zustand").StoreApi<EditorState>>;
//# sourceMappingURL=store.d.ts.map