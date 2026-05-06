<a href="https://videoflow.dev/react-video-editor">
  <img src="https://videoflow.dev/images/banner-video-editor.png" alt="VideoFlow React Video Editor" />
</a>

# @videoflow/react-video-editor

A production-grade, **React-based video editor** built on top of [VideoFlow](https://videoflow.dev). Drop `<VideoEditor video={…} />` into your app and you get a full editor — timeline with multiple tracks, live in-browser preview, keyframe animation, transitions, GLSL effects, undo/redo, drag-and-drop import, and MP4 export — out of the box.

- **Live demo:** <https://videoflow.dev/playground?step=video-editor>
- **Docs:** <https://videoflow.dev/react-video-editor>

---

## Highlights

- **One-component editor** — `<VideoEditor />` ships every panel pre-wired (titlebar, preview, sidebar, timeline, playbar, export modal).
- **Live preview** — every store commit incrementally updates the same DOM renderer used at export time, so what you see is what you get. No re-mount on edit.
- **Timeline you'd expect** — multi-track packing, drag-to-move/resize/trim, magnetic snapping (layer edges, playhead, keyframes), zoom/pan, group navigation.
- **Keyframe animation** — diamond toggle on every animatable property, full graph at the property level, easing presets.
- **Transitions & effects** — pick from the registered presets, all surface in the inspector with their own param controls. Includes 16 blend modes and per-layer blend mode dropdown.
- **Undo / redo with merge windows** — drag-merging coalesces a 200-frame scrub into a single history entry.
- **Groups** — double-click a group to enter its sub-timeline; the playhead, ruler, and inspector all rescope to the group's local time.
- **MP4 export** — built-in modal renders via `BrowserRenderer`, or hand off to your own pipeline with `onExport`.
- **Themable, vendor-prefix free** — vanilla CSS with custom elements (`<vf-*>`) and CSS variables. Override any token to re-skin.
- **TypeScript-first**, React 18 / 19 compatible.

---

## Install

```bash
npm install @videoflow/react-video-editor @videoflow/core @videoflow/renderer-browser @videoflow/renderer-dom
```

The three `@videoflow/*` packages are peer dependencies — the editor is just the UI layer on top.

---

## Quick start

```tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { VideoEditor } from '@videoflow/react-video-editor';
import '@videoflow/react-video-editor/style.css';
import VideoFlow from '@videoflow/core';

// Build a VideoJSON with the VideoFlow programmatic API.
const $ = new VideoFlow({ name: 'My Project', width: 1920, height: 1080, fps: 30 });
$.addText(
  { text: 'Hello, VideoFlow!', fontSize: 6, color: '#f1f5f9' },
  {
    transitionIn:  { transition: 'slideUp', duration: '0.6s' },
    transitionOut: { transition: 'fade',    duration: '0.6s' },
  },
);
const video = await $.compile();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <VideoEditor video={video} />
  </StrictMode>
);
```

That's it. You now have a fully functional editor. Drop a media file into the preview to add a layer, double-click the corner timecode to type a frame, drag the very top edge of the timeline panel to resize it.

---

## How it works

The editor is a single React component over a Zustand store:

```
                ┌─────────────────────────────┐
  user input ──▶│       <VideoEditor />       │──▶ live preview (DOM renderer)
                │  ┌────────────────────────┐ │
                │  │   editor store         │ │
                │  │   (Zustand + Immer)    │ │
                │  └────────┬───────────────┘ │
                │           │ patches         │
                │           ▼                 │
                │   RendererBridge ───────────┼──▶ @videoflow/renderer-dom
                └─────────────────────────────┘
                            │ commit
                            ▼
                       onChange(video)
                       onSave(video)
                       onExportComplete(blob)
```

Every interaction goes through a **command** (e.g. `moveLayersCommand`, `resizeLayerCommand`, `setKeyframeCommand`) that produces an Immer patch on the `VideoJSON`. The patches are forwarded to a `RendererBridge` which translates them into the narrowest possible call on the underlying `DomRenderer` — `updateLayer` for a property tweak, `addLayer` / `removeLayer` for structural changes, `loadVideo` only when nothing else can safely apply (e.g. fps changes). That's why scrubbing a value or dragging a layer never re-mounts anything.

---

## `<VideoEditor />` props

```ts
type VideoEditorProps = {
  /** The VideoJSON to load initially. Further changes flow through commands. */
  video: VideoJSON;

  /** Fires after every commit. Persist `v` to your backend / storage. */
  onChange?: (video: VideoJSON) => void;

  /** When set, a Save button appears in the titlebar; isSaved flips on commit. */
  onSave?: (video: VideoJSON) => void | Promise<void>;

  /**
   * Custom export handler. When defined, clicking Export runs this instead of
   * opening the built-in modal. Whatever it resolves to is forwarded to
   * `onExportComplete`. Most apps leave this undefined and let the built-in
   * modal handle the render.
   */
  onExport?: () => Promise<unknown>;

  /**
   * Fires with the rendered Blob (or whatever `onExport` returned). When this
   * is set with the built-in modal, the editor SKIPS the auto-download — the
   * host owns the file from there (upload, save-as, preview, …).
   */
  onExportComplete?: (video: unknown) => void;

  /**
   * Asset upload handler. When absent, dropped files are wrapped in
   * `URL.createObjectURL` (revoked on unmount).
   */
  onUpload?: (file: File) => Promise<string>;

  /** Visual theme. */
  theme?: 'light' | 'grey' | 'dark' | 'night';

  /** Optional logo / wordmark in the titlebar's leading slot. */
  branding?: ReactNode | null | false;

  /** Swap any panel for your own component. */
  components?: {
    Preview?:  ComponentType;
    Timeline?: ComponentType;
    Sidebar?:  ComponentType;
    Titlebar?: ComponentType<{
      onExport?: () => void;
      onSave?: () => void;
      branding?: ReactNode | null | false;
    }>;
  };
};
```

### Common patterns

```tsx
<VideoEditor
  video={video}
  // Persist on every commit
  onChange={(v) => localStorage.setItem('project', JSON.stringify(v))}

  // Show a Save button + your own save flow
  onSave={async (v) => { await fetch('/api/save', { method: 'POST', body: JSON.stringify(v) }); }}

  // Receive the rendered MP4 Blob — auto-download is skipped
  onExportComplete={(blob) => uploadToS3(blob as Blob)}

  // Swap files for your own upload pipeline (returns the URL the renderer should use)
  onUpload={async (file) => {
    const { url } = await myCDN.upload(file);
    return url;
  }}

  theme="dark"
  branding={<><img src="/logo.svg" /><span>MyApp</span></>}
/>
```

---

## Building a `VideoJSON`

The editor edits a `VideoJSON` document — the same format `@videoflow/core` produces and `@videoflow/renderer-dom` renders. The easiest way to author one is the programmatic VideoFlow API:

```ts
import VideoFlow from '@videoflow/core';

const $ = new VideoFlow({ name: 'Demo', width: 1920, height: 1080, fps: 30 });

// Background image with a fade in / out and a Ken Burns scale.
const bg = $.addImage(
  { fit: 'cover', position: [0.5, 0.5] },
  {
    source: 'https://example.com/photo.jpg',
    transitionIn:  { transition: 'fade', duration: '1s' },
    transitionOut: { transition: 'fade', duration: '1s' },
  },
);
bg.animate({ scale: 1 }, { scale: 1.1 }, { duration: '8s', easing: 'easeInOut', wait: false });
bg.remove({ in: '8s' });

// Headline text that slides up from below.
$.wait('1s');
const title = $.addText(
  { text: 'VideoFlow', fontSize: 6, fontWeight: 800, color: '#f1f5f9' },
  {
    transitionIn:  { transition: 'slideUp', duration: '0.8s' },
    transitionOut: { transition: 'fade',    duration: '0.6s' },
  },
);
title.remove({ in: '6s' });

const video = await $.compile();
```

A more complete example — including groups, effects, and audio — lives in [`examples/basic/src/sample-video.ts`](examples/basic/src/sample-video.ts).

---

## Hooks

For host apps that want to read editor state outside the panels:

```ts
import {
  useVideo,         // current VideoJSON
  useSelection,     // { ids, layers } currently selected
  usePlayhead,      // { frame, playing }
  useViewport,      // { timelineScale, timelineScroll, previewZoom, … }
  useHistoryState,  // { canUndo, canRedo }
  useActiveGroup,   // deepest group the user has navigated into, or null
  useActiveGroupChain,  // ordered ancestors, useful for breadcrumbs
  useEditorStore,   // the raw Zustand store for advanced cases
} from '@videoflow/react-video-editor';

function MyToolbar() {
  const video = useVideo();
  const { canUndo, canRedo } = useHistoryState();
  return (
    <header>
      <span>{video.name} · {video.duration.toFixed(1)}s</span>
      <button disabled={!canUndo} onClick={() => useEditorStore.getState().undo()}>Undo</button>
    </header>
  );
}
```

## Programmatic edits

Every interaction the editor performs is a public command — call them directly to script edits, build importers, or wire up your own UI:

```ts
import { commands, useEditorStore } from '@videoflow/react-video-editor';

const { commit } = useEditorStore.getState();

await commands.addLayerCommand(commit, {
  type: 'text',
  properties: { text: 'Programmatic!', fontSize: 4 },
  settings: { startTime: 5, sourceDuration: 3 },
});

await commands.setPropertyCommand(commit, 'layer-id', 'opacity', 0.5);
```

Available commands cover layer add / remove / reorder / group, move / resize / trim, property + setting edits, keyframe upsert / remove, transitions, effects, project settings, and track metadata. They all merge their patches into the active history entry within an 800 ms window, so a long drag is one undo step.

---

## Keyboard shortcuts

| Shortcut             | Action                                |
|----------------------|---------------------------------------|
| `Space`              | Play / Pause                          |
| `←` / `→`            | Step one frame                        |
| `Shift + ←` / `→`    | Step one second                       |
| `↑` / `↓`            | Jump to previous / next layer edge    |
| `Home` / `End`       | Go to start / end of (group) timeline |
| `Cmd / Ctrl + Z`     | Undo                                  |
| `Cmd / Ctrl + Shift + Z`, `Cmd / Ctrl + Y` | Redo            |
| `Delete` / `Backspace` | Remove selected layers              |
| `Z`                  | Fit preview (reset zoom / pan)        |

The full list (with descriptions) is exported as `SHORTCUT_LIST` so you can render your own cheat sheet.

---

## Theming

The editor styles itself entirely through CSS variables on a single `<vf-editor>` custom element. Pick one of the four built-in themes via the `theme` prop, or override any token:

```css
vf-editor[data-theme="dark"] {
  --vf-bg: #0a0a0a;
  --vf-panel: #171717;
  --vf-primary: #ff5a1f;
  --vf-radius-lg: 12px;
  --vf-timeline-height: 320px;   /* clamped to [120px, calc(100% - 260px)] */
  /* …see src/style.css for the full palette */
}
```

Drop the **invisible 6 px bar** at the very top of the timeline panel to resize it vertically — the bar writes `--vf-timeline-height` on the editor root and the CSS clamps it within its safe range.

---

## Composing your own layout

The default `<VideoEditor />` arranges the four panels in a CSS grid. To use them in a custom layout (or replace just one), import the panel components individually:

```tsx
import {
  VideoEditor,
  Preview, Timeline, Sidebar, Titlebar,
  useEditor,
} from '@videoflow/react-video-editor';

// Either swap a single panel via the components prop:
<VideoEditor video={video} components={{ Sidebar: MyCustomInspector }} />

// …or build the whole shell yourself:
<MyLayout>
  <Titlebar onSave={…} />
  <Preview />
  <MyCustomInspector />
  <Timeline />
</MyLayout>
```

All panels read from the same shared store, so they stay in sync regardless of where they're mounted.

---

## License

See [LICENSE.md](./LICENSE.md).

---

## Links

- **Site:** <https://videoflow.dev>
- **Docs:** <https://videoflow.dev/react-video-editor>
- **Live playground:** <https://videoflow.dev/playground?step=video-editor>
- **VideoFlow core (companion library):** <https://github.com/ybouane/VideoFlow>
