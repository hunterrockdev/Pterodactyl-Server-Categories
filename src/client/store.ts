import { queryClient } from '@pterodactyl/sdk';
import { http } from '@pterodactyl/sdk/api';
import { i18n } from './i18n';

export type RuleType = 'egg_tag' | 'egg_feature' | 'docker_image' | 'name_contains' | 'server_uuid';

export interface CategoryRule {
    id: string;
    type: RuleType;
    value: string;
}

export interface Category {
    id: string;
    name: string;
    color: string;
    icon: string;
    order?: number;
    rules?: CategoryRule[];
}

export interface CategoryAssignment {
    /** server UUID → category ID */
    [serverUuid: string]: string;
}

export type LayoutMode = 'grouped' | 'list';

const CATEGORIES_KEY = 'ptero:server-categories';
const ASSIGNMENTS_KEY = 'ptero:server-category-assignments';
const COLLAPSED_KEY = 'ptero:server-category-collapsed';
const LAYOUT_MODE_KEY = 'ptero:dashboard-layout-mode';

// ─── Preset Categories with Smart Rules (Available via "Reset Defaults" / "Load Presets") ──
export const PRESET_CATEGORIES: Category[] = [
    {
        id: 'game',
        name: i18n.presets.game,
        color: '#22c55e',
        icon: '🎮',
        order: 1,
        rules: [
            { id: 'r1', type: 'egg_tag', value: 'minecraft' },
            { id: 'r2', type: 'egg_tag', value: 'paper' },
            { id: 'r3', type: 'egg_tag', value: 'purpur' },
            { id: 'r4', type: 'egg_tag', value: 'spigot' },
            { id: 'r5', type: 'egg_tag', value: 'bungeecord' },
            { id: 'r6', type: 'egg_tag', value: 'rust' },
            { id: 'r7', type: 'egg_tag', value: 'valheim' },
            { id: 'r8', type: 'egg_tag', value: 'csgo' },
            { id: 'r9', type: 'egg_tag', value: 'ark' },
            { id: 'r10', type: 'egg_tag', value: 'palworld' },
            { id: 'r11', type: 'name_contains', value: 'game' },
            { id: 'r12', type: 'name_contains', value: 'server' },
        ],
    },
    {
        id: 'bot',
        name: i18n.presets.bot,
        color: '#8b5cf6',
        icon: '🤖',
        order: 2,
        rules: [
            { id: 'r13', type: 'egg_tag', value: 'discord' },
            { id: 'r14', type: 'egg_tag', value: 'bot' },
            { id: 'r15', type: 'docker_image', value: 'python' },
            { id: 'r16', type: 'docker_image', value: 'node' },
            { id: 'r17', type: 'name_contains', value: 'bot' },
            { id: 'r18', type: 'name_contains', value: 'discord' },
        ],
    },
    {
        id: 'web',
        name: i18n.presets.web,
        color: '#3b82f6',
        icon: '🌐',
        order: 3,
        rules: [
            { id: 'r19', type: 'egg_tag', value: 'web' },
            { id: 'r20', type: 'egg_tag', value: 'nginx' },
            { id: 'r21', type: 'egg_tag', value: 'php' },
            { id: 'r22', type: 'name_contains', value: 'web' },
            { id: 'r23', type: 'name_contains', value: 'api' },
            { id: 'r24', type: 'name_contains', value: 'site' },
        ],
    },
    {
        id: 'dev',
        name: i18n.presets.dev,
        color: '#f59e0b',
        icon: '⚡',
        order: 4,
        rules: [
            { id: 'r25', type: 'name_contains', value: 'test' },
            { id: 'r26', type: 'name_contains', value: 'dev' },
            { id: 'r27', type: 'name_contains', value: 'demo' },
            { id: 'r28', type: 'name_contains', value: 'staging' },
        ],
    },
    {
        id: 'other',
        name: i18n.presets.other,
        color: '#6b7280',
        icon: '📁',
        order: 5,
        rules: [],
    },
];

/** By default, when no categories are defined in the panel, it stays 100% default Pterodactyl */
export const DEFAULT_CATEGORIES: Category[] = [];

// ─── In-memory Cache for Stable Snapshots ─────────────────────────
// Critical for useSyncExternalStore: Object.is(prev, next) MUST return true
// unless an explicit write operation occurred.
let cachedCategories: Category[] | null = null;
let cachedAssignments: CategoryAssignment | null = null;
let cachedCollapsed: Record<string, boolean> | null = null;
let cachedLayoutMode: LayoutMode | null = null;
let activeFilter: string | null = null;
let cachedServers: ResolvableServer[] = [];

export function getLiveServers(): ResolvableServer[] {
    if (cachedServers.length > 0) return cachedServers;
    try {
        const queries = queryClient.getQueriesData<any>({ queryKey: ['clientListClientServers'] });
        for (const [_, data] of queries) {
            if (data?.data && Array.isArray(data.data) && data.data.length > 0) {
                cachedServers = data.data;
                return cachedServers;
            }
        }
    } catch {}
    return cachedServers;
}

