/**
 * Public React hooks for consumers of the editor.
 *
 * These are thin wrappers around the Zustand store. Returning narrow slices
 * (rather than the whole state) keeps re-renders minimal — consumers that
 * only care about selection won't re-render on frame ticks, and vice versa.
 */
import type { EditorState } from './store.js';
import type { LayerJSON } from '@videoflow/core/types';
/**
 * NOTE on selectors: Zustand v5 uses `useSyncExternalStore` under the hood
 * and caches snapshots with `Object.is`. Selectors that build a *new* object
 * literal on every call (e.g. `s => ({ a, b })`) will therefore produce a
 * new reference each render and trigger React's "getSnapshot should be
 * cached" warning / infinite re-render loop.
 *
 * The fix is `useShallow`, which compares the returned object shallowly and
 * only forces a re-render when one of the captured values actually changes.
 */
/** Subscribe to the entire editor state. Prefer the narrower hooks below. */
export declare function useEditor<T>(selector: (state: EditorState) => T): T;
/** The currently-loaded `VideoJSON`. */
export declare function useVideo(): import("@videoflow/core").VideoJSON;
/** The selected layer ids and their resolved `LayerJSON` objects. */
export declare function useSelection(): {
    ids: string[];
    layers: LayerJSON[];
};
/**
 * The layer list the editor should display in panels — `video.layers` at the
 * root, or the children of the deepest group when the user has navigated into
 * one. Stable reference between renders when the underlying array is.
 */
export declare function useActiveLayers(): LayerJSON[];
/** The current group navigation path (stack of group ids). Empty at root. */
export declare function useActiveGroupPath(): string[];
/**
 * Resolve every group in the navigation path to its `LayerJSON`. Useful for
 * breadcrumbs / the exit-group button label. Empty at root.
 */
export declare function useActiveGroupChain(): LayerJSON[];
/** The deepest active group, or `null` when editing the root timeline. */
export declare function useActiveGroup(): LayerJSON | null;
/** Current timeline frame and playing flag. */
export declare function usePlayhead(): {
    frame: number;
    playing: boolean;
};
/** Timeline viewport (zoom / scroll). */
export declare function useViewport(): import("./types.js").Viewport;
/** Undo / redo availability. */
export declare function useHistoryState(): {
    canUndo: boolean;
    canRedo: boolean;
};
//# sourceMappingURL=hooks.d.ts.map