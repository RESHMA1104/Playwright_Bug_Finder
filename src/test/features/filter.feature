@haritha
Feature: Haritha_21_july_2026 Filter Search in employee table feature

 Background:
    Given The User is in Employee Training Records page

  @projectFilter
  Scenario Outline: Admin user can filter training records using Project Name
    When The User filters the Project Name as "<projectName>"
    Then The Training Records should display only "<projectName>" project

    Examples:
      | projectName |
      | ABC         |
      | CDE         |
      | EFG         |
      | KLM         |

  @trainingTypeFilter
  Scenario: Admin user can filter training records using different Training Types
    When The User filters the Training Type using the following data
      | trainingType |
      | Udemy        |
      | Classroom    |
      | Coursera     |
      | Virtual      |
    Then The Training Records should be displayed according to the selected Training Type