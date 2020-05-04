import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import {Reader} from "../model/reader";
import {URLHelper} from "../util/urlhelper";
import {Author} from "../model/author";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";
import {ReaderDto} from "../dto/reader-dto";

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http : HttpClient, private router: Router) { }

  getReaderPage(page: number) {
    return this.http.get(URLHelper.READERS_PAGE_URL + page);
  }

  addAuthor(readerDto: ReaderDto) : Observable<any> {
    return this.http.post(URLHelper.READERS_URL, readerDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("User with such email already exists");
    }));
  }
}