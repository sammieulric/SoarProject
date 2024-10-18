import loginPage from "../../pages/loginpage";
import registrationPage from "../../pages/registrationpage"
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import attributes from "../../../attributes";

//const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

let user;
let registrationResponse;
let loginResponse;

Given('I have valid user data', () => {
    user = {
        username: Cypress.env('username') + Math.floor(Math.random() * 1000),
        password: Cypress.env('password'),
        firstName: Cypress.env('username'),
        lastName: Cypress.env('lastName'),
        address: Cypress.env('address'),
        city: Cypress.env('city'),
        state: Cypress.env('state'),
        zipCode: Cypress.env('zipCode'),
        phoneNumber: Cypress.env('phoneNumber'),
        ssn: Cypress.env('ssn'),
    };
});

When('I send a POST request to the registration endpoint with the user data', () => {
    cy.request('POST', 'https://parabank.parasoft.com/parabank/register', user).then((response) => {
        registrationResponse = response;
    });
});

Then('I should receive a 201 status code', () => {
    expect(registrationResponse.status).to.eq(201);
});

Then('The response should contain the newly registered user details', () => {
    expect(registrationResponse.body).to.have.property('username', user.username);
});

Given('I have registered user credentials', () => {
    // Previous scenario should have registered the user, using the same user data
    // Assume that user is already registered and available in the `user` variable
});

When('I send a POST request to the login endpoint with the credentials', () => {
    cy.request('POST', 'https://parabank.parasoft.com/parabank/login', user.username, user.password).then((response) => {
        loginResponse = response;
    });
});

Then('I should receive a 200 status code', () => {
    expect(loginResponse.status).to.eq(200);
});

Then('The response should contain a valid authentication token', () => {
    expect(loginResponse.body).to.have.property('authToken');
});