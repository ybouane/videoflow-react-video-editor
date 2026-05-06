/**
 * RendererBridge — the thin adapter between the editor's store and
 * `@videoflow/renderer-dom`'s `DomRenderer`.
 *
 * Responsibilities
 * ----------------
 * 1. Own a `DomRenderer` instance mounted to a host element.
 * 2. Translate each store commit into the narrowest possible renderer call:
 *    `updateLayer` for property/settings/animation edits, `addLayer` /
 *    `removeLayer` / `reorderLayers` for structural changes, `updateVideo`
 *    for cheap top-level edits, and `loadVideo` only when nothing else can
 *    safely handle it (fps changes).
 * 3. Surface the renderer's playback state (`onFrame`, `play`, `stop`, seek)
 *    so the store can keep the UI playhead in sync.
 *
 * The bridge is intentionally *not* a React component — it's a plain class
 * instantiated once by the editor shell and kept in a ref. React state flows
 * in via `applyChange`; playback state flows out via the `onFrame` callback.
 *
 * Why id-set diffing rather than Immer patch parsing?
 *
 * Immer's `remove` patches don't carry the removed value, only the index into
 * the mutated array. Reconstructing ids from indices is error-prone once any
 * other structural op has shifted the array. Comparing the pre/post layer
 * arrays by id avoids the whole class of problems and makes the bridge robust
 * against any upstream change to how the store commits.
 */
import DomRenderer from '@videoflow/renderer-dom';
import type { VideoJSON } from '@videoflow/core/types';
import type { Patch as ImmerPatch } from 'immer';
export type BridgeResult = 'patched' | 'reloaded' | 'noop';
export declare class RendererBridge {
    readonly renderer: DomRenderer;
    private lastVideo;
    /**
     * Serializes async renderer operations. `DomRenderer.loadVideo`,
     * `updateLayer`, `addLayer`, etc. are individually async, and calling two
     * of them in parallel can interleave inside the renderer — e.g. Preview's
     * `useLayoutEffect` fires `setVideo(EMPTY_VIDEO)` a tick before
     * VideoEditor's `useEffect` fires `setVideo(realVideo)`; whichever
     * `loadVideo` finishes *last* wins, and on a bad race that's the empty
     * one, leaving the shadow DOM blank. We chain every op onto this promise
     * so the queue is strictly FIFO.
     */
    private opQueue;
    /** Callback fired every time the renderer finishes a frame. */
    onFrame: ((frame: number) => void) | null;
    constructor(host: HTMLElement);
    private enqueue;
    /**
     * Replace the loaded video. Forwarded directly to `DomRenderer.loadVideo`
     * — use this for the initial load.
     *
     * We deep-clone before handing the JSON off: the editor store is built on
     * Immer, which deeply-freezes its state, and `DomRenderer.updateLayer`
     * reassigns `layer.json.settings` / `layer.json.properties` /
     * `layer.json.animations` in place. A frozen layer.json would throw on
     * the very first property edit.
     *
     * Track-level `enabled` is applied to the cloned layers so the renderer
     * sees the effective visibility state without mutating the store.
     */
    setVideo(video: VideoJSON): Promise<void>;
    private loadVideoInternal;
    /**
     * Apply a store commit to the live preview.
     *
     * @param nextVideo The post-commit video state.
     * @param patches The Immer patch array for per-layer property grouping.
     *   (Structural diffs are computed from `lastVideo` vs `nextVideo` by id.)
     * @returns `'patched'` if the change was applied incrementally,
     *   `'reloaded'` if a full `loadVideo` fallback was required, `'noop'` if
     *   there was nothing actionable to do.
     */
    applyChange(nextVideo: VideoJSON, patches: ImmerPatch[]): Promise<BridgeResult>;
    private applyChangeInternal;
    play(): Promise<void>;
    stop(): void;
    seek(frame: number): Promise<void>;
    get currentFrame(): number;
    get totalFrames(): number;
    get fps(): number;
    get playing(): boolean;
    destroy(): void;
}
//# sourceMappingURL=rendererBridge.d.ts.map