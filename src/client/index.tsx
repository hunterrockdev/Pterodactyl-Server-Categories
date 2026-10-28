import './styles.css';
import { definePterodactylExtension } from '@pterodactyl/sdk';
import CategoryFilterBar from './CategoryFilterBar';
import CategoryBadge from './CategoryBadge';
import { initDefaultLanguage } from './i18n';
import { fetchGlobalData } from './store';

export default definePterodactylExtension({
    setup({ config, slots, views, screens }) {
        const defaultLang = typeof config?.default_language === 'string' ? config.default_language : 'system';
        const localizeSidebar = Boolean(config?.localize_sidebar);
        initDefaultLanguage(defaultLang, localizeSidebar);

        // Fetch global categories and assignments from panel backend database
        void fetchGlobalData();

        // 1. Filter bar above the server list
        slots.register('dashboard.before', CategoryFilterBar);

        // 2. Category badge next to each server's name
        slots.register('dashboard.serverRow.name.after', CategoryBadge);

        // 3. Server list view override — groups into collapsible sections
        views.override('dashboard.serverList', {
            load: () => import('./FilteredServerList'),
        });

        // 5. Admin Screen: sidebar item under Admin panel for managing categories & rules
        screens.register('categories', () => import('./admin/AdminCategoriesScreen'));
    },
});
