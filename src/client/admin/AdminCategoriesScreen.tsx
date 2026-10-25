import { useState } from 'react';
import type { ScreenComponentProps } from '@pterodactyl/sdk';
import { useCategories, useAssignments } from '../hooks';
import {
    saveCategories,
    saveAssignments,
    addCategory,
    removeCategory,
    updateCategory,
    resetToDefaults,
    loadPresets,
    assignServer,
    type Category,
    type CategoryRule,
    type RuleType,
} from '../store';
import { useLanguage, i18n } from '../i18n';

const COLOR_PRESETS = [
    '#22c55e', '#10b981', '#06b6d4', '#3b82f6', '#6366f1',
    '#8b5cf6', '#d946ef', '#f43f5e', '#ef4444', '#f97316',
    '#f59e0b', '#eab308', '#84cc16', '#64748b', '#71717a',
];

const EMOJI_PRESETS = [
    '🎮', '🤖', '🌐', '⚡', '📁', '🚀', '🛡️', '📦',
    '💻', '🎯', '🔥', '💎', '🕹️', '⚙️', '💬', '🔒',
];

export default function AdminCategoriesScreen(_props: ScreenComponentProps) {
    const { t } = useLanguage();
    const categories = useCategories();
    const assignments = useAssignments();

    const ruleLabels = t.admin.rules;

    // Dialog state
    const [editCat, setEditCat] = useState<Category | null>(null);
    const [isCreating, setIsCreating] = useState(false);

    // Form inputs for edit/create
    const [formName, setFormName] = useState('');
    const [formColor, setFormColor] = useState('#3b82f6');
    const [formIcon, setFormIcon] = useState('📁');

    // Rule add state
    const [addingRuleCatId, setAddingRuleCatId] = useState<string | null>(null);
    const [ruleType, setRuleType] = useState<RuleType>('egg_tag');
    const [ruleValue, setRuleValue] = useState('');

    // Manual assignment form
    const [manualUuid, setManualUuid] = useState('');
    const [manualCatId, setManualCatId] = useState('');

    // Open create modal
    const handleStartCreate = () => {
        setFormName('');
        setFormColor(COLOR_PRESETS[Math.floor(Math.random() * COLOR_PRESETS.length)]);
        setFormIcon('🚀');
        setIsCreating(true);
        setEditCat(null);
    };

    // Open edit modal
    const handleStartEdit = (cat: Category) => {
        setEditCat(cat);
        setFormName(cat.name);
        setFormColor(cat.color);
        setFormIcon(cat.icon);
        setIsCreating(false);
    };

    // Save modal
    const handleSaveCategory = (e: React.FormEvent) => {
        e.preventDefault();
        const trimmed = formName.trim();
        if (!trimmed) return;

        if (isCreating) {
            const newId =
                'cat_' +
                Date.now().toString(36) +
                '_' +
                Math.random().toString(36).substring(2, 6);
            addCategory({
                id: newId,
                name: trimmed.startsWith(formIcon) ? trimmed : `${formIcon} ${trimmed}`,
                color: formColor,
                icon: formIcon,
                order: categories.length + 1,
                rules: [],
            });
        } else if (editCat) {
            updateCategory(editCat.id, {
                name: trimmed.startsWith(formIcon) ? trimmed : `${formIcon} ${trimmed}`,
                color: formColor,
                icon: formIcon,
            });
        }

        setIsCreating(false);
        setEditCat(null);
    };

    // Reorder
    const handleMove = (index: number, direction: 'up' | 'down') => {
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= categories.length) return;

        const newCats = [...categories];
        const temp = newCats[index];
        newCats[index] = newCats[targetIndex];
        newCats[targetIndex] = temp;

        newCats.forEach((c, i) => (c.order = i + 1));
        saveCategories(newCats);
    };

    // Add rule to category
    const handleAddRule = (catId: string) => {
        const val = ruleValue.trim();
        if (!val) return;

        const cat = categories.find((c) => c.id === catId);
        if (!cat) return;

        const newRule: CategoryRule = {
            id: 'rule_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
            type: ruleType,
            value: val,
        };

        const currentRules = cat.rules ?? [];
        updateCategory(catId, {
            rules: [...currentRules, newRule],
        });

        setRuleValue('');
        setAddingRuleCatId(null);
    };

    // Remove rule from category
    const handleRemoveRule = (catId: string, ruleId: string) => {
        const cat = categories.find((c) => c.id === catId);
        if (!cat || !cat.rules) return;

        updateCategory(catId, {
            rules: cat.rules.filter((r) => r.id !== ruleId),
        });
    };

    // Export / Import
    const handleExport = () => {
        const data = {
            categories,
            assignments,
            exportedAt: new Date().toISOString(),
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ptero-categories-${new Date().toISOString().slice(0, 10)}.json`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const parsed = JSON.parse(event.target?.result as string);
                if (parsed.categories && Array.isArray(parsed.categories)) {
                    saveCategories(parsed.categories);
                    if (parsed.assignments) {
                        saveAssignments(parsed.assignments);
                    }
                    alert(i18n.admin.importSuccess(parsed.categories.length));
                }
            } catch {
                alert(i18n.admin.importInvalidFormat);
            }
        };
        reader.readAsText(file);
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1rem' }}>
            {/* ─── Header ─────────────────────────────────────────────── */}
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    marginBottom: '2rem',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '1.5rem',
                }}
            >
                <div>
                    <h1
                        style={{
                            fontSize: '1.5rem',
                            fontWeight: 700,
                            letterSpacing: '-0.02em',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.75rem',
                            margin: 0,
                            color: 'var(--foreground)',
                        }}
                    >
                        <span>🏷️</span> {i18n.admin.title}
                    </h1>
                    <p style={{ margin: '0.5rem 0 0', color: 'var(--muted-foreground)', fontSize: '0.875rem' }}>
                        {i18n.admin.subtitle}
                    </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button
                        type='button'
                        onClick={handleStartCreate}
                        style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            padding: '0.55rem 1.25rem',
                            borderRadius: '0.375rem',
                            background: '#2563eb',
                            color: '#ffffff',
                            fontWeight: 600,
                            fontSize: '0.875rem',
                            border: 'none',
                            cursor: 'pointer',
                        }}
                    >
                        <span>＋</span> {i18n.admin.newCategory}
                    </button>

                    <button
                        type='button'
                        onClick={handleExport}
                        style={{
                            padding: '0.55rem 0.85rem',
                            borderRadius: '0.375rem',
                            background: 'var(--secondary)',
                            color: 'var(--secondary-foreground)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                        }}
                        title={i18n.admin.exportJsonTitle}
                    >
                        📥 {i18n.admin.exportJson}
                    </button>

                    <label
                        style={{
                            padding: '0.55rem 0.85rem',
                            borderRadius: '0.375rem',
                            background: 'var(--secondary)',
                            color: 'var(--secondary-foreground)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                        }}
                        title={i18n.admin.importJsonTitle}
                    >
                        📤 {i18n.admin.importJson}
                        <input type='file' accept='.json' onChange={handleImport} style={{ display: 'none' }} />
                    </label>

                    <button
                        type='button'
                        onClick={() => {
                            if (confirm(i18n.admin.loadPresetsConfirm)) {
                                loadPresets();
                            }
                        }}
                        style={{
                            padding: '0.55rem 0.85rem',
                            borderRadius: '0.375rem',
                            background: 'var(--secondary)',
                            color: 'var(--secondary-foreground)',
                            border: '1px solid var(--border)',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                        }}
                        title={i18n.admin.loadPresetsTitle}
                    >
                        ⚡ {i18n.admin.loadPresets}
                    </button>

                    <button
                        type='button'
                        onClick={() => {
                            if (confirm(i18n.admin.clearAllConfirm)) {
                                resetToDefaults();
                            }
                        }}
                        style={{
                            padding: '0.55rem 0.85rem',
                            borderRadius: '0.375rem',
                            background: '#dc2626',
                            color: '#ffffff',
                            border: 'none',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: 500,
                        }}
                    >
                        🗑️ {t.admin.clearAll}
                    </button>
                </div>
            </div>

            {/* ─── Category List ───────────────────────────────────────── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {categories.length === 0 ? (
                    <div
                        style={{
                            borderRadius: '0.5rem',
                            border: '1px dashed var(--border)',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                            padding: '3rem 2rem',
                            textAlign: 'center',
                        }}
                    >
                        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📂</div>
                        <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.25rem', fontWeight: 600 }}>
                            {i18n.admin.emptyStateTitle}
                        </h3>
                        <p
                            style={{
                                margin: '0 auto 1.5rem',
                                maxWidth: '520px',
                                fontSize: '0.875rem',
                                color: 'var(--muted-foreground)',
                                lineHeight: 1.5,
                            }}
                        >
                            {i18n.admin.emptyStateDescription}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                            <button
                                type='button'
                                onClick={() => setIsCreating(true)}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '0.375rem',
                                    background: 'var(--primary)',
                                    color: 'var(--primary-foreground)',
                                    border: 'none',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                }}
                            >
                                {i18n.admin.createFirstCategory}
                            </button>
                            <button
                                type='button'
                                onClick={() => {
                                    if (confirm(i18n.admin.loadPresetsConfirm)) {
                                        loadPresets();
                                    }
                                }}
                                style={{
                                    padding: '0.6rem 1.25rem',
                                    borderRadius: '0.375rem',
                                    background: 'var(--secondary)',
                                    color: 'var(--secondary-foreground)',
                                    border: '1px solid var(--border)',
                                    cursor: 'pointer',
                                    fontSize: '0.875rem',
                                    fontWeight: 600,
                                }}
                            >
                                ⚡ {i18n.admin.loadPresets}
                            </button>
                        </div>
                    </div>
                ) : (
                    categories.map((cat, idx) => {
                    const rules = cat.rules ?? [];
                    const isAddingRule = addingRuleCatId === cat.id;

                    return (
                        <div
                            key={cat.id}
                            style={{
                                borderRadius: '0.5rem',
                                border: '1px solid var(--border)',
                                background: 'var(--card)',
                                color: 'var(--card-foreground)',
                                padding: '1.25rem',
                            }}
                        >
                            {/* Card Top: Details & Actions */}
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    flexWrap: 'wrap',
                                    gap: '0.75rem',
                                    marginBottom: '1rem',
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    <div
                                        style={{
                                            width: '8px',
                                            height: '2rem',
                                            borderRadius: '2px',
                                            background: cat.color,
                                        }}
                                    />
                                    <span style={{ fontSize: '1.5rem', lineHeight: 1 }}>{cat.icon}</span>
                                    <div>
                                        <h3 style={{ margin: 0, fontSize: '1.125rem', fontWeight: 700 }}>
                                            {cat.name.replace(/^.+\s/, '')}
                                        </h3>
                                        <span
                                            style={{
                                                fontSize: '0.75rem',
                                                color: 'var(--muted-foreground)',
                                                fontFamily: 'monospace',
                                            }}
                                        >
                                            id: {cat.id} • {rules.length} {rules.length === 1 ? 'rule' : 'rules'}
                                        </span>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                                    {/* Move Buttons */}
                                    <button
                                        type='button'
                                        disabled={idx === 0}
                                        onClick={() => handleMove(idx, 'up')}
                                        style={{
                                            padding: '0.35rem 0.6rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid var(--border)',
                                            background: 'var(--secondary)',
                                            color: 'var(--secondary-foreground)',
                                            cursor: idx === 0 ? 'not-allowed' : 'pointer',
                                            opacity: idx === 0 ? 0.3 : 1,
                                        }}
                                        title={i18n.admin.moveUp}
                                    >
                                        ▲
                                    </button>
                                    <button
                                        type='button'
                                        disabled={idx === categories.length - 1}
                                        onClick={() => handleMove(idx, 'down')}
                                        style={{
                                            padding: '0.35rem 0.6rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid var(--border)',
                                            background: 'var(--secondary)',
                                            color: 'var(--secondary-foreground)',
                                            cursor: idx === categories.length - 1 ? 'not-allowed' : 'pointer',
                                            opacity: idx === categories.length - 1 ? 0.3 : 1,
                                        }}
                                        title={i18n.admin.moveDown}
                                    >
                                        ▼
                                    </button>

                                    <button
                                        type='button'
                                        onClick={() => handleStartEdit(cat)}
                                        style={{
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid var(--border)',
                                            background: 'var(--secondary)',
                                            color: 'var(--secondary-foreground)',
                                            cursor: 'pointer',
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        ✏️ {i18n.common.edit}
                                    </button>

                                    <button
                                        type='button'
                                        onClick={() => {
                                            if (confirm(i18n.admin.deleteCategoryConfirm(cat.name))) {
                                                removeCategory(cat.id);
                                            }
                                        }}
                                        style={{
                                            padding: '0.35rem 0.75rem',
                                            borderRadius: '0.375rem',
                                            border: '1px solid #dc2626',
                                            background: 'transparent',
                                            color: '#dc2626',
                                            cursor: 'pointer',
                                            fontSize: '0.8125rem',
                                            fontWeight: 500,
                                        }}
                                    >
                                        🗑️ {i18n.common.delete}
                                    </button>
                                </div>
                            </div>

                            {/* Rules Section */}
                            <div
                                style={{
                                    borderTop: '1px solid var(--border)',
                                    paddingTop: '0.85rem',
                                }}
                            >
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    <span
                                        style={{
                                            fontSize: '0.75rem',
                                            fontWeight: 700,
                                            textTransform: 'uppercase',
                                            letterSpacing: '0.05em',
                                            color: 'var(--muted-foreground)',
                                        }}
                                    >
                                        ⚡ {i18n.admin.rulesSectionTitle}
                                    </span>

                                    {!isAddingRule && (
                                        <button
                                            type='button'
                                            onClick={() => {
                                                setAddingRuleCatId(cat.id);
                                                setRuleType('egg_tag');
                                                setRuleValue('');
                                            }}
                                            style={{
                                                fontSize: '0.75rem',
                                                padding: '0.25rem 0.65rem',
                                                borderRadius: '0.25rem',
                                                background: 'var(--secondary)',
                                                border: '1px solid var(--border)',
                                                cursor: 'pointer',
                                                color: 'var(--secondary-foreground)',
                                                fontWeight: 600,
                                            }}
                                        >
                                            {i18n.admin.addRule}
                                        </button>
                                    )}
                                </div>

                                {/* Active Rules Badges */}
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                                    {rules.length === 0 && !isAddingRule && (
                                        <span style={{ fontSize: '0.8125rem', color: 'var(--muted-foreground)', fontStyle: 'italic' }}>
                                            {i18n.admin.noRules}
                                        </span>
                                    )}

                                    {rules.map((r) => {
                                        const typeInfo = ruleLabels[r.type] ?? {
                                            label: r.type,
                                            icon: '⚙️',
                                        };
                                        return (
                                            <span
                                                key={r.id}
                                                style={{
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.35rem',
                                                    padding: '0.25rem 0.65rem',
                                                    borderRadius: '9999px',
                                                    fontSize: '0.75rem',
                                                    fontWeight: 500,
                                                    background: 'var(--secondary)',
                                                    border: '1px solid var(--border)',
                                                    color: 'var(--secondary-foreground)',
                                                }}
                                            >
                                                <span>{typeInfo.icon}</span>
                                                <strong style={{ opacity: 0.8 }}>{typeInfo.label}:</strong>
                                                <code style={{ fontFamily: 'monospace', fontWeight: 600 }}>
                                                    {r.value}
                                                </code>
                                                <button
                                                    type='button'
                                                    onClick={() => handleRemoveRule(cat.id, r.id)}
                                                    style={{
                                                        background: 'transparent',
                                                        border: 'none',
                                                        cursor: 'pointer',
                                                        color: 'var(--muted-foreground)',
                                                        marginLeft: '0.25rem',
                                                        padding: 0,
                                                        fontSize: '0.75rem',
                                                        fontWeight: 700,
                                                    }}
                                                    title={i18n.admin.removeRule}
                                                >
                                                    ✕
                                                </button>
                                            </span>
                                        );
                                    })}
                                </div>

                                {/* Add Rule Inline Form */}
                                {isAddingRule && (
                                    <div
                                        style={{
                                            marginTop: '0.75rem',
                                            padding: '0.85rem',
                                            borderRadius: '0.375rem',
                                            background: 'var(--background)',
                                            border: '1px solid var(--border)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.5rem',
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                            <select
                                                value={ruleType}
                                                onChange={(e) => setRuleType(e.target.value as RuleType)}
                                                style={{
                                                    padding: '0.45rem 0.65rem',
                                                    borderRadius: '0.375rem',
                                                    border: '1px solid var(--border)',
                                                    background: 'var(--card)',
                                                    color: 'var(--foreground)',
                                                    fontSize: '0.8125rem',
                                                }}
                                            >
                                                <option value='egg_tag'>{ruleLabels.egg_tag.icon} {ruleLabels.egg_tag.label}</option>
                                                <option value='egg_feature'>{ruleLabels.egg_feature.icon} {ruleLabels.egg_feature.label}</option>
                                                <option value='docker_image'>{ruleLabels.docker_image.icon} {ruleLabels.docker_image.label}</option>
                                                <option value='name_contains'>{ruleLabels.name_contains.icon} {ruleLabels.name_contains.label}</option>
                                                <option value='server_uuid'>{ruleLabels.server_uuid.icon} {ruleLabels.server_uuid.label}</option>
                                            </select>

                                            <input
                                                type='text'
                                                value={ruleValue}
                                                onChange={(e) => setRuleValue(e.target.value)}
                                                placeholder={ruleLabels[ruleType].placeholder}
                                                onKeyDown={(e) => {
                                                    if (e.key === 'Enter') {
                                                        e.preventDefault();
                                                        handleAddRule(cat.id);
                                                    }
                                                }}
                                                style={{
                                                    flex: 1,
                                                    minWidth: '200px',
                                                    padding: '0.45rem 0.75rem',
                                                    borderRadius: '0.375rem',
                                                    border: '1px solid var(--border)',
                                                    background: 'var(--card)',
                                                    color: 'var(--foreground)',
                                                    fontSize: '0.8125rem',
                                                }}
                                            />

                                            <button
                                                type='button'
                                                onClick={() => handleAddRule(cat.id)}
                                                style={{
                                                    padding: '0.45rem 1rem',
                                                    borderRadius: '0.375rem',
                                                    background: '#16a34a',
                                                    color: '#ffffff',
                                                    border: 'none',
                                                    fontWeight: 600,
                                                    fontSize: '0.8125rem',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {i18n.common.add}
                                            </button>

                                            <button
                                                type='button'
                                                onClick={() => setAddingRuleCatId(null)}
                                                style={{
                                                    padding: '0.45rem 0.75rem',
                                                    borderRadius: '0.375rem',
                                                    background: 'transparent',
                                                    border: '1px solid var(--border)',
                                                    color: 'var(--muted-foreground)',
                                                    fontSize: '0.8125rem',
                                                    cursor: 'pointer',
                                                }}
                                            >
                                                {i18n.common.cancel}
                                            </button>
                                        </div>

                                        <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>
                                            ℹ️ {ruleLabels[ruleType].hint}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                }))}
            </div>

            {/* ─── Manual Server Assignment Card ───────────────────────── */}
            {categories.length > 0 && (
                <div
                    style={{
                        marginTop: '2rem',
                        borderRadius: '0.5rem',
                        border: '1px solid var(--border)',
                        background: 'var(--card)',
                        color: 'var(--card-foreground)',
                        padding: '1.25rem',
                    }}
                >
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700, color: 'var(--foreground)' }}>
                        {i18n.admin.manualOverrideTitle}
                    </h3>
                    <p style={{ margin: '0 0 1rem', fontSize: '0.8125rem', color: 'var(--muted-foreground)' }}>
                        {i18n.admin.manualOverrideDesc}
                    </p>

                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
                        <input
                            type='text'
                            value={manualUuid}
                            onChange={(e) => setManualUuid(e.target.value)}
                            placeholder={i18n.admin.manualUuidPlaceholder}
                            style={{
                                flex: 1,
                                minWidth: '240px',
                                padding: '0.45rem 0.75rem',
                                borderRadius: '0.375rem',
                                border: '1px solid var(--border)',
                                background: 'var(--background)',
                                color: 'var(--foreground)',
                                fontSize: '0.8125rem',
                            }}
                        />

                        <select
                            value={manualCatId}
                            onChange={(e) => setManualCatId(e.target.value)}
                            style={{
                                padding: '0.45rem 0.75rem',
                                borderRadius: '0.375rem',
                                border: '1px solid var(--border)',
                                background: 'var(--background)',
                                color: 'var(--foreground)',
                                fontSize: '0.8125rem',
                            }}
                        >
                            <option value=''>{i18n.admin.selectCategoryPlaceholder}</option>
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.icon} {c.name.replace(/^.+\s/, '')}
                                </option>
                            ))}
                        </select>

                        <button
                            type='button'
                            disabled={!manualUuid.trim() || !manualCatId}
                            onClick={() => {
                                assignServer(manualUuid.trim(), manualCatId);
                                setManualUuid('');
                                setManualCatId('');
                            }}
                            style={{
                                padding: '0.45rem 1.25rem',
                                borderRadius: '0.375rem',
                                background: '#2563eb',
                                color: '#ffffff',
                                fontWeight: 600,
                                fontSize: '0.8125rem',
                                border: 'none',
                                cursor: manualUuid.trim() && manualCatId ? 'pointer' : 'not-allowed',
                                opacity: manualUuid.trim() && manualCatId ? 1 : 0.5,
                            }}
                        >
                            {i18n.common.assign}
                        </button>
                    </div>

                    {/* Display Current Manual Assignments */}
                    {Object.keys(assignments).length > 0 && (
                        <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border)', paddingTop: '0.75rem' }}>
                            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted-foreground)' }}>
                                {i18n.admin.activeOverrides}
                            </span>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.35rem' }}>
                                {Object.entries(assignments).map(([uuid, catId]) => {
                                    const cat = categories.find((c) => c.id === catId);
                                    return (
                                        <span
                                            key={uuid}
                                            style={{
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '0.35rem',
                                                padding: '0.25rem 0.55rem',
                                                borderRadius: '0.375rem',
                                                fontSize: '0.75rem',
                                                background: 'var(--secondary)',
                                                border: '1px solid var(--border)',
                                                color: 'var(--secondary-foreground)',
                                            }}
                                        >
                                            <code style={{ opacity: 0.8 }}>{uuid.slice(0, 8)}...</code>
                                            <span>→</span>
                                            <strong>{cat?.icon ?? '📁'} {cat?.name.replace(/^.+\s/, '') ?? catId}</strong>
                                            <button
                                                type='button'
                                                onClick={() => assignServer(uuid, null)}
                                                style={{
                                                    background: 'transparent',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: '#dc2626',
                                                    fontWeight: 700,
                                                    padding: '0 0.2rem',
                                                }}
                                                title={i18n.admin.removeOverride}
                                            >
                                                ✕
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    )}
            </div>
            )}

            {/* ─── Create / Edit Category Modal (Solid Panel Dialog, NO BLUR) ─── */}
            {(isCreating || editCat) && (
                <div
                    style={{
                        position: 'fixed',
                        inset: 0,
                        zIndex: 9999,
                        background: 'rgba(0, 0, 0, 0.75)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '1rem',
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            maxWidth: '480px',
                            background: 'var(--card)',
                            color: 'var(--card-foreground)',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border)',
                            padding: '1.5rem',
                            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        <h2 style={{ margin: '0 0 1.25rem', fontSize: '1.25rem', fontWeight: 700, color: 'var(--foreground)' }}>
                            {isCreating ? i18n.admin.modal.createTitle : i18n.admin.modal.editTitle}
                        </h2>

                        <form onSubmit={handleSaveCategory} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--foreground)' }}>
                                    {i18n.admin.modal.nameLabel}
                                </label>
                                <input
                                    type='text'
                                    value={formName}
                                    onChange={(e) => setFormName(e.target.value)}
                                    placeholder={i18n.admin.modal.namePlaceholder}
                                    required
                                    style={{
                                        width: '100%',
                                        padding: '0.5rem 0.75rem',
                                        borderRadius: '0.375rem',
                                        border: '1px solid var(--border)',
                                        background: 'var(--background)',
                                        color: 'var(--foreground)',
                                        fontSize: '0.875rem',
                                        boxSizing: 'border-box',
                                    }}
                                />
                            </div>

                            {/* Emoji Picker */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--foreground)' }}>
                                    {i18n.admin.modal.iconLabel}
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
                                    {EMOJI_PRESETS.map((emoji) => (
                                        <button
                                            key={emoji}
                                            type='button'
                                            onClick={() => setFormIcon(emoji)}
                                            style={{
                                                fontSize: '1.25rem',
                                                padding: '0.35rem 0.5rem',
                                                borderRadius: '0.375rem',
                                                border: formIcon === emoji ? '2px solid #2563eb' : '1px solid var(--border)',
                                                background: formIcon === emoji ? 'var(--secondary)' : 'var(--background)',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            {emoji}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Color Picker */}
                            <div>
                                <label style={{ display: 'block', fontSize: '0.8125rem', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--foreground)' }}>
                                    {i18n.admin.modal.colorLabel}
                                </label>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
                                    {COLOR_PRESETS.map((color) => (
                                        <button
                                            key={color}
                                            type='button'
                                            onClick={() => setFormColor(color)}
                                            style={{
                                                width: '1.75rem',
                                                height: '1.75rem',
                                                borderRadius: '50%',
                                                background: color,
                                                border: formColor === color ? '3px solid white' : '1px solid var(--border)',
                                                outline: formColor === color ? `2px solid ${color}` : 'none',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    ))}
                                    <input
                                        type='color'
                                        value={formColor}
                                        onChange={(e) => setFormColor(e.target.value)}
                                        style={{ width: '2rem', height: '2rem', padding: 0, border: 'none', background: 'transparent', cursor: 'pointer' }}
                                    />
                                </div>
                            </div>

                            {/* Preview */}
                            <div
                                style={{
                                    padding: '0.75rem',
                                    borderRadius: '0.375rem',
                                    background: 'var(--secondary)',
                                    border: '1px solid var(--border)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '0.5rem',
                                }}
                            >
                                <span style={{ fontSize: '0.75rem', color: 'var(--muted-foreground)' }}>{i18n.common.preview}</span>
                                <span
                                    style={{
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '0.35rem',
                                        padding: '0.25rem 0.65rem',
                                        borderRadius: '9999px',
                                        fontSize: '0.8125rem',
                                        fontWeight: 600,
                                        background: formColor,
                                        color: '#ffffff',
                                    }}
                                >
                                    <span>{formIcon}</span>
                                    <span>{formName || i18n.admin.modal.sampleCategory}</span>
                                </span>
                            </div>

                            {/* Buttons */}
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
                                <button
                                    type='button'
                                    onClick={() => {
                                        setIsCreating(false);
                                        setEditCat(null);
                                    }}
                                    style={{
                                        padding: '0.5rem 1rem',
                                        borderRadius: '0.375rem',
                                        background: 'transparent',
                                        border: '1px solid var(--border)',
                                        color: 'var(--foreground)',
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {i18n.common.cancel}
                                </button>
                                <button
                                    type='submit'
                                    style={{
                                        padding: '0.5rem 1.25rem',
                                        borderRadius: '0.375rem',
                                        background: '#2563eb',
                                        color: '#ffffff',
                                        border: 'none',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '0.875rem',
                                    }}
                                >
                                    {i18n.common.save}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
