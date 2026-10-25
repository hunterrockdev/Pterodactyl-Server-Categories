import { useEffect } from 'react';
import type { ViewProps } from '@pterodactyl/sdk';
import { ListRow, PageHeading, Switch, PaginationFooter, cn } from '@pterodactyl/sdk';
import { View, Slot, type UiTone } from '@pterodactyl/sdk/theme';
import { useActiveFilter, useCategories, useCollapsedCategories, useLayoutMode } from './hooks';
import {
    resolveServerCategory,
    toggleCategoryCollapse,
    setLiveServers,
} from './store';
import { useLanguage } from './i18n';

const ServerRowWrapper = ListRow as React.ComponentType<any>;

/**
 * View override for `dashboard.serverList`:
 * Provides both:
 * 1. Collapsible Grouped Mode (Accordion sections by category, respecting active themes and slots)
 * 2. Flat List Mode (Delegates 100% to the native/theme ServerList component)
 * 
 * Guarantees zero breakage with any installed theme (e.g. Obsidian UI, Dark Theme)
 * or other extensions (e.g. Announcements, Minecraft player count, etc.).
 */
export default function FilteredServerList({ Default, model, className }: ViewProps<'dashboard.serverList'>) {
    const { t } = useLanguage();
    const activeFilter = useActiveFilter();
    const categories = useCategories();
    const collapsedMap = useCollapsedCategories();
    const layoutMode = useLayoutMode();
    const others = model.scope === 'others';
    const { pagination } = model;

    useEffect(() => {
        if (model.servers) {
            setLiveServers(model.servers as any);
        }
    }, [model.servers]);

    // 1. If page is loading, has no servers, or no categories exist in the panel:
    // When no categories exist, display 100% stock default Pterodactyl server list without any overrides.
    if (model.loading || !model.servers || model.servers.length === 0 || !categories || categories.length === 0) {
        return <Default model={model} className={className} />;
    }

    // 2. If a specific category filter is active, delegate directly to the theme's ServerList
    if (activeFilter) {
        const filtered = model.servers.filter((item) => {
            const cat = resolveServerCategory(item);
            return cat ? cat.id === activeFilter : activeFilter === 'other' || activeFilter === 'uncategorized';
        });

        const filteredModel = {
            ...model,
            servers: filtered,
            totals: {
                ...model.totals,
                servers: filtered.length,
            },
            pagination: model.pagination
                ? {
                      ...model.pagination,
                      total: filtered.length,
                      count: filtered.length,
                      totalPages: 1,
                      currentPage: 1,
                  }
                : null,
        };

        return <Default model={filteredModel} className={className} />;
    }

    // 3. If user selected Flat List view mode:
    if (layoutMode === 'list') {
        // Sort servers so same categories appear together, but keep 100% native theme layout
        const sorted = [...model.servers].sort((a, b) => {
            const catA = resolveServerCategory(a)?.order ?? 99;
            const catB = resolveServerCategory(b)?.order ?? 99;
            return catA - catB;
        });

        return <Default model={{ ...model, servers: sorted }} className={className} />;
    }

    // 4. Grouped Accordion View (Stacked vertically by category):
    type ServerItem = (typeof model.servers)[number];
    const grouped = new Map<string, ServerItem[]>();
    const uncategorized: ServerItem[] = [];

    for (const cat of categories) {
        grouped.set(cat.id, []);
    }

    for (const item of model.servers) {
        const cat = resolveServerCategory(item);
        if (cat && grouped.has(cat.id)) {
            grouped.get(cat.id)!.push(item);
        } else {
            uncategorized.push(item);
        }
    }

    interface Section {
        id: string;
        name: string;
        color: string;
        icon: string;
        servers: ServerItem[];
        isCollapsed: boolean;
    }

    const sections: Section[] = [];

    for (const cat of categories) {
        const servers = grouped.get(cat.id) ?? [];
        if (servers.length === 0) continue;

        sections.push({
            id: cat.id,
            name: cat.name,
            color: cat.color,
            icon: cat.icon,
            servers,
            isCollapsed: !!collapsedMap[cat.id],
        });
    }

    if (sections.length > 0 && uncategorized.length > 0) {
        sections.push({
            id: 'uncategorized',
            name: t.common.uncategorized,
            color: '#6b7280',
            icon: '📁',
            servers: uncategorized,
            isCollapsed: !!collapsedMap['uncategorized'],
        });
    }

    if (sections.length === 0) {
        return <Default model={model} className={className} />;
    }

    function statusTone(item: ServerItem): UiTone {
        if (item.state.kind !== 'ready' || item.state.power === 'offline') {
            return 'danger';
        }
        return item.state.power === 'running' ? 'success' : 'warning';
    }

    return (
        <div className={className}>
            <PageHeading
                title={t.dashboard.serversHeading}
                className='mb-4'
                actions={
                    model.canViewOthers && (
                        <Switch
                            checked={others}
                            onChange={() => model.actions.setScope(others ? 'mine' : 'others')}
                            label={others ? t.dashboard.showingOthers : t.dashboard.showingMine}
                            controlPosition='end'
                            className='gap-2'
                        />
                    )
                }
            />
            <Slot name='dashboard.before' />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {sections.map((sec) => {
                const runningCount = sec.servers.filter(
                    (s) => s.state && s.state.kind === 'ready' && s.state.power === 'running',
                ).length;

                return (
                    <div
                        key={sec.id}
                        style={{
                            borderRadius: '0.875rem',
                            border: '1px solid color-mix(in srgb, currentColor 10%, transparent)',
                            background: 'color-mix(in srgb, var(--color-card, var(--card, rgba(0,0,0,0.2))) 75%, transparent)',
                            overflow: 'hidden',
                            transition: 'all 200ms ease',
                        }}
                    >
                        {/* ─── Collapsible Header Bar ─────────────────── */}
                        <div
                            onClick={() => toggleCategoryCollapse(sec.id)}
                            role='button'
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    toggleCategoryCollapse(sec.id);
                                }
                            }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                padding: '0.75rem 1.25rem',
                                cursor: 'pointer',
                                userSelect: 'none',
                                background: `linear-gradient(90deg, color-mix(in srgb, ${sec.color} 15%, transparent), transparent 75%)`,
                                borderBottom: sec.isCollapsed
                                    ? 'none'
                                    : '1px solid color-mix(in srgb, currentColor 8%, transparent)',
                                transition: 'background 150ms ease',
                            }}
                        >
                            {/* Left: Indicator, Title & Badges */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                <div
                                    style={{
                                        width: '4px',
                                        height: '1.5rem',
                                        borderRadius: '9999px',
                                        background: sec.color,
                                    }}
                                />

                                <span style={{ fontSize: '1.25rem', lineHeight: 1 }}>{sec.icon}</span>

                                <span
                                    style={{
                                        fontSize: '0.9375rem',
                                        fontWeight: 700,
                                        letterSpacing: '-0.01em',
                                        color: 'currentColor',
                                    }}
                                >
                                    {sec.name.replace(/^.+\s/, '')}
                                </span>

                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        padding: '0.125rem 0.5rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.75rem',
                                        fontWeight: 600,
                                        background: 'color-mix(in srgb, currentColor 8%, transparent)',
                                        color: 'currentColor',
                                        opacity: 0.85,
                                    }}
                                >
                                    {t.dashboard.serverCount(sec.servers.length)}
                                </span>

                                {runningCount > 0 && (
                                    <span
                                        style={{
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '0.35rem',
                                            padding: '0.125rem 0.5rem',
                                            borderRadius: '9999px',
                                            fontSize: '0.75rem',
                                            fontWeight: 600,
                                            background: 'color-mix(in srgb, #22c55e 15%, transparent)',
                                            color: '#22c55e',
                                        }}
                                    >
                                        <span
                                            style={{
                                                width: '6px',
                                                height: '6px',
                                                borderRadius: '50%',
                                                background: '#22c55e',
                                            }}
                                        />
                                        {t.dashboard.onlineCount(runningCount)}
                                    </span>
                                )}
                            </div>

                            {/* Right: Expand/Collapse Chevron */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    fontSize: '0.8125rem',
                                    fontWeight: 500,
                                    opacity: 0.7,
                                }}
                            >
                                <span>{sec.isCollapsed ? t.common.expand : t.common.collapse}</span>
                                <span
                                    style={{
                                        display: 'inline-block',
                                        transform: sec.isCollapsed ? 'rotate(-90deg)' : 'rotate(0deg)',
                                        transition: 'transform 200ms ease',
                                        fontSize: '0.875rem',
                                        fontWeight: 700,
                                    }}
                                >
                                    ▼
                                </span>
                            </div>
                        </div>

                        {/* ─── Server Rows (Theme Card + All Row Slots) ── */}
                        {!sec.isCollapsed ? (
                            <div style={{ padding: '0.85rem' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                    {sec.servers.map((item, index) => {
                                        const { server } = item;
                                        return (
                                            <ServerRowWrapper
                                                key={item.uuid}
                                                destination={{ to: '/server/$id', params: { id: item.identifier } }}
                                                aria-label={item.name}
                                                status={statusTone(item)}
                                                className={cn('grid grid-cols-12 gap-4', index > 0 ? 'mt-2' : undefined)}
                                            >
                                                <Slot name='dashboard.serverRow.before' data={server} />
                                                <div className='col-span-12'>
                                                    <View name='dashboard.serverCard' server={server} />
                                                </div>
                                                <Slot name='dashboard.serverRow.metrics.after' data={server} />
                                                <Slot name='dashboard.serverRow.after' data={server} />
                                            </ServerRowWrapper>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div
                                style={{
                                    padding: '0.625rem 1.25rem',
                                    fontSize: '0.8125rem',
                                    opacity: 0.5,
                                    fontStyle: 'italic',
                                }}
                            >
                                {t.dashboard.hiddenServers(sec.servers.length)}
                            </div>
                        )}
                    </div>
                );
            })}
            </div>

            {pagination && pagination.totalPages > 1 && (
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                    <PaginationFooter
                        pagination={{
                            total: pagination.total,
                            count: pagination.count,
                            per_page: pagination.perPage,
                            current_page: pagination.currentPage,
                            total_pages: pagination.totalPages,
                        }}
                        onPageSelect={model.actions.setPage}
                    />
                </div>
            )}

            <Slot name='dashboard.after' />
        </div>
    );
}
