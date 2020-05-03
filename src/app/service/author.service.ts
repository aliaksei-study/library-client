import { Injectable } from '@angular/core';
import {Author} from "../model/author";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  private BASE_URL = "http://localhost:8080";
  private ALL_AUTHORS_FROM_LIST_URL = `${this.BASE_URL}\\authors\\allAuthors`;
  private ADD_AUTHOR_TO_LIST_URL = `${this.BASE_URL}\\authors\\add`;

  constructor(private http: HttpClient) { }

  addAuthor(author: Author) : Observable<any> {
    return this.http.post(this.ADD_AUTHOR_TO_LIST_URL, author);
  }

  deleteAuthor(author: Author) : void {

  }

  getAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(this.ALL_AUTHORS_FROM_LIST_URL);
  }
}

