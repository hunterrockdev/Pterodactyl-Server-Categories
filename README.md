# 📂 Pterodactyl Server Categories Extension (`.pteroext`)

<div align="center">

[![Latest Release](https://img.shields.io/github/v/release/hunterrockdev/Pterodactyl-Server-Categories?style=for-the-badge&color=blue)](https://github.com/hunterrockdev/Pterodactyl-Server-Categories/releases)
[![Downloads](https://img.shields.io/github/downloads/hunterrockdev/Pterodactyl-Server-Categories/total?style=for-the-badge&color=purple)](https://github.com/hunterrockdev/Pterodactyl-Server-Categories/releases)
[![Pterodactyl](https://img.shields.io/badge/Pterodactyl-v2.0.0--beta-3b82f6?style=for-the-badge&logo=pterodactyl)](https://pterodactyl.io)
[![License](https://img.shields.io/github/license/hunterrockdev/Pterodactyl-Server-Categories?style=for-the-badge&color=green)](LICENSE)
[![Languages](https://img.shields.io/badge/Languages-EN%20%7C%20TR%20%7C%20DE%20%7C%20RU%20%7C%20AR-orange?style=for-the-badge)](#-multi-language-support-i18n)

**A sleek, modern server categorization & smart filtering extension built exclusively for Pterodactyl v2.**

Organize your dashboard servers into customizable, collapsible category sections with smart automatic egg matching, live server counters, and global database synchronization.

[✨ Features](#-key-features) • [📦 Installation](#-installation) • [⚙️ Configuration](#-admin-management--smart-rules) • [🌍 Languages](#-multi-language-support-i18n) • [🛠️ Building](#-building-from-source)

</div>

---

## 🌟 Key Features

### 📑 1. Collapsible Grouped & Unified List Views
- **Accordion Groups**: Servers are grouped into clean, collapsible accordion sections (`🎮 Game Servers`, `🤖 Discord & Bots`, `🌐 Web & APIs`, etc.).
- **Smooth Animations**: Animated expand/collapse toggles with individual server counts and online indicators.
- **View Switcher**: Switch between **Grouped** view and **Unified List** view on the fly.
- **Personal Local Preferences**: Category collapse states are preserved locally per user in `localStorage`.

### ⚡ 2. Smart Automatic Matching Rules
No need to assign servers one by one! Define intelligent matching criteria in the Admin panel:
- **🥚 Egg Tags**: Automatically categorizes servers whose egg tags contain keywords (e.g. `minecraft`, `paper`, `rust`, `palworld`).
- **✨ Egg Features**: Matches servers based on egg feature flags (e.g. `eula`, `java_version`).
- **🐳 Docker Images**: Matches servers by container image name (e.g. `python`, `node`, `java`, `ghcr.io`).
- **🏷️ Server Name Contains**: Matches based on server name keywords (case-insensitive).
- **🖥️ Specific UUID**: Directly force an individual server into a category, overriding automatic rules.

### 🌐 3. Global Database Persistence
- All categories, custom colors, icons, auto-matching rules, and manual UUID overrides are saved in the Pterodactyl MySQL database (`extension_settings`).
- **100% Global**: What an admin configures is instantly live for all clients, subusers, and administrators across all devices.
- **Clean Uninstallation**: When the extension is uninstalled via Pterodactyl's extension manager, all database entries are automatically purged without leaving behind orphan tables.

### 🏷️ 4. Category Badges & Quick Filtering
- **Status Badges**: Inline badges displaying the category emoji and title next to every server across the dashboard.
- **Interactive Filter Bar**: Filter pill buttons with live active server counts (`All`, `🎮 Game Servers (4)`, `📁 Other (1)`).

### 🛡️ 5. Zero Conflicts & Virtual DOM Safety
- Namespaced Tailwind prefix (`sc:`) to avoid style bleeding with other panel themes or extensions.
- Pure CSS pseudo-element injection for sidebar localization—**zero React Fiber or Virtual DOM reconciliation crashes**.

---

## 🌍 Multi-Language Support (i18n)

The extension includes complete built-in localization across all screens:

| Flag | Language | Native Name | Code |
| :---: | :--- | :--- | :---: |
| 🇬🇧 | English | English | `en` |
| 🇹🇷 | Turkish | Türkçe | `tr` |
| 🇩🇪 | German | Deutsch | `de` |
| 🇷🇺 | Russian | Русский | `ru` |
| 🇸🇦 | Arabic | العربية | `ar` |

Language is configured globally by administrators under **Admin ➔ Extensions ➔ Server Categories (Settings)**. Includes an optional toggle to localize the left sidebar navigation menu item.

---

## 📦 Installation

### Option 1: Web Installer (Recommended)
1. Download **[server-categories-1.0.0.pteroext](https://github.com/hunterrockdev/Pterodactyl-Server-Categories/releases/download/latest/server-categories-1.0.0.pteroext)**.
2. Go to your Pterodactyl Admin panel: **Admin ➔ Extensions** (`/admin/extensions`).
3. Click the **"Install"** button in the top right.
4. Upload the downloaded `.pteroext` file.
5. Check **"Enable after install"** and confirm.

### Option 2: Artisan CLI
Download and install directly from your Pterodactyl server terminal:
```bash
curl -Lo /tmp/server-categories-1.0.0.pteroext https://github.com/hunterrockdev/Pterodactyl-Server-Categories/releases/download/latest/server-categories-1.0.0.pteroext
php artisan p:extension:install /tmp/server-categories-1.0.0.pteroext
```

---

## ⚙️ Admin Management & Smart Rules

Once installed, a new **Categories** entry will automatically appear in your Admin navigation menu:

1. **Create & Edit Categories**:
   - Customize name, emoji icon, and color palette.
   - Reorder categories with up/down controls.
2. **Preset Templates**:
   - Click **"Load Presets"** to automatically populate recommended templates (`Game Servers`, `Bots`, `Web`, `Dev & Staging`, `Other`).
3. **Backup & Migration**:
   - **Export JSON**: Download your entire category layout and rules as a single JSON file.
   - **Import JSON**: Restore or transfer categories across different Pterodactyl nodes and panels.

---

## 🛠️ Building from Source

To build and package the extension yourself:

```bash
# Clone the repository
git clone https://github.com/hunterrockdev/Pterodactyl-Server-Categories.git
cd Pterodactyl-Server-Categories

# Install frontend dependencies
npm install

# Run TypeScript typechecks
npm run typecheck

# Build and create .pteroext bundle
npm run pack
```

The compiled package will be generated at `./server-categories-1.0.0.pteroext`.

---

## 📁 Repository Structure

```text
├── extension.json                    # Pterodactyl v2 Extension Manifest
├── pack.php                          # Native .pteroext packaging script
├── routes/
│   ├── client.php                    # Public authenticated read routes
│   └── admin.php                     # Root administrator write routes
├── src/
│   ├── client/                       # React 19 Frontend Components
│   │   ├── admin/                    # Admin Categories management screen
│   │   ├── CategoryBadge.tsx         # Inline server badge component
│   │   ├── CategoryFilterBar.tsx     # Top filter bar component
│   │   ├── FilteredServerList.tsx    # Collapsible grouped server list override
│   │   ├── i18n.ts                   # Central 5-language translation dictionaries
│   │   ├── store.ts                  # State management & backend API synchronization
│   │   └── styles.css                # Namespaced Tailwind styles & sidebar CSS
│   └── server/                       # Laravel PHP Backend
│       ├── ServerCategoriesController.php
│       └── ServerCategoriesServiceProvider.php
└── vite.config.mjs                   # SDK Vite build configuration
```

---

## 📄 License

This extension is licensed under the [MIT License](LICENSE).
Feel free to contribute, open issues, or submit pull requests!
