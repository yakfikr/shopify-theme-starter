# Skeleton

A Shopify theme based on the official Skeleton starter, extended with esbuild and Tailwind CSS.

## Requirements

- Node.js
- [Shopify CLI](https://shopify.dev/docs/api/shopify-cli)

## Setup

```bash
npm install
```

## Development

Start the development server with CSS/JS watchers and Shopify theme dev:

```bash
npm run dev
```

This runs three processes concurrently:

- Tailwind CSS watcher
- esbuild watcher
- Shopify theme dev server

## Build

Development build:

```bash
npm run build
```

Production build (minified):

```bash
npm run build:prod
```

## Project Structure

```
skeleton/
├── js/                     # JavaScript source files
├── css/                    # Tailwind CSS source files
│   ├── main.tailwind.css   # Entry point
│   ├── theme/              # Theme configuration (@theme layer)
│   ├── base/               # Reset and base styles (@layer base)
│   ├── components/         # Component styles (@layer components)
│   ├── utility/            # Custom utilities (@layer utilities)
│   └── custom-variant/     # Custom Tailwind variants
├── assets/                 # Compiled output and static files
├── layout/                 # Theme layouts
├── sections/               # Theme sections
├── templates/              # Page templates
├── snippets/               # Reusable Liquid snippets
├── blocks/                 # Theme blocks
├── config/                 # Theme settings
└── locales/                # Translations
```

## Build Pipeline

### JavaScript (esbuild)

Root-level `.js` files in the `js/` directory are automatically discovered and bundled to `assets/`. Subdirectories can be used to organize shared modules that are imported by root-level files but not bundled separately.

```
js/
├── product.js        # Bundled → assets/product.js
├── cart.js           # Bundled → assets/cart.js
└── utils/            # Not bundled (import only)
    └── helpers.js    # Imported by product.js or cart.js
```

Configuration: `esbuild.config.js`

- Output format: ES modules
- Target: ES2024
- Minification: Production only
- External: `@theme/*` (loaded via import map)

### CSS (Tailwind v4)

Source: `css/main.tailwind.css`
Output: `assets/main.tailwind.css`

CSS is organized into folders that map to Tailwind's layer system:

| Folder            | Layer/Purpose                    |
| ----------------- | -------------------------------- |
| `theme/`          | `@theme` - Tailwind config       |
| `base/`           | `@layer base` - Reset styles     |
| `components/`     | `@layer components` - Components |
| `utility/`        | `@layer utilities` - Utilities   |
| `custom-variant/` | `@custom-variant` definitions    |

### External Modules and Import Maps

This setup uses esbuild's `external` option combined with browser import maps to share npm packages across multiple bundles without duplicating code.

**The problem:** When multiple JS files import the same npm package, esbuild bundles that package into each output file, duplicating the code.

**The solution:** Mark shared packages as external in esbuild and resolve them at runtime via browser import maps.

The theme includes [idiomorph](https://github.com/bigskysoftware/idiomorph) as a working example of this pattern. It can be removed if not needed, or used as a reference for adding other shared packages.

**To add a shared package:**

1. Install the package:

   ```bash
   npm install <package-name>
   ```

2. Create a barrel file in `js/` that re-exports the package:

   ```javascript
   // js/<package-name>.js
   export * from '<package-name>';
   ```

3. Add the alias to the external array in `esbuild.config.js`:

   ```javascript
   external: ['@theme/<package-name>'];
   ```

4. Register the mapping in `snippets/scripts.liquid`:

   ```html
   <script type="importmap">
     {
       "imports": {
         "@theme/<package-name>": "{{ '<package-name>.js' | asset_url }}"
       }
     }
   </script>
   ```

5. Import using the `@theme/` alias in any JS file:
   ```javascript
   import { something } from '@theme/<package-name>';
   ```

The package is bundled once and shared across all bundles via the import map. This pattern is inspired by [Shopify Horizon](https://github.com/Shopify/horizon).

## Scripts

| Command                | Description                                |
| ---------------------- | ------------------------------------------ |
| `npm run dev`          | Start development (watchers + Shopify CLI) |
| `npm run build`        | Build CSS and JS                           |
| `npm run build:prod`   | Production build with minification         |
| `npm run build:css`    | Build CSS only                             |
| `npm run build:js`     | Build JS only                              |
| `npm run watch:css`    | Watch CSS                                  |
| `npm run watch:js`     | Watch JS                                   |
| `npm run lint`         | Run ESLint                                 |
| `npm run lint:fix`     | Fix lint errors                            |
| `npm run format`       | Format with Prettier                       |
| `npm run format:check` | Check formatting                           |

## Tooling

- **esbuild** - JavaScript bundling
- **Tailwind CSS v4** - Utility-first CSS
- **ESLint** - Linting (ES2024)
- **Prettier** - Formatting with Liquid and Tailwind plugins
