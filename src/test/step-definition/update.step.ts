import { UpdateTraineePage } from "./../pages/UpdateTraineePage";
import { Given, Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_Finder";
import { UpdateReader, readUpdateData } from "../../utils/csvReader";

const datas: UpdateReader[] = readUpdateData();

Given('The User is in Employee Training Records page', async function (this: BugFinder) {
    await this.basePage.navigate();
});

When('The Users Searches Employee Name', async function (this: BugFinder) {
    for (const ud of datas) {
        await this.employeeTraineeRecordsPage.useEmpNameFilter(ud.empName);
    }
});

When('The User Clicks on Edit Button', async function (this: BugFinder) {
    await this.employeeTraineeRecordsPage.clickEditBtn();
});

When('The User Update trainer name and Course Name', async function (this: BugFinder) {
    for (const ud of datas) {
        await this.updateTraineePage.updateDetails(ud.courseName, ud.traineeName);
    }
});

When('The User Clicks On Update Button', async function (this: BugFinder) {
    await this.updateTraineePage.clickUpdateBtn();
});

Then('The Trainee Details should be Updated', async function (this: BugFinder) {
    for (const ud of datas) {
        await this.employeeTraineeRecordsPage.assertUpdation(ud.courseName, ud.traineeName);
    }
});
When('The User Updates The Status And Completion', async function (this: BugFinder) {
    await this.updateTraineePage.clickDropDown();
    for (const ud of datas) {
        await this.updateTraineePage.updatePercentage(ud.percentage);
    }
});
Then('The Trainee Status should Be Updated', async function (this: BugFinder) {
    await this.updateTraineePage.assertUpdate();
});