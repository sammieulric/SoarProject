import attributes from "../../attributes.js"

class registrationPage{

    visitPage() {
        cy.visit('/')
    }

    registrationForm(username, password, repeatPassword) {
        cy.get(attributes.registerButton).click()
        cy.get(attributes.firstNameField).type(Cypress.env('username'))
        cy.get(attributes.lastNameField).type(Cypress.env('lastName'))
        cy.get(attributes.addressField).type(Cypress.env('address'))
        cy.get(attributes.cityField).type(Cypress.env('city'))
        cy.get(attributes.stateField).type(Cypress.env('state'))
        cy.get(attributes.zipCodeField).type(Cypress.env('zipCode'))
        cy.get(attributes.phoneNumberField).type(Cypress.env('phoneNumber'))
        cy.get(attributes.ssnField).type(Cypress.env('ssn'))
        cy.get(attributes.regUsernameField).type(Cypress.env('username'))
        cy.get(attributes.regPasswordField).type(Cypress.env('password'))
        cy.get(attributes.repeatedPasswordField).type(Cypress.env('password'))

    }

    submit() {
        cy.get(attributes.submitButton).contains('Register').click()
        cy.contains('Your account was created successfully').should('be.visible');
    }

}
module.exports = new registrationPage();