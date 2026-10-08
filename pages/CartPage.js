class Cart {
    constructor(page) {
        this.page = page;
        this.cartLink = page.locator('[data-test="shopping-cart-badge"]');
        this.itemNames = page.locator('[data-test="inventory-item-name"]');
        this.cartItem = page.locator('[data-test="inventory-item"]');
        this.checkoutButton = page.locator('[data-test="checkout"]');
        this.firstNameInout = page.locator('[data-test="firstName"]');
        this.lastNameInout = page.locator('[data-test="lastName"]');
        this.postalCodeInout = page.locator('[data-test="postalCode"]');
        this.continueButton = page.locator('[data-test="continue"]');
        this.subTotal = page.locator('[data-test="subtotal-label"]');
        this.tax = page.locator('[data-test="tax-label"]');
        this.totalPrice = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
        this.getCompleteHeader = page.locator('[data-test="complete-header"]');
        
        //remove-sauce-labs-backpack
        
    
    }

   
    async goToCart() {
        //const product = this.getProductToCart(productname);
        await this.cartLink.click();
    }

     async getAllCartNames() {
        return await this.itemNames.allTextContents();
        //return priceTexts.map((p)=> parseFloat(p.replace('$','')));
    }

    async removeProduct(productName) {
        const item= this.getCartItem(productName);
        await item.getByRole('button',{name: 'Remove'}).click();
       
    }

    getCartItem(productName){
        return this.cartItem.filter({hasText: productName});
    }

    async getCartItemCount() {
        return  this.cartItem.count();
       
    }

    async clickOncheckout() {
        await this.checkoutButton.click();
       
    }
    
    async FillInfo(firstName, lastName, zipCode) {
        await this.firstNameInout.fill(firstName);
        await this.lastNameInout.fill(lastName);
        await this.postalCodeInout.fill(zipCode);              
       
    }

    async clickContinueToOverview() {
        await this.continueButton.click();                   
       
    }

    async getSubTotal() {
        const text = await this.subTotal.textContent();
        return parseFloat((text ?? '').replace('Item total: $', ''));
    }

    async getTax() {
        const text = await this.tax.textContent();
        return parseFloat((text ?? '').replace('Tax: $', ''));
    }

    async getTotal() {
        const text = await this.totalPrice.textContent();
        return parseFloat((text ?? '').replace('Total: $', ''));
    }

    async clickFinishButton() {
        await this.finishButton.click();     
       
    }

    
}

module.exports = {Cart};