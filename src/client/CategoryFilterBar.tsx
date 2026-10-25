import type { SlotComponentProps, SdkServer } from '@pterodactyl/sdk';
import { useActiveFilter, useActiveCategories, useCategories, useLayoutMode } from './hooks';
import { setActiveFilter, setLayoutMode } from './store';
import { useLanguage } from './i18n';

/**
 * Renders above the server list inside the `dashboard.before` slot.
 * Shows category filter pills (only active categories with >0 servers) + view mode toggle.
 * When no categories exist in the panel, returns null to keep the default panel dashboard.
 */
export default function CategoryFilterBar(_props: SlotComponentProps<SdkServer>) {
    const { t } = useLanguage();
    const categories = useCategories();
    const activeFilter = useActiveFilter();
    const layoutMode = useLayoutMode();
    const { activeCategories, uncategorizedCount, totalCount } = useActiveCategories();

    // If no categories have been created in the panel, or none of them have any servers, hide bar:
    if (!categories || categories.length === 0 || activeCategories.length === 0) {
        return null;
    }

    return (
        <div className='sc:mb-4'>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    flexWrap: 'wrap',
                    padding: '0.75rem 1rem',
                    borderRadius: '0.75rem',
                    background: 'var(--color-card)',
                    border: '1px solid color-mix(in srgb, currentColor 8%, transparent)',
                }}
            >
                {/* "All" pill */}
                <button
                    type='button'
                    onClick={() => setActiveFilter(null)}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        padding: '0.35rem 0.85rem',
                        borderRadius: '9999px',
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        border: 'none',
                        transition: 'all 150ms ease',
                        background: activeFilter === null
                            ? 'var(--color-foreground)'
                            : 'color-mix(in srgb, currentColor 6%, transparent)',
                        color: activeFilter === null ? 'var(--color-card)' : 'currentColor',
                        opacity: activeFilter === null ? 1 : 0.7,
                    }}
                >
                    <span>{t.common.all}</span>
                    {totalCount > 0 && (
                        <span style={{ fontSize: '0.6875rem', opacity: 0.7, fontWeight: 500 }}>
                            ({totalCount})
                        </span>
                    )}
                </button>

                {/* Only categories that currently have at least 1 server */}
                {activeCategories.map(({ category: cat, count }) => {
                    const isActive = activeFilter === cat.id;
                    return (
                        <button
                            key={cat.id}
                            type='button'
                            onClick={() => setActiveFilter(isActive ? null : cat.id)}
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.35rem',
                                padding: '0.35rem 0.85rem',
                                borderRadius: '9999px',
                                fontSize: '0.8125rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                border: isActive ? `2px solid ${cat.color}` : '2px solid transparent',
                                transition: 'all 150ms ease',
                                background: isActive
                                    ? `color-mix(in srgb, ${cat.color} 20%, transparent)`
                                    : 'color-mix(in srgb, currentColor 6%, transparent)',
                                color: isActive ? cat.color : 'currentColor',
                                opacity: isActive ? 1 : 0.7,
                            }}
                        >
                            <span>{cat.icon}</span>
                            <span>{cat.name.replace(/^.+\s/, '')}</span>
                            <span
                                style={{
                                    fontSize: '0.6875rem',
                                    opacity: 0.7,
                                    fontWeight: 500,
                                }}
                            >
                                ({count})
                            </span>
                        </button>
                    );
                })}

                {/* Other / Uncategorized pill — only if there are servers without a category */}
                {uncategorizedCount > 0 && (
                    <button
                        type='button'
                        onClick={() => setActiveFilter(activeFilter === 'uncategorized' ? null : 'uncategorized')}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.35rem',
                            padding: '0.35rem 0.85rem',
                            borderRadius: '9999px',
                            fontSize: '0.8125rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            border: activeFilter === 'uncategorized' ? '2px solid #6b7280' : '2px solid transparent',
                            transition: 'all 150ms ease',
                            background: activeFilter === 'uncategorized'
                                ? 'color-mix(in srgb, #6b7280 20%, transparent)'
                                : 'color-mix(in srgb, currentColor 6%, transparent)',
                            color: activeFilter === 'uncategorized' ? '#6b7280' : 'currentColor',
                            opacity: activeFilter === 'uncategorized' ? 1 : 0.7,
                        }}
                    >
                        <span>📁</span>
                        <span>{t.common.other}</span>
                        <span
                            style={{
                                fontSize: '0.6875rem',
                                opacity: 0.7,
                                fontWeight: 500,
                            }}
                        >
                            ({uncategorizedCount})
                        </span>
                    </button>
                )}

                {/* View Mode Toggle: Grouped vs Flat List */}
                <div
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        background: 'color-mix(in srgb, currentColor 6%, transparent)',
                        borderRadius: '0.5rem',
                        padding: '0.15rem',
                        gap: '0.15rem',
                        marginLeft: 'auto',
                    }}
                >
                    <button
                        type='button'
                        onClick={() => setLayoutMode('grouped')}
                        title={t.dashboard.viewModeGroupedTitle}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem 0.55rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            background: layoutMode === 'grouped' ? 'var(--color-card)' : 'transparent',
                            color: 'currentColor',
                            opacity: layoutMode === 'grouped' ? 1 : 0.6,
                            boxShadow: layoutMode === 'grouped' ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
                            transition: 'all 150ms ease',
                        }}
                    >
                        <span>📑</span>
                        <span>{t.dashboard.viewModeGrouped}</span>
                    </button>
                    <button
                        type='button'
                        onClick={() => setLayoutMode('list')}
                        title={t.dashboard.viewModeListTitle}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            padding: '0.25rem 0.55rem',
                            borderRadius: '0.375rem',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            background: layoutMode === 'list' ? 'var(--color-card)' : 'transparent',
                            color: 'currentColor',
                            opacity: layoutMode === 'list' ? 1 : 0.6,
                            boxShadow: layoutMode === 'list' ? '0 1px 3px rgba(0,0,0,0.15)' : 'none',
                            transition: 'all 150ms ease',
                        }}
                    >
                        <span>📋</span>
                        <span>{t.dashboard.viewModeList}</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
