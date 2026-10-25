import { useSyncExternalStore, useMemo } from 'react';
import {
    subscribe,
    getCategories,
    getAssignments,
    getActiveFilter,
    resolveServerCategory,
    getCollapsedCategories,
    getLayoutMode,
    getLiveServers,
    type Category,
    type CategoryAssignment,
    type ResolvableServer,
    type LayoutMode,
} from './store';

/** Reactive hook — re-renders when categories change. */
export function useCategories(): Category[] {
    return useSyncExternalStore(subscribe, getCategories, getCategories);
}

/** Reactive hook — re-renders when assignments change. */
export function useAssignments(): CategoryAssignment {
    return useSyncExternalStore(subscribe, getAssignments, getAssignments);
}

/** Reactive hook — returns the category assigned to this server, or null. */
export function useServerCategory(serverUuid: string, serverData?: ResolvableServer): Category | null {
    const categories = useCategories();
    const assignments = useAssignments();

    return useMemo(() => {
        if (serverData) {
            return resolveServerCategory(serverData);
        }
        const categoryId = assignments[serverUuid];
        if (!categoryId) return null;
        return categories.find((c) => c.id === categoryId) ?? null;
    }, [serverUuid, serverData, categories, assignments]);
}

/** Reactive hook — returns the live servers currently loaded on the dashboard. */
export function useLiveServers(): ResolvableServer[] {
    return useSyncExternalStore(subscribe, getLiveServers, getLiveServers);
}

export interface ActiveCategory {
    category: Category;
    count: number;
}

/**
 * Returns only the categories that currently have at least 1 server,
 * plus uncategorized count and total count.
 */
export function useActiveCategories(): {
    activeCategories: ActiveCategory[];
    uncategorizedCount: number;
    totalCount: number;
} {
    const categories = useCategories();
    const assignments = useAssignments();
    const servers = useLiveServers();

    return useMemo(() => {
        const counts = new Map<string, number>();
        let uncategorized = 0;

        for (const server of servers) {
            const cat = resolveServerCategory(server);
            if (cat) {
                counts.set(cat.id, (counts.get(cat.id) ?? 0) + 1);
            } else {
                uncategorized++;
            }
        }

        const activeList = categories
            .filter((cat) => (counts.get(cat.id) ?? 0) > 0)
            .map((cat) => ({
                category: cat,
                count: counts.get(cat.id) ?? 0,
            }));

        return {
            activeCategories: activeList,
            uncategorizedCount: uncategorized,
            totalCount: servers.length,
        };
    }, [categories, assignments, servers]);
}

/** Reactive hook — returns the active filter category id (null = show all). */
export function useActiveFilter(): string | null {
    return useSyncExternalStore(subscribe, getActiveFilter, getActiveFilter);
}

/** Reactive hook — returns the map of collapsed categories. */
export function useCollapsedCategories(): Record<string, boolean> {
    return useSyncExternalStore(subscribe, getCollapsedCategories, getCollapsedCategories);
}

/** Reactive hook — returns the dashboard layout mode ('grouped' | 'list'). */
export function useLayoutMode(): LayoutMode {
    return useSyncExternalStore(subscribe, getLayoutMode, getLayoutMode);
}
