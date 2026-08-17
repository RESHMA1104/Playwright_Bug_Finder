@Prasanna
Feature: Prasanna 15_07_2026 Add Training Employee

              Description:As a user,I want to add a new training employee record, So that the employee training details are stored and displayed in the application.

        Background:
            Given The User is in Employee Training Records page
             When the user clicks the Add Employee button

        Scenario: Add a new training employee successfully
              And the user chooses Project Name
              And the user enter a valid Employee ID, Employee Name, Course, and Trainer Name
              And the user selects a Training Type from the dropdown
              And the user clicks the "Add" button
             Then the newly added training employee record should be displayed on the home page

        Scenario: Attempt to add a training employee without a Trainer Name shows a validation alert
              And the user chooses Project Name
              And the user enters a valid Employee ID, Employee Name, and Course, leaving Trainer Name blank
              And the user selects a Training Type from the dropdown
              And the user clicks the "Add" button
             Then an alert popup with the message "Trainer Name is required." should be displayed
              And the training employee record should not be added

        Scenario Outline: Add mutilple Courses
              And the user chooses Project Name
              And the user enters dynamically generated Employee ID, Employee Name, Course, and Trainer Name
              And the user selects Training Type "<trainingType>"
              And the user clicks the "Add" button
             Then the newly added training employee record should be displayed on the home page

        Examples:
                  | trainingType |
                  | Udemy        |
                  | Coursera     |
                  | Classroom    |

