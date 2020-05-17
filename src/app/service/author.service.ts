import { Injectable } from '@angular/core';
import {Author} from "../model/author";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";
import {URLHelper} from "../util/urlhelper";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  getAuthorPage(page:number){
    return this.http.get(URLHelper.AUTHOR_PAGE_URL + page);
  }
}

