/**
 * ExportModal — renders the current video to an MP4.
 *
 * Displayed as a full-editor overlay so the editor becomes non-interactive
 * during the export. Progress is streamed via `BrowserRenderer.render`'s
 * `onProgress` callback. An abort controller wires up the Cancel button.
 *
 * Two output modes:
 *   - `onComplete` set → hand the rendered `Blob` off to the host and let
 *     it decide what to do (upload, save-as, preview, …). No download.
 *   - `onComplete` unset → trigger a browser download via `URL.createObjectURL`
 *     + a synthetic `<a download>` click. The blob URL is revoked ~10s later
 *     so the download has time to start.
 */
type Props = {
    onClose: () => void;
    onComplete?: (video: Blob) => void;
};
export declare function ExportModal({ onClose, onComplete }: Props): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ExportModal.d.ts.map