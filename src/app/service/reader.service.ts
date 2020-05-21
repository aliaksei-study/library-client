import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, pipe, throwError} from "rxjs";
import {Reader} from "../model/reader";
import {URLHelper} from "../util/urlhelper";
import {Author} from "../model/author";
import {catchError, map} from "rxjs/operators";
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

  getReaderById(id: number) : Observable<Reader> {
    return this.http.get<Reader>(URLHelper.READERS_URL + "/" + id).pipe(catchError((err: HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Can't find reader with id : " + id);
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
    }))
  }

  getImage(imageId:number): Observable<any> {
    return this.http.get(URLHelper.PHOTOS_URL + "/" + imageId);
  }

  deleteReaders(readerIds:Array<number>) :Observable<any> {
    return this.http.delete(URLHelper.READERS_URL + "/" + readerIds).pipe(catchError((err:HttpErrorResponse) => {
      if(err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while deleting reader");
    }))
  }
}
