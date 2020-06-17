import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {URLHelper} from "../util/urlhelper";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {ReaderDto} from "../dto/reader-dto";
import {Reader} from "../model/reader";
import {Book} from "../model/book";

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http : HttpClient, private router: Router) { }

  getReaderPage(page: number, sizeOfPage:number) {
    return this.http.get<Reader[]>(URLHelper.READERS_PAGE_URL + page + "&pageSize=" + sizeOfPage);
  }

  getReaderById(id: number) : Observable<Reader> {
    return this.http.get<Reader>(URLHelper.READERS_URL + "/" + id).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Can't find reader with id : " + id);
    }));
  }

  getReaderWithoutBook() : Observable<Reader[]> {
    return this.http.get<Reader[]>(URLHelper.READERS_URL + "/without-book").pipe(catchError((err: HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Error while loading readers");
    }));
  }

  addReader(readerDto: ReaderDto) : Observable<any> {
    return this.http.post(URLHelper.READERS_URL, readerDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("User with such email already exists");
    }));
  }

  updateReader(readerDto: ReaderDto, id:number) :Observable<any> {
    return this.http.put(URLHelper.READERS_URL + "/" + id, readerDto).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while updating reader");
    }));
  }

  getImage(imageId:number): Observable<any> {
    return this.http.get(URLHelper.PHOTOS_URL + "/" + imageId);
  }

  deleteReaders(readerIds:Array<number>) :Observable<any> {
    return this.http.delete(URLHelper.READERS_URL + "/" + readerIds).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status > 0) {
        alert("You can't delete the reader who is reading the book");
      }
      return throwError("Some errors occured while deleting reader");
    }));
  }

  getReadingBooks(readerIds:Array<number>) : Observable<any[]> {
    return this.http.get<any[]>(URLHelper.READING_BOOK_URL + "/" + readerIds).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while loading books");
    }));
  }
}
