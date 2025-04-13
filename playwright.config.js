const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  use: {
    headless: false, // запуск с интерфейсом
    viewport: { width: 1920, height: 1080 },
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'], // Консольный отчет
    ['allure-playwright'], // Репортер для Allure
  ],
});