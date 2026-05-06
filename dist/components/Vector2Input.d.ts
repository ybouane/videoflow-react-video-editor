/**
 * Vector2Input — a pair of NumberInputs for X/Y values.
 *
 * Used for `position`, `anchor`, `boxShadowOffset`, etc. — anywhere the
 * underlying value is `[number, number]`.
 */
export type Vector2InputProps = {
    value: [number, number] | number[] | undefined;
    onChange: (value: [number, number]) => void;
    onCommitEnd?: () => void;
    step?: number;
    precision?: number;
    integer?: boolean;
    min?: number;
    max?: number;
    labels?: [string, string];
};
export declare function Vector2Input({ value, onChange, onCommitEnd, step, precision, integer, min, max, labels, }: Vector2InputProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Vector2Input.d.ts.map