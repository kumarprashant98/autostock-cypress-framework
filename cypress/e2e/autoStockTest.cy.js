
import { yearData } from "../DataFactory/yeardata";
import { CarPagePO}  from "../PageObject/CarPagePO";
import { DetailsPagePO } from "../PageObject/DetailsPagePO";


const carpage = new CarPagePO();
const detailspage = new DetailsPagePO();
const year = new yearData().yearDetails();

beforeEach(() => {
  cy.log("Step 1: Navigate to the URL")
  cy.visit(Cypress.env("devUrl"));

  cy.log("Step 2: Verify that home page is displayed")
    carpage.homePageIsDisplayed().should('be.visible');
})

describe('Car List Functional Flow', () => {
  it('Sort the car price list', () => {

    cy.log("Step 1: Select Random make from List and Assert the car make ")
    carpage.selectRandomCarMakeFromDropdown().then(randomName => {  
      const value = randomName;                             
      carpage.getDisplayedCarMakeText().then(x => {    
        let maketext = x.text().trim();
        expect(maketext).to.equal(value);
      });
    });
  
    cy.log("Step 2: Select the Minimun Year of car and assert the minimum year ")
    carpage.selectMinYear(year.minYear);
    carpage.getMinYearText().then(x => {
      let minyeartext = x.text().trim();
      expect(minyeartext).to.equal(year.minYear);
    })
    
    cy.log("Step 3: Select the Maximum Year of car and assert the maximum year")
    carpage.selectMaxYear(year.maxYear);
    carpage.getMaxYearText().then(x => {
      let maxyeartext = x.text().trim();
      expect(maxyeartext).to.equal(year.maxYear);
    })

    cy.log("Step 4: Apply filter on Car Page")
    let filter = "Price (Highest price)";
    carpage.selectCarPageFilter(filter);

    cy.log("Step 5: Sort the Car Price and Assert car price")
    carpage.sortCarPriceAndAssert().then((higherToLowerOrder) => {
      expect(higherToLowerOrder).to.be.true;
    })

  })

  it('Get Car Details', () =>{

    cy.log("Step 1: Select Random Fuel type and Assert the fuel type")
    carpage.selectRandomFuelType().then(fueltype =>{
      const value = fueltype;
      carpage.getSelectedFuelTypeText().then(x =>{
        let fueltypetext = x.text().trim();
        expect(fueltypetext).equal(value);
      })
    })

    cy.log("Step 2: Click on the Random Car Name and Assert car title")
    carpage.clickOnSelectedCar().then(carname =>{
      const value = carname;
      detailspage.getCarTitle().then(x=>{
        let cartitletext = x.text().trim();
        expect(cartitletext).equal(value);
      })
    });
  })
})
