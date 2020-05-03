import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Reader} from "../model/reader";
import {ReaderService} from "../service/reader.service";
import {ReaderDto} from "../dto/reader-dto";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.css']
})
export class AddReaderComponent implements OnInit {
  model:ReaderDto = new ReaderDto();
  reader:Reader = new Reader();

  constructor(private http: HttpClient, public router:Router, private readerService: ReaderService) { }

  ngOnInit(): void {
  }

  validateFileExtension(file: NgModel) : boolean{
    if(file.value === undefined) {
      return false;
    } else {
      return !((file.value.endsWith("png")) || (file.value.endsWith("jpeg")) || (file.value.endsWith("jpg")));
    }
  }

  addReader() : void {
    this.readerService.addAuthor(this.model).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
