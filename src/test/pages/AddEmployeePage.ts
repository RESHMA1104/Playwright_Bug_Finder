import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AddEmployeePage extends BasePage {

    private addEmployeeButton: Locator;
    private projectNameDropdown: Locator;
    private employeeIdInput: Locator;
    private employeeNameInput: Locator;
    private courseInput: Locator;
    private trainerNameInput: Locator;
    private trainingTypeDropdown: Locator;
    private startDateInput: Locator;
    private endDateInput: Locator;
    private statusDropdown: Locator;
    private percentCompletedInput: Locator;
    private addButton: Locator;
    private resultTable: Locator;

    constructor(page: Page) {
        super(page);

        this.addEmployeeButton =
            page.locator("//button[@aria-label='Add Training']");

        this.projectNameDropdown =
            page.locator("(//div[@role='combobox'])[1]");

        this.employeeIdInput =
            page.locator("//input[@name='empId']");

        this.employeeNameInput =
            page.locator("//input[@name='employeeName']");

        this.courseInput =
            page.locator("//input[@name='course']");

        this.trainerNameInput =
            page.locator("//input[@name='trainerName']");

        this.trainingTypeDropdown =
            page.locator("(//div[@role='combobox'])[2]");

        this.startDateInput =
            page.locator("//input[@name='startDate']");

        this.endDateInput =
            page.locator("//input[@name='endDate']");

        this.statusDropdown =
            page.locator("(//div[@role='combobox'])[3]");

        this.percentCompletedInput =
            page.locator("//input[@name='percentCompleted']");

        this.addButton =
            page.getByRole('button', { name: 'Add', exact: true });

        this.resultTable =
            page.locator("//table[contains(@class,'MuiTable-root')]");
    }

    async clickAddEmployeeButton() {
        await this.addEmployeeButton.click();
    }

    async selectProjectName(projectName: string) {
        await this.projectNameDropdown.click();

        await this.page
            .getByRole('option', {
                name: projectName,
                exact: true
            })
            .click();
    }

    async enterEmployeeDetails(
        empId: string,
        employeeName: string,
        course: string,
        trainerName: string
    ) {
        await this.employeeIdInput.fill(empId);
        await this.employeeNameInput.fill(employeeName);
        await this.courseInput.fill(course);
        await this.trainerNameInput.fill(trainerName);
    }

    async selectTrainingType(trainingType: string) {
        await this.trainingTypeDropdown.click();

        await this.page
            .getByRole('option', {
                name: trainingType,
                exact: true
            })
            .click();
    }

    async enterDateDetails(
        startDate: string,
        endDate: string
    ) {
        await this.startDateInput.fill(startDate);
        await this.endDateInput.fill(endDate);
    }

    async selectStatus(status: string) {
        await this.statusDropdown.click();

        await this.page
            .getByRole('option', {
                name: status,
                exact: true
            })
            .click();
    }

    async enterPercentage(percentCompleted: string) {
        await this.percentCompletedInput.fill(percentCompleted);
    }

    async clickAddButton() {
        await this.addButton.click();
    }

    async verifyEmployeeRecord(
        empId: string,
        employeeName: string
    ) {
        const employeeRow = this.resultTable
            .locator('tr')
            .filter({ hasText: empId })
            .filter({ hasText: employeeName });

        await expect(employeeRow).toBeVisible();
    }
}