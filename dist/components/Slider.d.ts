/**
 * Slider — horizontal track + handle driven by CSS custom property.
 *
 * The track's fill and handle position are both computed from
 * `--vf-slider-ratio`, set on the track element as an inline style. This keeps
 * the CSS entirely presentational and avoids any handle-in-JS math.
 */
export type SliderProps = {
    value: number;
    onChange: (value: number) => void;
    onCommitEnd?: () => void;
    min?: number;
    max?: number;
    step?: number;
    disabled?: boolean;
    /** Show the numeric value to the right of the slider. */
    showValue?: boolean;
    valueFormatter?: (value: number) => string;
};
export declare function Slider({ value, onChange, onCommitEnd, min, max, step, disabled, showValue, valueFormatter, }: SliderProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Slider.d.ts.map