import { useState, useEffect } from 'react';

/**
 * Central Translation / Localization File for Server Categories Extension.
 *
 * All user-facing texts, button labels, tooltips, hints, confirmations,
 * placeholders, and messages across the entire extension are defined here.
 *
 * Supported Languages:
 * - English (en)
 * - Türkçe (tr)
 * - Deutsch (de)
 * - Русский (ru)
 * - العربية (ar)
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
};

export type LanguageCode = keyof typeof translations;
export type TranslationsType = typeof translations.en;

export const SUPPORTED_LANGUAGES: { code: LanguageCode; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'tr', label: 'Türkçe', flag: '🇹🇷' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'ar', label: 'العربية', flag: '🇸🇦' },
];

let configuredLanguage: LanguageCode = 'en';
let localizeSidebarEnabled = false;

function isValidLanguage(code: unknown): code is LanguageCode {
    return typeof code === 'string' && code in translations;
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
 * Called on extension setup with settings from ctx.config
 * configured exclusively by the admin on the Extensions settings page.
 */
export function initDefaultLanguage(lang?: string | null, localizeSidebar?: boolean): void {
    // Clean up any legacy local storage override:
    try {
        localStorage.removeItem('ptero:sc:language');
    } catch {}

    if (isValidLanguage(lang)) {
        configuredLanguage = lang;
    }

    if (typeof localizeSidebar === 'boolean') {
        localizeSidebarEnabled = localizeSidebar;
    }

    applySidebarLanguageDataset(getLanguage(), localizeSidebarEnabled);
    notifyLanguageChanged();
}

/**
 * Returns current active language decided by the Extension settings.
 */
export function getLanguage(): LanguageCode {
    if (isValidLanguage(configuredLanguage)) {
        return configuredLanguage;
    }

    if (typeof navigator !== 'undefined' && navigator.language) {
        const browser = navigator.language.toLowerCase();
        if (browser.startsWith('tr')) return 'tr';
        if (browser.startsWith('de')) return 'de';
        if (browser.startsWith('ru')) return 'ru';
        if (browser.startsWith('ar')) return 'ar';
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
        return () => window.removeEventListener('ptero:sc:language-changed', handler);
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

