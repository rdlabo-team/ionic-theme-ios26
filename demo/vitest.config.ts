import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    setupFiles: ['src/test-setup.ts'],
    server: { deps: { inline: [/@ionic\/angular/, /@ionic\/core/, /ionicons/, /@rdlabo\/ionic-theme-/] } },
  },
});
