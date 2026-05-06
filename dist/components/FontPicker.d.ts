/**
 * FontPicker — dropdown font chooser backed by the bundled Google Fonts list.
 *
 * Design:
 *   - Bundled `google-fonts.json` provides ~1,900 fonts in 5 categories.
 *   - Category pills filter the list down to `all | sans-serif | serif |
 *     monospace | display | handwriting`.
 *   - Free-text search filters by family name.
 *   - Items render incrementally — an IntersectionObserver on a sentinel near
 *     the scroll bottom bumps the visible-count in ~50-item pages so the DOM
 *     never holds all matches at once.
 *   - Each *visible* item lazy-loads its Google-Fonts stylesheet into
 *     `document.head` on first paint so the preview text renders in the
 *     actual face. A second IntersectionObserver on the item itself is what
 *     kicks this off — offscreen items stay unloaded.
 *
 * Picking a font fires `onChange`. The sidebar also calls
 * `bridge.renderer.loadFont(name)` so the renderer's shadow DOM picks it up.
 */
export type FontPickerProps = {
    value: string;
    onChange: (value: string) => void;
};
export declare function FontPicker({ value, onChange }: FontPickerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=FontPicker.d.ts.map