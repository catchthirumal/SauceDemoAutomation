//@ts-check
const{test,expect}=require('@playwright/test');
const {LoginPage}=require('../pages/LoginPage');
const {Inventory}=require('../pages/Inventory');
const {Cart}=require('../pages/CartPage');
const users=require('../data/users');
const constants=require('../data/constants');

/** @type {LoginPage} */
let loginPage;

/** @type {Inventory} */
let inventory;

/** @type {Cart} */
let cart;

test.beforeEach(async ({page})=>{
    loginPage=new LoginPage(page);
    inventory=new Inventory(page);    
    cart=new Cart(page); 

    await loginPage.open();
    await loginPage.login(users.standardUser.username,users.standardUser.password);
    
    await inventory.addProductToCart(constants.texts.sauceLabsBackPackText);
    await inventory.addProductToCart(constants.texts.sauceLabBikeLightText);
    await cart.goToCart();
    
    
});

test('added products appear correctly in cart',async({page})=>{

    
    await expect(page).toHaveURL(constants.urls.cartURL);

    const itemNames = await cart.getAllCartNames();
    expect(itemNames).toEqual([constants.texts.sauceLabsBackPackText,constants.texts.sauceLabBikeLightText]);

});

test('product to be removed from cart',async({page})=>{
    await cart.removeProduct(constants.texts.sauceLabsBackPackText);
    //await cart.removeProduct(constants.texts.sauceLabBikeLightText);
    const itemCount=await cart.getCartItemCount();
    expect(itemCount).toBe(1);

    const remainNames = await cart.getAllCartNames();
    expect(remainNames).toEqual([constants.texts.sauceLabBikeLightText]);

});


test('Add a product to cared and head to checkout',async({page})=>{
    await cart.clickOncheckout();
    cart.FillInfo(constants.checkOutData.firstName,constants.checkOutData.lastName, constants.checkOutData.postalCode);

    cart.clickContinueToOverview();

    await expect(page).toHaveURL(constants.urls.checkoutToURL);

    const subtotal=await cart.getSubTotal();
    const tax = await cart.getTax();
    const total= await cart.getTotal();
    
    expect(total).toBeCloseTo(subtotal+tax,2);

    await cart.clickFinishButton()

    await expect(page).toHaveURL(constants.urls.thankYouPageURL);

    await expect(cart.getCompleteHeader).toHaveText('Thank you for your order!');
});
