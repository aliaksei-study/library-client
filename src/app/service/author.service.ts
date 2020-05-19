import { Injectable } from '@angular/core';
import {Author} from "../model/author";
import {Observable, throwError} from "rxjs";
import {Book} from "../model/book";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {URLHelper} from "../util/urlhelper";
import {catchError} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient, private router: Router) { }

  getAuthorPage(page:number){
    return this.http.get(URLHelper.AUTHOR_PAGE_URL + page);
  }

  addNewAuthor(authorDto: Author) : Observable<any> {
    return this.http.post(URLHelper.AUTHORS_URL, authorDto).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Can't add author");
    }));
  }
}

