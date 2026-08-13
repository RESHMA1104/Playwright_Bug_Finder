import { When, Then, DataTable } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_Finder";

When('The User filters the Project Name as {string}', async function (this: BugFinder, projectName: string) {
    await this.search.filterByProjectName(projectName);
});

Then('The Training Records should display only {string} project', async function (this: BugFinder, projectName: string) {
    await this.search.verifyProjectName(projectName);
});

When('The User filters the Training Type using the following data', async function (this: BugFinder, dataTable: DataTable) {
    const trainingTypes = dataTable.hashes();
    for (const data of trainingTypes) {
        await this.search.filterByTrainingType(data.trainingType);
        await this.search.verifyTrainingType(data.trainingType);
    }
});

Then('The Training Records should be displayed according to the selected Training Type', async function (this: BugFinder) {
    console.log("Training Type filtering verified successfully");
});