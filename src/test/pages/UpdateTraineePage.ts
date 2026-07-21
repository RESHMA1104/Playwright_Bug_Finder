import { Status } from "@cucumber/cucumber";
import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";


export class UpdateTraineePage extends BasePage {
    private courseName: Locator;
    private traineeName: Locator;
    private updateBtn: Locator;
    private statusDropDown: Locator;
    private optionDD: Locator;
    private completePercentage: Locator;
    private Status: Locator;

    constructor(page: Page) {
        super(page)
        this.courseName = page.locator('//input[@name="course"]');
        this.traineeName = page.locator('//input[@name="trainerName"]');
        this.updateBtn = page.locator('//button[text()="Update"]');
        this.statusDropDown = page.locator('//div[text()="Not Started"]');
        this.optionDD = page.locator('//li[text()="Completed"]');
        this.completePercentage = page.locator('//input[@name="percentCompleted"]');
        this.Status = page.locator('(//tr/td)[9]');
    }

    async updateDetails(cname: string, tname: string) {
        await this.clear(this.courseName);
        await this.fill(this.courseName, cname);
        await this.clear(this.traineeName);
        await this.fill(this.traineeName, tname);
    }

    async clickUpdateBtn() {
        await this.click(this.updateBtn);
    }

    async clickDropDown() {
        await this.click(this.statusDropDown);
        await this.clickStatusOption(this.optionDD);
    }

    async updatePercentage(percent: string) {
        await this.fill(this.completePercentage, percent);
    }

    async assertUpdate() {
        await this.toContainText(this.Status, "Completed");
    }
}