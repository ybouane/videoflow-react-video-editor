/**
 * Timecode — editable monospace `MM:SS.ff` input (`ff` = frame number).
 *
 * Clicking the current-time display switches it into an editable text field
 * the user can type or paste a timecode into. The field parses any of:
 *   - `MM:SS`
 *   - `MM:SS.ff`
 *   - `HH:MM:SS`
 *   - `HH:MM:SS.ff`
 *   - bare seconds (`12.5`)
 *
 * The fractional component is interpreted as **frames** (divided by `fps`),
 * not milliseconds — matching `formatTime`'s output.
 *
 * On Enter / blur the parsed time is committed and the display snaps back to
 * read-only.
 */
export type TimecodeProps = {
    /** Current time in seconds. */
    value: number;
    /** Total duration in seconds. Rendered as the denominator. */
    total: number;
    /** Frames per second — used to format and parse the frame component. */
    fps: number;
    onCommit: (seconds: number) => void;
};
export declare function Timecode({ value, total, fps, onCommit }: TimecodeProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Timecode.d.ts.map