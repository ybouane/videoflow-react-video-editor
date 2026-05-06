/**
 * ColorInput — swatch + hex text combo with an alpha-capable popover picker.
 *
 * Clicking the swatch opens a `@uiw/react-color` Sketch picker so users can
 * pick RGBA visually; the hex text field accepts 3/6/8-digit hex and commits
 * on blur/Enter. Live drags stream through `onChange`; `onCommitEnd` fires
 * when the popover closes or the text field is committed.
 */
export type ColorInputProps = {
    value: string;
    onChange: (value: string) => void;
    onCommitEnd?: () => void;
};
export declare function ColorInput({ value, onChange, onCommitEnd }: ColorInputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ColorInput.d.ts.map