import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {URLHelper} from "../util/urlhelper";
import {BookDto} from "../dto/book-dto";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Book} from "../model/book";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private router: Router) { }

  getBookPage(page:number, sizeOfPage:number){
    return this.http.get<Book[]>(URLHelper.BOOKS_PAGE_URL + page + "&pageSize=" + sizeOfPage);
  }

  saveBook(bookDto: BookDto) : Observable<any> {
    return this.http.post(URLHelper.BOOKS_URL, bookDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while adding book");
    }));
  }

  getBookById(bookId:number) : Observable<Book> {
    return this.http.get<Book>(URLHelper.BOOKS_URL + "/" + bookId).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while getting book by id");
    }));
  }
}
