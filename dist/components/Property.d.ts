/**
 * Property — a labelled row of the inspector, with a keyframe diamond toggle
 * and an input component slot.
 *
 * Keyframe diamond states:
 *   - muted (default) — no keyframes for this property
 *   - blue — property has keyframes but playhead is NOT on a keyframe
 *   - yellow — property has keyframes AND playhead IS on a keyframe
 *
 * The diamond is rendered BEFORE the property name. When keyframes exist and
 * the diamond is hovered, a popover overlay absolutely-positioned on top of
 * the diamond appears with prev/next arrows flanking a duplicate diamond.
 * The popover is `position: absolute` so the underlying row layout (label
 * position) never shifts — the user's mouse can move from diamond to arrow
 * without the label jumping.
 *
 * Double-clicking the label fires `onReset` if supplied — the inspector wires
 * this to "unset this property back to its schema default". The label carries
 * a `data-modified` attribute whenever a reset action is available, so CSS
 * can highlight properties that diverge from the default.
 */
import { type ReactNode } from 'react';
export type KeyframeInfo = {
    /** Whether there are any keyframes for this property. */
    hasKeyframes: boolean;
    /** Whether there is a keyframe at the current playhead time. */
    atKeyframe: boolean;
    /** Toggle: add keyframe at current time if none, remove if exists. */
    onToggle: () => void;
    /** Navigate to previous keyframe (undefined = no prev). */
    onPrev?: () => void;
    /** Navigate to next keyframe (undefined = no next). */
    onNext?: () => void;
};
export type PropertyProps = {
    label: string;
    children: ReactNode;
    /** When true, render the label above the input instead of beside it. */
    full?: boolean;
    /** Keyframe info — always provided for all properties. */
    keyframe?: KeyframeInfo;
    /** Double-click on the label invokes this callback (used for "reset to default"). */
    onReset?: () => void;
    /** Whether the value is currently modified from default — styled via `data-modified`. */
    modified?: boolean;
};
export declare function Property({ label, children, full, keyframe, onReset, modified }: PropertyProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Property.d.ts.map