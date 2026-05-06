/**
 * Global keyboard shortcut system.
 *
 * A single window-level `keydown` listener dispatches to a table of actions
 * keyed by `SHORTCUTS`. The listener is input-aware: when the event target is
 * a text input, textarea, select, or contentEditable element, shortcuts are
 * suppressed so normal typing works. Modifier combinations (ctrl/cmd/shift)
 * are matched explicitly per entry.
 *
 * The action callbacks receive the editor `commit` function because several
 * actions (undo/redo are on the store itself; delete runs through
 * `removeLayersCommand`) need to produce history entries.
 */
type ShortcutAction = (e: KeyboardEvent) => void | Promise<void>;
type Shortcut = {
    /** Lowercased `event.key` (or a list of accepted keys). */
    key: string | string[];
    /** Require ctrl/cmd modifier. */
    mod?: boolean;
    /** Require shift modifier. */
    shift?: boolean;
    /** Require alt modifier. */
    alt?: boolean;
    /** Human-readable description for /help / docs. */
    description: string;
    run: ShortcutAction;
};
/**
 * React hook that installs the global shortcut listener on mount. Returns
 * nothing — all side effects go through the Zustand store.
 */
export declare function useShortcuts(): void;
/**
 * Readonly list of registered shortcuts (key combo + description, no run
 * callback). Exposed for host apps that want to render their own shortcut
 * cheat-sheet without duplicating the key labels declared above.
 */
export declare const SHORTCUT_LIST: ReadonlyArray<Omit<Shortcut, 'run'>>;
export {};
//# sourceMappingURL=shortcuts.d.ts.map