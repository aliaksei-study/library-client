import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { BookComponent } from './book/book.component';
import { ReaderComponent } from './reader/reader.component';
import {Router, RouterModule, Routes} from "@angular/router";
import { AddBookComponent } from './add-book/add-book.component';
import {HttpClientModule} from "@angular/common/http";
import { AddReaderComponent } from './add-reader/add-reader.component';
import {FormsModule} from "@angular/forms";

const appRoutes : Routes = [
  {
    path:"books",
    component:BookComponent
  },
  {
    path:"readers",
    component:ReaderComponent
  },
  {
    path:"",
    component: BookComponent,
    pathMatch:"full"
  },
  {
    path:"books/add",
    component:AddBookComponent
  },
  {
    path:"readers/add",
    component:AddReaderComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    BookComponent,
    ReaderComponent,
    AddBookComponent,
    AddReaderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
