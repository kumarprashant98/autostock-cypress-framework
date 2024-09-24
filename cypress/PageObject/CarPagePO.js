import { cypresshelper } from "../CypressHelper/cypresshelper";

export class CarPagePO{
    
    homePageHeader = ".navbar-header img";
    carMakeDropdown = ".make span.ui-selectonemenu-label";
    carMakeList = "//select[@aria-label='Make']/option";
    minYearDropdown = "//div[contains(@class,'yearMin')]/span"
    maxYearDropdown = "//div[contains(@class,'yearMax')]/span"
    latestListingDropdown = "//span[text()='Latest listings']"
    carPriceList = "//div[@class='carsell_bx_details']/div/div/h5"
    fuelTypeList = "//div[contains(@class,'fuelType')]//input[@type='checkbox']/following-sibling::label"
    fuelTypeDropdown = ".fuelType span label"
    carSellList ="[class='carsell_bx_Dleft'] h3"
    

    helper = new cypresshelper();
    
    /**
     * Home Page is Displayed
     */
    homePageIsDisplayed(){
        return cy.locator(this.homePageHeader)
    }

    /**
     *  Select Random Car Make From Dropdown
     */
    selectRandomCarMakeFromDropdown(){
        const carMakeList = [];
        cy.locator(this.carMakeDropdown).click();
        cy.locator(this.carMakeList).each(element => {
            cy.wrap(element).invoke('text').then(text => {
                carMakeList.push(text);
            });
        })
        .then(() => {
            const randomMakeName = this.helper.getRandomStringFromList(carMakeList);
            cy.locator(`//ul[contains(@class,'ui-selectonemenu-items')]/li[text()='${randomMakeName}']`).click({force : true});
            cy.wrap(randomMakeName).as('value');

        })
       return cy.get('@value');
  
     }
    
    /**
     *  Displayed Car Make Equal Selected Make
    */
    getDisplayedCarMakeText() {
       return cy.locator(this.carMakeDropdown);
      }
    
    /**
     * Select Min Year
     * @param {min year} startyear 
     */
    selectMinYear(minyear){
        cy.locator(this.minYearDropdown).click();
        cy.locator(`//li[text()='${minyear}']`).click();
    }

    /**
     * Get min year value
     * @returns Min Year
     */
    getMinYearText(){
        return cy.locator(this.minYearDropdown);
    }

    /**
     * Select Max Year
     * @param {max year} endyear 
     */
    selectMaxYear(maxyear){
        cy.locator(this.maxYearDropdown).click();
        cy.locator(`//li[text()='${maxyear}']`).eq(1).click(); 
    }
    
    /**
     * Get Max Year Value
     * @returns Max Year
     */
    getMaxYearText(){
        return cy.locator(this.maxYearDropdown);
    }
    
    /**
     * Select Car Page filter
     * @param {filter} filter 
     */
    selectCarPageFilter(filter){
        cy.locator(this.latestListingDropdown).click();
        cy.locator(`//li[text()='${filter}']`).click();
    }
    
    /**
     * Sort Car Price and Assert
     * @returns Sorted Car Price
     */
    sortCarPriceAndAssert(){
        const carprice = [];
        return cy.locator(this.carPriceList).each(element => {
            cy.wrap(element).invoke('text').then(text =>{
                const priceWithoutSymbol = text.replace('$','');
                carprice.push(priceWithoutSymbol);
                cy.log(priceWithoutSymbol);
            })
        }).then(()=>{
          const higherToLowerOrder = this.helper.assertDescendingOrder(carprice)
          return higherToLowerOrder;
        })
    }
    /**
     * Select Random Fuel Type
     */
    selectRandomFuelType(){
        const fueltypelist = [];
        cy.locator(this.fuelTypeDropdown).click();
        cy.locator(this.fuelTypeList).each(element =>{
            cy.wrap(element).invoke('text').then(text =>{
                fueltypelist.push(text);
                cy.log(fueltypelist)
            })
        })
        .then(()=>{
            const randomFuelType = this.helper.getRandomStringFromList(fueltypelist);
            cy.locator(`//li//label[text()='${randomFuelType}']/preceding-sibling::div`).click();
            cy.wrap(randomFuelType).as('fueltype')
        })
        return cy.get('@fueltype');    
    }

    /**
     * Get Selected Fuel Type 
     */
    getSelectedFuelTypeText(){
        return cy.locator(this.fuelTypeDropdown);
    }

    /**
     * Click On Selected Car
     */
    clickOnSelectedCar(){
        const carselllist = [];
        cy.locator(this.carSellList).each(element =>{
           cy.wrap(element).invoke('text').then(text =>{
            carselllist.push(text);
           })
        })
        .then(()=>{
            const randomCarName = this.helper.getRandomStringFromList(carselllist);
            cy.locator(`//h3[text()='${randomCarName}']/parent::div/parent::div/parent::div/preceding-sibling::div/a`).click();
            cy.wrap(randomCarName).as('carname')
        })
        return cy.get('@carname');
    }
}

