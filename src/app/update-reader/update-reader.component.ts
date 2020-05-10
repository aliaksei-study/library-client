import { Component, OnInit } from '@angular/core';
import {Reader} from "../model/reader";
import {NgModel} from "@angular/forms";
import {ReaderService} from "../service/reader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReaderDto} from "../dto/reader-dto";
import {readFileSync} from "fs";

@Component({
  selector: 'app-update-reader',
  templateUrl: './update-reader.component.html',
  styleUrls: ['./update-reader.component.css']
})
export class UpdateReaderComponent implements OnInit {
  readerDto: ReaderDto;
  urlPhoto: String;
  id:number;

  constructor(private route: ActivatedRoute,private router: Router, private readerService:ReaderService) {

  }

  ngOnInit(): void {
    this.readerDto = new ReaderDto();

    this.id = this.route.snapshot.params['id'];

    this.readerService.getReaderById(this.id).subscribe(
      data => {
        this.readerDto.id = data.id;
        this.readerDto.name = data.name;
        this.readerDto.surname = data.surname;
        this.readerDto.dateOfBirth = data.dateOfBirth;
        this.readerDto.gender = data.gender;
        this.readerDto.userDto.email = data.user.email;
        this.readerDto.userDto.password = data.user.password;
        this.readerDto.userDto.role = data.user.role;
        this.readerDto.phone = data.phone;
        this.urlPhoto = data.photo?.urlPhoto;
        const file = readFileSync(this.urlPhoto);
        alert(file.readInt8());
      },
      err => {
        console.log(err);
      }
    );
  }

  validateFileExtension(file: NgModel) : boolean{
    if(file.value === undefined) {
      return false;
    } else {
      return !((file.value.endsWith("png")) || (file.value.endsWith("jpeg")) || (file.value.endsWith("jpg")));
    }
  }

  updateReader() {
    alert("ff");
  }

  backToReaderPage() {
    this.router.navigate(['/readers']);
  }
}
