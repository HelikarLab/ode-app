const fileName = 'carbo2013.xml'

describe('Model Tab Tests', () => {
  before(() => {
    cy.visit('/')
      .get('.options')
      .click()
      .get('.importOption')
      .click()
      .fixture(fileName)
      .then(fileContent => {
        cy.get('.chooseFile').upload({
          encoding: 'utf-8',
          fileContent,
          fileName,
          mimeType: 'application/xml',
        })
      })
      .get('.submit')
      .click()
  })

  it('Reactions populated', () => {
    cy.get('[data-test="reactions-list"]').find('button')
  })

  it('Species populated', () => {
    cy.get('[data-test="species-list"]').find('button')
  })

  it('Infopanel appears correctly on reaction click', () => {
    cy.get('[data-test="reactions-list"]')
      .find('button')
      .first()
      .click()
      .get('[data-test="info-panel"]')
  })

  it('Infopanel appears correctly on specie click', () => {
    cy.get('[data-test="species-list"]')
      .find('button')
      .first()
      .click()
      .get('[data-test="info-panel"]')
  })

  it('Compartments test', () => {
    cy.get('[data-test="compartment-button"]')
      .click()
      .get('.dropdown-menu')
      .find('button')
      .first('click')
  })

  it('Saving Models', () => {
    cy.get('[data-test="save-model-button"]')
      .click()
      .get('[data-test="confirm-save-button"]')
      .click()
      .get('.Toastify')
      .find('div')
      .contains('Successfully saved.')
  })
})
