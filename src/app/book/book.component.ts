import { Component, OnInit } from '@angular/core';
import {ApiService} from "../shared/api.service";
import {Book} from "./model/book";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books:Book[] = [];

  constructor(private apiService : ApiService) {
  }

  ngOnInit(): void {
    this.getAllBooks();
  }

  public getAllBooks() {
    this.apiService.getAllBooks().subscribe(
      res => {
        this.books = res;
      },
      err => {
        alert("An error occured");
      }
    )
  }

}
