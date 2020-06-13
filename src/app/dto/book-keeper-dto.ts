import {Book} from "../model/book";

export class BookKeeperDto {
  dateOfIssue:Date;
  returnDate:Date;
  bookId:number;
  readerId: number;
}
