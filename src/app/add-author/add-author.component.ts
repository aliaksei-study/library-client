import {Component, OnInit} from '@angular/core';
import {AuthorService} from "../service/author.service";
import {Author} from "../model/author";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-author',
  templateUrl: './add-author.component.html',
  styleUrls: ['./add-author.component.css']
})
export class AddAuthorComponent implements OnInit {
  model: Author = new Author();

  constructor(private authorService: AuthorService, private router: Router) {
  }

  ngOnInit(): void {
  }

  addAuthor(): void {
    if (this.isTableValuesExists()) {
      this.authorService.addNewAuthor(this.model).subscribe(
        () => {
          this.router.navigate(['/authors']);
        },
        err => {
          console.log(err);
        });
    } else {
      alert("can't add empty table object");
    }
  }

  isTableValuesExists(): boolean {
    if (this.model.name != undefined) {
      if (this.model.name != "") {
        return true;
      }
    }
    if (this.model.surname != undefined) {
      if (this.model.surname != "") {
        return true;
      }
    }
    if (this.model.dateOfBirth != undefined) {
      if (this.model.dateOfBirth.toString() != "") {
        return true;
      }
    }
    return false;
  }
}
