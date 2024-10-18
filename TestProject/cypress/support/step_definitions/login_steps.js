import loginPage from "../../pages/loginpage";
import registrationPage from "../../pages/registrationpage"
import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps'
import attributes from "../../../attributes";

//const { Given, When, Then } = require('cypress-cucumber-preprocessor/steps');

let user;
let registrationResponse;
let loginResponse;
let credentials = {};

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
    credentials = {
        username: user.username,
        password: user.password
    };
});

When('I send a POST request to the registration endpoint with the user data', () => {
    const url = `https://parabank.parasoft.com/parabank/register/${user.username}/${user.password}/${user.firstName}/${user.lastName}/${user.address}/${user.city}/${user.state}/${user.zipCode}/${user.phoneNumber}/${user.ssn}`;
    cy.request({
        method: 'POST',
        url: url
    }).then((response) => {
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
    expect(credentials).to.have.property('username');
    expect(credentials).to.have.property('password');
});

When('I send a POST request to the login endpoint with the credentials', () => {
    const url = `https://parabank.parasoft.com/parabank/login/${credentials.username}/${credentials.password}`;
    cy.request({
        method: 'POST',
        url: url
    }).then((response) => {
        loginResponse = response;
    });
});

Then('I should receive a 200 status code', () => {
    expect(loginResponse.status).to.eq(200);
});

Then('The response should contain a valid authentication token', () => {
    expect(loginResponse.body).to.have.property('authToken');
});