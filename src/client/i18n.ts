import { useState, useEffect } from 'react';
import { queryClient } from '@pterodactyl/sdk';

/**
 * Central Translation / Localization File for Server Categories Extension.
 *
 * All user-facing texts, button labels, tooltips, hints, confirmations,
 * placeholders, and messages across the entire extension are defined here.
 *
 * Supported Languages (11):
 * - English (en)
 * - Türkçe (tr)
 * - Deutsch (de)
 * - Русский (ru)
 * - العربية (ar)
 * - Español (es)
 * - Français (fr)
 * - Italiano (it)
 * - Português (Brasil) (pt-BR)
 * - Nederlands (nl)
 * - Polski (pl)
 */

export const translations = {
    en: {
        common: {
            cancel: 'Cancel',
            save: 'Save',
            add: 'Add',
            assign: 'Assign',
            delete: 'Delete',
            edit: 'Edit',
            all: 'All',
            other: 'Other',
            uncategorized: '📁 Other / Uncategorized',
            servers: 'Servers',
            online: 'online',
            expand: 'Expand',
            collapse: 'Collapse',
            preview: 'Preview:',
        },
        dashboard: {
            serversHeading: 'Servers',
            showingOthers: "Showing others' servers",
            showingMine: 'Showing your servers',
            viewModeGrouped: 'Grouped',
            viewModeGroupedTitle: 'Grouped Categories View (Collapsible sections)',
            viewModeList: 'List',
            viewModeListTitle: 'Unified List View (Flat list with category badges)',
            serverCount: (count: number) => `${count} ${count === 1 ? 'server' : 'servers'}`,
            onlineCount: (online: number) => `${online} online`,
            hiddenServers: (count: number) =>
                `${count} ${count === 1 ? 'server' : 'servers'} hidden (click to expand)`,
        },
        admin: {
            title: 'Server Categories Management',
            subtitle:
                'Group dashboard servers into categories and set up automatic rules for eggs, docker images, and names.',
            newCategory: 'New Category',
            navLabel: 'Categories',
            loadPresets: 'Load Presets',
            loadPresetsTitle: 'Load recommended categories and automatic rules',
            exportJson: 'Export JSON',
            exportJsonTitle: 'Export categories and rules as JSON file',
            importJson: 'Import JSON',
            importJsonTitle: 'Import categories from JSON file',
            clearAll: 'Clear All',
            clearAllConfirm: 'Clear all categories and reset to the default unconfigured panel state?',
            loadPresetsConfirm: 'Load sample category templates (Game Servers, Bots, Web, etc.)?',
            deleteCategoryConfirm: (name: string) => `Are you sure you want to delete "${name}"?`,
            emptyStateTitle: 'No Categories Configured',
            emptyStateDescription:
                'When there are no categories configured, the dashboard displays the default Pterodactyl server list without any modifications. You can create your own categories or load sample presets to get started.',
            createFirstCategory: '+ Create First Category',
            moveUp: 'Move Up',
            moveDown: 'Move Down',
            rulesSectionTitle: 'Automatic Matching Rules (Eggs & Filters)',
            addRule: '＋ Add Rule',
            noRules:
                'No automatic rules defined. Servers can only be assigned to this category manually.',
            removeRule: 'Remove rule',
            languageLabel: 'Language',
            rules: {
                egg_tag: {
                    label: 'Egg Tag',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Matches when server egg tags contain this keyword (e.g. 'minecraft').",
                },
                egg_feature: {
                    label: 'Egg Feature',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Matches when server egg features include this feature.',
                },
                docker_image: {
                    label: 'Docker Image',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Matches when server docker image contains this string.',
                },
                name_contains: {
                    label: 'Server Name Contains',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Matches when server name contains this keyword (case-insensitive).',
                },
                server_uuid: {
                    label: 'Specific Server UUID / ID',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Exclusively assigns this specific server to this category.',
                },
            },
            manualOverrideTitle: '📌 Manual Server Override',
            manualOverrideDesc:
                'Enter any server UUID to override automatic matching rules and link it directly to a category.',
            manualUuidPlaceholder: 'Server UUID (e.g. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Select Category --',
            activeOverrides: 'Active Manual Overrides:',
            removeOverride: 'Remove override',
            modal: {
                createTitle: '➕ Create New Category',
                editTitle: '✏️ Edit Category',
                nameLabel: 'Category Name',
                namePlaceholder: 'e.g. Minecraft Servers',
                iconLabel: 'Emoji / Icon',
                colorLabel: 'Color Palette',
                sampleCategory: 'Sample Category',
            },
            importSuccess: (count: number) => `Categories imported successfully! (${count} categories)`,
            importInvalidFormat: 'Invalid JSON file format.',
        },
        presets: {
            game: '🎮 Game Servers',
            bot: '🤖 Discord & Bots',
            web: '🌐 Web & APIs',
            dev: '⚡ Development & Test',
            other: '📁 Other',
        },
    },

    tr: {
        common: {
            cancel: 'İptal',
            save: 'Kaydet',
            add: 'Ekle',
            assign: 'Ata',
            delete: 'Sil',
            edit: 'Düzenle',
            all: 'Tümü',
            other: 'Diğer',
            uncategorized: '📁 Diğer / Kategorisiz',
            servers: 'Sunucu',
            online: 'çevrimiçi',
            expand: 'Genişlet',
            collapse: 'Daralt',
            preview: 'Önizleme:',
        },
        dashboard: {
            serversHeading: 'Sunucular',
            showingOthers: 'Diğer sunucuları göster',
            showingMine: 'Kendi sunucularınızı göster',
            viewModeGrouped: 'Gruplu',
            viewModeGroupedTitle: 'Gruplu Kategori Görünümü (Açılır/kapanır bölümler)',
            viewModeList: 'Liste',
            viewModeListTitle: 'Birleşik Liste Görünümü (Kategori etiketli düz liste)',
            serverCount: (count: number) => `${count} sunucu`,
            onlineCount: (online: number) => `${online} çevrimiçi`,
            hiddenServers: (count: number) =>
                `${count} sunucu gizli (genişletmek için tıklayın)`,
        },
        admin: {
            title: 'Sunucu Kategorileri Yönetimi',
            subtitle:
                'Panel sunucularını kategorilere ayırın; egg, docker imajı ve sunucu adı filtreleriyle otomatik eşleştirme kuralları belirleyin.',
            newCategory: 'Yeni Kategori',
            navLabel: 'Kategoriler',
            loadPresets: 'Şablonları Yükle',
            loadPresetsTitle: 'Önerilen hazır kategorileri ve otomatik kuralları yükleyin',
            exportJson: 'JSON Dışa Aktar',
            exportJsonTitle: 'Kategorileri ve kuralları JSON dosyası olarak kaydedin',
            importJson: 'JSON İçe Aktar',
            importJsonTitle: 'JSON dosyasından kategorileri yükleyin',
            clearAll: 'Tümünü Temizle',
            clearAllConfirm: 'Tüm kategoriler silinsin ve varsayılan yapılandırılmamış panel görünümüne dönülsün mü?',
            loadPresetsConfirm: 'Örnek kategori şablonları yüklensin mi (Oyun Sunucuları, Botlar, Web vb.)?',
            deleteCategoryConfirm: (name: string) => `"${name}" kategorisini silmek istediğinize emin misiniz?`,
            emptyStateTitle: 'Henüz Kategori Tanımlanmadı',
            emptyStateDescription:
                'Hiç kategori yapılandırılmadığında, sunucu listesi Pterodactyl varsayılan görünümünde gösterilir. Başlamak için yeni bir kategori oluşturabilir veya hazır şablonları yükleyebilirsiniz.',
            createFirstCategory: '+ İlk Kategoriyi Oluştur',
            moveUp: 'Yukarı Taşı',
            moveDown: 'Aşağı Taşı',
            rulesSectionTitle: 'Otomatik Eşleştirme Kuralları (Egg & Filtreler)',
            addRule: '＋ Kural Ekle',
            noRules:
                'Tanımlı otomatik kural yok. Sunucular bu kategoriye yalnızca manuel olarak atanabilir.',
            removeRule: 'Kuralı kaldır',
            languageLabel: 'Dil',
            rules: {
                egg_tag: {
                    label: 'Egg Etiketi (Egg Tag)',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Sunucu egg etiketleri bu kelimeyi içerdiğinde eşleşir (örn: 'minecraft').",
                },
                egg_feature: {
                    label: 'Egg Özelliği (Feature)',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Sunucu egg özellikleri bu değeri içerdiğinde eşleşir.',
                },
                docker_image: {
                    label: 'Docker İmajı',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Sunucu docker imaj adı bu metni içerdiğinde eşleşir.',
                },
                name_contains: {
                    label: 'Sunucu Adı İçerir',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Sunucu adı bu kelimeyi içerdiğinde eşleşir (büyük/küçük harf duyarsız).',
                },
                server_uuid: {
                    label: 'Belirli Sunucu UUID / ID',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Sadece bu belirli sunucuyu bu kategoriye atar.',
                },
            },
            manualOverrideTitle: '📌 Manuel Sunucu Ataması',
            manualOverrideDesc:
                'Otomatik kuralları geçersiz kılmak ve bir sunucuyu doğrudan bir kategoriye bağlamak için UUID girin.',
            manualUuidPlaceholder: 'Sunucu UUID (örn: b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Kategori Seçin --',
            activeOverrides: 'Aktif Manuel Atamalar:',
            removeOverride: 'Atamayı kaldır',
            modal: {
                createTitle: '➕ Yeni Kategori Oluştur',
                editTitle: '✏️ Kategoriyi Düzenle',
                nameLabel: 'Kategori Adı',
                namePlaceholder: 'örn: Minecraft Sunucuları',
                iconLabel: 'Emoji / İkon',
                colorLabel: 'Renk Teması',
                sampleCategory: 'Örnek Kategori',
            },
            importSuccess: (count: number) => `Kategoriler başarıyla içe aktarıldı! (${count} kategori)`,
            importInvalidFormat: 'Geçersiz JSON dosya biçimi.',
        },
        presets: {
            game: '🎮 Oyun Sunucuları',
            bot: '🤖 Discord & Botlar',
            web: '🌐 Web & API Sunucuları',
            dev: '⚡ Geliştirme & Test',
            other: '📁 Diğer',
        },
    },

    de: {
        common: {
            cancel: 'Abbrechen',
            save: 'Speichern',
            add: 'Hinzufügen',
            assign: 'Zuweisen',
            delete: 'Löschen',
            edit: 'Bearbeiten',
            all: 'Alle',
            other: 'Andere',
            uncategorized: '📁 Andere / Nicht kategorisiert',
            servers: 'Server',
            online: 'online',
            expand: 'Erweitern',
            collapse: 'Einklappen',
            preview: 'Vorschau:',
        },
        dashboard: {
            serversHeading: 'Server',
            showingOthers: 'Server anderer anzeigen',
            showingMine: 'Eigene Server anzeigen',
            viewModeGrouped: 'Gruppiert',
            viewModeGroupedTitle: 'Gruppierte Kategorie-Ansicht (Einklappbare Bereiche)',
            viewModeList: 'Liste',
            viewModeListTitle: 'Einheitliche Listenansicht (Flache Liste mit Kategorie-Badges)',
            serverCount: (count: number) => `${count} ${count === 1 ? 'Server' : 'Server'}`,
            onlineCount: (online: number) => `${online} online`,
            hiddenServers: (count: number) =>
                `${count} ${count === 1 ? 'Server ausgeblendet' : 'Server ausgeblendet'} (klicken zum Erweitern)`,
        },
        admin: {
            title: 'Server-Kategorien-Verwaltung',
            subtitle:
                'Gruppieren Sie Dashboard-Server in Kategorien und richten Sie automatische Regeln für Eggs, Docker-Images und Namen ein.',
            newCategory: 'Neue Kategorie',
            navLabel: 'Kategorien',
            loadPresets: 'Vorlagen laden',
            loadPresetsTitle: 'Empfohlene Kategorien und automatische Regeln laden',
            exportJson: 'JSON exportieren',
            exportJsonTitle: 'Kategorien und Regeln als JSON-Datei exportieren',
            importJson: 'JSON importieren',
            importJsonTitle: 'Kategorien aus JSON-Datei importieren',
            clearAll: 'Alle löschen',
            clearAllConfirm: 'Möchten Sie wirklich alle Kategorien löschen und den Standardzustand des Panels wiederherstellen?',
            loadPresetsConfirm: 'Beispiel-Kategorievorlagen (Spieleserver, Bots, Web usw.) laden?',
            deleteCategoryConfirm: (name: string) => `Sind Sie sicher, dass Sie "${name}" löschen möchten?`,
            emptyStateTitle: 'Keine Kategorien konfiguriert',
            emptyStateDescription:
                'Wenn keine Kategorien konfiguriert sind, zeigt das Dashboard die Standard-Serverliste von Pterodactyl ohne Änderungen an. Sie können eigene Kategorien erstellen oder Vorlagen laden.',
            createFirstCategory: '+ Erste Kategorie erstellen',
            moveUp: 'Nach oben',
            moveDown: 'Nach unten',
            rulesSectionTitle: 'Automatische Zuordnungsregeln (Eggs & Filter)',
            addRule: '＋ Regel hinzufügen',
            noRules:
                'Keine automatischen Regeln definiert. Server können dieser Kategorie nur manuell zugewiesen werden.',
            removeRule: 'Regel entfernen',
            languageLabel: 'Sprache',
            rules: {
                egg_tag: {
                    label: 'Egg-Tag',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Trifft zu, wenn die Egg-Tags des Servers dieses Schlüsselwort enthalten (z. B. 'minecraft').",
                },
                egg_feature: {
                    label: 'Egg-Feature',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Trifft zu, wenn die Egg-Features des Servers diese Funktion enthalten.',
                },
                docker_image: {
                    label: 'Docker-Image',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Trifft zu, wenn der Name des Docker-Images diese Zeichenfolge enthält.',
                },
                name_contains: {
                    label: 'Servername enthält',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Trifft zu, wenn der Servername dieses Wort enthält (Groß-/Kleinschreibung unempfindlich).',
                },
                server_uuid: {
                    label: 'Spezifische Server-UUID / ID',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Weist ausschließlich diesen spezifischen Server dieser Kategorie zu.',
                },
            },
            manualOverrideTitle: '📌 Manuelle Server-Zuweisung',
            manualOverrideDesc:
                'Geben Sie eine Server-UUID ein, um automatische Regeln zu überschreiben und den Server direkt einer Kategorie zuzuweisen.',
            manualUuidPlaceholder: 'Server-UUID (z. B. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Kategorie wählen --',
            activeOverrides: 'Aktive manuelle Zuweisungen:',
            removeOverride: 'Zuweisung entfernen',
            modal: {
                createTitle: '➕ Neue Kategorie erstellen',
                editTitle: '✏️ Kategorie bearbeiten',
                nameLabel: 'Kategoriename',
                namePlaceholder: 'z. B. Minecraft-Server',
                iconLabel: 'Emoji / Icon',
                colorLabel: 'Farbpalette',
                sampleCategory: 'Beispiel-Kategorie',
            },
            importSuccess: (count: number) => `Kategorien erfolgreich importiert! (${count} Kategorien)`,
            importInvalidFormat: 'Ungültiges JSON-Dateiformat.',
        },
        presets: {
            game: '🎮 Spieleserver',
            bot: '🤖 Discord & Bots',
            web: '🌐 Web & APIs',
            dev: '⚡ Entwicklung & Test',
            other: '📁 Andere',
        },
    },

    ru: {
        common: {
            cancel: 'Отмена',
            save: 'Сохранить',
            add: 'Добавить',
            assign: 'Назначить',
            delete: 'Удалить',
            edit: 'Редактировать',
            all: 'Все',
            other: 'Другие',
            uncategorized: '📁 Другие / Без категории',
            servers: 'Серверы',
            online: 'онлайн',
            expand: 'Развернуть',
            collapse: 'Свернуть',
            preview: 'Предпросмотр:',
        },
        dashboard: {
            serversHeading: 'Серверы',
            showingOthers: 'Показать чужие серверы',
            showingMine: 'Показать свои серверы',
            viewModeGrouped: 'Группы',
            viewModeGroupedTitle: 'Группировка по категориям (Сворачиваемые секции)',
            viewModeList: 'Список',
            viewModeListTitle: 'Единый список (Плоский список с бейджами категорий)',
            serverCount: (count: number) => `${count} ${count === 1 ? 'сервер' : count >= 2 && count <= 4 ? 'сервера' : 'серверов'}`,
            onlineCount: (online: number) => `${online} онлайн`,
            hiddenServers: (count: number) =>
                `${count} скрыто (нажмите для раскрытия)`,
        },
        admin: {
            title: 'Управление категориями серверов',
            subtitle:
                'Группируйте серверы панели по категориям и настраивайте автоматические правила по egg, docker-образам и именам.',
            newCategory: 'Новая категория',
            navLabel: 'Категории',
            loadPresets: 'Загрузить шаблоны',
            loadPresetsTitle: 'Загрузить рекомендуемые категории и авто-правила',
            exportJson: 'Экспорт JSON',
            exportJsonTitle: 'Экспортировать категории и правила в JSON-файл',
            importJson: 'Импорт JSON',
            importJsonTitle: 'Импортировать категории из JSON-файла',
            clearAll: 'Очистить всё',
            clearAllConfirm: 'Удалить все категории и сбросить панель к исходному виду без настроек?',
            loadPresetsConfirm: 'Загрузить готовые шаблоны категорий (Игровые серверы, Боты, Веб и др.)?',
            deleteCategoryConfirm: (name: string) => `Вы уверены, что хотите удалить "${name}"?`,
            emptyStateTitle: 'Категории пока не настроены',
            emptyStateDescription:
                'Когда категории отсутствуют, панель отображает стандартный список серверов Pterodactyl. Вы можете создать свои категории или загрузить готовые шаблоны.',
            createFirstCategory: '+ Создать первую категорию',
            moveUp: 'Вверх',
            moveDown: 'Вниз',
            rulesSectionTitle: 'Правила авто-сопоставления (Egg и фильтры)',
            addRule: '＋ Добавить правило',
            noRules:
                'Нет автоматических правил. Серверы в эту категорию можно добавлять только вручную.',
            removeRule: 'Удалить правило',
            languageLabel: 'Язык',
            rules: {
                egg_tag: {
                    label: 'Тег Egg',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Срабатывает, если теги egg сервера содержат это слово (напр. 'minecraft').",
                },
                egg_feature: {
                    label: 'Функция Egg (Feature)',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Срабатывает, если функции egg содержат это значение.',
                },
                docker_image: {
                    label: 'Docker-образ',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Срабатывает, если образ docker содержит эту строку.',
                },
                name_contains: {
                    label: 'Имя сервера содержит',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Срабатывает, если имя сервера содержит это слово (без учёта регистра).',
                },
                server_uuid: {
                    label: 'UUID / ID сервера',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Назначает только этот конкретный сервер в эту категорию.',
                },
            },
            manualOverrideTitle: '📌 Ручное переопределение сервера',
            manualOverrideDesc:
                'Введите UUID сервера, чтобы привязать его к категории в обход автоматических правил.',
            manualUuidPlaceholder: 'UUID сервера (напр. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Выберите категорию --',
            activeOverrides: 'Активные ручные привязки:',
            removeOverride: 'Удалить привязку',
            modal: {
                createTitle: '➕ Создать новую категорию',
                editTitle: '✏️ Редактировать категорию',
                nameLabel: 'Название категории',
                namePlaceholder: 'напр. Minecraft Серверы',
                iconLabel: 'Эмодзи / Иконка',
                colorLabel: 'Цветовая палитра',
                sampleCategory: 'Пример категории',
            },
            importSuccess: (count: number) => `Категории успешно импортированы! (${count} категорий)`,
            importInvalidFormat: 'Неверный формат JSON-файла.',
        },
        presets: {
            game: '🎮 Игровые серверы',
            bot: '🤖 Discord и Боты',
            web: '🌐 Веб и API',
            dev: '⚡ Разработка и Тест',
            other: '📁 Другие',
        },
    },

    ar: {
        common: {
            cancel: 'إلغاء',
            save: 'حفظ',
            add: 'إضافة',
            assign: 'تعيين',
            delete: 'حذف',
            edit: 'تعديل',
            all: 'الكل',
            other: 'أخرى',
            uncategorized: '📁 أخرى / غير مصنف',
            servers: 'خوادم',
            online: 'متصل',
            expand: 'توسيع',
            collapse: 'طي',
            preview: 'معاينة:',
        },
        dashboard: {
            serversHeading: 'الخوادم',
            showingOthers: 'عرض خوادم الآخرين',
            showingMine: 'عرض خوادمي',
            viewModeGrouped: 'مجمّع',
            viewModeGroupedTitle: 'عرض الفئات المجمّعة (أقسام قابلة للطي)',
            viewModeList: 'قائمة',
            viewModeListTitle: 'عرض القائمة الموحدة (قائمة مسطحة مع شارات الفئات)',
            serverCount: (count: number) => `${count} خادم`,
            onlineCount: (online: number) => `${online} متصل`,
            hiddenServers: (count: number) =>
                `${count} خادم مخفي (انقر للتوسيع)`,
        },
        admin: {
            title: 'إدارة فئات الخوادم',
            subtitle:
                'تنظيم خوادم لوحة التحكم في فئات وتحديد قواعد تلقائية لـ egg وصور docker وأسماء الخوادم.',
            newCategory: 'فئة جديدة',
            navLabel: 'الفئات',
            loadPresets: 'تحميل القوالب',
            loadPresetsTitle: 'تحميل الفئات الموصى بها والقواعد التلقائية',
            exportJson: 'تصدير JSON',
            exportJsonTitle: 'تصدير الفئات والقواعد كملف JSON',
            importJson: 'استيراد JSON',
            importJsonTitle: 'استيراد الفئات من ملف JSON',
            clearAll: 'مسح الكل',
            clearAllConfirm: 'هل تريد حذف جميع الفئات وإعادة تعيين اللوحة إلى حالتها الافتراضية؟',
            loadPresetsConfirm: 'هل تريد تحميل قوالب الفئات النموذجية (خوادم الألعاب، البوتات، الويب، إلخ)؟',
            deleteCategoryConfirm: (name: string) => `هل أنت متأكد من حذف "${name}"؟`,
            emptyStateTitle: 'لم يتم تكوين أي فئات بعد',
            emptyStateDescription:
                'عند عدم تكوين أي فئات، تعرض لوحة التحكم قائمة خوادم Pterodactyl الافتراضية. يمكنك إنشاء فئاتك الخاصة أو تحميل قوالب جاهزة.',
            createFirstCategory: '+ إنشاء الفئة الأولى',
            moveUp: 'تحريك لأعلى',
            moveDown: 'تحريك لأسفل',
            rulesSectionTitle: 'قواعد المطابقة التلقائية (Egg والفلاتر)',
            addRule: '＋ إضافة قاعدة',
            noRules:
                'لا توجد قواعد تلقائية محددة. لا يمكن تعيين الخوادم لهذه الفئة إلا يدويًا.',
            removeRule: 'إزالة القاعدة',
            languageLabel: 'اللغة',
            rules: {
                egg_tag: {
                    label: 'وسم Egg',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "يطابق عندما تحتوي وسوم egg للخادم على هذه الكلمة (مثل 'minecraft').",
                },
                egg_feature: {
                    label: 'ميزة Egg (Feature)',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'يطابق عندما تتضمن ميزات egg للخادم هذه القيمة.',
                },
                docker_image: {
                    label: 'صورة Docker',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'يطابق عندما يحتوي اسم صورة docker على هذا النص.',
                },
                name_contains: {
                    label: 'اسم الخادم يحتوي على',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'يطابق عندما يحتوي اسم الخادم على هذه الكلمة (غير حساس لحالة الأحرف).',
                },
                server_uuid: {
                    label: 'معرف الخادم UUID / ID',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'يعين هذا الخادم المحدد حصريًا لهذه الفئة.',
                },
            },
            manualOverrideTitle: '📌 التعيين اليدوي للخادم',
            manualOverrideDesc:
                'أدخل معرف الخادم UUID لتجاوز القواعد التلقائية وربطه مباشرة بفئة.',
            manualUuidPlaceholder: 'معرف الخادم (مثال: b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- اختر فئة --',
            activeOverrides: 'التعيينات اليدوية النشطة:',
            removeOverride: 'إزالة التعيين',
            modal: {
                createTitle: '➕ إنشاء فئة جديدة',
                editTitle: '✏️ تعديل الفئة',
                nameLabel: 'اسم الفئة',
                namePlaceholder: 'مثال: خوادم ماينكرافت',
                iconLabel: 'رمز تعبيري / أيقونة',
                colorLabel: 'لوحة الألوان',
                sampleCategory: 'فئة نموذجية',
            },
            importSuccess: (count: number) => `تم استيراد الفئات بنجاح! (${count} فئة)`,
            importInvalidFormat: 'صيغة ملف JSON غير صالحة.',
        },
        presets: {
            game: '🎮 خوادم الألعاب',
            bot: '🤖 ديسكورد وبوتات',
            web: '🌐 مواقع وواجهات برمجة',
            dev: '⚡ تطوير واختبار',
            other: '📁 أخرى',
        },
    },

    es: {
        common: {
            cancel: 'Cancelar',
            save: 'Guardar',
            add: 'Añadir',
            assign: 'Asignar',
            delete: 'Eliminar',
            edit: 'Editar',
            all: 'Todos',
            other: 'Otros',
            uncategorized: '📁 Otros / Sin categoría',
            servers: 'Servidores',
            online: 'en línea',
            expand: 'Expandir',
            collapse: 'Contraer',
            preview: 'Vista previa:',
        },
        dashboard: {
            serversHeading: 'Servidores',
            showingOthers: 'Mostrando servidores de otros',
            showingMine: 'Mostrando tus servidores',
            viewModeGrouped: 'Agrupado',
            viewModeGroupedTitle: 'Vista de categorías agrupadas (Secciones plegables)',
            viewModeList: 'Lista',
            viewModeListTitle: 'Vista de lista unificada (Lista plana con insignias)',
            serverCount: (count: number) => `${count} ${count === 1 ? 'servidor' : 'servidores'}`,
            onlineCount: (online: number) => `${online} en línea`,
            hiddenServers: (count: number) =>
                `${count} ${count === 1 ? 'servidor oculto' : 'servidores ocultos'} (clic para expandir)`,
        },
        admin: {
            title: 'Gestión de Categorías de Servidores',
            subtitle:
                'Agrupa los servidores del panel en categorías y configura reglas automáticas por eggs, imágenes docker y nombres.',
            newCategory: 'Nueva Categoría',
            navLabel: 'Categorías',
            loadPresets: 'Cargar Plantillas',
            loadPresetsTitle: 'Cargar categorías recomendadas y reglas automáticas',
            exportJson: 'Exportar JSON',
            exportJsonTitle: 'Exportar categorías y reglas como archivo JSON',
            importJson: 'Importar JSON',
            importJsonTitle: 'Importar categorías desde un archivo JSON',
            clearAll: 'Borrar Todo',
            clearAllConfirm: '¿Borrar todas las categorías y restablecer el estado predeterminado del panel?',
            loadPresetsConfirm: '¿Cargar plantillas de categorías de ejemplo (Juegos, Bots, Web, etc.)?',
            deleteCategoryConfirm: (name: string) => `¿Estás seguro de que deseas eliminar "${name}"?`,
            emptyStateTitle: 'No hay categorías configuradas',
            emptyStateDescription:
                'Cuando no hay categorías configuradas, el panel muestra la lista de servidores predeterminada de Pterodactyl. Puedes crear tus propias categorías o cargar plantillas para empezar.',
            createFirstCategory: '+ Crear Primera Categoría',
            moveUp: 'Subir',
            moveDown: 'Bajar',
            rulesSectionTitle: 'Reglas de Coincidencia Automática (Eggs y Filtros)',
            addRule: '＋ Añadir Regla',
            noRules:
                'No hay reglas automáticas definidas. Los servidores solo se pueden asignar manualmente.',
            removeRule: 'Eliminar regla',
            languageLabel: 'Idioma',
            rules: {
                egg_tag: {
                    label: 'Etiqueta Egg',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Coincide cuando las etiquetas egg del servidor contienen esta palabra (ej. 'minecraft').",
                },
                egg_feature: {
                    label: 'Característica Egg',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Coincide cuando las características egg incluyen este valor.',
                },
                docker_image: {
                    label: 'Imagen Docker',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Coincide cuando la imagen docker del servidor contiene este texto.',
                },
                name_contains: {
                    label: 'El nombre contiene',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Coincide cuando el nombre del servidor contiene esta palabra.',
                },
                server_uuid: {
                    label: 'UUID / ID de Servidor',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Asigna exclusivamente este servidor específico a esta categoría.',
                },
            },
            manualOverrideTitle: '📌 Asignación Manual de Servidor',
            manualOverrideDesc:
                'Introduce el UUID de un servidor para ignorar las reglas automáticas y vincularlo directamente a una categoría.',
            manualUuidPlaceholder: 'UUID del servidor (ej. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Seleccionar Categoría --',
            activeOverrides: 'Asignaciones manuales activas:',
            removeOverride: 'Eliminar asignación',
            modal: {
                createTitle: '➕ Crear Nueva Categoría',
                editTitle: '✏️ Editar Categoría',
                nameLabel: 'Nombre de la Categoría',
                namePlaceholder: 'ej. Servidores Minecraft',
                iconLabel: 'Emoji / Icono',
                colorLabel: 'Paleta de Colores',
                sampleCategory: 'Categoría de Ejemplo',
            },
            importSuccess: (count: number) => `¡Categorías importadas con éxito! (${count} categorías)`,
            importInvalidFormat: 'Formato de archivo JSON no válido.',
        },
        presets: {
            game: '🎮 Servidores de Juegos',
            bot: '🤖 Discord y Bots',
            web: '🌐 Web y APIs',
            dev: '⚡ Desarrollo y Pruebas',
            other: '📁 Otros',
        },
    },

    fr: {
        common: {
            cancel: 'Annuler',
            save: 'Enregistrer',
            add: 'Ajouter',
            assign: 'Assigner',
            delete: 'Supprimer',
            edit: 'Modifier',
            all: 'Tous',
            other: 'Autres',
            uncategorized: '📁 Autres / Non catégorisé',
            servers: 'Serveurs',
            online: 'en ligne',
            expand: 'Développer',
            collapse: 'Réduire',
            preview: 'Aperçu :',
        },
        dashboard: {
            serversHeading: 'Serveurs',
            showingOthers: 'Affichage des serveurs des autres',
            showingMine: 'Affichage de vos serveurs',
            viewModeGrouped: 'Groupé',
            viewModeGroupedTitle: 'Vue par catégories groupées (Sections pliables)',
            viewModeList: 'Liste',
            viewModeListTitle: 'Vue en liste unifiée (Liste plate avec badges)',
            serverCount: (count: number) => `${count} ${count <= 1 ? 'serveur' : 'serveurs'}`,
            onlineCount: (online: number) => `${online} en ligne`,
            hiddenServers: (count: number) =>
                `${count} ${count <= 1 ? 'serveur masqué' : 'serveurs masqués'} (cliquer pour développer)`,
        },
        admin: {
            title: 'Gestion des Catégories de Serveurs',
            subtitle:
                'Regroupez les serveurs du tableau de bord en catégories et définissez des règles automatiques par eggs, images docker et noms.',
            newCategory: 'Nouvelle Catégorie',
            navLabel: 'Catégories',
            loadPresets: 'Charger Modèles',
            loadPresetsTitle: 'Charger les catégories recommandées et les règles automatiques',
            exportJson: 'Exporter JSON',
            exportJsonTitle: 'Exporter les catégories et règles en fichier JSON',
            importJson: 'Importer JSON',
            importJsonTitle: 'Importer des catégories depuis un fichier JSON',
            clearAll: 'Tout Effacer',
            clearAllConfirm: 'Effacer toutes les catégories et réinitialiser le panneau à son état par défaut ?',
            loadPresetsConfirm: 'Charger les modèles de catégories (Serveurs de jeux, Bots, Web, etc.) ?',
            deleteCategoryConfirm: (name: string) => `Êtes-vous sûr de vouloir supprimer « ${name} » ?`,
            emptyStateTitle: 'Aucune catégorie configurée',
            emptyStateDescription:
                "Lorsqu'aucune catégorie n'est configurée, le tableau de bord affiche la liste par défaut de Pterodactyl. Créez vos propres catégories ou chargez des modèles pour commencer.",
            createFirstCategory: '+ Créer la Première Catégorie',
            moveUp: 'Monter',
            moveDown: 'Descendre',
            rulesSectionTitle: 'Règles de Correspondance Automatique (Eggs & Filtres)',
            addRule: '＋ Ajouter une Règle',
            noRules:
                'Aucune règle automatique définie. Les serveurs ne peuvent être assignés que manuellement.',
            removeRule: 'Supprimer la règle',
            languageLabel: 'Langue',
            rules: {
                egg_tag: {
                    label: 'Tag Egg',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Correspond lorsque les tags egg du serveur contiennent ce mot-clé (ex. 'minecraft').",
                },
                egg_feature: {
                    label: 'Fonctionnalité Egg',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Correspond lorsque les fonctionnalités egg incluent cette valeur.',
                },
                docker_image: {
                    label: 'Image Docker',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: "Correspond lorsque l'image docker contient cette chaîne.",
                },
                name_contains: {
                    label: 'Le nom du serveur contient',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Correspond lorsque le nom du serveur contient ce mot-clé.',
                },
                server_uuid: {
                    label: 'UUID / ID du Serveur',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Assigne exclusivement ce serveur spécifique à cette catégorie.',
                },
            },
            manualOverrideTitle: '📌 Attribution Manuelle de Serveur',
            manualOverrideDesc:
                "Entrez l'UUID d'un serveur pour contourner les règles automatiques et l'associer directement à une catégorie.",
            manualUuidPlaceholder: 'UUID du serveur (ex. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Sélectionner une Catégorie --',
            activeOverrides: 'Attributions manuelles actives :',
            removeOverride: "Supprimer l'attribution",
            modal: {
                createTitle: '➕ Créer une Nouvelle Catégorie',
                editTitle: '✏️ Modifier la Catégorie',
                nameLabel: 'Nom de la Catégorie',
                namePlaceholder: 'ex. Serveurs Minecraft',
                iconLabel: 'Emoji / Icône',
                colorLabel: 'Palette de Couleurs',
                sampleCategory: 'Catégorie Exemple',
            },
            importSuccess: (count: number) => `Catégories importées avec succès ! (${count} catégories)`,
            importInvalidFormat: 'Format de fichier JSON invalide.',
        },
        presets: {
            game: '🎮 Serveurs de Jeux',
            bot: '🤖 Discord & Bots',
            web: '🌐 Web & APIs',
            dev: '⚡ Développement & Test',
            other: '📁 Autres',
        },
    },

    it: {
        common: {
            cancel: 'Annulla',
            save: 'Salva',
            add: 'Aggiungi',
            assign: 'Assegna',
            delete: 'Elimina',
            edit: 'Modifica',
            all: 'Tutti',
            other: 'Altro',
            uncategorized: '📁 Altro / Non categorizzato',
            servers: 'Server',
            online: 'online',
            expand: 'Espandi',
            collapse: 'Comprimi',
            preview: 'Anteprima:',
        },
        dashboard: {
            serversHeading: 'Server',
            showingOthers: 'Mostra server di altri',
            showingMine: 'Mostra i tuoi server',
            viewModeGrouped: 'Raggruppato',
            viewModeGroupedTitle: 'Vista categorie raggruppate (Sezioni comprimibili)',
            viewModeList: 'Lista',
            viewModeListTitle: 'Vista lista unificata (Lista piatta con badge)',
            serverCount: (count: number) => `${count} server`,
            onlineCount: (online: number) => `${online} online`,
            hiddenServers: (count: number) =>
                `${count} server ${count === 1 ? 'nascosto' : 'nascosti'} (clicca per espandere)`,
        },
        admin: {
            title: 'Gestione Categorie Server',
            subtitle:
                'Raggruppa i server della dashboard in categorie e imposta regole automatiche per egg, immagini docker e nomi.',
            newCategory: 'Nuova Categoria',
            navLabel: 'Categorie',
            loadPresets: 'Carica Modelli',
            loadPresetsTitle: 'Carica categorie consigliate e regole automatiche',
            exportJson: 'Esporta JSON',
            exportJsonTitle: 'Esporta categorie e regole come file JSON',
            importJson: 'Importa JSON',
            importJsonTitle: 'Importa categorie da file JSON',
            clearAll: 'Cancella Tutto',
            clearAllConfirm: 'Cancellare tutte le categorie e ripristinare lo stato predefinito del pannello?',
            loadPresetsConfirm: 'Caricare i modelli di categoria di esempio (Server di gioco, Bot, Web, ecc.)?',
            deleteCategoryConfirm: (name: string) => `Sei sicuro di voler eliminare "${name}"?`,
            emptyStateTitle: 'Nessuna categoria configurata',
            emptyStateDescription:
                'Quando non ci sono categorie configurate, la dashboard mostra la lista server predefinita di Pterodactyl. Puoi creare le tue categorie o caricare i modelli.',
            createFirstCategory: '+ Crea Prima Categoria',
            moveUp: 'Sposta Su',
            moveDown: 'Sposta Giù',
            rulesSectionTitle: 'Regole di Abbinamento Automatico (Egg & Filtri)',
            addRule: '＋ Aggiungi Regola',
            noRules:
                'Nessuna regola automatica definita. I server possono essere assegnati solo manualmente.',
            removeRule: 'Rimuovi regola',
            languageLabel: 'Lingua',
            rules: {
                egg_tag: {
                    label: 'Tag Egg',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Corrisponde quando i tag egg del server contengono questa parola (es. 'minecraft').",
                },
                egg_feature: {
                    label: 'Funzionalità Egg',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Corrisponde quando le funzionalità egg includono questo valore.',
                },
                docker_image: {
                    label: 'Immagine Docker',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: "Corrisponde quando l'immagine docker contiene questa stringa.",
                },
                name_contains: {
                    label: 'Il nome contiene',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Corrisponde quando il nome del server contiene questa parola.',
                },
                server_uuid: {
                    label: 'UUID / ID Server Specifico',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Assegna esclusivamente questo server specifico a questa categoria.',
                },
            },
            manualOverrideTitle: '📌 Assegnazione Manuale Server',
            manualOverrideDesc:
                "Inserisci l'UUID di un server per ignorare le regole automatiche e collegarlo direttamente a una categoria.",
            manualUuidPlaceholder: 'UUID Server (es. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Seleziona Categoria --',
            activeOverrides: 'Assegnazioni manuali attive:',
            removeOverride: 'Rimuovi assegnazione',
            modal: {
                createTitle: '➕ Crea Nuova Categoria',
                editTitle: '✏️ Modifica Categoria',
                nameLabel: 'Nome Categoria',
                namePlaceholder: 'es. Server Minecraft',
                iconLabel: 'Emoji / Icona',
                colorLabel: 'Tavolozza Colori',
                sampleCategory: 'Categoria di Esempio',
            },
            importSuccess: (count: number) => `Categorie importate con successo! (${count} categorie)`,
            importInvalidFormat: 'Formato file JSON non valido.',
        },
        presets: {
            game: '🎮 Server di Gioco',
            bot: '🤖 Discord & Bot',
            web: '🌐 Web & API',
            dev: '⚡ Sviluppo & Test',
            other: '📁 Altro',
        },
    },

    'pt-BR': {
        common: {
            cancel: 'Cancelar',
            save: 'Salvar',
            add: 'Adicionar',
            assign: 'Atribuir',
            delete: 'Excluir',
            edit: 'Editar',
            all: 'Todos',
            other: 'Outros',
            uncategorized: '📁 Outros / Sem categoria',
            servers: 'Servidores',
            online: 'online',
            expand: 'Expandir',
            collapse: 'Recolher',
            preview: 'Prévia:',
        },
        dashboard: {
            serversHeading: 'Servidores',
            showingOthers: 'Mostrando servidores de outros',
            showingMine: 'Mostrando seus servidores',
            viewModeGrouped: 'Agrupado',
            viewModeGroupedTitle: 'Visão de categorias agrupadas (Seções recolhíveis)',
            viewModeList: 'Lista',
            viewModeListTitle: 'Visão de lista unificada (Lista simples com emblemas)',
            serverCount: (count: number) => `${count} ${count === 1 ? 'servidor' : 'servidores'}`,
            onlineCount: (online: number) => `${online} online`,
            hiddenServers: (count: number) =>
                `${count} ${count === 1 ? 'servidor oculto' : 'servidores ocultos'} (clique para expandir)`,
        },
        admin: {
            title: 'Gerenciamento de Categorias de Servidores',
            subtitle:
                'Agrupe os servidores do painel em categorias e defina regras automáticas para eggs, imagens docker e nomes.',
            newCategory: 'Nova Categoria',
            navLabel: 'Categorias',
            loadPresets: 'Carregar Modelos',
            loadPresetsTitle: 'Carregar categorias recomendadas e regras automáticas',
            exportJson: 'Exportar JSON',
            exportJsonTitle: 'Exportar categorias e regras como arquivo JSON',
            importJson: 'Importar JSON',
            importJsonTitle: 'Importar categorias de um arquivo JSON',
            clearAll: 'Limpar Tudo',
            clearAllConfirm: 'Limpar todas as categorias e restaurar o estado padrão do painel?',
            loadPresetsConfirm: 'Carregar modelos de categorias de exemplo (Servidores de Jogos, Bots, Web, etc.)?',
            deleteCategoryConfirm: (name: string) => `Tem certeza de que deseja excluir "${name}"?`,
            emptyStateTitle: 'Nenhuma Categoria Configurada',
            emptyStateDescription:
                'Quando não há categorias configuradas, o painel exibe a lista padrão de servidores do Pterodactyl. Você pode criar suas próprias categorias ou carregar modelos prontos.',
            createFirstCategory: '+ Criar Primeira Categoria',
            moveUp: 'Mover para Cima',
            moveDown: 'Mover para Baixo',
            rulesSectionTitle: 'Regras de Correspondência Automática (Eggs e Filtros)',
            addRule: '＋ Adicionar Regra',
            noRules:
                'Nenhuma regra automática definida. Os servidores só podem ser atribuídos manualmente.',
            removeRule: 'Remover regra',
            languageLabel: 'Idioma',
            rules: {
                egg_tag: {
                    label: 'Tag da Egg',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Corresponde quando as tags da egg contêm esta palavra-chave (ex: 'minecraft').",
                },
                egg_feature: {
                    label: 'Recurso da Egg',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Corresponde quando os recursos da egg incluem este valor.',
                },
                docker_image: {
                    label: 'Imagem Docker',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Corresponde quando a imagem docker contém este texto.',
                },
                name_contains: {
                    label: 'Nome do Servidor Contém',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Corresponde quando o nome do servidor contém esta palavra-chave.',
                },
                server_uuid: {
                    label: 'UUID / ID do Servidor',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Atribui exclusivamente este servidor específico a esta categoria.',
                },
            },
            manualOverrideTitle: '📌 Atribuição Manual de Servidor',
            manualOverrideDesc:
                'Insira o UUID de qualquer servidor para substituir as regras automáticas e vinculá-lo diretamente a uma categoria.',
            manualUuidPlaceholder: 'UUID do Servidor (ex: b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Selecionar Categoria --',
            activeOverrides: 'Atribuições Manuais Ativas:',
            removeOverride: 'Remover atribuição',
            modal: {
                createTitle: '➕ Criar Nova Categoria',
                editTitle: '✏️ Editar Categoria',
                nameLabel: 'Nome da Categoria',
                namePlaceholder: 'ex: Servidores Minecraft',
                iconLabel: 'Emoji / Ícone',
                colorLabel: 'Paleta de Cores',
                sampleCategory: 'Categoria de Exemplo',
            },
            importSuccess: (count: number) => `Categorias importadas com sucesso! (${count} categorias)`,
            importInvalidFormat: 'Formato de arquivo JSON inválido.',
        },
        presets: {
            game: '🎮 Servidores de Jogos',
            bot: '🤖 Discord & Bots',
            web: '🌐 Web & APIs',
            dev: '⚡ Desenvolvimento & Teste',
            other: '📁 Outros',
        },
    },

    nl: {
        common: {
            cancel: 'Annuleren',
            save: 'Opslaan',
            add: 'Toevoegen',
            assign: 'Toewijzen',
            delete: 'Verwijderen',
            edit: 'Bewerken',
            all: 'Alle',
            other: 'Overige',
            uncategorized: '📁 Overige / Niet gecategoriseerd',
            servers: 'Servers',
            online: 'online',
            expand: 'Uitklappen',
            collapse: 'Inklappen',
            preview: 'Voorbeeld:',
        },
        dashboard: {
            serversHeading: 'Servers',
            showingOthers: 'Servers van anderen tonen',
            showingMine: 'Jouw servers tonen',
            viewModeGrouped: 'Gegroepeerd',
            viewModeGroupedTitle: 'Gegroepeerde categorieweergave (Inklapbare secties)',
            viewModeList: 'Lijst',
            viewModeListTitle: 'Gecombineerde lijstweergave (Platte lijst met badges)',
            serverCount: (count: number) => `${count} ${count === 1 ? 'server' : 'servers'}`,
            onlineCount: (online: number) => `${online} online`,
            hiddenServers: (count: number) =>
                `${count} ${count === 1 ? 'server' : 'servers'} verborgen (klik om uit te klappen)`,
        },
        admin: {
            title: 'Servercategorieën Beheer',
            subtitle:
                'Groepeer dashboardservers in categorieën en stel automatische regels in voor eggs, docker-images en namen.',
            newCategory: 'Nieuwe Categorie',
            navLabel: 'Categorieën',
            loadPresets: 'Sjablonen Laden',
            loadPresetsTitle: 'Aanbevolen categorieën en automatische regels laden',
            exportJson: 'JSON Exporteren',
            exportJsonTitle: 'Categorieën en regels exporteren als JSON-bestand',
            importJson: 'JSON Importeren',
            importJsonTitle: 'Categorieën importeren uit JSON-bestand',
            clearAll: 'Alles Wissen',
            clearAllConfirm: 'Alle categorieën wissen en terugzetten naar de standaard paneelstatus?',
            loadPresetsConfirm: 'Voorbeeldsjablonen laden (Gameservers, Bots, Web, enz.)?',
            deleteCategoryConfirm: (name: string) => `Weet je zeker dat je "${name}" wilt verwijderen?`,
            emptyStateTitle: 'Geen Categorieën Geconfigureerd',
            emptyStateDescription:
                'Wanneer er geen categorieën zijn ingesteld, toont het dashboard de standaard Pterodactyl-serverlijst. Maak je eigen categorieën of laad sjablonen om te beginnen.',
            createFirstCategory: '+ Eerste Categorie Maken',
            moveUp: 'Omhoog',
            moveDown: 'Omlaag',
            rulesSectionTitle: 'Automatische Koppelregels (Eggs & Filters)',
            addRule: '＋ Regel Toevoegen',
            noRules:
                'Geen automatische regels ingesteld. Servers kunnen alleen handmatig worden toegewezen.',
            removeRule: 'Regel verwijderen',
            languageLabel: 'Taal',
            rules: {
                egg_tag: {
                    label: 'Egg-tag',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Komt overeen wanneer server egg-tags dit trefwoord bevatten (bijv. 'minecraft').",
                },
                egg_feature: {
                    label: 'Egg-functie',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Komt overeen wanneer egg-functies deze waarde bevatten.',
                },
                docker_image: {
                    label: 'Docker-image',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Komt overeen wanneer de docker-image deze tekst bevat.',
                },
                name_contains: {
                    label: 'Servernaam Bevat',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Komt overeen wanneer de servernaam dit trefwoord bevat.',
                },
                server_uuid: {
                    label: 'Specifieke Server UUID / ID',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Wijst uitsluitend deze specifieke server toe aan deze categorie.',
                },
            },
            manualOverrideTitle: '📌 Handmatige Servertoewijzing',
            manualOverrideDesc:
                'Voer een server-UUID in om automatische regels te negeren en direct aan een categorie te koppelen.',
            manualUuidPlaceholder: 'Server UUID (bijv. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Selecteer Categorie --',
            activeOverrides: 'Actieve handmatige toewijzingen:',
            removeOverride: 'Toewijzing verwijderen',
            modal: {
                createTitle: '➕ Nieuwe Categorie Maken',
                editTitle: '✏️ Categorie Bewerken',
                nameLabel: 'Categorienaam',
                namePlaceholder: 'bijv. Minecraft Servers',
                iconLabel: 'Emoji / Icoon',
                colorLabel: 'Kleurenpalet',
                sampleCategory: 'Voorbeeldcategorie',
            },
            importSuccess: (count: number) => `Categorieën succesvol geïmporteerd! (${count} categorieën)`,
            importInvalidFormat: 'Ongeldig JSON-bestandsformaat.',
        },
        presets: {
            game: '🎮 Gameservers',
            bot: '🤖 Discord & Bots',
            web: '🌐 Web & APIs',
            dev: '⚡ Ontwikkeling & Test',
            other: '📁 Overige',
        },
    },

    pl: {
        common: {
            cancel: 'Anuluj',
            save: 'Zapisz',
            add: 'Dodaj',
            assign: 'Przypisz',
            delete: 'Usuń',
            edit: 'Edytuj',
            all: 'Wszystkie',
            other: 'Inne',
            uncategorized: '📁 Inne / Bez kategorii',
            servers: 'Serwery',
            online: 'online',
            expand: 'Rozwiń',
            collapse: 'Zwiń',
            preview: 'Podgląd:',
        },
        dashboard: {
            serversHeading: 'Serwery',
            showingOthers: 'Pokazywanie serwerów innych',
            showingMine: 'Pokazywanie twoich serwerów',
            viewModeGrouped: 'Pogrupowane',
            viewModeGroupedTitle: 'Widok pogrupowanych kategorii (Zwijane sekcje)',
            viewModeList: 'Lista',
            viewModeListTitle: 'Jednolity widok listy (Płaska lista z odznakami)',
            serverCount: (count: number) =>
                `${count} ${count === 1 ? 'serwer' : count >= 2 && count <= 4 ? 'serwery' : 'serwerów'}`,
            onlineCount: (online: number) => `${online} online`,
            hiddenServers: (count: number) =>
                `${count} ukrytych (kliknij, aby rozwinąć)`,
        },
        admin: {
            title: 'Zarządzanie Kategoriami Serwerów',
            subtitle:
                'Grupuj serwery na pulpicie w kategorie i twórz automatyczne reguły dla eggów, obrazów docker oraz nazw.',
            newCategory: 'Nowa Kategoria',
            navLabel: 'Kategorie',
            loadPresets: 'Wczytaj Szablony',
            loadPresetsTitle: 'Wczytaj zalecane kategorie i automatyczne reguły',
            exportJson: 'Eksportuj JSON',
            exportJsonTitle: 'Eksportuj kategorie i reguły jako plik JSON',
            importJson: 'Importuj JSON',
            importJsonTitle: 'Importuj kategorie z pliku JSON',
            clearAll: 'Wyczyść Wszystko',
            clearAllConfirm: 'Wyczyścić wszystkie kategorie i przywrócić domyślny stan panelu?',
            loadPresetsConfirm: 'Wczytać przykładowe szablony kategorii (Serwery gier, Boty, Web itp.)?',
            deleteCategoryConfirm: (name: string) => `Czy na pewno chcesz usunąć „${name}”?`,
            emptyStateTitle: 'Brak Skonfigurowanych Kategorii',
            emptyStateDescription:
                'Gdy nie skonfigurowano żadnych kategorii, panel wyświetla domyślną listę serwerów Pterodactyl. Możesz utworzyć własne kategorie lub wczytać gotowe szablony.',
            createFirstCategory: '+ Utwórz Pierwszą Kategorię',
            moveUp: 'Przesuń w górę',
            moveDown: 'Przesuń w dół',
            rulesSectionTitle: 'Reguły Automatycznego Dopasowania (Eggi i Filtry)',
            addRule: '＋ Dodaj Regułę',
            noRules:
                'Brak zdefiniowanych reguł automatycznych. Serwery można przypisywać tylko ręcznie.',
            removeRule: 'Usuń regułę',
            languageLabel: 'Język',
            rules: {
                egg_tag: {
                    label: 'Tag Egg',
                    icon: '🥚',
                    placeholder: 'minecraft, paper, rust, discord...',
                    hint: "Pasuje, gdy tagi egg serwera zawierają to słowo kluczowe (np. 'minecraft').",
                },
                egg_feature: {
                    label: 'Funkcja Egg',
                    icon: '✨',
                    placeholder: 'eula, java_version, pid_limit...',
                    hint: 'Pasuje, gdy funkcje egg zawierają tę wartość.',
                },
                docker_image: {
                    label: 'Obraz Docker',
                    icon: '🐳',
                    placeholder: 'python, node, java, ghcr.io...',
                    hint: 'Pasuje, gdy obraz docker serwera zawiera ten ciąg znaków.',
                },
                name_contains: {
                    label: 'Nazwa Serwera Zawiera',
                    icon: '🏷️',
                    placeholder: 'bot, test, survival, api...',
                    hint: 'Pasuje, gdy nazwa serwera zawiera to słowo kluczowe.',
                },
                server_uuid: {
                    label: 'Konkretny UUID / ID Serwera',
                    icon: '🖥️',
                    placeholder: '1a2b3c4d, 5e6f-7g8h-...',
                    hint: 'Przypisuje wyłącznie ten konkretny serwer do tej kategorii.',
                },
            },
            manualOverrideTitle: '📌 Ręczne Przypisanie Serwera',
            manualOverrideDesc:
                'Wprowadź UUID serwera, aby nadpisać reguły automatyczne i przypisać go bezpośrednio do kategorii.',
            manualUuidPlaceholder: 'UUID serwera (np. b9f6a1d8-04f2-4912...)',
            selectCategoryPlaceholder: '-- Wybierz Kategorię --',
            activeOverrides: 'Aktywne przypisania ręczne:',
            removeOverride: 'Usuń przypisanie',
            modal: {
                createTitle: '➕ Utwórz Nową Kategorię',
                editTitle: '✏️ Edytuj Kategorię',
                nameLabel: 'Nazwa Kategorii',
                namePlaceholder: 'np. Serwery Minecraft',
                iconLabel: 'Emoji / Ikona',
                colorLabel: 'Paleta Kolorów',
                sampleCategory: 'Przykładowa Kategoria',
            },
            importSuccess: (count: number) => `Kategorie zaimportowane pomyślnie! (${count} kategorii)`,
            importInvalidFormat: 'Nieprawidłowy format pliku JSON.',
        },
        presets: {
            game: '🎮 Serwery Gier',
            bot: '🤖 Discord i Boty',
            web: '🌐 Web i API',
            dev: '⚡ Rozwój i Testy',
            other: '📁 Inne',
        },
    },
};

