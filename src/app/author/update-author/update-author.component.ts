import {Component, OnInit} from '@angular/core';
import {Author} from "../../model/author";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthorService} from "../../service/author.service";

@Component({
  selector: 'app-update-author',
  templateUrl: './update-author.component.html',
  styleUrls: ['./update-author.component.css']
})
export class UpdateAuthorComponent implements OnInit {
  model: Author;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router, private authorService: AuthorService) {
  }

  ngOnInit(): void {
    this.model = new Author();
    this.id = this.route.snapshot.params['id'];

    this.authorService.getAuthorById(this.id).subscribe(
      data => {
        this.model = data;
      },
      err => {
        console.log(err);
      }
    );
  }

  backToAuthorPage() {
    this.router.navigate(['/authors']);
  }

  updateAuthor(): void {
    if (this.isTableValuesExists()) {
      this.authorService.updateAuthor(this.model, this.id).subscribe(
        () => {
          this.router.navigate(['/authors']);
        },
        err => {
          console.log(err);
        }
      )
    } else {
      alert("can't update author with empty table fields");
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
