import {Component, OnInit} from '@angular/core';
import {BookDto} from "../../dto/book-dto";
import {Genre} from "../../model/genre.enum";
import {Country} from "../../model/country.enum";
import {Author} from "../../model/author";
import {CoverDto} from "../../dto/cover-dto";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../service/author.service";
import {BookService} from "../../service/book.service";
import {Book} from "../../model/book";
import {PublisherDto} from "../../dto/publisher-dto";
import {Publisher} from "../../model/publisher";

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
  model: Book = new Book();
  bookDto: BookDto = new BookDto();
  authors: Author[];
  country = Country;
  genre = Genre;
  sizeOfPage: number = 2147483647;
  bookId: number;

  constructor(private http: HttpClient, public router: Router, private authorService: AuthorService,
              private bookService: BookService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.bookId = this.route.snapshot.params['id'];
    this.bookService.getBookById(this.bookId).subscribe(
      (book) => {
        this.model = book;
        if(book.publisher === null) {
          this.model.publisher = new Publisher();
        }
      },
      err => {
        console.log(err);
      });
    this.getAuthors(0, this.sizeOfPage);
    setTimeout(() => {
      this.convertModelToBookDto();
    }, 500);
  }


  deleteCoversFromList(): void {

  }

  convertModelToBookDto () : void {
    this.bookDto = {...this.model,
      publisherDto:{
      ...this.model.publisher, addressDto: this.model.publisher.address
      },
    authorDto:[
      ...this.model.authors
    ],
    coverDto: []}
  }

  updateBook(): void {
    this.bookService.updateBook(this.bookId, this.bookDto).subscribe(
      res => {
        this.router.navigate(['/books']);
      },
      err => {
        console.log(err);
      }
    )
  }

  public getAuthors(page: number, sizeOfPage: number) {
    this.authorService.getAuthorPage(page, sizeOfPage).subscribe(
      res => {
        this.authors = res['content'];
      },
      err => {
        console.log(err);
      }
    );
  }

  public saveAuthorToList(event) {
    let selectedAuthor = this.authors.find(function (author: Author) {
      return author.id == event.target.value;
    });
    if (this.bookDto.authorDto.indexOf(selectedAuthor) === -1) {
      this.bookDto.authorDto.push(selectedAuthor);
    }
  }

  public removeAuthorFromList(author: Author) {
    this.bookDto.authorDto.splice(this.bookDto.authorDto.indexOf(author), 1);
  }

  public showAddCoverElements() {
    if (document.getElementById("fileBlock").hidden) {
      document.getElementById("fileBlock").hidden = false;
      document.getElementById("photoNote").hidden = false;
      document.getElementById("savePhoto").hidden = false;
    } else {
      document.getElementById("fileBlock").hidden = true;
      document.getElementById("photoNote").hidden = true;
      document.getElementById("savePhoto").hidden = true;
    }
  }

  showPublisherElements() {
    if (document.getElementById("first-publisher-row").hidden) {
      document.getElementById("first-publisher-row").hidden = false;
      document.getElementById("second-publisher-row").hidden = false;
    } else {
      document.getElementById("first-publisher-row").hidden = true;
      document.getElementById("second-publisher-row").hidden = true;
    }
  }

  showAuthorElements() {
    if (document.getElementById("first-select-block").hidden) {
      document.getElementById("first-select-block").hidden = false;
      document.getElementById("selected-author-list").hidden = false;
    } else {
      document.getElementById("first-select-block").hidden = true;
      document.getElementById("selected-author-list").hidden = true;
    }
  }

  showCoverElements() {
    if (document.getElementById("cover-buttons").hidden) {
      document.getElementById("cover-buttons").hidden = false;
      document.getElementById("covers-list").hidden = false;
    } else {
      document.getElementById("cover-buttons").hidden = true;
      document.getElementById("covers-list").hidden = true;
    }
  }

  saveCoverToList() {

  }

  isFileHasExceptableExtension(file) {
    if (file.value != undefined) {
      alert((file.value.endsWith("png")) || (file.value.endsWith("jpeg")) || (file.value.endsWith("jpg")));
    }
  }

  changeGenre(event) {
    this.model.genre = event.target.value;
  }
}