export function setLiveServers(servers: ResolvableServer[]) {
    cachedServers = servers;
    notify();
}

// ─── Listeners (pub/sub for React reactivity) ──────────────────────
type Listener = () => void;
const listeners = new Set<Listener>();

function notify() {
    listeners.forEach((fn) => {
        try {
            fn();
        } catch {
            // Protect against individual listener errors
        }
    });
}

export function subscribe(fn: Listener): () => void {
    listeners.add(fn);
    return () => listeners.delete(fn);
}

// ─── Global Server Sync ────────────────────────────────────────────
let hasFetchedGlobal = false;

export async function fetchGlobalData(): Promise<void> {
    try {
        const res = await http.get('/api/client/extensions/server-categories/data');
        const data = res.data?.data;
        if (data) {
            let changed = false;
            if (Array.isArray(data.categories)) {
                cachedCategories = [...data.categories].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
                try {
                    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cachedCategories));
                } catch {}
                changed = true;
            }
            if (data.assignments && typeof data.assignments === 'object') {
                cachedAssignments = { ...data.assignments };
                try {
                    localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(cachedAssignments));
                } catch {}
                changed = true;
            }
            if (changed) {
                notify();
            }
        }
    } catch {
        // Fallback to local cache if network/offline
    }
}

// ─── Read Helpers ──────────────────────────────────────────────────
function readJSON<T>(key: string, fallback: T): T {
    try {
        const raw = localStorage.getItem(key);
        return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
        return fallback;
    }
}

export function getCategories(): Category[] {
    if (!cachedCategories) {
        const list = readJSON<Category[]>(CATEGORIES_KEY, DEFAULT_CATEGORIES);
        cachedCategories = [...list].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    }
    if (!hasFetchedGlobal) {
        hasFetchedGlobal = true;
        void fetchGlobalData();
    }
    return cachedCategories;
}

export function getAssignments(): CategoryAssignment {
    if (!cachedAssignments) {
        cachedAssignments = readJSON<CategoryAssignment>(ASSIGNMENTS_KEY, {});
    }
    if (!hasFetchedGlobal) {
        hasFetchedGlobal = true;
        void fetchGlobalData();
    }
    return cachedAssignments;
}

/**
 * Collapsed state is strictly LOCAL per user / browser session.
 */
export function getCollapsedCategories(): Record<string, boolean> {
    if (!cachedCollapsed) {
        cachedCollapsed = readJSON<Record<string, boolean>>(COLLAPSED_KEY, {});
    }
    return cachedCollapsed;
}

export function isCategoryCollapsed(categoryId: string): boolean {
    const map = getCollapsedCategories();
    return !!map[categoryId];
}

export function getLayoutMode(): LayoutMode {
    if (!cachedLayoutMode) {
        try {
            cachedLayoutMode = (localStorage.getItem(LAYOUT_MODE_KEY) as LayoutMode) || 'grouped';
        } catch {
            cachedLayoutMode = 'grouped';
        }
    }
    return cachedLayoutMode;
}

export function getActiveFilter(): string | null {
    return activeFilter;
}

// ─── Write Helpers ─────────────────────────────────────────────────
export function saveCategories(categories: Category[]) {
    cachedCategories = [...categories].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    try {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cachedCategories));
    } catch {}
    notify();

    // Persist globally to panel database
    http.post('/api/admin/extensions/server-categories/categories', { categories: cachedCategories }).catch((err: unknown) => {
        console.error('Failed to sync categories to database:', err);
    });
}

export function saveAssignments(assignments: CategoryAssignment) {
    cachedAssignments = { ...assignments };
    try {
        localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(cachedAssignments));
    } catch {}
    notify();

    // Persist globally to panel database
    http.post('/api/admin/extensions/server-categories/assignments', { assignments: cachedAssignments }).catch((err: unknown) => {
        console.error('Failed to sync assignments to database:', err);
    });
}

/**
 * Toggle category section collapsed state on the dashboard.
 * Purely LOCAL (only in this user's browser localStorage).
 */
export function toggleCategoryCollapse(categoryId: string) {
    const current = getCollapsedCategories();
    cachedCollapsed = { ...current, [categoryId]: !current[categoryId] };
    try {
        localStorage.setItem(COLLAPSED_KEY, JSON.stringify(cachedCollapsed));
    } catch {}
    notify();
}

export function setLayoutMode(mode: LayoutMode) {
    cachedLayoutMode = mode;
    try {
        localStorage.setItem(LAYOUT_MODE_KEY, mode);
    } catch {}
    notify();
}

export function setActiveFilter(categoryId: string | null) {
    activeFilter = categoryId;
    notify();
}

