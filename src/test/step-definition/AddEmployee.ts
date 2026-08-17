import { Before, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { BugFinder } from '../../world/bug_Finder';
import { readAddTrainingData } from '../../utils/csvReader';
import {
    generateTrainingEmployeeData,
    TrainingEmployeeData
} from '../../utils/fakerData';

const trainingDataRows = readAddTrainingData();

if (!trainingDataRows || trainingDataRows.length === 0) {
    throw new Error('No records found in addTrainingData.csv');
}

// Only project/course/date/status/percent come from the CSV.
// Employee ID / Name / Trainer are generated per-scenario so tests
// don't collide on the same "employee" across runs.
const trainingData = trainingDataRows[0];

// Module-scoped instead of stored on the World — see note below.
// Cucumber runs steps for a single scenario sequentially, and each
// worker process gets its own copy of this module, so this is safe.
// If steps here ever needed to share state across parallel work
// within a single scenario, move these onto the World instead.
let alertMessage: string | null = null;
let currentEmployee: TrainingEmployeeData | null = null;

Before(function () {
    // Reset per-scenario state so a failure/skip in one scenario
    // can't leak stale data into the next.
    alertMessage = null;
    currentEmployee = null;
});

When('the user clicks the Add Employee button', async function (this: BugFinder) {
    await this.addEmployeePage.clickAddEmployeeButton();
});

When('the user chooses Project Name', async function (this: BugFinder) {
    await this.addEmployeePage.selectProjectName(trainingData.projectName);
});

When(
    'the user enter a valid Employee ID, Employee Name, Course, and Trainer Name',
    async function (this: BugFinder) {
        currentEmployee = generateTrainingEmployeeData();

        await this.addEmployeePage.enterEmployeeDetails(
            currentEmployee.empId,
            currentEmployee.employeeName,
            trainingData.course,
            currentEmployee.trainerName
        );
    }
);

// Negative scenario: fills every field except Trainer Name.
When(
    'the user enters a valid Employee ID, Employee Name, and Course, leaving Trainer Name blank',
    async function (this: BugFinder) {
        currentEmployee = generateTrainingEmployeeData();

        await this.addEmployeePage.enterEmployeeDetailsWithoutTrainerName(
            currentEmployee.empId,
            currentEmployee.employeeName,
            trainingData.course
        );
    }
);

// FIX — was missing entirely; required by the Scenario Outline.
When(
    'the user enters dynamically generated Employee ID, Employee Name, Course, and Trainer Name',
    async function (this: BugFinder) {
        currentEmployee = generateTrainingEmployeeData();

        await this.addEmployeePage.enterEmployeeDetails(
            currentEmployee.empId,
            currentEmployee.employeeName,
            trainingData.course,
            currentEmployee.trainerName
        );
    }
);

When('the user selects a Training Type from the dropdown', async function (this: BugFinder) {
    await this.addEmployeePage.selectTrainingType(trainingData.trainingType);
    await this.addEmployeePage.enterDateDetails(trainingData.startDate, trainingData.endDate);
    await this.addEmployeePage.selectStatus(trainingData.status);
    await this.addEmployeePage.enterPercentage(trainingData.percentCompleted);
});

// FIX — was missing entirely; matches `the user selects Training Type "<trainingType>"`
// in the Scenario Outline, driven by the Examples table rather than the CSV.
When(
    'the user selects Training Type {string}',
    async function (this: BugFinder, trainingType: string) {
        await this.addEmployeePage.selectTrainingType(trainingType);
        await this.addEmployeePage.enterDateDetails(trainingData.startDate, trainingData.endDate);
        await this.addEmployeePage.selectStatus(trainingData.status);
        await this.addEmployeePage.enterPercentage(trainingData.percentCompleted);
    }
);

When(
    'the user clicks the {string} button',
    async function (this: BugFinder, buttonName: string) {
        if (buttonName.toLowerCase() !== 'add') {
            throw new Error(`Unsupported button requested: ${buttonName}`);
        }

        alertMessage = await this.addEmployeePage.clickAddButton();
    }
);

Then(
    'the newly added training employee record should be displayed on the home page',
    async function (this: BugFinder) {
        if (!currentEmployee) {
            throw new Error('No employee data was entered before verification.');
        }

        await this.addEmployeePage.verifyEmployeeRecord(
            currentEmployee.empId,
            currentEmployee.employeeName,
            trainingData.course,
            currentEmployee.trainerName
        );
    }
);

Then(
    'an alert popup with the message {string} should be displayed',
    async function (this: BugFinder, expectedMessage: string) {
        expect(alertMessage).toBe(expectedMessage);
    }
);

Then('the training employee record should not be added', async function (this: BugFinder) {
    await this.addEmployeePage.verifyAddFormRemainsOpen();
});