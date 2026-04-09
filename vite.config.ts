import { defineConfig } from 'vite';
import { resolve } from 'path';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs';

function copyPublicFolder() {
  const publicDir = resolve(__dirname, 'public');
  const distDir = resolve(__dirname, 'dist');
  
  if (!existsSync(distDir)) {
    mkdirSync(distDir, { recursive: true });
  }
  
  if (existsSync(publicDir)) {
    copyDirRecursive(publicDir, distDir);
  }
}

function copyDirRecursive(src, dest) {
  if (!existsSync(dest)) {
    mkdirSync(dest, { recursive: true });
  }
  
  const entries = readdirSync(src);
  for (const entry of entries) {
    const srcPath = resolve(src, entry);
    const destPath = resolve(dest, entry);
    
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  base: './',
  server: {
    port: 3000,
    open: false,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lottie-web'],
        },
      },
    },
  },
  css: {
    devSourcemap: true,
  },
  preview: {
    port: 4173,
  },
  plugins: [
    {
      name: 'copy-public',
      closeBundle() {
        copyPublicFolder();
      },
    },
  ],
});