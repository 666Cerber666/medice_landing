import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vuePlugin()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});