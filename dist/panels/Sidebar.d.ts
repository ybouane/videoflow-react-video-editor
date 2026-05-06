/**
 * Sidebar inspector.
 *
 * Three render paths driven by selection size:
 *   - No selection at the root → project settings (name, width, height, fps,
 *     background). `duration` is intentionally omitted — it is always derived
 *     from the end of the last-finishing layer in {@link normalizeDraft}.
 *   - No selection inside a group → a breadcrumbed exit panel, since
 *     project-wide composition / fps / background rarely want to be edited
 *     mid-group.
 *   - One layer selected → per-layer settings + dynamically dispatched
 *     property inspectors driven by `renderer.getPropertyDefinition(layer.type)`,
 *     plus the Properties / Transitions / Effects tab strip.
 *   - Multiple selected → the intersection of every layer's property
 *     definitions, rendered with mixed-state indicators where values diverge.
 *
 * Timing (`startTime`, `sourceDuration`) is intentionally omitted from the
 * inspector — those are edited on the timeline directly.
 *
 * Property inspectors are picked based on the `PropertyDefinition` shape:
 *   - `enum` keyed in {@link PROPERTY_OPTION_GROUPS} → grouped Select with
 *     `<optgroup>` separators + humanised labels (e.g. blendMode → Normal /
 *     Darken / Lighten / Contrast / Inversion / Component categories)
 *   - `enum` (otherwise) → Options chips when the combined label text fits
 *     inline (see {@link fitsInlineOptions}) or a flat Select dropdown
 *   - `default: boolean` → Checkbox
 *   - `cssProperty: 'color' | '*-color'` or raw color default → ColorInput
 *   - `default: [number, number]` → Vector2Input
 *   - `default: number` → NumberInput (with units), or Slider for normalised
 *     0–1 values (`opacity`, `filterBrightness`, …)
 *   - `default: string` → TextInput, FontPicker for `fontFamily`, Textarea
 *     for `text`
 *
 * Dependent properties are hidden when their gating property is disabled
 * (see {@link isPropertyVisible}) — e.g. `boxShadowBlur` only appears when
 * `boxShadow` is truthy. This mirrors the renderer's own gating, where the
 * effect only renders when the parent toggle is on.
 *
 * The Transitions tab filters the registry to presets compatible with the
 * selected layer's category (`getLayerCategory` + `transitionAcceptedBy`):
 * `'audio'` layers see audio + universal; `'visual'` see visual + universal;
 * `'textual'` see visual, textual, and universal (text layers extend
 * `VisualLayer` in core, so visual transitions still composite correctly).
 */
export declare function Sidebar(): import("react/jsx-runtime").JSX.Element;
export declare const EyeIcon: ({ size }: {
    size?: number;
}) => import("react/jsx-runtime").JSX.Element;
export declare const EyeOffIcon: ({ size }: {
    size?: number;
}) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=Sidebar.d.ts.map