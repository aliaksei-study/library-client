import {Component, OnInit} from '@angular/core';
import {AddBookComponent} from "../add-book/add-book.component";
import {AuthorService} from "../service/author.service";
import {Author} from "../model/author";

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  model: Author = new Author();

  constructor(private authorService: AuthorService) {
  }

  ngOnInit(): void {
  }

  addAuthor(): void {
    if (this.isTableValuesExists()) {
      alert("success");
    } else {
      alert("can't add empty table object");
    }
  }

  isTableValuesExists(): boolean {
    if(this.model.name != undefined) {
      if(this.model.name !="") {
        return true;
      }
    } else if (this.model.surname != undefined) {
      if(this.model.surname != "") {
        return true;
      }
    } else if(this.model.dateOfBirth != undefined) {
      if(this.model.dateOfBirth.toString() !="") {
        return true;
      }
    }
    return false;
  }
}
