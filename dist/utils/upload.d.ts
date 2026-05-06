/**
 * Default asset upload handler.
 *
 * The editor exposes an `onUpload` prop typed as
 * `(file: File) => Promise<string>`. When the host app doesn't supply one,
 * we fall back to wrapping the file in an object URL so drag-drop imports
 * work with zero configuration.
 *
 * Object URLs created by this helper are tracked so the editor can revoke
 * them on unmount. Host-provided `onUpload` implementations manage their own
 * URL lifecycle.
 */
export type UploadTracker = {
    upload: (file: File) => Promise<string>;
    /** Revoke all object URLs this tracker has handed out. */
    revokeAll: () => void;
};
/**
 * Build a tracker whose `upload` method returns an object URL for every file
 * and keeps a list of URLs it created so they can be revoked later.
 */
export declare function createDefaultUploadTracker(): UploadTracker;
//# sourceMappingURL=upload.d.ts.map