export type LanguageCode = keyof typeof translations;
export type TranslationsType = typeof translations.en;

export const SUPPORTED_LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'fr', label: 'Français', flag: '🇫🇷' },
    { code: 'it', label: 'Italiano', flag: '🇮🇹' },
    { code: 'pt-BR', label: 'Português (BR)', flag: '🇧🇷' },
    { code: 'nl', label: 'Nederlands', flag: '🇳🇱' },
    { code: 'pl', label: 'Polski', flag: '🇵🇱' },
];

let configuredLanguage: LanguageCode | 'system' = 'system';
let siteSettingsLocale: LanguageCode | null = null;
let localizeSidebarEnabled = false;
let globalListenersBound = false;

export function isValidLanguage(code: unknown): code is LanguageCode {
    return typeof code === 'string' && code in translations;
}

/**
 * Normalizes a raw locale string (e.g. "tr-TR", "pt_BR", "de-DE") into a supported LanguageCode if possible.
 */
function normalizeLocaleCode(raw: unknown): LanguageCode | null {
    if (typeof raw !== 'string' || !raw.trim()) return null;
    const trimmed = raw.trim().replace('_', '-');
    if (isValidLanguage(trimmed)) return trimmed;
    const lower = trimmed.toLowerCase();
    if (lower.startsWith('pt')) return 'pt-BR';
    const prefix = lower.split('-')[0];
    if (isValidLanguage(prefix)) return prefix;
    return null;
}

