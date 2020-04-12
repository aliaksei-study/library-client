import { Component, OnInit } from '@angular/core';
import {AddBookComponent} from "../add-book/add-book.component";
import {AuthorServiceService} from "../shared/author-service.service";
import {Author} from "../book/model/author";

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  model:Author = new Author();
  constructor(private authorServiceService: AuthorServiceService) { }

  ngOnInit(): void {
  }

  addAuthor() : void {
    this.authorServiceService.addAuthor(this.model).subscribe(
      res => {
        location.replace("http://localhost:4200/books/add")
      },
      err => {
        alert("Some errors occurred");
      }
    );
    ;
  }
}
