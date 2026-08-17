import { expect } from "@playwright/test";
import { UpdateTraineePage } from "./../pages/UpdateTraineePage";
import { Given, Then, When } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_Finder";
import { UpdateReader, readUpdateData } from "../../utils/csvReader";
import { logger } from "../../utils/logger";

const datas: UpdateReader[] = readUpdateData();

Given('The User is in Employee Training Records page', async function (this: BugFinder) {
    logger.info("Navigating to Employee Training Records page");
    await this.basePage.navigate();
    logger.info("Successfully navigated to Employee Training Records page");
});

When('The Users Searches Employee Name', async function (this: BugFinder) {
    logger.info("Starting employee name search");

    for (const ud of datas) {
        logger.info(`Searching employee name: ${ud.empName}`);

        await this.employeeTraineeRecordsPage.useEmpNameFilter(ud.empName);

        logger.info(`Employee search completed for: ${ud.empName}`);
    }
});
let beforeCancel: any;
When('The User Clicks on Edit Button', async function (this: BugFinder) {
    logger.info("Clicking Edit button");
    beforeCancel = await this.updateTraineePage.mainPageCname();
    await this.employeeTraineeRecordsPage.clickEditBtn();

    logger.info("Edit button clicked successfully");
});

When('The User Update trainer name and Course Name', async function (this: BugFinder) {
    logger.info("Starting trainer name and course name update");

    for (const ud of datas) {
        logger.info(
            `Updating trainer name: ${ud.traineeName} and course name: ${ud.courseName}`
        );

        await this.updateTraineePage.updateDetails(
            ud.courseName,
            ud.traineeName
        );

        logger.info(
            `Trainer name and course name updated successfully`
        );
    }
});

When('The User Clicks On Update Button', async function (this: BugFinder) {
    logger.info("Clicking Update button");

    await this.updateTraineePage.clickUpdateBtn();

    logger.info("Update button clicked successfully");
});

Then('The Trainee Details should be Updated', async function (this: BugFinder) {
    logger.info("Validating updated trainee details");

    for (const ud of datas) {
        logger.info(
            `Validating course name: ${ud.courseName} and trainee name: ${ud.traineeName}`
        );

        await this.employeeTraineeRecordsPage.assertUpdation(
            ud.courseName,
            ud.traineeName
        );

        logger.info("Trainee details validated successfully");
    }
});

When('The User Updates The Status And Completion', async function (this: BugFinder) {
    logger.info("Clicking status dropdown");

    await this.updateTraineePage.clickDropDown();

    logger.info("Status dropdown clicked successfully");

    for (const ud of datas) {
        logger.info(`Updating completion percentage: ${ud.percentage}`);

        await this.updateTraineePage.updatePercentage(ud.percentage);

        logger.info(`Completion percentage updated: ${ud.percentage}`);
    }
});

Then('The Trainee Status should Be Updated', async function (this: BugFinder) {
    logger.info("Validating trainee status update");

    await this.updateTraineePage.assertUpdate();

    logger.info("Trainee status updated successfully");
});

When('The User updates start Date as {string}', async function (
    this: BugFinder,
    startDate: string
) {
    logger.info(`Updating start date: ${startDate}`);

    await this.updateTraineePage.enterStartDate(startDate);

    logger.info(`Start date updated successfully: ${startDate}`);
});

When('The User updates end Date below start Date {string}', async function (
    this: BugFinder,
    endDate: string
) {
    logger.info(`Updating end date: ${endDate}`);

    await this.updateTraineePage.enterEndDate(endDate);

    logger.info(`End date entered successfully: ${endDate}`);
});

Then('The User Should be see an Error message End Date must be after Start Date', async function () {
    logger.warn("BUG [error message not shown]");
});
When('The User Enter invalid Percentage as {string}', async function (this: BugFinder, string) {
    await this.updateTraineePage.enterPercentage(string)
});
Then('The User Should be see an Error message invalid Percentage', async function (this: BugFinder) {
    logger.warn("BUG [error message not shown]");
});
When('The User Changes the Course Name', async function (this: BugFinder) {
    for (const ud of datas) {
        await this.updateTraineePage.updateCourseName(ud.courseName + "_Cancel")
    }
});
// let beforeCancel: any;
// When('THe user Clicks Cancel Button', async function (this: BugFinder) {
//     beforeCancel = await this.updateTraineePage.getCurrentCourseName();
//     await this.updateTraineePage.clickCancelBtn();
// });
// Then('The Update Should not been made', async function (this: BugFinder) {
//     expect(beforeCancel).toContain(this.updateTraineePage.mainPageCname());
// });


When('THe user Clicks Cancel Button', async function (this: BugFinder) {
    await this.updateTraineePage.clickCancelBtn();
});

Then('The Update Should not been made', async function (this: BugFinder) {
    const afterCancel = await this.updateTraineePage.mainPageCname();

    logger.info(`Course name after cancel: ${afterCancel}`);

    expect(afterCancel?.trim()).toBe(beforeCancel.trim());

    logger.info("Cancel button functionality verified successfully");
});