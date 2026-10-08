class Inventory {
    constructor(page) {
        this.page = page;
        this.inventoryItems = page.locator('[data-test="inventory-item"]');
        this.cartBadges = page.locator('[data-test="shopping-cart-badge"]');
        this.sortDropDown = page.locator('[data-test="product-sort-container"]');
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        
    
    }

    getProductToCart(productname) {
        return this.inventoryItems.filter({ hasText: productname });
    }

    async addProductToCart(productname) {
        const product = this.getProductToCart(productname);
        await product.getByRole('button', { name: 'Add to cart' }).click();
    }

    async getCartCount() {
        if (await this.cartBadges.count() === 0) return 0;
        return parseInt(await this.cartBadges.textContent(), 10);
    }
       async sortBy(optionValue) {
        await this.sortDropDown.selectOption(optionValue);
    }
    async getAllProductPrices() {
        const priceTexts=await this.itemPrices.allTextContents();
        return priceTexts.map((p)=> parseFloat(p.replace('$','')));
    }
}

module.exports = { Inventory };