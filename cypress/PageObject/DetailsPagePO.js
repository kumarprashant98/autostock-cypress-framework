export class DetailsPagePO{

    carTitle = "//div[contains(@class,'product-detail-heading')]/div/h2"


    /**
     * Get Car Detail Title
     * @returns Car Title
     */
    getCarTitle(){
            return cy.locator(this.carTitle);
    }
}