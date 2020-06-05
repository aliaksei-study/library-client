import {Book} from "./book";
import {Reader} from "./reader";

export class BookKeeper {
  id:number;
  dateOfIssue:Date;
  returnDate:Date;
  book:Book;
  reader:Reader;
}
