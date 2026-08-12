import { Download, expect, Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";

export class ExportPage extends BasePage {

    private exportData: Locator;
    private download!: Download;

    constructor(page: Page) {
        super(page);

        this.exportData = page.locator("//button[text()='Export to Excel']");
    }

    async EmployeeTrainingRecordsPage() {
        await expect(this.exportData).toBeVisible();
    }

    async ClickExportData() {
        const downloadPromise = this.page.waitForEvent("download");

        await this.click(this.exportData);

        this.download = await downloadPromise;
    }

    async VerifyExport() {
        expect(this.download.suggestedFilename()).toBe("training_data.xlsx");
    }
}