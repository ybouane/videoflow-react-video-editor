/**
 * Public entry point for @videoflow/react-video-editor.
 *
 * The package ships:
 *   - `<VideoEditor>` — the top-level React component.
 *   - Default panel components for host apps that want to compose them
 *     directly (e.g. with a custom layout).
 *   - `useEditor` / selectors for hooking into editor state.
 *   - Command factories for scripted edits.
 *   - `RendererBridge` for advanced cases that need raw access to the
 *     renderer's incremental update API.
 *
 * The default stylesheet lives at `@videoflow/react-video-editor/style.css`
 * and must be imported by the host app (it contains only CSS variables and
 * nested selectors on custom elements — no class names are introduced).
 */
export { VideoEditor } from './VideoEditor.js';
export type { VideoEditorProps } from './VideoEditor.js';
export { Preview } from './panels/Preview.js';
export { Timeline } from './panels/Timeline.js';
export { Sidebar } from './panels/Sidebar.js';
export { Titlebar } from './panels/Titlebar.js';
export { useEditor, useVideo, useSelection, usePlayhead, useViewport, useHistoryState, useActiveLayers, useActiveGroup, useActiveGroupChain, useActiveGroupPath, } from './hooks.js';
export { useEditorStore } from './store.js';
export type { EditorState } from './store.js';
export { RendererBridge } from './renderer/rendererBridge.js';
export type { BridgeResult } from './renderer/rendererBridge.js';
export * as commands from './commands/index.js';
export { packLayersIntoTracks, groupLayersByTrack } from './utils/trackPacking.js';
export { computeMagnets, snapTime, DEFAULT_SNAP_PIXELS } from './utils/magnetism.js';
export type { Magnet } from './utils/magnetism.js';
export { timeToFrame, frameToTime, timelineTimeToSourceTime, sourceTimeToTimelineTime, layerTimelineBounds, formatTime, } from './utils/time.js';
export { createLayerJSON, newLayerId, layerTypeFromFile } from './utils/layerFactory.js';
export { createDefaultUploadTracker } from './utils/upload.js';
export type { VideoJSON, LayerJSON, Selection, Viewport, HistoryEntry, OnUploadCallback, } from './types.js';
//# sourceMappingURL=index.d.ts.map