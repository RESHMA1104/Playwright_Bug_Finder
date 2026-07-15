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
