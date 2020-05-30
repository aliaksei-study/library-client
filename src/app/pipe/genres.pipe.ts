import { Pipe, PipeTransform } from '@angular/core';
import {Genre} from "../model/genre.enum";
import {Country} from "../model/country.enum";

@Pipe({
  name: 'genres'
})
export class GenresPipe implements PipeTransform {
  transform(value, args?:string[]) : any {
    return Object.entries(Genre).filter(value => {
      return value.toString().search("\\d") === 0;
    });
  }
}
