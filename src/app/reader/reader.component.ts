import {Component, OnChanges, OnInit} from '@angular/core';
import {Reader} from "../model/reader";
import {ReaderService} from "../service/reader.service";

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

  constructor(private readerService: ReaderService) {
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  ngOnInit(): void {
    this.getAllReaders(this.currentPage);
  }

  public setPage(indexOfPage: number, event:any) {
    event.preventDefault();
    this.currentPage = indexOfPage;
    this.getAllReaders(this.currentPage);
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  public getAllReaders(page: number) {
    this.readerService.getReaderPage(page).subscribe(
      res => {
        this.readers = res['content'];
        this.pages = new Array(res['totalPages']);
      },
      err => {
        console.log(err);
      }
    )
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
      alert(this.checkBoxesList.toString());
    } else {
      let deletedIndex;
      deletedIndex = this.checkBoxesList.indexOf(id);
      alert(deletedIndex);
      if(deletedIndex != -1) {
        this.checkBoxesList.splice(deletedIndex, 1);
      }
      alert(this.checkBoxesList.toString());
    }
  }

  deleteReaders(): void {
    this.readerService.deleteReaders(this.checkBoxesList).subscribe(
      () => {
        alert("deleted");
      },
      err => {
        console.log(err);
      }
    )
  }
}
