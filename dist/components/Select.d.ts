/**
 * Select — styled wrapper around a native <select>.
 *
 * Using the native element gives us keyboard nav, accessible semantics and
 * the OS-native popup for free. All chrome is nested CSS on
 * `vf-input-select`.
 */
export type SelectOption = {
    value: string;
    label?: string;
};
/** A labeled `<optgroup>`. Mix with bare options to interleave grouped and ungrouped entries. */
export type SelectGroup = {
    label: string;
    options: Array<string | SelectOption>;
};
export type SelectProps = {
    value: string;
    options: Array<string | SelectOption | SelectGroup>;
    onChange: (value: string) => void;
    disabled?: boolean;
};
export declare function Select({ value, options, onChange, disabled }: SelectProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Select.d.ts.map