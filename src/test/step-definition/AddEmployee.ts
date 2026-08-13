import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BugFinder } from '../../world/bug_Finder';
import { readAddTrainingData } from '../../utils/csvReader';

const trainingData = readAddTrainingData()[0];

if (!trainingData) {
    throw new Error('No records found in addTrainingData.csv');
}

// Module-scoped instead of stored on the World, so no change to
// BugFinder's type definition is required. Cucumber runs steps for a
// single scenario sequentially and this file's steps only ever run
// within one scenario at a time, so this is safe — just be aware it
// would need to move onto the World if steps here ever ran in parallel
// workers sharing this module.
let alertMessage: string | null = null;

When('the user clicks the Add Employee button', async function (this: BugFinder) {
        await this.addEmployeePage.clickAddEmployeeButton();
    }
);

When('the user chooses Project Name', async function (this: BugFinder) {
        await this.addEmployeePage.selectProjectName(
            trainingData.projectName
        );
    }
);

When('the user enter a valid Employee ID, Employee Name, Course, and Trainer Name', async function (this: BugFinder) {
        await this.addEmployeePage.enterEmployeeDetails(
            trainingData.empId,
            trainingData.employeeName,
            trainingData.course,
            trainingData.trainerName
        );
    }
);

// NEW — negative scenario: fills every field except Trainer Name.
When('the user enters a valid Employee ID, Employee Name, and Course, leaving Trainer Name blank', async function (this: BugFinder) {
        await this.addEmployeePage.enterEmployeeDetailsWithoutTrainerName(
            trainingData.empId,
            trainingData.employeeName,
            trainingData.course
        );
    }
);

When('the user selects a Training Type from the dropdown', async function (this: BugFinder) {
        await this.addEmployeePage.selectTrainingType(
            trainingData.trainingType
        );

        await this.addEmployeePage.enterDateDetails(
            trainingData.startDate,
            trainingData.endDate
        );

        await this.addEmployeePage.selectStatus(
            trainingData.status
        );

        await this.addEmployeePage.enterPercentage(
            trainingData.percentCompleted
        );
    }
);

// UPDATED — clickAddButton() now returns the native alert's message
// (or null if no alert fired). Stored on the World so the Then step
// below can assert on it. Works unchanged for the happy-path scenario,
// where alertMessage will simply be null and go unused.
When('the user clicks the {string} button', async function (
        this: BugFinder,
        buttonName: string
    ) {
        if (buttonName.toLowerCase() !== 'add') {
            throw new Error(
                `Unsupported button requested: ${buttonName}`
            );
        }

        alertMessage = await this.addEmployeePage.clickAddButton();
    }
);

Then('the newly added training employee record should be displayed on the home page', async function (this: BugFinder) {
        await this.addEmployeePage.verifyEmployeeRecord(
            trainingData.empId,
            trainingData.employeeName,
            trainingData.course,
            trainingData.trainerName
        );
    }
);

// NEW — asserts the exact text of the native validation alert.
Then('an alert popup with the message {string} should be displayed', async function (
        this: BugFinder,
        expectedMessage: string
    ) {
        expect(alertMessage).toBe(expectedMessage);
    }
);

// NEW — confirms the record was never persisted (Add form still open,
// since the app's success callbacks only run after a successful post/put).
Then('the training employee record should not be added', async function (this: BugFinder) {
        await this.addEmployeePage.verifyAddFormRemainsOpen();
    }
);