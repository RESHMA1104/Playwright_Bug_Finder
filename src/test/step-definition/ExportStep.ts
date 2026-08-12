import { Given, When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_Finder";

Given('the user is on the Employee Training Records page', async function (this: BugFinder) {
    await this.basePage.navigate();
    await this.exportPage.EmployeeTrainingRecordsPage();
});

When('the user clicks the Export to Excel button', async function (this: BugFinder) {
    await this.exportPage.ClickExportData();
});

Then('the employee training records should be exported successfully', async function (this: BugFinder) {
    await this.exportPage.VerifyExport();
});