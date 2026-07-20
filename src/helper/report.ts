const report = require("multiple-cucumber-html-reporter");

report.generate({
    jsonDir: "./reports/cucumber-json",
    reportPath: "./reports/multiple-cucumber-html/html-report",

    reportName: "Employee Trainee Records CRUD",
    pageTitle: "Employee Trainee Records CRUD",

    displayDuration: true,
    displayReportTime: true,

    metadata: {
        browser: {
            name: "Chromium",
            version: "Latest"
        },
        device: "Windows Desktop",
        platform: {
            name: "Windows",
            version: "11"
        }
    },

    customData: {
        title: "Execution Information",
        data: [
            { label: "Project", value: "Employee Trainee Records CRUD" },
            { label: "Application URL", value: "https://frontend-69a7.vercel.app/" },
            { label: "Framework", value: "Playwright + Cucumber BDD + TypeScript + POM" },
            { label: "Environment", value: "QA" },
            { label: "Execution Type", value: "Regression" },
            { label: "Cycle", value: "Sprint-1" }
        ]
    }
});