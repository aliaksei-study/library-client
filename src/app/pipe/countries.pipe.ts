import { Pipe, PipeTransform } from '@angular/core';
import {Country} from "../model/country.enum";

@Pipe({
  name: 'countries'
})
export class CountriesPipe implements PipeTransform {

  transform(value, args?:string[]) : any {
    return Object.entries(Country).filter(value => {
      return value.toString().search("\\d") === 0;
    });
  }

}
