import {Country} from "../model/country.enum";
import {Address} from "../model/address";

export class PublisherDto {
  id:number;
  country:Country;
  addressDto:Address = new Address();
  postcode:number;
  email:string;
}
