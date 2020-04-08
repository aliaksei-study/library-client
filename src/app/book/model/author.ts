import {Gender} from "./gender.enum";

export interface Author {
  id:number;
  name:string;
  surname:string;
  dateOfBirth:Date;
  gender:Gender;
  note:string;
}
