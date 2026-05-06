/**
 * Vector3Input — a trio of NumberInputs for X/Y/Z values.
 *
 * Used for 3D transforms (`position`, `scale`, `rotation`) where the value is
 * `[x, y, z]`. Mirrors {@link Vector2Input} — same props, one extra field.
 */
export type Vector3InputProps = {
    value: [number, number, number] | number[] | undefined;
    onChange: (value: [number, number, number]) => void;
    onCommitEnd?: () => void;
    step?: number;
    precision?: number;
    integer?: boolean;
    min?: number;
    max?: number;
    unit?: string;
    labels?: [string, string, string];
};
export declare function Vector3Input({ value, onChange, onCommitEnd, step, precision, integer, min, max, unit, labels, }: Vector3InputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Vector3Input.d.ts.map