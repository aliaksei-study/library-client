import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {URLHelper} from "../util/urlhelper";
import {BookDto} from "../dto/book-dto";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {Book} from "../model/book";
import {Genre} from "../model/genre.enum";

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private router: Router) {
  }

  getBookPage(page: number, sizeOfPage: number, filter?: string, sort?: string) {
    if (filter === undefined && sort === undefined) {
      return this.http.get<Book[]>(URLHelper.BOOKS_PAGE_URL + page + "&pageSize=" + sizeOfPage);
    } else if (filter === undefined) {
      return this.http.get<Book[]>(URLHelper.BOOKS_PAGE_URL + page + "&pageSize=" + sizeOfPage + "&sort=" + sort);
    } else if (sort === undefined) {
      return this.http.get<Book[]>(URLHelper.BOOKS_PAGE_URL + page + "&pageSize=" + sizeOfPage + "&search=" + filter);
    } else {
      return this.http.get<Book[]>(URLHelper.BOOKS_PAGE_URL + page + "&pageSize=" + sizeOfPage + "&sort=" + sort + "&search=" + filter);
    }
  }


  saveBook(bookDto: BookDto): Observable<any> {
    return this.http.post(URLHelper.BOOKS_URL, bookDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while adding book");
    }));
  }

  getBookById(bookId: number): Observable<Book> {
    return this.http.get<Book>(URLHelper.BOOKS_URL + "/" + bookId).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while getting book by id");
    }));
  }

  updateBook(bookId: number, bookDto: BookDto): Observable<any> {
    return this.http.put(URLHelper.BOOKS_URL + "/" + bookId, bookDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while updating book by id");
    }));
  }
}
