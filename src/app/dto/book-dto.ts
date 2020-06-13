import {Genre} from "../model/genre.enum";
import {Author} from "../model/author";
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
