import {Country} from "./country.enum";
import {Address} from "./address";

export class Publisher {
  id:number;
  country:Country;
  address:Address;
  postcode:number;
  email:string;
}
