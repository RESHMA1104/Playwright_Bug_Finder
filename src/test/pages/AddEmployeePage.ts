import { expect, Locator, Page } from '@playwright/test';
import { BasePage } from './BasePage';


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

        // Button exposes an aria-label -> matches accessible name via getByRole
        this.addEmployeeButton = page.getByRole('button', {
            name: 'Add Training'
        });

        // MUI Select renders role="combobox". Prefer getByLabel when the
        // field has a visible/associated <label> — falls back to
        // getByRole('combobox').nth(n) only if no label exists.
        // NOTE: verify 'Project Name' matches the actual label text in the UI.
        this.projectNameDropdown = page.getByLabel('Project Name');

        // NOTE: verify these label strings match the actual visible labels.
        this.employeeIdInput = page.locator("//input[@name = 'empId']");

        this.employeeNameInput = page.getByLabel('Employee Name');

        this.courseInput = page.getByLabel('Course');

        this.trainerNameInput = page.getByLabel('Trainer Name');

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


    /**
     * Clicks "Add". If the app fires a native browser alert() (e.g. when
     * Trainer Name is blank), it is captured and dismissed automatically;
     * the method returns the alert's message text, or null if no alert
     * appeared.
     *
     * The page.once('dialog', ...) listener is registered BEFORE the click.
     * A JS alert() blocks the page's main thread until dismissed, so
     * Playwright's click() will not resolve until our handler calls
     * dialog.accept() — this is safe to await directly and works
     * identically whether or not a dialog actually fires, so the same
     * method serves both the happy-path and the validation-alert scenario.
     */
    async clickAddButton(): Promise<string | null> {
        await expect(this.addButton).toBeEnabled();

        let alertMessage: string | null = null;

        const dialogHandler = async (dialog: import('@playwright/test').Dialog) => {
            alertMessage = dialog.message();
            await dialog.accept();
        };

        this.page.once('dialog', dialogHandler);

        await this.addButton.click();

        // No dialog fired (happy path) — remove the listener so it doesn't
        // linger and swallow an unrelated dialog later in the test.
        this.page.off('dialog', dialogHandler);

        return alertMessage;
    }


    /**
     * Fills every required field except Trainer Name — used for the
     * "missing Trainer Name" negative scenario. trainerNameInput is
     * intentionally left blank.
     */
    async enterEmployeeDetailsWithoutTrainerName(
        empId: string,
        employeeName: string,
        course: string
    ): Promise<void> {
        await this.employeeIdInput.fill(empId);
        await this.employeeNameInput.fill(employeeName);
        await this.courseInput.fill(course);
    }


    /**
     * Confirms the Add form is still open after a failed submission
     * (validation alert dismissed, record never persisted) — the app's
     * JS only calls its close/refresh callbacks after a successful
     * post/put, so the Add button remaining visible/enabled is evidence
     * the record was NOT added.
     */
    async verifyAddFormRemainsOpen(): Promise<void> {
        await expect(this.addButton).toBeVisible();
        await expect(this.addButton).toBeEnabled();
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