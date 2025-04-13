// SecureAreaPage.js

const { expect } = require('@playwright/test');

class SecureAreaPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.secureAreaHeading = page.locator('h2');
    this.subHeader = page.locator('h4.subheader');
    this.logoutButton = page.locator('a[href="/logout"]');
    this.githubForkImage = page.locator('a[href="https://github.com/tourdedave/the-internet"] img');
    this.elementalSeleniumLink = page.locator('div[style="text-align: center;"] a');
  }

  // Метод для проверки видимости всех элементов на странице
  async checkElementsVisible() {
    await expect(this.secureAreaHeading).toBeVisible();
    await expect(this.subHeader).toBeVisible();
    await expect(this.logoutButton).toBeVisible();
    await expect(this.githubForkImage).toBeVisible();
    await expect(this.elementalSeleniumLink).toBeVisible();
  }

  // Метод для выхода
  async logout() {
    await this.logoutButton.click();
  }

  // Метод для клика по изображению GitHub
  async clickGitHubFork() {
    await this.githubForkImage.click();
  }
}

module.exports = { SecureAreaPage };
