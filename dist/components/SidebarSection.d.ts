/**
 * SidebarSection — collapsible group inside the inspector sidebar.
 *
 * The collapsed state is owned by local component state (per-render), which
 * is fine for this UX: sections are authored per layer-inspector and always
 * start expanded. Host apps that want persistence can wrap their own
 * sidebar.
 */
import { type ReactNode } from 'react';
export type SidebarSectionProps = {
    title: string;
    defaultCollapsed?: boolean;
    /**
     * When true, the section body is always rendered and the header acts as a
     * static label (no chevron, no click-to-collapse). Used where a separate
     * enable/disable toggle already controls visibility.
     */
    alwaysOpen?: boolean;
    /**
     * Optional slot rendered inline in the header (before the chevron). Used
     * for section-scoped toggles (e.g. 3D mode on the Transform section).
     * Clicks inside are stopped from bubbling so they don't toggle collapse.
     */
    action?: ReactNode;
    children: ReactNode;
};
export declare function SidebarSection({ title, defaultCollapsed, alwaysOpen, action, children, }: SidebarSectionProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SidebarSection.d.ts.map