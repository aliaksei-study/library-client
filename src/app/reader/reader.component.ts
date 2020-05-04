import {Component, OnInit} from '@angular/core';
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
  currentPage:number = 0;

  constructor(private readerService: ReaderService) {
  }

  ngOnInit(): void {
    this.getAllReaders(this.currentPage);
  }

  public setPage(indexOfPage: number, event:any) {
    event.preventDefault();
    this.currentPage = indexOfPage;
    this.getAllReaders(this.currentPage);
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
}
