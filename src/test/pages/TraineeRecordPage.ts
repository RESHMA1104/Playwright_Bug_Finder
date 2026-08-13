import { expect, type Locator, Page } from "@playwright/test";
import { BasePage } from "./basepage";

export class TraineeSearch extends BasePage {

    private empNameFilter: Locator;
    private projectNameFilter: Locator;
    private trainingTypeFilter: Locator;

    private editBtn: Locator;
    private course: Locator;
    private traineeName: Locator;

    constructor(page: Page) {
        super(page);
        this.projectNameFilter = page.getByRole('combobox').nth(0);
        this.empNameFilter = page.locator(
            '(//input[@placeholder="Filter"])[3]'
        );

        this.trainingTypeFilter = page.locator('(//input[@placeholder="Filter"])[6]').locator('xpath=..');
        this.editBtn = page.locator('(//button[@aria-label="edit"])[1]');
        this.course = page.locator('(//td[4])[1]');
        this.traineeName = page.locator( '(//td[5])[1]' );
    }


    // -----------------------------------------
    // Employee Name Filter
    // -----------------------------------------

    async useEmpNameFilter(empName: string) {

        await this.click(this.empNameFilter);

        await this.fill(
            this.empNameFilter,
            empName
        );
    }


    // -----------------------------------------
    // Edit Button
    // -----------------------------------------

    async clickEditBtn() {

        await this.click(this.editBtn);
    }


    // -----------------------------------------
    // Verify Updated Details
    // -----------------------------------------

    async assertUpdation(
        course: string,
        traineeName: string
    ) {

        await this.toContainText(
            this.course,
            course
        );

        await this.toContainText(
            this.traineeName,
            traineeName
        );
    }


    // =========================================
    // PROJECT NAME FILTER
    // =========================================

    async filterByProjectName(
        projectName: string
    ) {

        await this.click(
            this.projectNameFilter
        );

        await this.page
            .getByRole(
                'option',
                {
                    name: projectName,
                    exact: true
                }
            )
            .click();
    }


    // -----------------------------------------
    // Verify Project Name
    // -----------------------------------------

    async verifyProjectName(
        projectName: string
    ) {

        const projectCells =
            this.page
                .locator('td')
                .filter({
                    hasText: projectName
                });

        await expect(
            projectCells.first()
        ).toBeVisible({
            timeout: 10000
        });

        await expect(
            projectCells.first()
        ).toHaveText(projectName);
    }


    // =========================================
    // TRAINING TYPE FILTER
    // =========================================

    async filterByTrainingType(
        trainingType: string
    ) {

        // Click the visible parent of the hidden MUI input
        await this.trainingTypeFilter.click();


        // Wait for MUI dropdown to open
        await this.page.waitForTimeout(500);


        /*
         * MUI Select options are normally rendered
         * outside the table.
         *
         * Use the visible option text but restrict
         * the search to the popup/menu.
         */
        const option = this.page
            .locator(
                '[role="listbox"] [role="option"]'
            )
            .filter({
                hasText: trainingType
            });


        await expect(option.first())
            .toBeVisible({
                timeout: 10000
            });


        await option.first().click();
    }


    // -----------------------------------------
    // Verify Training Type
    // -----------------------------------------

    async verifyTrainingType(
        trainingType: string
    ) {

        const trainingTypeCell =
            this.page
                .locator('tbody td')
                .filter({
                    hasText: trainingType
                });

        await expect(
            trainingTypeCell.first()
        ).toBeVisible({
            timeout: 10000
        });

        await expect(
            trainingTypeCell.first()
        ).toHaveText(trainingType);
    }
}