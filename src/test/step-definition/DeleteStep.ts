import { When, Then } from "@cucumber/cucumber";
import { BugFinder } from "../../world/bug_Finder";



When("the use click on the delete icon in the table",async function (this: BugFinder) { 
    await this.Delete.getdata()
    await this.Delete.clickdelete()

  }
);

Then("the item should remove from the table Sucessfully",async function (this: BugFinder) {

  }
);