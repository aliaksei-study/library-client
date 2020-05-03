import {Gender} from "../model/gender.enum";
import {PhotoDto} from "./photo-dto";
import {UserDto} from "./user-dto";


export class ReaderDto {
  id:number;
  name:string;
  surname:string;
  dateOfBirth:Date;
  gender:Gender;
  userDto:UserDto = new UserDto();
  phone:String;
  photoDto:PhotoDto = new PhotoDto();
}
