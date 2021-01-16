import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";
import {Email} from "../model/email";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Router} from "@angular/router";
import {URLHelper} from "../util/urlhelper";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class MailService {

  constructor(private http: HttpClient, private router: Router) { }

  public loadTemplate() : Observable<Email> {
    return this.http.get<Email>(URLHelper.MAIL_GET_RANDOM_TEMPLATE).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while loading random template");
    }));
  }

  public saveTemplate(emailDto: Email) : Observable<any> {
    return this.http.post(URLHelper.MAIL_TEMPLATES, emailDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while saving template");
    }));
  }

  public sendMail(readerIds: Array<number>, emailDto: Email) : Observable<any> {
    return this.http.post(URLHelper.MAIL_URL + "/" + readerIds, emailDto).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status > 0) {
        this.router.navigate(['/login']);
      }
      return throwError("Some errors occured while saving template");
    }));
  }
}
