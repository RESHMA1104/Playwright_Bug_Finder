import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";


export class UpdateTraineePage extends BasePage {
    private courseName: Locator;
    private traineeName: Locator;
    private updateBtn: Locator;

    constructor(page: Page) {
        super(page)
        this.courseName = page.locator('//input[@name="course"]');
        this.traineeName = page.locator('//input[@name="trainerName"]');
        this.updateBtn = page.locator('//button[text()="Update"]');
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
}