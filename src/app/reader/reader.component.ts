import {Component, OnChanges, OnInit} from '@angular/core';
import {ReaderService} from "../service/reader.service";
import {Reader} from "../model/reader";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  readers: Reader[] = [];
  pages: Array<number>;
  checkBoxesList: Array<number> = [];
  currentPage:number = 0;
  sizeOfPage: number = 4;

  constructor(private readerService: ReaderService) {
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  ngOnInit(): void {
    this.getAllReaders(this.currentPage, this.sizeOfPage);
  }

  public setPage(indexOfPage: number, event:any) {
    event.preventDefault();
    this.currentPage = indexOfPage;
    this.getAllReaders(this.currentPage, this.sizeOfPage);
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  public getAllReaders(page: number, pageSize:number) {
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

  deleteReaders(): void {
    if(this.checkBoxesList.length != 0) {
      this.readerService.deleteReaders(this.checkBoxesList).subscribe(
        () => {
          document.location.reload();
          alert("Successfully deleted readers");
        },
        err => {
          console.log(err);
        }
      );
    } else {
      alert("You don't choose any reader. Please select one reader and try again");
    }
  }
}