export function assignServer(serverUuid: string, categoryId: string | null) {
    const current = getAssignments();
    const updated = { ...current };
    if (categoryId === null) {
        delete updated[serverUuid];
    } else {
        updated[serverUuid] = categoryId;
    }
    saveAssignments(updated);
}

export function addCategory(category: Category) {
    const cats = [...getCategories(), category];
    saveCategories(cats);
}

export function removeCategory(categoryId: string) {
    const filtered = getCategories().filter((c) => c.id !== categoryId);
    saveCategories(filtered);

    const currentAssignments = getAssignments();
    const updatedAssignments: CategoryAssignment = {};
    for (const [uuid, catId] of Object.entries(currentAssignments)) {
        if (catId !== categoryId) updatedAssignments[uuid] = catId;
    }
    saveAssignments(updatedAssignments);
}

export function updateCategory(categoryId: string, patch: Partial<Omit<Category, 'id'>>) {
    const updated = getCategories().map((c) => (c.id === categoryId ? { ...c, ...patch } : c));
    saveCategories(updated);
}

export function loadPresets() {
    const localized = PRESET_CATEGORIES.map((c) => ({
        ...c,
        name: i18n.presets[c.id as keyof typeof i18n.presets] ?? c.name,
    }));
    saveCategories(localized);
}

export function resetToDefaults() {
    cachedCategories = [...DEFAULT_CATEGORIES];
    cachedAssignments = {};
    activeFilter = null;
    try {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(cachedCategories));
        localStorage.setItem(ASSIGNMENTS_KEY, JSON.stringify(cachedAssignments));
    } catch {}
    notify();

    // Reset globally in panel database
    http.post('/api/admin/extensions/server-categories/reset').catch((err: unknown) => {
        console.error('Failed to reset categories in database:', err);
    });
}

// ─── Smart Resolution Engine ───────────────────────────────────────
export interface ResolvableServer {
    uuid?: string;
    identifier?: string;
    name?: string;
    server?: {
        attributes?: {
            uuid?: string;
            identifier?: string;
            name?: string;
            docker_image?: string;
            egg_features?: string[] | null;
            egg_tags?: string[];
        };
    };
    attributes?: {
        uuid?: string;
        identifier?: string;
        name?: string;
        docker_image?: string;
        egg_features?: string[] | null;
        egg_tags?: string[];
    };
}

/**
 * Resolves which category a server belongs to:
 * 1. Checks manual assignments (explicit override)
 * 2. Checks rules on each category (egg tags, egg features, docker image, name contains, uuid)
 * 3. Falls back to null
 */
export function resolveServerCategory(server: ResolvableServer): Category | null {
    const categories = getCategories();
    const assignments = getAssignments();

    // Extract attributes
    const attrs = server.attributes ?? server.server?.attributes;
    const uuid = attrs?.uuid ?? server.uuid ?? '';
    const identifier = attrs?.identifier ?? server.identifier ?? '';
    const name = (attrs?.name ?? server.name ?? '').toLowerCase();
    const dockerImage = (attrs?.docker_image ?? '').toLowerCase();
    const eggTags = (attrs?.egg_tags ?? []).map((t) => t.toLowerCase());
    const eggFeatures = (attrs?.egg_features ?? []).map((f) => f.toLowerCase());

    // 1. Manual Assignment (Top Priority)
    if (uuid && assignments[uuid]) {
        const found = categories.find((c) => c.id === assignments[uuid]);
        if (found) return found;
    }

    // 2. Rule Matching (Automatic)
    for (const cat of categories) {
        if (!cat.rules || cat.rules.length === 0) continue;

        for (const rule of cat.rules) {
            const ruleVal = rule.value.trim().toLowerCase();
            if (!ruleVal) continue;

            switch (rule.type) {
                case 'server_uuid':
                    if (uuid.toLowerCase() === ruleVal || identifier.toLowerCase() === ruleVal) {
                        return cat;
                    }
                    break;
                case 'egg_tag':
                    if (eggTags.includes(ruleVal) || eggTags.some((t) => t.includes(ruleVal))) {
                        return cat;
                    }
                    break;
                case 'egg_feature':
                    if (eggFeatures.includes(ruleVal) || eggFeatures.some((f) => f.includes(ruleVal))) {
                        return cat;
                    }
                    break;
                case 'docker_image':
                    if (dockerImage.includes(ruleVal)) {
                        return cat;
                    }
                    break;
                case 'name_contains':
                    if (name.includes(ruleVal)) {
                        return cat;
                    }
                    break;
            }
        }
    }

    return null;
}

export function getCategoryForServer(serverUuid: string, serverData?: ResolvableServer): Category | null {
    if (serverData) {
        return resolveServerCategory(serverData);
    }
    const assignments = getAssignments();
    const categoryId = assignments[serverUuid];
    if (!categoryId) return null;
    return getCategories().find((c) => c.id === categoryId) ?? null;
}
