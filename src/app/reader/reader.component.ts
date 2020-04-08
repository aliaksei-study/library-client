import { Component, OnInit } from '@angular/core';
import {Reader} from "../book/model/reader";
import {ApiService} from "../shared/api.service";

@Component({
  selector: 'app-reader',
  templateUrl: './reader.component.html',
  styleUrls: ['./reader.component.css']
})
export class ReaderComponent implements OnInit {
  readers:Reader[] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.getAllReaders();
  }

  public getAllReaders() {
    this.apiService.getAllReaders().subscribe(
      res => {
        this.readers = res;
      },
      err => {
        alert("An error occured");
      }
    )
  }
}
