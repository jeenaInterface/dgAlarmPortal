import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { fixture } from "../hooks/pageFixture";
const { randomValuePhone } = require('../helper/util/test-data/randomdata');
const { randomValuePasscode } = require('../helper/util/test-data/randomdata');


export default class dgAlarmPortal {
    private base: PlaywrightWrapper
    constructor(private page: Page) {
        this.base = new PlaywrightWrapper(page);
    }

    private Elements = {

        passwordInput: "//input[@id='MainContent_LoginUser_Password']",
        storeLocator: "//input[@id='caseSiteSearchInput']",
        firstItem: "//a[@id='site_DG-TEST2']",
        password: "//input[@id='password']",
        AlarmPanelCodeChangeRequest: "//span[text()='Alarm Panel Code Change Request']",
        submitButton: "//input[@id='submitPasscode']",
        FifthEditButton:"//input[@id='chkEdit5']",
        name:"//input[@id='name']",
        MobileTextbox: "//input[@id='mobile']",
        HomePhone: "//input[@id='home']",
        passcode: "//input[@id='password']",
        saveChanges: "//input[@id='submitEdit']",
        successMessage: "Contacts update successful. Please allow 2 business days for passcode changes to be applied to your system.",
        SubmitChanges: "//input[@value='Submit Changes']",
        storePassword: "//input[@value='storePassword']",
        submit: "//input[@value='Submit']"

    }

    async navigateToLoginPage() {
        await this.base.goto(process.env.BASEURLDGAlarmPortal);


    }

    async clickstoreLocator() {
        await this.base.waitAndClick(this.Elements.storeLocator);
    }


    async SelectFirstEntry() {
        await this.base.waitAndClick(this.Elements.firstItem);
;
    }
    async clickAlarmPanelCodeChangeRequest() {
        await this.base.waitAndClick(this.Elements.AlarmPanelCodeChangeRequest);
;
    }
    async enterPassword() {
        await this.page.locator(this.Elements.password).fill("7765");
    }

    async clickSubmitButton() {
        await this.base.waitAndClick(this.Elements.submitButton);
    }

    async FillDetails() {
        await this.base.waitAndClick(this.Elements.FifthEditButton);
        await this.page.locator(this.Elements.name).fill("Test user")
        await this.page.locator(this.Elements.MobileTextbox).fill("(993) 802-0885")
        await this.page.locator(this.Elements.HomePhone).fill("(993) 802-0885")
        await this.page.locator(this.Elements.passcode).fill(randomValuePasscode.toString())
        await this.base.waitAndClick(this.Elements.saveChanges);
        this.page.on("dialog",(dialog) => {
            console.log('Message: ' +dialog.message())
            dialog.accept()
        })
        await this.base.waitAndClick(this.Elements.SubmitChanges);
        await this.page.locator(this.Elements.storePassword).fill("7765");
        await this.base.waitAndClick(this.Elements.submit);


    }

    async returnSuccessMessage() {
        const SuccessMessage = await this.page.getByText(this.Elements.successMessage);
        const innertext = await SuccessMessage.innerText();
        return innertext
    }

}