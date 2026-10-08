//@ts-check
const{test,expect}=require('@playwright/test');
const {LoginPage}=require('../pages/LoginPage');
const {Inventory}=require('../pages/Inventory');
const users=require('../data/users');
const constants=require('../data/constants');

/** @type {LoginPage} */
let loginPage;

/** @type {Inventory} */
let inventory;


test.beforeEach(async ({page})=>{
    loginPage=new LoginPage(page);
    inventory=new Inventory(page);    
    
});

test('cart badge updates when adding products',async({page})=>{
    
    await loginPage.open();
    await loginPage.login(users.standardUser.username,users.standardUser.password);
    
    await inventory.addProductToCart(constants.texts.sauceLabsBackPackText);
    await inventory.addProductToCart(constants.texts.sauceLabBikeLightText);
    const cartCount=await inventory.getCartCount();
    console.log(`Cart Items: ${cartCount}`);
    expect(cartCount).toBe(2);

});

test('products can be sorted by price low to high',async({page})=>{
    
    
    await inventory.sortBy(constants.sortOptions.priceLowtoHigh); //it will click on sort options
    const prices=await inventory.getAllProductPrices();
    const sortedPrices=[...prices].sort((a,b)=>a-b);
    expect(prices).toEqual(sortedPrices);

});