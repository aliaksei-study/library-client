import {Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {BookDto} from "../dto/book-dto";
import {Genre} from "../model/genre.enum";
import {Country} from "../model/country.enum";
import {Author} from "../model/author";
import {AuthorService} from "../service/author.service";
import {PhotoDto} from "../dto/photo-dto";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  model: BookDto = new BookDto();
  genre = Genre;
  country = Country;
  authors: Author[];
  sizeOfPage: number = 2147483647;
  selectedAuthors: Author[] =[];
  coversPhotoDto: PhotoDto[] = [];

  constructor(private http: HttpClient, public router: Router, private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.getAuthors(0, this.sizeOfPage);
  }

  deleteCoversFromList(): void {

  }

  addBook(): void {

  }

  public getAuthors(page: number, sizeOfPage:number) {
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
    let selectedAuthor = this.authors.find(function(author:Author) {
      return author.id == event.target.value;
    });
    if(this.selectedAuthors.indexOf(selectedAuthor) === -1) {
      this.selectedAuthors.push(selectedAuthor);
    }
  }

  public removeAuthorFromList(author: Author) {
    this.selectedAuthors.splice(this.selectedAuthors.indexOf(author), 1);
  }

  public showAddCoverElements() {
    if(document.getElementById("fileBlock").hidden) {
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
    if(document.getElementById("first-publisher-row").hidden) {
      document.getElementById("first-publisher-row").hidden = false;
      document.getElementById("second-publisher-row").hidden = false;
    } else {
      document.getElementById("first-publisher-row").hidden = true;
      document.getElementById("second-publisher-row").hidden = true;
    }
  }

  showAuthorElements() {
    if(document.getElementById("first-select-block").hidden) {
      document.getElementById("first-select-block").hidden = false;
      document.getElementById("selected-author-list").hidden = false;
    } else {
      document.getElementById("first-select-block").hidden = true;
      document.getElementById("selected-author-list").hidden = true;
    }
  }

  showCoverElements() {
    if(document.getElementById("cover-buttons").hidden) {
      document.getElementById("cover-buttons").hidden = false;
      document.getElementById("covers-list").hidden = false;
    } else {
      document.getElementById("cover-buttons").hidden = true;
      document.getElementById("covers-list").hidden = true;
    }
  }

  saveCoverToList() {

  }





  /*keys: string[];
    keysCountry: string[];*/
  /*this.keys = Object.keys(this.genre).filter(f => !isNaN(Number(f)));
    this.keysCountry = Object.keys(this.country).filter(f => !isNaN(Number(f)));*/
  //<option *ngFor="let key of keys" value="{{key}}">{{genre[key]}}</option>
}



