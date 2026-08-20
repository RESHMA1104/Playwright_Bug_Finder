@Rishwanth
Feature: Rishwanth_15_07_2026 Update Feature

  Background:
    Given The User is in Employee Training Records page

  Scenario: As an Admin I need TO Update Trainee Details
    When The Users Searches Employee Name
    And The User Clicks on Edit Button
    And The User Update trainer name and Course Name
    And The User Clicks On Update Button
    Then The Trainee Details should be Updated

  Scenario: As a Admin User I need To Update Training Status
    When The Users Searches Employee Name
    And The User Clicks on Edit Button
    And The User Updates The Status And Completion
    And The User Clicks On Update Button
    Then The Trainee Status should Be Updated

  Scenario Outline: To Verify the start and end Date Input field with invalid Date
    When The Users Searches Employee Name
    And The User Clicks on Edit Button
    And The User updates start Date as "<startDate>"
    And The User updates end Date below start Date "<endDate>"
    And The User Clicks On Update Button
    Then The User Should be see an Error message End Date must be after Start Date

    Examples:
      | startDate  | endDate    |
      | 2026-07-21 | 2026-07-20 |
      | 2026-05-10 | 2026-05-02 |

  Scenario Outline: To Verify the Input field of Cource Completion Percentage with Invalid Data
    When The Users Searches Employee Name
    And The User Clicks on Edit Button
    And The User Enter invalid Percentage as "<percentage>"
    And The User Clicks On Update Button
    Then The User Should be see an Error message invalid Percentage

    Examples:
      | percentage |
      |        144 |
      |        -76 |

  Scenario: To verify the Cancel Button Functionality the updates Done
    When The Users Searches Employee Name
    And The User Clicks on Edit Button
    And The User Changes the Course Name
    And THe user Clicks Cancel Button
    Then The Update Should not been made

  Scenario Outline: To Verify the start and end Date Input field with valid Date
    When The Users Searches Employee Name
    And The User Clicks on Edit Button
    And The User updates start Date as "<startDate>"
    And The User updates end Date below start Date "<endDate>"
    And The User Clicks On Update Button
    Then The User Should be see an Error message End Date must be after Start Date

    Examples:
      | startDate  | endDate    |
      | 2026-07-21 | 2026-07-30 |
      | 2026-05-10 | 2026-06-10 |
      | 2026-07-25 | 2027-07-25 |
