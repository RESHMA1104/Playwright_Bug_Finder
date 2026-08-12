import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";

export class Delete extends BasePage{
    private DeleteRow : Locator
    private DeteIcon : Locator
    private Allid : Locator
    private name!: string;
  
    
    constructor(page:Page){
        super(page)
        this.DeleteRow = page.locator('//tbody[@class="MuiTableBody-root css-y6j1my"]/tr[1]/td[2]')
        this.DeteIcon = page.locator("//tbody/tr[1]//button[@aria-label='delete']")
        this.Allid =page.locator('//tbody[@class="MuiTableBody-root css-y6j1my"]/tr/td[2]')
    }

    async getdata(){
        let name = await  this.getText(this.DeleteRow)
        console.log(name)

    }

    async clickdelete(){
      await  this.click(this.DeteIcon)
    const   idList: string[] = await this.Allid.allTextContents();
    }

    async assertTable() {
        const idList = (await this.Allid.allTextContents()).map(id => id.trim());
        expect(idList).not.toContain(this.name);
    }


}

