import { resolve } from "path";
import { defineConfig } from "vite";
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs';

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product1: resolve(
          __dirname,
          "src/product_pages/cedar-ridge-rimrock-2.html",
        ),
        product2: resolve(__dirname, "src/product_pages/marmot-ajax-3.html"),
        product3: resolve(
          __dirname,
          "src/product_pages/northface-alpine-3.html",
        ),
        product4: resolve(
          __dirname,
          "src/product_pages/northface-talus-4.html",
        ),
      },
    },
    assetsInclude: ['**/*.json', '**/*.html'],
  },
  plugins: [
    {
      name: 'copy-static-files',
      closeBundle() {
        try {
          // Copy JSON files
          const jsonDir = resolve(__dirname, 'dist/json');
          if (!existsSync(jsonDir)) {
            mkdirSync(jsonDir, { recursive: true });
          }
          
          const jsonFiles = ['tents.json', 'backpacks.json', 'sleeping-bags.json'];
          jsonFiles.forEach(file => {
            try {
              copyFileSync(
                resolve(__dirname, `src/json/${file}`),
                resolve(__dirname, `dist/json/${file}`)
              );
              console.log(`Copied ${file} to dist/json`);
            } catch (err) {
              console.error(`Error copying ${file}:`, err);
            }
          });
          
          // Copy partials directory
          const partialsDir = resolve(__dirname, 'dist/partials');
          if (!existsSync(partialsDir)) {
            mkdirSync(partialsDir, { recursive: true });
          }
          
          const partialsFiles = ['header.html', 'footer.html'];
          partialsFiles.forEach(file => {
            try {
              const sourcePath = resolve(__dirname, `src/partials/${file}`);
              const destPath = resolve(__dirname, `dist/partials/${file}`);
              
              if (existsSync(sourcePath)) {
                // Read the file content
                let content = readFileSync(sourcePath, 'utf8');
                
                // Remove Vite client script if present
                content = content.replace(/<script.*?@vite\/client.*?<\/script>/g, '');
                
                // Write the cleaned content to the destination
                writeFileSync(destPath, content);
                console.log(`Copied and cleaned ${file} to dist/partials`);
              } else {
                console.error(`Source file ${file} does not exist`);
              }
            } catch (err) {
              console.error(`Error copying ${file}:`, err);
            }
          });
        } catch (err) {
          console.error('Error in copy-static-files plugin:', err);
        }
      }
    }
  ]
});
