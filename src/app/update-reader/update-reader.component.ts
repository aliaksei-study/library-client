import {Component, OnInit} from '@angular/core';
import {NgModel} from "@angular/forms";
import {ReaderService} from "../service/reader.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ReaderDto} from "../dto/reader-dto";

@Component({
  selector: 'app-update-reader',
  templateUrl: './update-reader.component.html',
  styleUrls: ['./update-reader.component.css']
})
export class UpdateReaderComponent implements OnInit {
  readerDto: ReaderDto;
  id:number;
  imageFile: any;

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
      },
      err => {
        console.log(err);
      }
    );

    this.readerService.getImage().subscribe(
      data => {
        this.imageFile = data;
      },
      err => {
        alert("error occured");
      }
    )

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

  deleteImageIfFileSelected():void {
    if(this.readerDto.photoDto != undefined) {
      document.getElementById("image").hidden = true;
    }
  }
}
