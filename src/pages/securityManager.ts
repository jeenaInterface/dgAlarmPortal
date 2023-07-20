import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";
const { randomValuePhone } = require('../helper/util/test-data/randomdata');
const { randomValuePasscode } = require('../helper/util/test-data/randomdata');


export default class SecurityManager {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {
        userName: "//input[@id ='MainContent_LoginUser_UserName']",
        passwordInput: "//input[@id='MainContent_LoginUser_Password']",
        loginBtn: "//input[@id='MainContent_LoginUser_LoginButton']",
        homeLink: "//a[text() ='Home']",
        firstPanel: "//a[text() ='Test Panel - AGB Account (AGB0010)']",
        addBlankrows: "//input[@title='Add Blank Rows based on selected count']",
        yesProceedButton: "//button[text()='Yes, Proceed!']",
        CodeToAssign041Edit:"(//tr[@title='041']//input)[1]",
        phoneTextbox: "//div[@id='contMobiletb38']//input[1]",
        HomePhone: "//div[@id='contHometb38']//input[1]",
        passcode: "//div[@id='contPasscodetb38']//input[1]",
        updateButton: "//input[@value='Update Contacts']",
        successMessage: "Contacts update successful. Please allow 2 business days for passcode changes to be applied to your system.",
        errorMessage: "Sorry, requested rows could not be added as the maximum contacts in this panel is restricted to 40."

    }

    async navigateToLoginPage() {
        await this.base.goto(process.env.BASEURLSecurityManager);


    }
    async enterUserName(user: string) {
        await this.page.locator(this.Elements.userName).fill(user);
    }
    async enterPassword(Password: string) {
        await this.page.locator(this.Elements.passwordInput).fill(Password);
    }

    async clickLoginButton() {
        await this.base.waitAndClick(this.Elements.loginBtn);
    }


    async loginUser(user: string, password: string) {
        await this.enterUserName(user);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async clickHomeLink() {
        await this.base.waitAndClick(this.Elements.homeLink);
    }

    async clickFirstPanel() {
        await this.base.waitAndClick(this.Elements.firstPanel);
    }

    async addBlankrows() {

        await this.page.locator(this.Elements.addBlankrows).click();
        await this.page.locator(this.Elements.yesProceedButton).click();
        await fixture.page.waitForLoadState();
        fixture.logger.info("Waiting for 5 seconds")
        await fixture.page.waitForTimeout(5000);
        const errorMessage = this.Elements.errorMessage;
        if (errorMessage !== undefined) {
            await this.page.locator(this.Elements.CodeToAssign041Edit).check();
            await this.page.locator(this.Elements.phoneTextbox).fill("2505550199")
            await this.page.locator(this.Elements.HomePhone).fill("2505550199")
            await this.page.locator(this.Elements.passcode).fill(randomValuePasscode.toString())
            await fixture.page.waitForLoadState();
            fixture.logger.info("Waiting for 2 seconds")
            await fixture.page.waitForTimeout(2000);
        } else {
            await this.page.locator(this.Elements.CodeToAssign041Edit).check();
            await this.page.locator(this.Elements.phoneTextbox).fill("2505550199")
            await this.page.locator(this.Elements.HomePhone).fill("2505550199")
            await this.page.locator(this.Elements.passcode).fill(randomValuePasscode.toString())
            await fixture.page.waitForLoadState();
            fixture.logger.info("Waiting for 2 seconds")
            await fixture.page.waitForTimeout(2000);
        }

    }

    async clickupdateButton() {
        await this.base.waitAndClick(this.Elements.updateButton);
    }

    async returnSuccessMessage() {
        const SuccessMessage = await this.page.getByText(this.Elements.successMessage);
        const innertext = await SuccessMessage.innerText();
        return innertext
    }

}