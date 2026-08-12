import type { LayerEffectJSON } from '@videoflow/core/types';
/** Whether an animation property addresses an effect param rather than a layer property. */
export declare function isEffectParamPath(property: string): boolean;
/**
 * Read what an effect param currently renders as, for a path like
 * `effects.vignette[0].amount`.
 *
 * Effect params do **not** live in `layer.properties`, so the usual
 * "seed a new keyframe from the static value" lookup misses them entirely and
 * yields `undefined` — which the renderer then merges over the declared param,
 * snapping the pass back to its default. Resolution order matches the
 * renderer's: the entry's own `params`, then the effect's declared default.
 */
export declare function readEffectParamValue(effects: readonly LayerEffectJSON[] | undefined, property: string): unknown;
/**
 * Animatable effect params are addressed by the dot-path
 * `effects.<name>[<ordinal>].<param>`, where `<ordinal>` counts **entries of
 * that same effect name**, not positions in the `effects` array. So in
 * `[blur, pixelate]` the pixelate pass is `effects.pixelate[0]`, and only in
 * `[pixelate, pixelate]` does a `[1]` exist.
 *
 * The UI works in array indices throughout (that is what add / remove / move /
 * setParam all take), so every path built from an array index has to be
 * translated first. Skipping this step produces a path that points at nothing:
 * the keyframes are stored and interpolated, then silently dropped when the
 * renderer resolves effect params, and the pass keeps rendering at its static
 * value.
 *
 * Disabled entries still consume an ordinal — the renderer counts them too, so
 * toggling one effect off never re-targets another effect's keyframes.
 */
export declare function effectOrdinal(effects: readonly LayerEffectJSON[] | undefined, index: number): number;
/** Build the animation dot-path for one param of the effect at `index`. */
export declare function effectParamPath(effects: readonly LayerEffectJSON[] | undefined, index: number, paramName: string): string;
/** The `effects.<name>[<ordinal>].` prefix shared by every param of one entry. */
export declare function effectPathPrefix(effects: readonly LayerEffectJSON[] | undefined, index: number): string;
/**
 * Build the path rewriter for an `effects` array that has just been reordered
 * or had an entry spliced out.
 *
 * `remap` maps each *old* array index to its *new* array index, or to `null`
 * for an entry that no longer exists. The returned function maps an animation
 * property to its new path, to `null` if the track should be dropped, or
 * returns it unchanged when it doesn't address an effect at all.
 */
export declare function effectAnimationRewriter(before: readonly LayerEffectJSON[], after: readonly LayerEffectJSON[], remap: ReadonlyMap<number, number | null>): (property: string) => string | null;
/**
 * Apply {@link effectAnimationRewriter} to an animations array **in place**.
 *
 * In-place because the caller hands us an Immer draft: rebuilding the array
 * from spread drafts risks carrying revoked proxies out of the producer.
 * Each entry is visited once by position, so a reorder that swaps two paths
 * resolves correctly rather than chasing its own output.
 */
export declare function remapEffectAnimations(animations: Array<{
    property: string;
}> | undefined, before: readonly LayerEffectJSON[], after: readonly LayerEffectJSON[], remap: ReadonlyMap<number, number | null>): void;
//# sourceMappingURL=effectPath.d.ts.map