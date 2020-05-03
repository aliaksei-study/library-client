import {Photo} from "./photo";
import {Book} from "./book";

export class Cover {
    id:number;
    photo:Photo;
    dateOfUpload:Date;
    note:string;
    book:Book;
}