/**
 * Updates root HTML data attributes for pure CSS sidebar localization.
 * Zero DOM manipulation preserves React's Virtual DOM nodes completely,
 * preventing any Node.insertBefore or reconciliation crashes.
 */
export function applySidebarLanguageDataset(
    lang: LanguageCode = getLanguage(),
    enabled: boolean = localizeSidebarEnabled
): void {
    if (typeof document === 'undefined') return;
    document.documentElement.setAttribute('data-sc-lang', lang);
    document.documentElement.setAttribute('data-sc-localize', enabled ? 'true' : 'false');
}

/**
 * Binds listeners for:
 * 1. Global Multi-Language Extension bridge (`ptero:language-changed` & `window.PteroMultiLang`)
 * 2. Any third-party language extension changing `<html lang="...">` or `data-ptero-lang`
 * 3. Pterodactyl native `/admin/settings` live locale updates via React Query cache
 */
function bindGlobalLanguageSync(): void {
    if (globalListenersBound || typeof window === 'undefined') return;
    globalListenersBound = true;

    const handleGlobalChange = (e: Event) => {
        const detail = (e as CustomEvent)?.detail;
        const nextCode = normalizeLocaleCode(typeof detail === 'string' ? detail : detail?.code);
        if (nextCode) {
            siteSettingsLocale = nextCode;
        }
        applySidebarLanguageDataset(getLanguage(), localizeSidebarEnabled);
        notifyLanguageChanged();
    };

    window.addEventListener('ptero:language-changed', handleGlobalChange);
    window.addEventListener('languagechange', handleGlobalChange);

    // Watch <html lang="..."> and <html data-ptero-lang="..."> changes made by any language extension
    if (typeof document !== 'undefined' && typeof MutationObserver !== 'undefined') {
        let lastResolved = getLanguage();
        const htmlObserver = new MutationObserver(() => {
            const current = getLanguage();
            if (current !== lastResolved) {
                lastResolved = current;
                applySidebarLanguageDataset(current, localizeSidebarEnabled);
                notifyLanguageChanged();
            }
        });
        htmlObserver.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['lang', 'data-ptero-lang'],
        });
    }

    // Subscribe to Pterodactyl's native /admin/settings site-settings query cache
    try {
        const cache = queryClient.getQueryCache();
        cache.subscribe((event) => {
            if (event.type !== 'added' && event.type !== 'updated') return;
            const queryKey = event.query.queryKey;
            if (Array.isArray(queryKey) && queryKey[0] === 'bootstrap' && queryKey[1] === 'site-settings') {
                const siteData = event.query.state.data as { locale?: string } | undefined;
                const normalized = normalizeLocaleCode(siteData?.locale);
                if (normalized && normalized !== siteSettingsLocale) {
                    siteSettingsLocale = normalized;
                    applySidebarLanguageDataset(getLanguage(), localizeSidebarEnabled);
                    notifyLanguageChanged();
                }
            }
        });
    } catch {
        // Ignore if queryClient cache isn't ready
    }
}

