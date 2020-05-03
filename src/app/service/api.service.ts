import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../model/book";
import {Reader} from "../model/reader";
import {URLHelper} from "../util/urlhelper";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080";
  private ALL_BOOKS_URL = `${this.BASE_URL}\\books`;
  private ALL_READER_URL = `${this.BASE_URL}\\readers`;

  constructor(private http: HttpClient) { }

  getAllBooks() : Observable<Book[]>{
    return this.http.get<Book[]>(URLHelper.BOOKS_URL);
}

  getAllReaders() : Observable<Reader[]> {
    return this.http.get<Reader[]>(this.ALL_READER_URL);
  }

}
