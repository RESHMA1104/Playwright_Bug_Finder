/*/*
    Hooks to execute Before and After the Method and entire Test
*/

import { BugFinder } from "../../world/bug_Finder";
import { Browser, chromium, firefox } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Delete } from "../pages/DeletePage";
import { UpdateTraineePage } from "../pages/UpdateTraineePage";
import { TraineeRecordPage } from "../pages/EmployeesTraineeRecordsPage";
import { ExportPage } from "../pages/ExportPage";
import { BasePage } from "../pages/basepage"; 
import { AddEmployeePage } from "../pages/AddEmployeePage";
// Default Timeout
setDefaultTimeout(180 * 1000);

let browser: Browser;

// Browser launch the application 
BeforeAll(async () => {

    browser = await chromium.launch({
        headless: false
    })
})

// Reference to the Object and creating the resource to the CustomWorld
Before(async function (this: BugFinder) {

    this.browser = browser;
    this.browserContext = await this.browser.newContext();
    this.page = await this.browserContext.newPage();

    this.page.setDefaultTimeout(120000);
    this.page.setDefaultNavigationTimeout(120000);
    this.Delete = new Delete(this.page);
    this.basePage = new BasePage(this.page);
    this.exportPage = new ExportPage(this.page);
 
})

// If the test Failed ScreenShot capture 
After(async function (this: BugFinder, { pickle, result }) {
    if (result?.status == Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${pickle.name}.png`
        });
        await this.attach(screenshot, "image/png");
    }

    await this.page?.close();
    await this.browserContext?.close();
})


// Closing all the resource 
AfterAll(async () => {
    await browser?.close();
})
