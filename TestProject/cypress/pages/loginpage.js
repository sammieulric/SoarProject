import attributes from "../../attributes.js";

class loginPage{

    login() {
        cy.get(attributes.usernameField).type(Cypress.env('username'))
        cy.get(attributes.passwordField).type(Cypress.env('password'))
        cy.get(attributes.submitButton).contains('Log In').click()
        cy.contains('Welcome').should('be.visible');// Assert login success on mobile
        cy.get(attributes.logoutButton).click()
    }

}

module.exports = new loginPage();