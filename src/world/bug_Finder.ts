/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import type { BasePage } from '../test/pages/BasePage';
import type { UpdateTraineePage } from '../test/pages/UpdateTraineePage';
import type { TraineeRecordPage } from '../test/pages/EmployeesTraineeRecordsPage';
import type { AddEmployeePage } from '../test/pages/AddEmployeePage';


// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    basePage!: BasePage;
    updateTraineePage!: UpdateTraineePage;
    employeeTraineeRecordsPage!: TraineeRecordPage;
    addEmployeePage!: AddEmployeePage;

}


// export the world
setWorldConstructor(BugFinder);