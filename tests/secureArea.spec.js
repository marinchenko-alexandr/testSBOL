const {test, expect} = require('@playwright/test');
const {LoginPage} = require('../pages/LoginPage');
const {SecureAreaPage} = require('../pages/SecureAreaPage');

test.describe('Secure Area', () => {

    let page;
    let loginPage;
    let secureAreaPage;

    test.beforeEach(async ({browser}) => {
        page = await browser.newPage();
        loginPage = new LoginPage(page);
        secureAreaPage = new SecureAreaPage(page);

        await loginPage.goto();
        await loginPage.login('tomsmith', 'SuperSecretPassword!');
    });

    test('Проверка отображения текста в заголовке страницы и под ним', async () => {
        await secureAreaPage.checkElementsVisible();
        await expect(secureAreaPage.secureAreaHeading).toHaveText('Secure Area');
        await expect(secureAreaPage.subHeader).toContainText('Welcome to the Secure Area');
    });

    test('Проверка отображения сообщения об успешной авторизации', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.login('tomsmith', 'SuperSecretPassword!');

        const successMessage = page.locator('#flash.success');
        await expect(successMessage).toBeVisible();

        const messageText = await successMessage.innerText();
        const cleanText = messageText.replace('×', '').replace(/\s+/g, ' ').trim();

        await expect(cleanText).toBe('You logged into a secure area!');
    });

    test('Проверка, что при клике на кнопку выхода, открывается страница логина', async () => {
        await secureAreaPage.logout();
        await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
    });

    test('Переход по изображению GitHub открывает правильный репозиторий', async () => {

        console.log('URL до клика: ', page.url());

        await secureAreaPage.clickGitHubFork();

        await page.waitForLoadState('load', {timeout: 60000});

        console.log('URL после клика: ', page.url());

        await expect(page).toHaveURL('https://github.com/saucelabs/the-internet');
    });

});
