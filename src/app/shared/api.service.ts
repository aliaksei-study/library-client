import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Book} from "../book/model/book";
import {Reader} from "../book/model/reader";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private BASE_URL = "http://localhost:8080";
  private ALL_BOOKS_URL = `${this.BASE_URL}\\books\\all`;
  private ALL_READER_URL = `${this.BASE_URL}\\readers\\all`;

  constructor(private http: HttpClient) { }

  getAllBooks() : Observable<Book[]>{
    return this.http.get<Book[]>(this.ALL_BOOKS_URL);
}

  getAllReaders() : Observable<Reader[]> {
    return this.http.get<Reader[]>(this.ALL_READER_URL);
  }

}
