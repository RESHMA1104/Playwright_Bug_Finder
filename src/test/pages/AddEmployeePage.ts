import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './basepage';

export class AddEmployeePage extends BasePage {

    private readonly addEmployeeButton: Locator;
    private readonly projectNameDropdown: Locator;
    private readonly employeeIdInput: Locator;
    private readonly employeeNameInput: Locator;
    private readonly courseInput: Locator;
    private readonly trainerNameInput: Locator;
    private readonly trainingTypeDropdown: Locator;
    private readonly startDateInput: Locator;
    private readonly endDateInput: Locator;
    private readonly statusDropdown: Locator;
    private readonly percentCompletedInput: Locator;
    private readonly addButton: Locator;
    private readonly resultTable: Locator;

    constructor(page: Page) {
        super(page);

        this.addEmployeeButton = page.locator(
            "//button[@aria-label='Add Training']"
        );

        this.projectNameDropdown = page.locator(
            "(//div[@role='combobox'])[1]"
        );

        this.employeeIdInput = page.locator(
            "//input[@name='empId']"
        );

        this.employeeNameInput = page.locator(
            "//input[@name='employeeName']"
        );

        this.courseInput = page.locator(
            "//input[@name='course']"
        );

        this.trainerNameInput = page.locator(
            "//input[@name='trainerName']"
        );

        this.trainingTypeDropdown = page.locator(
            "(//div[@role='combobox'])[2]"
        );

        this.startDateInput = page.locator(
            "//input[@name='startDate']"
        );

        this.endDateInput = page.locator(
            "//input[@name='endDate']"
        );

        this.statusDropdown = page.locator(
            "(//div[@role='combobox'])[3]"
        );

        this.percentCompletedInput = page.locator(
            "//input[@name='percentCompleted']"
        );

        this.addButton = page.getByRole('button', {
            name: 'Add',
            exact: true
        });

        this.resultTable = page.locator(
            "//table[contains(@class,'MuiTable-root')]"
        );
    }

    async clickAddEmployeeButton(): Promise<void> {
        await expect(this.addEmployeeButton).toBeVisible();
        await this.addEmployeeButton.click();
    }

    async selectProjectName(projectName: string): Promise<void> {
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
    ): Promise<void> {
        await this.employeeIdInput.fill(empId);
        await this.employeeNameInput.fill(employeeName);
        await this.courseInput.fill(course);
        await this.trainerNameInput.fill(trainerName);
    }

    async selectTrainingType(
        trainingType: string
    ): Promise<void> {
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
    ): Promise<void> {
        await this.startDateInput.fill(startDate);
        await this.endDateInput.fill(endDate);
    }

    async selectStatus(status: string): Promise<void> {
        await this.statusDropdown.click();

        await this.page
            .getByRole('option', {
                name: status,
                exact: true
            })
            .click();
    }

    async enterPercentage(
        percentCompleted: string
    ): Promise<void> {
        await this.percentCompletedInput.fill(percentCompleted);
    }

    async clickAddButton(): Promise<void> {
        await expect(this.addButton).toBeEnabled();
        await this.addButton.click();
    }

    async verifyEmployeeRecord(
    empId: string,
    employeeName: string,
    course: string,
    trainerName: string
): Promise<void> {

    const matchingRows = this.resultTable
        .getByRole('row')
        .filter({
            has: this.page.getByRole('cell', {
                name: empId,
                exact: true
            })
        })
        .filter({
            has: this.page.getByRole('cell', {
                name: employeeName,
                exact: true
            })
        })
        .filter({
            has: this.page.getByRole('cell', {
                name: course,
                exact: true
            })
        })
        .filter({
            has: this.page.getByRole('cell', {
                name: trainerName,
                exact: true
            })
        });

    await expect(matchingRows).not.toHaveCount(0);

    const newlyAddedRow = matchingRows.last();

    await newlyAddedRow.scrollIntoViewIfNeeded();
    await expect(newlyAddedRow).toBeVisible();
}
    
}