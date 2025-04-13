const { expect } = require('@playwright/test');

class LoginPage {

  constructor(page) {
    this.page = page;
    this.usernameInput = page.locator('input[name="username"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.loginButton = page.locator('button[type="submit"]');
    this.subTitle = page.locator('#content div h4');
  }

  async goto() {
    await this.page.goto('https://the-internet.herokuapp.com/login');
  }

  async checkLoginPageVisible() {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
    await expect(this.subTitle).toContainText('log into the secure area');
  }

  async login(username, password) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };
