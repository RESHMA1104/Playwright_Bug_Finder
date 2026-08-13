@Reshma
Feature: Reshma_17_07_2026 Export Employee Data

Background:
Given the user is on the Employee Training Records page

Scenario: Export employee data successfully
When the user clicks the Export to Excel button
Then the employee training records should be exported successfully