// @ts-check
const {test,expect}=require('@playwright/test');
const {LoginPage}=require('../pages/LoginPage');
const users=require('../data/users');
const constants=require('../data/constants');

/** @type {LoginPage} */
let loginPage;

test.beforeEach(async ({page})=>{
loginPage=new LoginPage(page);
await loginPage.open();
});

//test case 1 login scenario
test('User can login with valid credentials @smoke',async({page})=>{
//await page.goto('/');
//await page.getByPlaceholder('Username').fill('standard_user');
//await page.getByPlaceholder('Password').fill('secret_sauce');
//await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
//await expect(page.locator('.title')).toHaveText('Products');
await loginPage.login(users.standardUser.username,users.standardUser.password);
await expect(page).toHaveURL(constants.urls.inventoryURL);
await expect(page.locator('.title')).toHaveText(constants.texts.productTitle);


});
