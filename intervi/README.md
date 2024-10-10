# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

Here’s a summary of how to resolve the module errors you've faced while working with TypeScript and GSAP. You can refer to this documentation in the future:

### Resolving TypeScript Module Errors with GSAP

1. **Creating Type Definitions:**
   If you encounter module not found errors related to GSAP or other libraries, you may need to create type definitions manually. For GSAP, you can create a file in your project, such as `src/@types/gsap.d.ts`, and add the following content:

   ```typescript
   declare module "gsap/all" {
     export * from "gsap";
   }
   ```

// declare module "gsap/SplitText" {
// const SplitText: unknown;
// export default SplitText;
// }

````

2. **Updating `tsconfig.json`:**
Ensure that your `tsconfig.json` file includes the `typeRoots` pointing to your custom types:

```json
{
  "compilerOptions": {
    "typeRoots": ["./src/@types/", "./node_modules/@types/"],
    ...
  }
}
````

3. **Using `composite` for Project References:**
   If you’re using project references, make sure to set `"composite": true` in any referenced `tsconfig.json` files. If the referenced project does not require emitting files, set `"noEmit": true` in those files.

4. **Handling JSX Errors:**
   If you see errors related to JSX, ensure you have the `jsx` setting in your `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "jsx": "react", // or "react-jsx" for React 17+
       ...
     }
   }
   ```

5. **Adding DOM Library:**
   If you encounter errors about the `document` object, include the `dom` library in the `lib` section of your `tsconfig.json`:

   ```json
   {
     "compilerOptions": {
       "lib": ["ES2023", "dom"],
       ...
     }
   }
   ```

### Troubleshooting Build Issues

- **MIME Type Errors:**
  If you face MIME type errors during development, ensure that the paths to your CSS and JS files are correct in your HTML. If necessary, adjust the base URL or public path in your build configuration.

- **Dynamic Imports:**
  If you need to adjust the paths dynamically at build time, consider using a bundler or task runner that can handle these adjustments based on your build configuration.

### Conclusion

Documenting these steps can help streamline your development process and resolve similar issues in the future. If you have any more specific questions or need further details, feel free to ask!

### this is i have some before above mentioned

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler", // Allows TS extension imports
    "allowImportingTsExtensions": true, // Enables TypeScript extensions in imports
    "isolatedModules": true,
    "moduleDetection": "force",

    /* Emit only declarations */
    "emitDeclarationOnly": true, // Emit only declaration files (without JS)
    "composite": true, // Required for project references
    "allowJs": true, // Allow JavaScript files
    "outDir": "./dist", // Set output directory for compiled files
    "declaration": true, // Emit declaration files

    /* Linting */
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts", "src/**/*"],
  "exclude": ["node_modules"]
}
```
