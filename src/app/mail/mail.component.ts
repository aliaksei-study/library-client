import {Component, OnInit} from '@angular/core';
import {Reader} from "../model/reader";
import {Email} from "../model/email";
import {Router} from "@angular/router";
import {MailService} from "../service/mail.service";

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrls: ['./mail.component.css']
})
export class MailComponent implements OnInit {
  model: Email;
  readers: Reader[] = [];

  constructor(public router:Router, private mailService: MailService) { }

  ngOnInit(): void {
    this.model = new Email();
    this.readers = history.state.data;
  }

  fillReaderIds() : Array<number> {
    let readerIds = [];
    for(let i = 0; i < this.readers.length; i++) {
      readerIds[i] = this.readers[i].id;
    }
    return readerIds;
  }

  removeReaderFromList(reader: Reader) {
    this.readers.splice(this.readers.indexOf(reader), 1);
  }

  loadTemplate() {
    this.mailService.loadTemplate().subscribe(
      email => {
        this.model = email;
      },
      err => {
        console.log("error occured while loading template")
      }
    );
  }

  sendEmail() {
    if(this.readers !== undefined) {
      this.mailService.sendMail(this.fillReaderIds(), this.model).subscribe(
        () => {
          this.router.navigate(['/readers']);
        },
        err => {
          console.log("some errors occured while sending email");
        }
      )
    } else {
      this.router.navigate(['/readers']);
    }
  }

  saveTemplate() {
    this.mailService.saveTemplate(this.model).subscribe(
      () => {
        alert("Template successfully saved");
      },
      err => {
        console.log("error occured while saving template");
      }
    )
  }
}
