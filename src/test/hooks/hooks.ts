import { BugFinder } from "../../world/bug_Finder";
import { Browser, BrowserContext, Page, chromium } from "@playwright/test";
import { Before, After, BeforeAll, AfterAll, Status, setDefaultTimeout } from "@cucumber/cucumber";
import { Delete } from "../pages/DeletePage";
import { UpdateTraineePage } from "../pages/UpdateTraineePage";
import { TraineeRecordPage } from "../pages/EmployeesTraineeRecordsPage";
import { ExportPage } from "../pages/ExportPage";
import { BasePage } from "../pages/BasePage";
import { AddEmployeePage } from "../pages/AddEmployeePage";
import { TraineeSearch } from "../pages/TraineeRecordPage";

setDefaultTimeout(180 * 1000);

let browser: Browser;

// e2e-only shared instances (created once, reused for every @e2e scenario)
let e2eContext: BrowserContext;
let e2ePage: Page;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
});

Before(async function (this: BugFinder, { pickle }) {
    const tags = pickle.tags.map(t => t.name);
    const isE2E = tags.includes("@e2e");

    if (isE2E) {
        // create the shared context/page only once, first time it's needed
        if (!e2eContext) {
            e2eContext = await browser.newContext();
            e2ePage = await e2eContext.newPage();
            e2ePage.setDefaultTimeout(120000);
            e2ePage.setDefaultNavigationTimeout(120000);
        }
        this.browserContext = e2eContext;
        this.page = e2ePage;
    } else {
        // normal scenarios: fresh browser context per scenario, as before
        this.browserContext = await browser.newContext();
        this.page = await this.browserContext.newPage();
        this.page.setDefaultTimeout(120000);
        this.page.setDefaultNavigationTimeout(120000);
    }

    this.browser = browser;
    this.Delete = new Delete(this.page);
    this.exportPage = new ExportPage(this.page);
    this.basePage = new BasePage(this.page);
    this.updateTraineePage = new UpdateTraineePage(this.page);
    this.employeeTraineeRecordsPage = new TraineeRecordPage(this.page);
    this.addEmployeePage = new AddEmployeePage(this.page);
    this.search = new TraineeSearch(this.page);
});

After(async function (this: BugFinder, { pickle, result }) {
    const isE2E = pickle.tags.map(t => t.name).includes("@e2e");

    if (result?.status === Status.FAILED && this.page) {
        const screenshot = await this.page.screenshot({
            path: `reports/screenshots/${pickle.name}.png`,
        });
        await this.attach(screenshot, "image/png");
    }

    // only close per-scenario resources for NON-e2e scenarios
    if (!isE2E) {
        await this.page?.close();
        await this.browserContext?.close();
    }
    // e2e scenarios: leave page/context open for the next scenario
});

AfterAll(async () => {
    // close the shared e2e page/context once, at the very end
    await e2ePage?.close();
    await e2eContext?.close();
    await browser?.close();
});