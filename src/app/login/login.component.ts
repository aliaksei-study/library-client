import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../model/user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: User = new User();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private http: HttpClient) { }

  ngOnInit(): void {
  }

  login() {
    localStorage.setItem('email', `${this.user.email}`);
    localStorage.setItem('password', `${this.user.password}`)
    let url = 'http://localhost:8080/login';
    let result = this.http.get(url).subscribe(
      data => {

      }
    );
    this.router.navigate(['/books']);
  }

}
