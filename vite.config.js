import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        simulador: resolve(__dirname, 'simulador.js'),
        plataforma: resolve(__dirname, 'plataforma.js'),
      },
      output: {
        entryFileNames: '[name].bundle.js'
      }
    }
  }
});
