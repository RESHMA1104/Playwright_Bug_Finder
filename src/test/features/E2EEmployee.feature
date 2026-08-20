@Prasanna @e2e
Feature: Prasanna 20_08_2026 E2E EmployeeDetails

        Background:
            Given The User is in Employee Training Records page

        Scenario: Add a new training employee successfully
             When the user clicks the Add Employee button
              And the user chooses Project Name
              And the user enter a valid Employee ID, Employee Name, Course, and Trainer Name
              And the user selects a Training Type from the dropdown
              And the user clicks the "Add" button
             Then the newly added training employee record should be displayed on the home page

        Scenario: As an Admin I need TO Update Trainee Details
             When The Users Searches Employee Name
              And The User Clicks on Edit Button
              And The User Update trainer name and Course Name
              And The User Clicks On Update Button
             Then The Trainee Details should be Updated

        Scenario: As an admin user I can delete the records of the Users
             When the user click on the delete icon in the table
             Then the item should remove from the table Sucessfully