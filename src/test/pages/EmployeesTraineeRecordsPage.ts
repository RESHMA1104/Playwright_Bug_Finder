import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage";

export class TraineeRecordPage extends BasePage {
    private empNameFilter: Locator;
    private editBtn: Locator;
    private course: Locator;
    private traineeName: Locator;


    constructor(page: Page) {
        super(page)
        this.empNameFilter = page.locator('(//input[@placeholder="Filter"])[3]');
        this.editBtn = page.locator('//button[@aria-label="edit"]');
        this.course = page.locator('//td[4]');
        this.traineeName = page.locator('//td[5]');
    }

    async useEmpNameFilter(empName: string) {
        await this.click(this.empNameFilter);
        await this.fill(this.empNameFilter, empName);
    }

    async clickEditBtn() {
        await this.click(this.editBtn);
    }

    async assertUpdation(course: string, traineeName: string) {
        await this.toContainText(this.course, course);
        await this.toContainText(this.traineeName, traineeName);
    }

}