/**
 * Options — horizontal toggle group (enum picker).
 *
 * Used for short enum-valued properties like `textAlign` or `textTransform`
 * where a dropdown feels heavy. Each option is a clickable chip rendered via
 * `vf-input-option`.
 */
import type { ReactNode } from 'react';
export type OptionsOption = {
    value: string;
    label?: string;
    icon?: ReactNode;
    title?: string;
};
export type OptionsProps = {
    value: string;
    options: Array<string | OptionsOption>;
    onChange: (value: string) => void;
    disabled?: boolean;
};
export declare function Options({ value, options, onChange, disabled }: OptionsProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Options.d.ts.map