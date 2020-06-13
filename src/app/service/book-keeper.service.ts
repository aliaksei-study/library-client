import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {URLHelper} from "../util/urlhelper";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {BookKeeperDto} from "../dto/book-keeper-dto";

@Injectable({
  providedIn: 'root'
})
export class BookKeeperService {

  constructor(private http: HttpClient, private router: Router) { }

  sendBookKeeper(bookKeeperDto: BookKeeperDto) {
    return this.http.post(URLHelper.BOOK_KEEPER, bookKeeperDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured in BookKeeper");
    }));
  }

  removeBookKeeper(bookId:number) {
    return this.http.delete(URLHelper.BOOK_KEEPER + "/" + bookId).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured in BookKeeper");
    }));
  }
}
