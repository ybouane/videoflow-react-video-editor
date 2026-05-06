/**
 * TextInput and Textarea — plain text entry.
 *
 * Both keep a local "draft" so the user can type freely (cursor position and
 * selection are stable regardless of upstream re-renders). Changes are
 * pushed upstream on every keystroke by default so the preview reflects edits
 * in real time; the store's merge-key system coalesces them into a single
 * undo entry. Callers can opt out via `commitOnChange={false}` to revert to
 * blur-only commits.
 */
export type TextInputProps = {
    value: string;
    onChange: (value: string) => void;
    onCommitEnd?: () => void;
    placeholder?: string;
    disabled?: boolean;
    commitOnChange?: boolean;
};
export declare function TextInput({ value, onChange, onCommitEnd, placeholder, disabled, commitOnChange, }: TextInputProps): import("react/jsx-runtime").JSX.Element;
export type TextareaProps = {
    value: string;
    onChange: (value: string) => void;
    onCommitEnd?: () => void;
    placeholder?: string;
    rows?: number;
    /** Push the value upstream on every keystroke (default `true`). */
    commitOnChange?: boolean;
};
export declare function Textarea({ value, onChange, onCommitEnd, placeholder, rows, commitOnChange, }: TextareaProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TextInput.d.ts.map