
/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';
import { Delete } from '../test/pages/DeletePage';

import type { UpdateTraineePage } from '../test/pages/UpdateTraineePage';
import type { TraineeRecordPage } from '../test/pages/EmployeesTraineeRecordsPage';
import type { AddEmployeePage } from '../test/pages/AddEmployeePage';
import { ExportPage } from '../test/pages/ExportPage';
import { BasePage } from '../test/pages/basepage';


// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;
    Delete!:Delete;
   
    updateTraineePage!: UpdateTraineePage;
    employeeTraineeRecordsPage!: TraineeRecordPage;
    addEmployeePage!: AddEmployeePage;
    exportPage!: ExportPage;
    basePage!: BasePage;

}


// export the world
setWorldConstructor(BugFinder);
