/*/*
    CustomWorld Creation to use cross the Project 
*/

import { setWorldConstructor, World } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page } from '@playwright/test';


// CustomWorld extends World
export class BugFinder extends World {
    browser!: Browser;
    browserContext!: BrowserContext;
    page!: Page;

}


// export the world
setWorldConstructor(BugFinder);