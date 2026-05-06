/**
 * Checkbox — on/off toggle rendered as a pill switch.
 *
 * The on/off visual state is driven entirely by the `data-checked` attribute
 * so the stylesheet owns the animation.
 */
export type CheckboxProps = {
    value: boolean;
    onChange: (value: boolean) => void;
    disabled?: boolean;
    title?: string;
    /** When true, renders in an indeterminate "mixed" state (for multi-selection). */
    mixed?: boolean;
};
export declare function Checkbox({ value, onChange, disabled, title, mixed }: CheckboxProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Checkbox.d.ts.map