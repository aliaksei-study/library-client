import { Component, OnInit } from '@angular/core';
import {Book} from "../../model/book";
import {BookService} from "../../service/book.service";
import {URLHelper} from "../../util/urlhelper";
import {HttpClient} from "@angular/common/http";
import {BookKeeperService} from "../../service/book-keeper.service";
import {Genre} from "../../model/genre.enum";

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  books:Book[] = [];
  pages: Array<number>;
  checkBoxesList: Array<number> = [];
  currentPage:number = 0;
  sizeOfPage: number = 3;
  genres: Array<String> = new Array<String>();
  sortByName: string = "title";
  sortByPublicationDate: string = "publicationDate";

  constructor(private bookService: BookService, private bookKeeperService:BookKeeperService) {
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  ngOnInit() {
    this.getBookPage(this.currentPage, this.sizeOfPage);
    for(let key in Genre) {
      this.genres.push(key);
    }
  }

  public setPage(indexOfPage: number, event:any) {
    event.preventDefault();
    this.currentPage = indexOfPage;
    this.getBookPage(this.currentPage, this.sizeOfPage);
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  public setClickedCheckBoxes(): void {
    let checkBoxes = document.getElementsByTagName('input');
    for(let i = 0; i < checkBoxes.length; i++) {
      if(this.checkBoxesList.indexOf(+checkBoxes.item(i).value) != -1) {
        checkBoxes.item(i).checked = true;
      }
    }
  }

  public updateClickedCheckboxesList(id:number, event) :void {
    if(event.target.checked) {
      this.checkBoxesList.push(id);
    } else {
      let deletedIndex;
      deletedIndex = this.checkBoxesList.indexOf(id);
      if(deletedIndex != -1) {
        this.checkBoxesList.splice(deletedIndex, 1);
      }
    }
  }

  public  getBookPage(page: number, pageSize:number, filter?: string, sort?: string) {
    this.bookService.getBookPage(page, pageSize, filter, sort).subscribe(
     res => {
         this.books = res['content'];
       this.pages = new Array(res['totalPages']);
     },
     err => {
       console.log(err);
     }
   );
  }

  returnBook(id: number) {
    this.bookKeeperService.removeBookKeeper(id).subscribe(
      () => {
        window.location.reload();
      },
      err => {
        console.log(err);
      }
    )
  }

  filterBooks() {
    let filter: string = "";
    let titleOfBook = (document.getElementById("titleOfBookInput") as HTMLInputElement).value;
    let nameOfAuthor = (document.getElementById("nameOfAuthorInput") as HTMLInputElement).value;
    let yearOfPublication = (document.getElementById("yearOfPublicationInput") as HTMLInputElement).value;
    let genre = (document.getElementById("genre") as HTMLInputElement).value;
    if(titleOfBook !== "") {
      filter = filter.concat("title:" + titleOfBook + ",");
    }
    if(nameOfAuthor !== "") {
      filter = filter.concat("name:" + nameOfAuthor + ",");
    }
    if(yearOfPublication !== "") {
      filter = filter.concat("publicationDate:" + yearOfPublication + ",");
    }
    if(genre !== "") {
      filter = filter.concat("genre:" + genre + ",")
    }
    if(filter.endsWith(",")) {
      filter = filter.substr(0, filter.length - 1)
    }
    this.getBookPage(0, 214730, filter);
  }

  sortBooks(field: string) {
    this.getBookPage(0, 214730, undefined, field);
  }
}