/**
 * Called on extension setup with settings from ctx.config
 * configured by the admin on the Extensions settings page or /admin/settings.
 */
export function initDefaultLanguage(lang?: string | null, localizeSidebar?: boolean): void {
    try {
        localStorage.removeItem('ptero:sc:language');
    } catch {}

    if (lang === 'system' || !lang) {
        configuredLanguage = 'system';
    } else if (isValidLanguage(lang)) {
        configuredLanguage = lang;
    } else {
        configuredLanguage = 'system';
    }

    const siteLocale = normalizeLocaleCode(
        typeof window !== 'undefined' ? (window as any)?.SiteConfiguration?.locale : null
    );
    if (siteLocale) {
        siteSettingsLocale = siteLocale;
    }

    if (typeof localizeSidebar === 'boolean') {
        localizeSidebarEnabled = localizeSidebar;
    }

    bindGlobalLanguageSync();
    applySidebarLanguageDataset(getLanguage(), localizeSidebarEnabled);
    notifyLanguageChanged();
}

/**
 * Returns current active language:
 * 1. If admin forced a fixed language in Server Categories settings (not "system"), use it.
 * 2. When set to "system" (System Default):
 *    a. Global Multi-Language Extension (`window.PteroMultiLang` or `html[data-ptero-lang]`)
 *    b. Standard `<html lang="...">` or `window.i18next?.language` set by any other language extension
 *    c. Pterodactyl `/admin/settings` Default Language (`siteSettingsLocale`)
 *    d. Otherwise defaults strictly to English ('en')
 */
