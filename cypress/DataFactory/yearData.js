import { yearObject } from "../DataObject/yearobject";


export class yearData{
      year = new yearObject();

    yearDetails(){
        this.year.minYear= "2020";
        this.year.maxYear = "2021";
        return this.year;
    }
}