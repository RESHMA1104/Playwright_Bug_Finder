import { expect, type Locator, Page } from "@playwright/test";

import { BasePage } from "./BasePage";
export class UpdateTraineePage extends BasePage {
    private courseName: Locator;
    private traineeName: Locator;
    private updateBtn: Locator;
    private statusDropDown: Locator;
    private optionDD: Locator;
    private completePercentage: Locator;
    private Status: Locator;
    private startDate: Locator;
    private endDate: Locator;
    private cancelBtn: Locator;
    private cnameMain: Locator;

    constructor(page: Page) {
        super(page)
        this.courseName = page.locator('//input[@name="course"]');
        this.traineeName = page.locator('//input[@name="trainerName"]');
        this.updateBtn = page.locator('//button[text()="Update"]');
        this.statusDropDown = page.getByRole('combobox', { name: /status/i });
        this.optionDD = page.locator('//li[text()="Completed"]');
        this.completePercentage = page.locator('//input[@name="percentCompleted"]');
        this.Status = page.locator('(//tr/td)[9]');
        this.startDate = page.locator('//input[@name="startDate"]');
        this.endDate = page.locator('//input[@name="endDate"]');
        this.cancelBtn = page.locator('//button[text()="Cancel"]');
        this.cnameMain = page.locator('(//td)[4]');
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

    async enterStartDate(sdate: string) {
        await this.fill(this.startDate, sdate);
    }

    async enterEndDate(edate: string) {
        await this.fill(this.endDate, edate);
    }

    async enterPercentage(percentage: string) {
        await this.fill(this.completePercentage, percentage);
    }

    async getCurrentCourseName() {
        return await this.getText(this.courseName);
    }
    async updateCourseName(cname: string) {
        await this.fill(this.courseName, cname);
    }

    async clickCancelBtn() {
        await this.click(this.cancelBtn);
    }

    async mainPageCname() {
        return await this.getText(this.cnameMain);
    }
}