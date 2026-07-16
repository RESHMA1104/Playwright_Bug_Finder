Feature: Add Training Employee

              Description:As a user,I want to add a new training employee record, So that the employee training details are stored and displayed in the application.

        Background:
            Given the user is on the Employee Training Records home page
             When the user clicks the Add Employee button

        Scenario: Add a new training employee successfully
              And the user enters a valid Project Name, Employee ID, Employee Name, Course, and Trainer Name
              And the user selects a Training Type from the dropdown
              And the user clicks the "Add" button
             Then the newly added training employee record should be displayed on the home page