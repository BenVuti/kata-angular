describe('Form tests', () => {
  it('Completes the form with no issues', () => {
    cy.visit('/');
    cy.contains('Information générales');

    cy.get('[formControlName=civility]').click();
    cy.contains('Monsieur').click();

    cy.get('[formControlName=firstName]').type('John');
    cy.get('[formControlName=lastName]').type('Doe');
    cy.get('[formControlName=email]').type('john.doe@example.com');
    cy.get('[formControlName=phoneNumber]').type('0123456789');

    cy.get('button[type=submit]').click();

    cy.url().should('include', '/step2');

    cy.get('[formControlName=ownershipStatus]').click();
    cy.get('span.mat-option-text').contains('Propriétaire').click();

    cy.get('[formControlName=householdSize]').type('3');
    cy.get('[formControlName=householdIncome]').type('80000');
    cy.get('[formControlName=propertySize]').type('900');

    cy.get('button[type=submit]').click();

    cy.url().should('include', '/step3');

    cy.contains('Merci Mr John Doe !');
    cy.contains('Le montant nécessaire à la réalisation de votre projet');
    cy.contains('Effy vous propose une aide ');
  });
});
