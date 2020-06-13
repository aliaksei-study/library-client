import {Gender} from "./gender.enum";
import {User} from "./user";
import {Photo} from "./photo";
import {BookKeeper} from "./book-keeper";
import {Book} from "./book";

export class Reader {
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
