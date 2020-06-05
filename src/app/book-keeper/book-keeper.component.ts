import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Book} from "../model/book";
import {Reader} from "../model/reader";
import {BookService} from "../service/book.service";
import {ReaderService} from "../service/reader.service";

@Component({
  selector: 'app-book-keeper',
  templateUrl: './book-keeper.component.html',
  styleUrls: ['./book-keeper.component.css']
})
export class BookKeeperComponent implements OnInit {
  book:Book = new Book();
  reader:Reader;
  readers: Reader[] = [];
  bookId:number;

  constructor(public router: Router, private route: ActivatedRoute, private bookService: BookService,
              private readerService: ReaderService) {

  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getBookById(this.bookId).subscribe(
      (data) => {
        this.book = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  sendBookKeeper(): void {

  }

}
