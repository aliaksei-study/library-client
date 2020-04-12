import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model:any = {};

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
    sessionStorage.setItem('token', '');
  }

  login() {
    let url = 'http://localhost:8080/login';
    let result = this.http.post<Observable<boolean>>(url, {
      email: this.model.email,
      password: this.model.password
    }).subscribe(isValid => {
      if (isValid) {
        sessionStorage.setItem(
          'token',
          btoa(this.model.email + ':' + this.model.password)
        );
        this.router.navigate(['/books']);
      } else {
        alert("Authentication failed.")
      }
    });
  }

}
