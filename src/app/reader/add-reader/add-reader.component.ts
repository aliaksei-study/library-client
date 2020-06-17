import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ReaderService} from "../../service/reader.service";
import {ReaderDto} from "../../dto/reader-dto";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.css']
})
export class AddReaderComponent implements OnInit {
  model:ReaderDto = new ReaderDto();

  constructor(public router:Router, private readerService: ReaderService) {

  }

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
    this.readerService.addReader(this.model).subscribe(
      () => {
        this.router.navigate(['/readers']);
      },
      err => {
        console.log(err);
      }
    );
  }
}
