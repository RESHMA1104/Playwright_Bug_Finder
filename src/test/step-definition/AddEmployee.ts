import { When, Then } from '@cucumber/cucumber';
import { BugFinder } from '../../world/bug_Finder';
import { readAddTrainingData } from '../../utils/csvReader';

const trainingData = readAddTrainingData()[0];

if (!trainingData) {
    throw new Error('No records found in addTrainingData.csv');
}

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

When('the user clicks the {string} button', async function (
        this: BugFinder,
        buttonName: string
    ) {
        if (buttonName.toLowerCase() !== 'add') {
            throw new Error(
                `Unsupported button requested: ${buttonName}`
            );
        }

        await this.addEmployeePage.clickAddButton();
    }
);

Then('the newly added training employee record should be displayed on the home page', async function (this: BugFinder) {
        await this.addEmployeePage.verifyEmployeeRecord(
            trainingData.empId,
            trainingData.employeeName
        );
    }
);