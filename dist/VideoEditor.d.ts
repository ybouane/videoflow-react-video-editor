/**
 * VideoEditor — the top-level React component exported by this package.
 *
 * Composes the four default panels (Titlebar, Preview, Sidebar, Timeline)
 * inside the `<vf-editor>` custom element. Host apps can swap any panel via
 * the `components` prop — useful when the default inspector or titlebar
 * don't match the host's design language.
 *
 * Asset import is wired through the `onUpload` prop (see `utils/upload.ts`):
 * when absent, dropped files are wrapped in object URLs, which we revoke on
 * unmount so we don't leak memory.
 */
import { type ComponentType, type ReactNode } from 'react';
import type { OnUploadCallback, VideoJSON } from './types.js';
/** Built-in visual themes. Maps to the `data-theme` attribute on `vf-editor`. */
export type EditorTheme = 'light' | 'grey' | 'dark' | 'night';
export type VideoEditorProps = {
    /** The video JSON to load initially. Further changes flow through commands. */
    video: VideoJSON;
    /**
     * Optional callback fired whenever the editor commits a change. Receives
     * the post-commit video so the host can persist it.
     */
    onChange?: (video: VideoJSON) => void;
    /**
     * Custom export handler. When defined, clicking Export runs this instead of
     * opening the built-in modal — the host app is responsible for any UI it
     * wants to show. The resolved value is forwarded to {@link onExportComplete}
     * (when set), so most hosts won't need to wire that part themselves.
     *
     * Most apps should leave this undefined and rely on the built-in modal +
     * `onExportComplete` to receive the resulting blob.
     */
    onExport?: () => Promise<unknown>;
    /**
     * Fired after a successful export. Receives whatever the export produced —
     * a `Blob` when the built-in modal handles the export, or whatever the
     * custom {@link onExport} resolved to. When this callback is set with the
     * built-in modal, the editor skips the auto-download so the host can
     * decide what to do with the blob (upload, preview, save-as, etc.).
     */
    onExportComplete?: (video: unknown) => void;
    /**
     * Save button handler. When present, a Save button appears in the titlebar
     * and the editor tracks an `isSaved` state that flips on any commit and
     * resets once this callback resolves.
     */
    onSave?: (video: VideoJSON) => void | Promise<void>;
    /**
     * Asset upload handler. When absent, dropped files are wrapped in
     * `URL.createObjectURL` (revoked on unmount).
     */
    onUpload?: OnUploadCallback;
    /** Visual theme. Defaults to `'dark'`. */
    theme?: EditorTheme;
    /**
     * Optional leading brand node for the titlebar — typically a logo and/or
     * wordmark, e.g. `<><img src="…" /><span>MyApp</span></>`. When omitted or
     * explicitly `null` / `false`, no brand area is rendered and the project
     * name input takes the leading slot.
     */
    branding?: ReactNode | null | false;
    /** Swap in custom panel components. Any omitted panel falls back to the default. */
    components?: {
        Preview?: ComponentType;
        Timeline?: ComponentType;
        Sidebar?: ComponentType;
        Titlebar?: ComponentType<{
            onExport?: () => void;
            onSave?: () => void;
            branding?: ReactNode | null | false;
        }>;
    };
};
export declare function VideoEditor({ video, onChange, onExport, onExportComplete, onSave, onUpload, theme, branding, components, }: VideoEditorProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=VideoEditor.d.ts.map