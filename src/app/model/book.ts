import {Publisher} from "./publisher";
import {Genre} from "./genre.enum";
import {Author} from "./author";
import {Cover} from "./cover";
import {Reader} from "./reader";

export class Book {
  id:number;
  title:string;
  publisher:Publisher;
  publicationDate:Date;
  numberOfCopies:number;
  genre:Genre;
  reader:Reader;
  authors:Author[];
  covers:Cover[];
}
