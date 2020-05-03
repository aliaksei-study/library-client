import {Injectable} from "@angular/core";
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, tap} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const xhr = req.clone({
      setHeaders: {
        Authorization: 'Basic ' + btoa(`${localStorage.getItem("email")}` +
          ":" + `${localStorage.getItem("password")}`)
      }
    });

    return next.handle(xhr).pipe(catchError((err: HttpErrorResponse) => {
      if (err.status === 401) {
        this.router.navigate(['/login']);
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
      return throwError(err);
    }));
  }
}
