export class cypresshelper{

    // -- Random String from List --
    getRandomStringFromList(list){
        let ran = Math.floor(Math.random() * list.length);
        return list[ran]
    }
    
    // -- Check High to Low price order --
    assertDescendingOrder(pricelist){
        for (let i = 0; i < pricelist.length - 1; i++) {
          if (parseInt(pricelist[i]) < parseInt(pricelist[i + 1])) {
            return false;
          }
        }
        return true;
      };
}