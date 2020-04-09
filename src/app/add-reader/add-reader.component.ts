import {Component, OnInit} from '@angular/core';
import {Gender} from "../book/model/gender.enum";
import {User} from "../book/model/user";
import {Photo} from "../book/model/photo";
import {Book} from "../book/model/book";
import {HttpClient} from "@angular/common/http";
import {Role} from "../book/model/role.enum";

@Component({
  selector: 'app-add-reader',
  templateUrl: './add-reader.component.html',
  styleUrls: ['./add-reader.component.css']
})
export class AddReaderComponent implements OnInit {
  model:ReaderDto = new ReaderDto();

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  addReader() : void {
    let url = "http://localhost:8080/readers/add";
    this.http.post(url, this.model).subscribe(
      res => {
        location.replace("http://localhost:4200/readers");
      },
      err => {
        alert("fucking error");
      }
    );
  }
}

export class ReaderDto {
  id:number;
  name:string;
  surname:string;
  dateOfBirth:Date;
  gender:Gender;
  userDto:UserDto = new UserDto();
  phone:String;
  photoDto:PhotoDto = new PhotoDto();
}

export class PhotoDto {
  id:number;
  file:File;
}

export class UserDto {
  email:string;
  password:string;
  role:Role;
}
