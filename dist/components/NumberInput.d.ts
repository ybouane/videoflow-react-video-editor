/**
 * NumberInput — drag-to-scrub numeric input, mirroring scrptly's `inputNumber`.
 *
 * Interaction model
 * -----------------
 *   - Click once, then type to enter an exact value. Enter / blur commits.
 *   - Press-and-drag on the input (or its label) to scrub the value by
 *     `(deltaPx * step)`, with `shift` = 10× and `alt` = 0.1× multipliers.
 *   - ArrowUp / ArrowDown nudge by one step (shift = 10×, alt = 0.1×).
 *
 * The scrub gesture is the differentiator — it's how scrptly and every other
 * pro DCC editor lets users tweak values without click-typing numbers.
 */
export type NumberInputProps = {
    value: number;
    onChange: (value: number) => void;
    /** Committed once on pointer-up or Enter — used to end a drag-merge in the undo history. */
    onCommitEnd?: () => void;
    label?: string;
    unit?: string;
    min?: number;
    max?: number;
    /**
     * Step for arrow keys and as the multiplier for 1 px of drag. When omitted,
     * a sensible default is derived from `min` / `max` / `integer` via
     * {@link deriveStep} (integer mode → `1`; bounded ranges → ~1/100th of the
     * range snapped to a 1/2/5 mantissa; unbounded → `1`).
     */
    step?: number;
    /** Integer-only mode — values are rounded to whole numbers. */
    integer?: boolean;
    disabled?: boolean;
    /** How many decimal digits to show when the value is fractional. */
    precision?: number;
    /** Visually compact variant for dense layouts. */
    mini?: boolean;
    /** Placeholder shown when the value is in a mixed/indeterminate state. */
    placeholder?: string;
};
export declare function NumberInput({ value, onChange, onCommitEnd, label, unit, min, max, step, integer, disabled, precision, mini, placeholder, }: NumberInputProps): import("react/jsx-runtime").JSX.Element;
/**
 * Pick a reasonable scrub / arrow-key step from the input's bounds when the
 * caller hasn't specified one. Targets ~100 distinct positions across the
 * range, snapped to a "nice" mantissa (1, 2, or 5) × power of 10 so the
 * displayed value stays readable.
 *
 * Falls back to `1` when bounds are unknown or inverted.
 */
export declare function deriveStep(min: number | undefined, max: number | undefined, integer: boolean): number;
//# sourceMappingURL=NumberInput.d.ts.map