import type { SlotComponentProps, SdkServer } from '@pterodactyl/sdk';
import { useServerCategory } from './hooks';

/**
 * Injected into `dashboard.serverRow.name.after` — shows a small coloured
 * badge with the category emoji + short name right after the server name.
 */
export default function CategoryBadge({ data }: SlotComponentProps<SdkServer>) {
    const category = useServerCategory(data.attributes.uuid, data);
    if (!category) return null;

    return (
        <span
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.25rem',
                padding: '0.125rem 0.5rem',
                borderRadius: '9999px',
                fontSize: '0.6875rem',
                fontWeight: 600,
                letterSpacing: '0.01em',
                background: `color-mix(in srgb, ${category.color} 18%, transparent)`,
                color: category.color,
                border: `1px solid color-mix(in srgb, ${category.color} 25%, transparent)`,
                lineHeight: 1.4,
                whiteSpace: 'nowrap',
                verticalAlign: 'middle',
                marginLeft: '0.5rem',
            }}
        >
            <span style={{ fontSize: '0.75rem' }}>{category.icon}</span>
            {category.name.replace(/^.+\s/, '')}
        </span>
    );
}
