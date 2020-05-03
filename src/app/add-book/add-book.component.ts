import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BookDto} from "../dto/book-dto";
import {Genre} from "../model/genre.enum";
import {Country} from "../model/country.enum";
import {Author} from "../model/author";
import {AuthorService} from "../service/author.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  model:BookDto = new BookDto();
  genre = Genre;
  country = Country;
  keys: string[];
  keysCountry: string[];
  authors: Author[];

  constructor(private http: HttpClient, public router:Router, private authorServiceService: AuthorService) {
    this.keys = Object.keys(this.genre).filter(f => !isNaN(Number(f)));
    this.keysCountry = Object.keys(this.country).filter(f => !isNaN(Number(f)));
  }

  ngOnInit(): void {
    this.getAuthors();
  }

  deleteAuthors() : void {

  }

  addBook() : void {
    let url = "http://localhost:8080/books/add";
    this.model.authorDto = this.authors;
    this.model.coverDto = [];
    this.http.post(url, this.model).subscribe(
      res => {
        location.replace("http://localhost:4200/books");
      },
      err => {
        alert("error");
      }
    );
  }

  public getAuthors() {
    this.authorServiceService.getAuthors().subscribe(
      res => {
        this.authors = res;
      },
      err => {
        alert("error")
      }
    )
  }

}



