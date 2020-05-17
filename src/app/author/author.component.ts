import { Component, OnInit } from '@angular/core';
import {Author} from "../model/author";
import {AuthorService} from "../service/author.service";

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {
  authors: Author[] = [];
  pages: Array<number>;
  checkBoxesList: Array<number> = [];
  currentPage:number = 0;

  constructor(private authorService: AuthorService) {
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  ngOnInit(): void {
    this.getAllAuthors(this.currentPage);
  }

  deleteAuthors(): void {
    alert("delete");
  }

  public setPage(indexOfPage: number, event:any) {
    event.preventDefault();
    this.currentPage = indexOfPage;
    this.getAllAuthors(this.currentPage);
    setTimeout(() => {
      this.setClickedCheckBoxes();
    },500);
  }

  public getAllAuthors(page: number) {
    this.authorService.getAuthorPage(page).subscribe(
      res => {
        this.authors = res['content'];
        this.pages = new Array(res['totalPages']);
      },
      err => {
        console.log(err);
      }
    )
  }

  public setClickedCheckBoxes(): void {
    let checkBoxes = document.getElementsByTagName('input');
    for(let i = 0; i < checkBoxes.length; i++) {
      if(this.checkBoxesList.indexOf(+checkBoxes.item(i).value) != -1) {
        checkBoxes.item(i).checked = true;
      }
    }
  }

  public updateClickedCheckboxesList(id:number, event) :void {
    if(event.target.checked) {
      this.checkBoxesList.push(id);
    } else {
      let deletedIndex;
      deletedIndex = this.checkBoxesList.indexOf(id);
      if(deletedIndex != -1) {
        this.checkBoxesList.splice(deletedIndex, 1);
      }
    }
  }
}
