/**
 * Titlebar — project name, undo/redo, save, and export.
 *
 * Playback transport (play/pause, seek-first, seek-last) and the timecode live
 * in the Playbar — not here — so users find all playback controls in one place.
 */
import type { ReactNode } from 'react';
export type TitlebarProps = {
    onExport?: () => void;
    onSave?: () => void | Promise<void>;
    /**
     * Optional leading brand node — typically a logo + wordmark (e.g.
     * `<><img … /><span>MyApp</span></>`). Falsy values (`undefined`, `null`,
     * `false`) skip the brand area entirely, moving the project-name input
     * to the titlebar's leading edge.
     */
    branding?: ReactNode | null | false;
};
export declare function Titlebar({ onExport, onSave, branding }: TitlebarProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Titlebar.d.ts.map