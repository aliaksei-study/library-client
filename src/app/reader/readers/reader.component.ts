import {Component, OnInit} from '@angular/core';
import {ReaderService} from "../../service/reader.service";
import {Reader} from "../../model/reader";
import {Book} from "../../model/book";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  readers: Reader[] = [];
  pages: Array<number>;
  checkBoxesList: Array<number> = [];
  currentPage: number = 0;
  sizeOfPage: number = 2;

  constructor(private readerService: ReaderService) {
    setTimeout(() => {
      this.setClickedCheckBoxes();
    }, 500);
    setTimeout(() => {
      this.getReadingBooks();
    }, 500);
  }

  ngOnInit(): void {
    this.getAllReaders(this.currentPage, this.sizeOfPage);
  }

  public createArrayFromReaderIds() {
    let readerIds = [];
    for (let i = 0; i < this.readers.length; i++) {
      readerIds.push(this.readers[i].id);
    }
    return readerIds;
  }

  public getReadingBooks() {
    this.readerService.getReadingBooks(this.createArrayFromReaderIds()).subscribe(
      data => {
        for (let i = 0; i < data.length; i++) {
          let reader = this.readers[i];
          reader.book = new Book();
          reader.book.title = data[i];
        }
      },
      err => {
        console.log(err);
      }
    );
  }

  public setPage(indexOfPage: number, event: any) {
    event.preventDefault();
    this.currentPage = indexOfPage;
    this.getAllReaders(this.currentPage, this.sizeOfPage);
    setTimeout(() => {
      this.setClickedCheckBoxes();
    }, 500);
    setTimeout(() => {
      this.getReadingBooks();
    }, 500);
  }

  public getAllReaders(page: number, pageSize: number) {
    this.readerService.getReaderPage(page, pageSize).subscribe(
      res => {
        this.readers = res['content'];
        this.pages = new Array(res['totalPages']);
      },
      err => {
        console.log(err);
      }
    );
  }

  public setClickedCheckBoxes(): void {
    let checkBoxes = document.getElementsByTagName('input');
    for (let i = 0; i < checkBoxes.length; i++) {
      if (this.checkBoxesList.indexOf(+checkBoxes.item(i).value) != -1) {
        checkBoxes.item(i).checked = true;
      }
    }
  }

  public updateClickedCheckboxesList(id: number, event): void {
    if (event.target.checked) {
      this.checkBoxesList.push(id);
    } else {
      let deletedIndex;
      deletedIndex = this.checkBoxesList.indexOf(id);
      if (deletedIndex != -1) {
        this.checkBoxesList.splice(deletedIndex, 1);
      }
    }
  }

  deleteReaders(): void {
    if (this.checkBoxesList.length != 0) {
      this.readerService.deleteReaders(this.checkBoxesList).subscribe(
        () => {
          document.location.reload();
        },
        err => {
          console.log(err);
        }
      );
    } else {
      alert("You didn't choose any reader. Please select one reader and try again");
    }
  }
}
