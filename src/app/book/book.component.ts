import { Component, OnInit } from '@angular/core';
import {Book} from "../model/book";
import {BookService} from "../service/book.service";

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
  sizeOfPage: number = 4;

  constructor(private bookService: BookService) {
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
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

  ngOnInit(): void {
    this.getBookPage(this.currentPage, this.sizeOfPage);
  }

  public getBookPage(page: number, pageSize:number) {
    this.bookService.getBookPage(page, pageSize).subscribe(
      res => {
        this.books = res['content'];
        this.pages = new Array(res['totalPages']);
      },
      err => {
        console.log(err);
      }
    );
  }

}
