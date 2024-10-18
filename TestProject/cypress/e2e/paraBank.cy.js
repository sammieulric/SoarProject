///<reference types = "cypress"  />

import loginPage from "../pages/loginpage";
import registrationPage from "../pages/registrationpage"


describe('Para bank test',() => {

    beforeEach(() => {
        registrationPage.visitPage()
    })

    it('ensure user can register', () => {

        registrationPage.registrationForm()
        registrationPage.submit()

    })

    it('ensure user can login with the created data', () => {

        loginPage.login()

    })

    it('ensure cannot register with already created data', () => {

        registrationPage.registrationForm()
        registrationPage.submit()
        cy.contains('This username already exists').should('be.visible');

    })

    it('ensure site mobile compatibility', () => {
        const mobileViewports = ['iphone-6+','iphone-8', 'iphone-xr', 'ipad-2', 'samsung-note9', 'samsung-s10'];

        mobileViewports.forEach(viewport => {
            cy.viewport(viewport);
            loginPage.login();
        });
    })
})