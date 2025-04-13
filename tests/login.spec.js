const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/LoginPage');


test('Проверка текста под заголовком', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  const textLocator = page.locator('h4.subheader');
  await expect(textLocator).toHaveText(
    'This is where you can log into the secure area. Enter tomsmith for the username and SuperSecretPassword! for the password. If the information is wrong you should see error messages.'
  );
});


test('Проверка авторизации', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await loginPage.login('tomsmith', 'SuperSecretPassword!');
  await page.waitForURL(/secure/);

  const successMessage = page.locator('#flash');
  const text = (await successMessage.textContent()).trim();
  const cleanText = text.replace(/\s+/g, ' ');
  await expect(cleanText).toBe('You logged into a secure area! ×');
});


test('Проверка отображения текста в подвале страницы и ссылки', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();

  const footerDiv = page.locator('div.large-4.large-centered.columns');
  await expect(footerDiv).toBeVisible();
  await expect(footerDiv).toContainText('Powered by');
  await expect(footerDiv).toContainText('Elemental Selenium');

  const link = footerDiv.locator('a');
  await expect(link).toHaveAttribute('href', 'http://elementalselenium.com/');

  const [newPage] = await Promise.all([
    page.context().waitForEvent('page'),
    link.click(),
  ]);

  await expect(newPage).toHaveURL('https://elementalselenium.com/');
});


test.describe('Проверка изображения-ссылки на гитхаб', () => {

  test('Проверка отображения картинки-ссылки на гитхаб', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const image = page.locator('img[alt="Fork me on GitHub"]');
    await expect(image).toBeVisible();
  });

  test('Проверка атрибута src изображения ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const image = page.locator('img[alt="Fork me on GitHub"]');
    await expect(image).toHaveAttribute('src', '/img/forkme_right_green_007200.png');
  });

  test('Проверка атрибута alt изображения ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const image = page.locator('img[alt="Fork me on GitHub"]');
    await expect(image).toHaveAttribute('alt', 'Fork me on GitHub');
  });

  test('Проверка перехода в гитхаб при клике на изображению ', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();

    const image = page.locator('img[alt="Fork me on GitHub"]');
    await Promise.all([
      page.waitForURL('https://github.com/saucelabs/the-internet', { timeout: 60000 }),
      image.click(),
    ]);

    await expect(page).toHaveURL('https://github.com/saucelabs/the-internet');
  });

});
