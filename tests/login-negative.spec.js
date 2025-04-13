import {test, expect} from '@playwright/test';
import {LoginPage} from '../pages/LoginPage';

test('Неверный логин', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://the-internet.herokuapp.com/login');

    await loginPage.login('wronguser', 'SuperSecretPassword!');
    const error = page.locator('#flash');
    const rawText = await error.innerText();
    const cleanText = rawText.replace('×', '').trim();
    expect(cleanText).toBe('Your username is invalid!');

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
});

test('Неверный пароль', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://the-internet.herokuapp.com/login');

    await loginPage.login('tomsmith', 'wrongpass');
    const error = page.locator('#flash');
    const rawText = await error.innerText();
    const cleanText = rawText.replace('×', '').trim();
    expect(cleanText).toBe('Your password is invalid!');

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
});

test('Только логин', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://the-internet.herokuapp.com/login');

    await loginPage.login('tomsmith', '');
    const error = page.locator('#flash');
    const rawText = await error.innerText();
    const cleanText = rawText.replace('×', '').trim();
    expect(cleanText).toBe('Your password is invalid!');

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
});

test('Только пароль', async ({page}) => {
    const loginPage = new LoginPage(page);
    await page.goto('https://the-internet.herokuapp.com/login');

    await loginPage.login('', 'SuperSecretPassword!');
    const error = page.locator('#flash');
    const rawText = await error.innerText();
    const cleanText = rawText.replace('×', '').trim();
    expect(cleanText).toBe('Your username is invalid!');

    await expect(page).toHaveURL('https://the-internet.herokuapp.com/login');
});
