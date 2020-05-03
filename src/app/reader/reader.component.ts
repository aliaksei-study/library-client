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
  p: number;

  constructor(private readerService: ReaderService) {
  }

  ngOnInit(): void {
    this.getAllReaders();
  }

  public getAllReaders() {
    this.readerService.getAllReaders().subscribe(
      res => {
        this.readers = res;
      },
      err => {
        alert("An error occured");
      }
    )
  }
}
