# Task_Manager

Task Manager is a Single Page Application (SPA) similar to Trello. After authorization, users can create boards, columns, and tasks.

## Tech Stack

- React version `^19.2.0`.
- Material UI
- Supabase - used for the database via the `@supabase/supabase-js` module

## Architecture

The project follows the Feature-Sliced Design (FSD) architectural methodology.

## Directory and File Structure

- /public - used for static assets and images.
- /src - the main application directory, containing:
  - /src/app - routing, entry points, global styles, and providers. It does not export anything.
  - /src/pages - application pages.
  - /src/widgets - large, self-contained pieces of functionality or UI blocks.
  - /src/features - reusable implementations of product features.
  - /src/entities - business entities that the application operates with
  - /src/shared - reusable infrastructure code, common components, utilities, etc.
- .env - environment variables.
- index.html - the main HTML file.

Using any files or directories outside of this structure is strictly prohibited unless explicitly stated otherwise.

## Code rules

- Use TypeScript with strict mode enabled. The any type is strictly forbidden. If a type cannot be inferred automatically, use unknown.
- Every module must include an index.ts file in its root directory to act as a public API, exporting its code externally.
- Use path aliases (e.g., @src/\*) for all cross-layer imports. Relative imports between different FSD layers are strictly prohibited.

## Material UI

- Before importing any Material UI component, you must check the `shared/ui/index.ts` file. If this file contains the component you need, import it from `shared/ui/index.ts`. Otherwise, use the default import from `@mui/material/<ComponentName>`.
- Do not write styles directly inside the sx prop. Instead, immediately after the imports, create a styles object: const styles = {} satisfies Styles; and write all component styles there. Use type Styles.
