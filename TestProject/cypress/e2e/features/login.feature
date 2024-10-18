Feature: Registration and Login API Automation

  Scenario: Successful User Registration
    Given I have valid user data
    When I send a POST request to the registration endpoint with the user data
    Then I should receive a 201 status code
    And The response should contain the newly registered user details

  Scenario: User Login
    Given I have registered user credentials
    When I send a POST request to the login endpoint with the credentials
    Then I should receive a 200 status code
    And The response should contain a valid authentication token