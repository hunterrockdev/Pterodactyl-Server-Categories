<?php

declare(strict_types=1);

namespace Hunterrock\ServerCategories;

use Pterodactyl\Extensions\ExtensionProvider;
use Pterodactyl\Services\Extensions\ExtensionSettingDefinition;
use Pterodactyl\Services\Extensions\ExtensionSettingsDefinition;

class ServerCategoriesServiceProvider extends ExtensionProvider
{
    /**
     * Register extension services and typed settings.
     * The settings registered here are automatically rendered in the Extensions
     * settings modal (Admin -> Extensions -> Settings icon).
     * Marked ->frontend(), the values are delivered to the frontend client bundle via ctx.config.
     */
    public function register(): void
    {
        $this->registerSettings(new ExtensionSettingsDefinition($this->settings(), [
            ExtensionSettingDefinition::make('default_language', 'default_language', 'system')
                ->label('Default Language / Varsayılan Dil')
                ->help('Select "System Default" to automatically follow the active panel / Multi-Language extension language, or choose a fixed language for Server Categories.')
                ->field('select', [
                    ['value' => 'system', 'label' => '🌐 System Default'],
                    ['value' => 'en', 'label' => '🇺🇸 English'],
                    ['value' => 'tr', 'label' => '🇹🇷 Türkçe'],
                    ['value' => 'de', 'label' => '🇩🇪 Deutsch'],
                    ['value' => 'ru', 'label' => '🇷🇺 Русский'],
                    ['value' => 'ar', 'label' => '🇸🇦 العربية'],
                    ['value' => 'es', 'label' => '🇪🇸 Español'],
                    ['value' => 'fr', 'label' => '🇫🇷 Français'],
                    ['value' => 'it', 'label' => '🇮🇹 Italiano'],
                    ['value' => 'pt-BR', 'label' => '🇧🇷 Português (BR)'],
                    ['value' => 'nl', 'label' => '🇳🇱 Nederlands'],
                    ['value' => 'pl', 'label' => '🇵🇱 Polski'],
                ])
                ->frontend(),
            ExtensionSettingDefinition::make('localize_sidebar', 'localize_sidebar', false)
                ->label('Localize Sidebar Menu / Sol Menü Başlığını Çevir')
                ->help('Translate the left navigation menu "Categories" item to match the active language. When disabled, keeps the default "Categories".')
                ->field('toggle')
                ->frontend(),
        ]));

        $this->registerApiRoutes();
    }
}
