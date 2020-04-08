import {Country} from "./country.enum";
import {Address} from "./address";

export interface Publisher {
  id:number;
  country:Country;
  address:Address;
  postcode:number;
  email:string;
}
