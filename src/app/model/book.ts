import {Publisher} from "./publisher";
import {Genre} from "./genre.enum";
import {Author} from "./author";
import {Cover} from "./cover";
import {BookKeeper} from "./book-keeper";
import {Reader} from "./reader";

export class Book {
  id:number;
  title:string;
  publisher:Publisher = new Publisher();
  publicationDate:Date;
  numberOfCopies:number;
  genre:Genre;
  bookKeeper:BookKeeper;
  reader:Reader;
  authors:Author[] = [];
  covers:Cover[] = [];
}
