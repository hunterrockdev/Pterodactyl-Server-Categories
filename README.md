# Pterodactyl Server Categories Extension (`.pteroext`)

A **Server Categories & Filtering** extension built specifically for **Pterodactyl v2.0.0-beta**.

Organizes and groups your dashboard servers into customizable, collapsible category sections with smart automatic egg matching and admin management.

---

## 🌟 Key Features

1. **Collapsible Category Sections (Dashboard):**
   - Servers are grouped vertically into clean accordion sections by category (`🎮 Game Servers`, `🤖 Discord & Bots`, `🌐 Web & APIs`, etc.).
   - Each section can be toggled open or closed with smooth animation, remembering collapsed states across reloads.
2. **Dedicated Admin Management Screen (`Admin -> Categories`):**
   - Automatically added to the **Admin panel left sidebar**.
   - Create, edit, reorder, and delete categories.
   - Configure **Smart Automatic Matching Rules**:
     - **Egg Tag**: Automatically assign servers created with specific eggs/tags (e.g., `minecraft`, `paper`, `rust`, `palworld`).
     - **Egg Feature**: Match based on egg features (e.g., `eula`).
     - **Docker Image**: Match based on container image (e.g., `python`, `node`, `java`).
     - **Server Name Contains**: Match based on server name keywords (e.g., `bot`, `test`, `dev`).
     - **Server UUID**: Force a specific server into a category (manual override).
   - **Export / Import**: Backup or transfer your categories and rules in JSON format.
3. **Multi-Language Support (i18n):**
   - Built-in support for 5 languages: 🇬🇧 English, 🇹🇷 Türkçe, 🇩🇪 Deutsch, 🇷🇺 Русский, 🇸🇦 العربية.
   - Configurable globally via **Admin -> Extensions -> Settings**.
   - Optional toggle for localizing the left navigation sidebar menu label.
4. **Global Database Synchronization:**
   - Categories, rules, and manual server assignments are stored directly in Pterodactyl's database (`extension_settings`), making them 100% global across all users and devices.
   - Category collapse/expand state remains local per user on their personal dashboard.
5. **Category Badges (`dashboard.serverRow.name.after`):**
   - Inline colored badge next to each server name displaying the category emoji and name.
6. **Dashboard Top Filter Bar (`dashboard.before`):**
   - Quick category pills with live server counts and layout mode switcher (Grouped / List).
7. **Zero Conflict & Lightweight:**
   - Isolated Tailwind prefix (`sc`).
   - Pure CSS DOM replacement for sidebar localization (zero React virtual DOM crashes).
   - Uses Pterodactyl SDK's shared React & Query import maps (bundle size ~13 KB).

---

## 📦 Installation

### 1. Web Installer (Recommended)
1. Go to your Pterodactyl Admin panel: **Admin -> Extensions** (`/admin/extensions`).
2. Click the **"Install"** button in the top right.
3. Upload `server-categories-1.0.0.pteroext`.
4. Check **"Enable after install"** and confirm.

### 2. Artisan CLI
On your Pterodactyl server:
```bash
php artisan p:extension:install /path/to/server-categories-1.0.0.pteroext
```

---

## 🛠️ Building from Source

```bash
cd packages/server-categories
npm install
npm run build
npm run pack
```
This produces `server-categories-1.0.0.pteroext`.