export function getLanguage(): LanguageCode {
    if (configuredLanguage !== 'system' && isValidLanguage(configuredLanguage)) {
        return configuredLanguage;
    }

    if (typeof window !== 'undefined') {
        const bridgeLang = normalizeLocaleCode((window as any).PteroMultiLang?.getLanguage?.());
        if (bridgeLang) {
            return bridgeLang;
        }

        const i18nextLang = normalizeLocaleCode((window as any).i18next?.language);
        if (i18nextLang && i18nextLang !== 'en') {
            return i18nextLang;
        }
    }

    if (typeof document !== 'undefined') {
        const attrLang = normalizeLocaleCode(document.documentElement.getAttribute('data-ptero-lang'));
        if (attrLang) {
            return attrLang;
        }

        const htmlLang = normalizeLocaleCode(document.documentElement.getAttribute('lang'));
        if (htmlLang && htmlLang !== 'en') {
            return htmlLang;
        }
    }

    if (siteSettingsLocale) {
        return siteSettingsLocale;
    }

    return 'en';
}

function notifyLanguageChanged(): void {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('ptero:sc:language-changed', { detail: getLanguage() }));
    }
}

/**
 * React hook for consuming active language strings.
 */
export function useLanguage() {
    const [lang, setLangState] = useState<LanguageCode>(getLanguage);

    useEffect(() => {
        const handler = () => {
            setLangState(getLanguage());
        };
        window.addEventListener('ptero:sc:language-changed', handler);
        window.addEventListener('ptero:language-changed', handler);
        return () => {
            window.removeEventListener('ptero:sc:language-changed', handler);
            window.removeEventListener('ptero:language-changed', handler);
        };
    }, []);

    return {
        lang,
        t: translations[lang] || translations.en,
    };
}

/**
 * Dynamic Proxy export for backwards compatibility.
 * Accessing `i18n.admin...` directly always resolves using the current active language.
 */
export const i18n: TranslationsType = new Proxy({} as TranslationsType, {
    get(_target, prop: keyof TranslationsType) {
        const current = translations[getLanguage()] || translations.en;
        return current[prop];
    },
});

/**
 * Enable or disable sidebar menu item localization.
 */
export function setLocalizeSidebarEnabled(enabled: boolean): void {
    localizeSidebarEnabled = enabled;
    applySidebarLanguageDataset(getLanguage(), enabled);
}

/**
 * Starts or updates sidebar localization.
 * Fully CSS-based: no MutationObserver and zero DOM node mutation.
 */
export function startNavLabelSync(enabled: boolean = false): void {
    localizeSidebarEnabled = enabled;
    applySidebarLanguageDataset(getLanguage(), enabled);
}
