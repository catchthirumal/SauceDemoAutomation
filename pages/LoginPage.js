class LoginPage{
    constructor(page){
        this.page=page;
        this.baseURL=process.env.BASE_URL;

        //Locators
        this.usernameInput=page.getByPlaceholder('Username');
        this.passwordInput=page.getByPlaceholder('Password');
        this.buttonInput=page.getByRole('button',{name: 'Login'});
    }

    async open(){
        console.log(`Opening base URL: ${this.baseURL}`);
        await this.page.goto(this.baseURL);
        console.log('Landing Oage successfully opened');
    }

    async login(username,password){
       // await page.getByPlaceholder('Username').fill(users.standardUser.username);
        //await page.getByPlaceholder('Password').fill(users.standardUser.password);        
        //await page.getByRole('button',{name: 'Login'}).click();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);        
        await this.buttonInput.click();        
        
    }
}

module.exports={LoginPage};