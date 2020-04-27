import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(public router: Router) {

  }

  ngOnInit(): void {
  }

  logout(): void {
    localStorage.clear();
    alert("you successfully logged out");
  }
}
