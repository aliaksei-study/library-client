import {Publisher} from "../book/model/publisher";
import {Genre} from "../book/model/genre.enum";
import {Reader} from "../book/model/reader";
import {Author} from "../book/model/author";
import {Cover} from "../book/model/cover";
import {CoverDto} from "./cover-dto";
import {PublisherDto} from "./publisher-dto";

export class BookDto {
  id:number;
  title:string;
  publisherDto:PublisherDto = new PublisherDto();
  publicationDate:Date;
  numberOfCopies:number;
  genre:Genre;
  authorDto:Author[];
  coverDto:CoverDto[];
}
