

/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { Delete } from '../test/pages/DeletePage';
import { UpdateTraineePage } from '../test/pages/UpdateTraineePage';
import { TraineeRecordPage } from '../test/pages/EmployeesTraineeRecordsPage';
import { AddEmployeePage } from '../test/pages/AddEmployeePage';
import { BasePage } from '../test/pages/basepage';

// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    Delete!: Delete;

    basePage!: BasePage;
    updateTraineePage!: UpdateTraineePage;
    employeeTraineeRecordsPage!: TraineeRecordPage;
    addEmployeePage!: AddEmployeePage;

}


// export the world
setWorldConstructor(BugFinder);
