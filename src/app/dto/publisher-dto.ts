import {Country} from "../book/model/country.enum";
import {Address} from "../book/model/address";

export class PublisherDto {
  id:number;
  country:Country;
  addressDto:Address = new Address();
  postcode:number;
  email:string;
}
