import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";

export class TraineeSearch extends BasePage {

    private empNameFilter: Locator;
    private projectNameFilter: Locator;
    private trainingTypeFilter: Locator;

    private editBtn: Locator;
    private course: Locator;
    private traineeName: Locator;

    constructor(page: Page) {
        super(page);

        // Filters
        this.projectNameFilter = page.getByRole('combobox').nth(0);
        this.empNameFilter = page.locator('(//input[@placeholder="Filter"])[3]');

        // We will fix Training Type locator separately
        this.trainingTypeFilter = page.locator('(//input[@placeholder="Filter"])[6]');

        // Existing locators
        this.editBtn = page.locator('(//button[@aria-label="edit"])[1]');
        this.course = page.locator('(//td[4])[1]');
        this.traineeName = page.locator('(//td[5])[1]');
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


    // -----------------------------------------
    // Project Name Filter
    // -----------------------------------------

    async filterByProjectName(projectName: string) {

        await this.click(this.projectNameFilter);

        await this.page
            .getByRole('option', { name: projectName, exact: true })
            .click();
    }


    // -----------------------------------------
    // Verify Project Name
    // -----------------------------------------

    async verifyProjectName(projectName: string) {

        const projectCells = this.page.locator('td').filter({
            hasText: projectName
        });

        await expect(projectCells.first()).toBeVisible({
            timeout: 10000
        });

        await expect(projectCells.first()).toHaveText(projectName);
    }


    // -----------------------------------------
    // Training Type Filter
    // -----------------------------------------

   async filterByTrainingType(trainingType: string) {

    // click training type dropdown
    await this.trainingTypeFilter.click();


    // wait for dropdown popup
    await this.page.waitForTimeout(1000);
    // select value from MUI menu
    await this.page.locator('.MuiMenuItem-root').filter({ hasText: trainingType }).click();
}

    // -----------------------------------------
    // Verify Training Type
    // -----------------------------------------

    async verifyTrainingType(trainingType: string) {

        const trainingTypeCell = this.page.locator('td').filter({
            hasText: trainingType
        });

        await expect(trainingTypeCell.first()).toBeVisible({
            timeout: 10000
        });

        await expect(trainingTypeCell.first()).toHaveText(trainingType);
    }
}