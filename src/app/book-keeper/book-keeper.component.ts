import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {BookService} from "../service/book.service";
import {ReaderService} from "../service/reader.service";
import {BookKeeperService} from "../service/book-keeper.service";
import {BookKeeperDto} from "../dto/book-keeper-dto";
import {Reader} from "../model/reader";
import {Book} from "../model/book";

@Component({
  selector: 'app-book-keeper',
  templateUrl: './book-keeper.component.html',
  styleUrls: ['./book-keeper.component.css']
})
export class BookKeeperComponent implements OnInit {
  model:BookKeeperDto = new BookKeeperDto();
  readers: Reader[] = [];
  bookId:number;
  book:Book;

  constructor(public router: Router, private route: ActivatedRoute, private bookService: BookService,
              private readerService: ReaderService, private bookKeeperService:BookKeeperService) {

  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['bookId'];
    this.bookService.getBookById(this.bookId).subscribe(
      (data) => {
        this.book = data;
      },
      err => {
        console.log(err);
      });
    this.readerService.getReaderWithoutBook().subscribe(
      data => {
        this.readers = data;
      },
      err => {
        console.log(err);
      });
  }

  sendBookKeeper(): void {
    if(this.isDateOfIssueGreaterThanReturnDate(this.model.dateOfIssue, this.model.returnDate)) {
      this.model.bookId = this.book.id;
      this.bookKeeperService.sendBookKeeper(this.model).subscribe(
        () => {
          this.router.navigate(['/books']);
        },
        err => {
          console.log(err);
        });
    } else {
      alert("first date should be less than second date");
    }
  }

  isDateOfIssueGreaterThanReturnDate(dateOfIssue: Date, returnDate: Date) : boolean {
    return new Date(dateOfIssue).getTime() < new Date(returnDate).getTime();
  }
}
