import {Gender} from "./gender.enum";
import {User} from "./user";
import {Photo} from "./photo";
import {Book} from "./book";

export interface Reader {
  id:number;
  name:string;
  surname:string;
  dateOfBirth:Date;
  gender:Gender;
  user:User;
  phone:String;
  photo:Photo;
  book:Book;
}
